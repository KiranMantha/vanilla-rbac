import { registerComponent } from './rbac.component';

type PermissionFn<T> = (user: T, data: Record<string, string>) => boolean;
type Permissions<T> = string | string[] | { [key: string]: string[] | boolean | PermissionFn<T> };

type RBACSetupProperties<T> = {
  user: T;
  userRole: string;
  roles: Record<string, Permissions<T>>;
};

let isComponentInitialised = false;

const setupRBAC = <T>({ user, userRole, roles }: RBACSetupProperties<T>) => {
  const checkPermission = (permission: string, data: Record<string, string> = {}): boolean => {
    const userPermissions = roles[userRole];
    switch (typeof userPermissions) {
      case 'string': {
        if (userPermissions === '*') {
          return true;
        }
        return userPermissions === permission;
      }
      case 'object': {
        if (Array.isArray(userPermissions)) {
          return userPermissions.includes(permission);
        } else {
          if ('others' in (userPermissions as object)) {
            return ((userPermissions as object)['others'] as string[]).includes(permission);
          } else if (typeof userPermissions[permission] === 'function') {
            return (userPermissions[permission] as PermissionFn<T>)(user, data);
          }
        }
        return false;
      }
      case 'function': {
        return (userPermissions as PermissionFn<T>)(user, data);
      }
    }
  };

  !isComponentInitialised && registerComponent(checkPermission);
  isComponentInitialised = true;
};

export { setupRBAC };
