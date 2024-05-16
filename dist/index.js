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
let c = !1;
const a = ({ user: n, userRole: o, roles: s }) => {
  !c && u((t, i) => {
    const e = s[o];
    switch (!0) {
      case typeof e == "string":
        return e === "*" ? !0 : e === t;
      case Array.isArray(e):
        return e.includes(t);
      case typeof e == "object":
        return e[t] && typeof e[t] == "function" ? e[t](n, i) : "others" in e ? e.others.includes(t) : !1;
    }
  }), c = !0;
};
export {
  a as setupRBAC
};
