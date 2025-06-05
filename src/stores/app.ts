import { jwtDecode } from "jwt-decode"

interface State {
  showLoader: boolean,
  userInfo: object,
  menuRoutes: [],
  pathRoutes: [],
}

export const useAppStore = defineStore('app', {
  state: (): State => ({
    showLoader: false,

    userInfo: {},
    menuRoutes: [],
    pathRoutes: [],
  }),

  actions: {
    setAuth(payload: { token: string, refresh_token: string }) {
      const { token, refresh_token: refreshToken } = payload

      localStorage.setItem('token', token)
      localStorage.setItem('refresh_token', refreshToken)

      this.userInfo = jwtDecode(token)
    },
  }
})
