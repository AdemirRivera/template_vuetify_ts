import appServices from "@/services/app.service"
import type { User, Route } from "@/interfaces/general.interface"

interface State {
  showLoader: boolean,
  userInfo: Partial<User>,
  menuRoutes: Route[],
  pathRoutes: Route[],
  showSidebar: boolean
}

const filterMenu = (routes_params: Route[]): Route[] => {
  return routes_params.filter((route: Route) => {
    if (!route.mostrar) return false
    if (route.childs) {
      if (route.childs.length > 0) {
        route.childs = filterMenu(route.childs)
      }
    }
    return true
  })
}

export const useAppStore = defineStore('app', {
  state: (): State => ({
    showLoader: false,

    userInfo: {},
    menuRoutes: [],
    pathRoutes: [],
    showSidebar: false
  }),

  actions: {
    async fetchUserInfo() {
      try {
        const { data, status } = await appServices.verify()

        if (status === 200) {
          this.userInfo = data.data.user
        }
      } catch (error) {
        console.error(error)
      }
    },

    async fetchRoutes() {
      try {
        const { data, status } = await appServices.getAuthorizedPaths()

        if (status === 200) {
          this.pathRoutes = JSON.parse(JSON.stringify(data))
          this.menuRoutes = filterMenu(JSON.parse(JSON.stringify(data)))
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
      this.showSidebar = false
    }
  }
})
