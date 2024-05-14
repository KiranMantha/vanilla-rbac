const registerComponent = (checkPermission: (permission: string, data: Record<string, string>) => boolean) => {
  window.customElements.define(
    'rbac-comp',
    class extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        setTimeout(() => {
          const performOp = this.dataset.perform;
          const allowedSlot = this.querySelector('[slot="allowed"]');
          const notAllowedSlot = this.querySelector('[slot="notallowed"]');
          const hasPermission = checkPermission(performOp, this.dataset);
          if (hasPermission) {
            notAllowedSlot?.remove();
          } else if (notAllowedSlot) {
            allowedSlot?.remove();
          }
        }, 0);
      }
    }
  );
};

export { registerComponent };
