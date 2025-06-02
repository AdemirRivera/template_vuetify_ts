/**
 * router/index.ts
 *
 * -
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/default.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../pages/index.vue')
      }
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
