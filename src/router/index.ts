/**
 * router/index.ts
 *
 * -
 */

// Composables
import { createRouter, createWebHistory, type RouteRecordRaw, type RouteLocationNormalized } from 'vue-router';
import { jwtDecode } from 'jwt-decode';
import canNext from './helpers'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;
    title: string;
  }
}

export interface Token {
  iss: string;
  iat: number;
  exp: number;
  nbf: number;
  jti: string;
  sub: string;
  prv: string;
}


import authRoutes from '../modules/auth/router'

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
      {
        path: '/list-firmas',
        name: 'listFirmas',
        component: () => import('../pages/TestView.vue'),
        meta: { title: 'Test' }
      },
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

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title

  let token: string | null = null
  let refresh_token: string | null = null

  if (to.meta.requiresAuth !== false) {
    token = localStorage.getItem('token')
    refresh_token = localStorage.getItem('refresh_token')

    if (!token) {
      next({ name: 'login' })
      return
    } else {
      const decoded: Token = jwtDecode(token)
      const now: number = useDayJs().unix()

      if (now > decoded.exp && !refresh_token) {
        next({ name: 'login' })
        return
      }

      const authorized = await canNext(to)
      if (authorized) {
        next()
      } else {
        next({ name: 'forbidden' })
      }
    }
  } else {
    next()
  }
})

export default router
