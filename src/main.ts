/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import 'vue3-toastify/dist/index.css';
import { vUppercase } from './utils/directives'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

app.directive('uppercase', vUppercase)

registerPlugins(app)

app.mount('#app')
