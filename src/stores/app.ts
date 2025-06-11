import appServices from "@/services/app.service"
import type { User, Route } from "@/interfaces/general.interface"

interface State {
  showLoader: boolean,
  userInfo: Partial<User>,
  menuRoutes: Route[],
  pathRoutes: Route[],
}

export const useAppStore = defineStore('app', {
  state: (): State => ({
    showLoader: false,

    userInfo: {},
    menuRoutes: [],
    pathRoutes: [],
  }),

  actions: {
    async fetchUserInfo() {
      try {
        const { data, status } = await appServices.verify()

        if (status === 200) {
          this.userInfo = data
        }
      } catch (error) {
        console.error(error)
      }
    },

    async fetchRoutes() {

      const filterMenu = (routes: Route[]): Route[] =>
        routes
          .filter(route => route.mostrar === 1)
          .map(route => ({
            ...route,
            childs: filterMenu(route.childs)
          }));

      try {
        const { data, status } = await appServices.getAuthorizedPaths()

        if (status === 200) {
          this.pathRoutes = JSON.parse(JSON.stringify(data))
          this.menuRoutes = filterMenu(data)
        }
      } catch (error) {
        console.error(error)
      }
    },

    $reset() {
      localStorage.removeItem('token')
      localStorage.removeItem('refresh_token')
      this.userInfo = {}
      this.menuRoutes = []
      this.pathRoutes = []
    }
  }
})
