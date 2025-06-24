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
];

export default routes