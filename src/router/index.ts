/**
 * router/index.ts
 *
 * -
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import authRoutes from '../modules/auth/router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../pages/index.vue')
      }
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
    path: "/:pathMatch(.*)*",
    name: "forbidden",
    component: () => import("../pages/ForbiddenView.vue"),
    meta: { requiresAuth: false, title: "Forbidden" },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
