import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('./pages/LoginView.vue'),
        meta: { requiresAuth: false }
    },
];

export default routes