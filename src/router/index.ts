/**
 * router/index.ts
 *
 * -
 */

// Composables
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { setupRouterGuards } from './helpers';
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;
    title: string;
  }
}

import authRoutes from '../modules/auth/router'
import settingRoutes from '../modules/settings/router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/DefaultLayout.vue'),
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
    children: [
      ...authRoutes
    ]
  },
  {
    // path: "/:pathMatch(.*)*",
    path: "/forbidden",
    name: "forbidden",
    component: () => import("../pages/ForbiddenView.vue"),
    meta: { requiresAuth: false, title: "Forbidden" },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

setupRouterGuards(router)

export default router
