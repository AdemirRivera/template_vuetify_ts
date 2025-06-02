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
import esp from 'dayjs/locale/es'

// Composables
import { createVuetify } from 'vuetify'

const _default = {
  variant: 'outlined',
  density: 'comfortable',
  color: 'primary',
}

const light = {
  dark: false,
  colors: {
    background: '#F4F7FD',
    primary: '#1C1E4D',
    secondary: '#111C4E',
    text: '#111928',
    stroke: '#DFE4EA',
    lightBlue: '#5475E5',
  }
}

const dark = {
  dark: true,
  colors: {
    background: '#F4F7FD',
    primary: '#1C1E4D',
    secondary: '#111C4E',
    text: '#111928',
    stroke: '#DFE4EA',
    lightBlue: '#5475E5',
  }
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light,
      dark,
    },
  },

  date: {
    adapter: DayjsUtils,
    locale: { esp }
  },

  locale: {
    locale: 'es',
    messages: { es },
  },

  defaults: {
    VTextField: { ..._default },
    VSelect: { ..._default },
    VAutocomplete: { ..._default },
    VTextarea: { ..._default },
    VTabs: {
      VTab: {
        color: "primary",
        variant: "flat",
        rounded: "t-lg",
        hideSlider: true,
      }
    }
  }
})

declare module 'vuetify' {
  namespace DateModule {
    interface Adapter extends DayjsUtils { }
  }
}
