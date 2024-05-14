[![GitHub contributors badge](https://img.shields.io/github/contributors/kiranmantha/vanilla-rbac?color=blue)](https://GitHub.com/KiranMantha/vanilla-rbac/graphs/contributors/)
[![PRs Welcome badge](https://img.shields.io/badge/PRs-welcome-blue.svg)](https://GitHub.com/KiranMantha/vanilla-rbac/pulls)
[![Number of hits badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fhits.dwyl.com%2Fkiranmantha%2Fvanilla-rbac.json&label=hits&color=blue)](http://hits.dwyl.com/KiranMantha/vanilla-rbac)

[![NPM version badge](https://img.shields.io/npm/v/vanilla-rbac)](https://www.npmjs.com/package/vanilla-rbac)
[![NPM downloads badge](https://img.shields.io/npm/dw/vanilla-rbac?color=blue)](https://www.npmjs.com/package/vanilla-rbac)

[![GitHub watchers badge](https://img.shields.io/github/watchers/kiranmantha/vanilla-rbac?style=social)](https://github.com/kiranmantha/vanilla-rbac/watchers)
[![GitHub stars badge](https://img.shields.io/github/stars/kiranmantha/vanilla-rbac.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/kiranmantha/vanilla-rbac/stargazers/)

# vanilla-rbac

A framework agnostic typescript based role based access control library.

## Usage

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

### Steps

- In your project entry file, import `setupRBAC` and call it as below:

```typescript
import { setupRBAC } from 'vanilla-rbac';

setupRBAC({
  // logged in user details. type object.
  user: {},
  // role of loggedin user. type a string
  userRole: 'lead',
  // a collection of roles and respective permissions
  roles: {
    // permissions can be a sitring or a list of strings or an object or a function
    // * defines that provided role is entitled to do any operation
    lead: '*',
    seniormember: ['add:post', 'edit:post', 'view:posts'],
    juniormember: {
      // others is a predefined key that segregates permissions that do not depend on any logic
      others: ['add:post'],
      // user is the loggedin user details and data is the list of data-* that passed to rbac-comp
      // data is the HTML Dataset
      'edit:post': (user, data) => {
        return user.id === data.postId;
      }
    }
  }
});
```

- consume `rbac-comp` by passing `data-perform`. `rbac-comp` accepts 2 slots. allowed and notallowed.

## Example 1: controlling specific operations

```html
<rbac-comp data-perform="edit:post" data-post-id="123">
  <button slot="allowed" onclick='alert("i can edit")'>Edit</button>
  <span slot="notallowed">access denied</span>
</rbac-comp>
```

## Example 2: controlling specific pages

```html
// localhost/posts
<rbac-comp data-perform="view:posts">
  <div slot="allowed">
    <ul>
      <li>Post 1</li>
      <li>Post 2</li>
    </ul>
  </div>
  <div slot="notallowed">access denied</div>
</rbac-comp>
```

> Note: `setupRBAC` can also be called upon success of api response to fetch user details.

## Live Examples:

- [Angular](https://stackblitz.com/edit/stackblitz-starters-fzt5qo?file=src%2Fmain.ts)
- [React](https://stackblitz.com/edit/vitejs-vite-fjd98i?file=src%2FApp.jsx)
- [Vue](https://stackblitz.com/edit/vitejs-vite-zgquej?file=src%2FApp.vue)
