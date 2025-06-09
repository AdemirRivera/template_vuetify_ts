import appServices from "@/services/app.services"
import type { User, Route } from "./store.interfaces"

interface State {
  showLoader: boolean,
  userInfo: User | object,
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

      const filterMenu = (routes_params: Route[]) => {
        return routes_params.filter((route: Route) => {
          if (!route.mostrar) return false
          if (route.childs) {
            if (route.childs.length > 0) route.childs = filterMenu(route.childs)
            return true
          }
        })
      }

      try {
        const { data, status } = appServices.getAuthorizedPaths()

        if (status === 200) {
          this.pathRoutes = JSON.parse(JSON.stringify(data))
          this.menuRoutes = data
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
