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
        path: '/list-usuarios',
        name: 'listUsers',
        component: () => import('./pages/ListUsersView.vue'),
        meta: { title: 'Usuarios' },
    },
    {
        path: '/list-roles',
        name: 'listRoles',
        component: () => import('./pages/roles/ListRolesView.vue'),
        meta: { title: 'Roles' },
    },
    {
        path: '/crear-rol',
        name: 'addRole',
        component: () => import('./pages/roles/FormRolesView.vue'),
        meta: { title: 'Crear rol' },
    },
    {
        path: '/editar-rol/:id',
        name: 'editRole',
        component: () => import('./pages/roles/FormRolesView.vue'),
        meta: { title: 'Editar rol' },
    },
];

export default routes