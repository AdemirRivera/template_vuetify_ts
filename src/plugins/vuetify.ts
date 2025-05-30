/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Utils
import { es } from 'vuetify/locale'
import DayjsUtils from '@date-io/dayjs'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'dark',
  },

  date: {
    adapter: DayjsUtils,
  },

  locale: {
    locale: 'es',
    messages: { es },
  },
})

declare module 'vuetify' {
  namespace DateModule {
    interface Adapter extends DayjsUtils {}
  }
}
