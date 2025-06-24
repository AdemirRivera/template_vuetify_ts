/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'

import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

// Types
import type { App } from 'vue'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // tiempo en cache
      retry: 2,
      refetchOnWindowFocus: false
    },
  },
})

export function registerPlugins(app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(VueQueryPlugin, { queryClient })
}
