/**
 * router/index.ts
 */

// Composables
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { setupRouterGuards } from './helpers';

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;
    title?: string;
    layout?: 'default' | 'auth' | 'standalone';
  }
}

import authRoutes from '../modules/auth/router'
import settingRoutes from '../modules/settings/router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/DefaultLayout.vue'),
    meta: { layout: 'default' },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('../pages/DashboardView.vue'),
        meta: { title: 'Dashboard' }
      },
      ...settingRoutes,
    ]
  },
  {
    path: '/',
    component: () => import('../layouts/AuthLayout.vue'),
    meta: { layout: 'auth' },
    children: [
      ...authRoutes
    ]
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: () => import('../pages/ForbiddenView.vue'),
    meta: { requiresAuth: false, title: 'Forbidden', layout: 'standalone' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

setupRouterGuards(router)

export default router
