interface State {
  showLoader: boolean
}

export const useAppStore = defineStore('app', {
  state: (): State => ({
    showLoader: false
  }),
})
