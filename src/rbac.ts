import { registerComponent } from './rbac.component';

type PermissionFn<T> = (user: T, data: DOMStringMap) => boolean;
type Permissions<T> = string | string[] | { [key: string]: string[] | boolean | PermissionFn<T> };

type RBACSetupProperties<T> = {
  user: T;
  userRole: string;
  roles: Record<string, Permissions<T>>;
};

let isComponentInitialised = false;

const setupRBAC = <T>({ user, userRole, roles }: RBACSetupProperties<T>) => {
  const checkPermission = (permission: string, data: DOMStringMap): boolean => {
    const userPermissions = roles[userRole];
    switch (true) {
      case typeof userPermissions === 'string': {
        if (userPermissions === '*') {
          return true;
        }
        return userPermissions === permission;
      }
      case Array.isArray(userPermissions): {
        return userPermissions.includes(permission);
      }
      case typeof userPermissions === 'object': {
        if (userPermissions[permission] && typeof userPermissions[permission] === 'function') {
          return (userPermissions[permission] as PermissionFn<T>)(user, data);
        }
        if ('others' in (userPermissions as object)) {
          return ((userPermissions as object)['others'] as string[]).includes(permission);
        }
        return false;
      }
    }
  };

  !isComponentInitialised && registerComponent(checkPermission);
  isComponentInitialised = true;
};

export { setupRBAC };
