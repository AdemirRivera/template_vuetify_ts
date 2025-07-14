/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import 'vue3-toastify/dist/index.css';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'

import { vUppercase } from './utils/directives'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

app.directive('uppercase', vUppercase)

app.use(Vue3Toastify, {
    theme: 'colored',
    autoClose: 3000,
    hideProgressBar: true,
} as ToastContainerOptions)

registerPlugins(app)

app.mount('#app')
