[![GitHub contributors badge](https://img.shields.io/github/contributors/kiranmantha/vanilla-rbac?color=blue)](https://GitHub.com/KiranMantha/vanilla-rbac/graphs/contributors/)
[![PRs Welcome badge](https://img.shields.io/badge/PRs-welcome-blue.svg)](https://GitHub.com/KiranMantha/vanilla-rbac/pulls)
[![Number of hits badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fhits.dwyl.com%2Fkiranmantha%2Fvanilla-rbac.json&label=hits&color=blue)](http://hits.dwyl.com/KiranMantha/vanilla-rbac)

[![NPM version badge](https://img.shields.io/npm/v/vanilla-rbac)](https://www.npmjs.com/package/vanilla-rbac)
[![NPM downloads badge](https://img.shields.io/npm/dw/vanilla-rbac?color=blue)](https://www.npmjs.com/package/vanilla-rbac)

[![GitHub watchers badge](https://img.shields.io/github/watchers/kiranmantha/vanilla-rbac?style=social)](https://github.com/kiranmantha/vanilla-rbac/watchers)
[![GitHub stars badge](https://img.shields.io/github/stars/kiranmantha/vanilla-rbac.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/kiranmantha/vanilla-rbac/stargazers/)

# vanilla-rbac

A framework agnostic type-safe role-base access control library.

## Getting Started

Vanilla RBAC is a < 1kb type-safe library that provides role-based access control to any frontend framework. It comprises of a `setupRBAC` function and a webcomponent named `rback-comp`.

### Installation

- npm: `npm i vanilla-rbac`
- cdn: https://cdn.jsdelivr.net/gh/kiranmantha/vanilla-rbac/dist/index.js
- importmap:

```html
<script type="importmap">
  {
    "imports": {
      "vanilla-rbac": "https://cdn.jsdelivr.net/gh/kiranmantha/vanilla-rbac/dist/index.js"
    }
  }
</script>
<script type="module">
  import { setupRBAC } from 'vanilla-rbac';
</script>
```

### Usage

- In your project entry file, import `setupRBAC` and use it as below:

```typescript
import { setupRBAC } from 'vanilla-rbac';

/**
 * This setup function will register the user details, user role and all possible roles with associated permissions
 * This will also register a webcomponent named `rbac-comp` which is used to control user interactions based on permission and role
 * Call this function after the system fetched user details and all possible roles with permissions
 */
setupRBAC({
  /**
   * logged in user details. type object.
   */
  user: {},
  /**
   * role of loggedin user. type string
   */
  userRole: 'lead',
  /**
   * roles is an object with role as key and permissions as value
   * permissions can be a string or a list of strings or an object
   * any role with '*' as permission defines that provided role is entitled to do any operation
   */
  roles: {
    lead: '*',
    seniormember: ['add:post', 'edit:post', 'view:posts'],
    juniormember: {
      /**
       * others is a predefined key that segregates permissions that do not depend on any logic
       */
      others: ['add:post'],
      /**
       * if provided permission not found in others, then it will be treated as key of object and execute it
       * @param {object} user is the loggedin user details
       * @param {DOMStringMap} data is the HTML Dataset which is the list of data-* that passed to rbac-comp
       */
      'edit:post': (user, data) => {
        /**
         * remember: data is the HTMLDataset that gives all the data-* attributes passed to the `rbac-comp`
         * more details: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
         */
        return user.id === data.postOwnerId;
      }
    }
  }
});
```

- consume `rbac-comp` by passing `data-perform`. `rbac-comp` accepts 2 slots. allowed and notallowed.

## Example 1: controlling specific operations

```html
<rbac-comp data-perform="edit:post" data-post-owner-id="123">
  <button slot="allowed" onclick='alert("i can edit")'>Edit</button>
  <span slot="notallowed">access denied</span>
</rbac-comp>
```

## Example 2: controlling specific pages

```html
<!-- page: localhost/posts -->
<rbac-comp data-perform="view:posts">
  <div slot="allowed">
    <!-- display all posts within the page -->
    <ul>
      <li>Post 1</li>
      <li>Post 2</li>
    </ul>
    <!-- or -->
    <your-posts-component></your-posts-component>
  </div>
  <div slot="notallowed">
    <access-denied-component></access-denied-component>
  </div>
</rbac-comp>
```

## Live Examples:

- [Angular](https://stackblitz.com/edit/stackblitz-starters-fzt5qo?file=src%2Fmain.ts)
- [React](https://stackblitz.com/edit/vitejs-vite-fjd98i?file=src%2FApp.jsx)
- [Vue](https://stackblitz.com/edit/vitejs-vite-zgquej?file=src%2FApp.vue)
