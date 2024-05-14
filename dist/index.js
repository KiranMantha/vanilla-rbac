const u = (n) => {
  window.customElements.define(
    "rbac-comp",
    class extends HTMLElement {
      constructor() {
        super();
      }
      connectedCallback() {
        setTimeout(() => {
          const o = this.dataset.perform, s = this.querySelector('[slot="allowed"]'), r = this.querySelector('[slot="notallowed"]');
          n(o, this.dataset) ? r == null || r.remove() : r && (s == null || s.remove());
        }, 0);
      }
    }
  );
};
let i = !1;
const a = ({ user: n, userRole: o, roles: s }) => {
  !i && u((t, c = {}) => {
    const e = s[o];
    switch (typeof e) {
      case "string":
        return e === "*" ? !0 : e === t;
      case "object":
        return Array.isArray(e) ? e.includes(t) : "others" in e ? e.others.includes(t) : typeof e[t] == "function" ? e[t](n, c) : !1;
      case "function":
        return e(n, c);
    }
  }), i = !0;
};
export {
  a as setupRBAC
};
