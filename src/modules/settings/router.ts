import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/list-permisos',
        name: 'listPermissions',
        component: () => import('./pages/ListPermissionsView.vue'),
        meta: { title: 'Permisos' },
    },
    {
        path: '/bitacora',
        name: 'listLogs',
        component: () => import('./pages/ListLogsView.vue'),
        meta: { title: 'Bitácora' },
    },
    {
        path: '/list-roles',
        name: 'listRoles',
        component: () => import('./pages/ListRolesView.vue'),
        meta: { title: 'Roles' },
    },
    {
        path: '/list-usuarios',
        name: 'listUsers',
        component: () => import('./pages/ListUsersView.vue'),
        meta: { title: 'Usuarios' },
    },
];

export default routes