type PermissionFn<T> = (user: T, data: Record<string, string>) => boolean;
type Permissions<T> = string | string[] | {
    [key: string]: string[] | boolean | PermissionFn<T>;
};
type RBACSetupProperties<T> = {
    user: T;
    userRole: string;
    roles: Record<string, Permissions<T>>;
};
declare const setupRBAC: <T>({ user, userRole, roles }: RBACSetupProperties<T>) => void;
export { setupRBAC };
