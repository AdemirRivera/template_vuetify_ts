<template>
  <v-navigation-drawer
    style="border-top-right-radius: 25px"
    v-model="drawer"
    rail
    temporary
    :elevation="1"
    :scrim="false"
    :rail-width="railWidth"
    disable-route-watcher
    :mobile="mobile"
  >
    <div class="d-flex justify-end pa-4">
      <v-app-bar-nav-icon
        :icon="mobile ? 'mdi-close' : 'mdi-menu'"
        @click="toggleSideBar"
      />
    </div>

    <v-list
      dense
      nav
      class="pt-3 px-4 d-flex flex-column ga-2"
      v-if="!Store.showSidebar || mobile"
    >
      <template v-for="primary in Store.menuRoutes" :key="primary.id">
        <v-list-group
          color="primary"
          class="submenu"
          v-if="primary.childs && primary.childs.length"
        >
          <template v-slot:activator="{ props }">
            <v-list-item
              :prepend-icon="primary.icono"
              :title="primary.nombre"
              color="primary"
              base-color="primary"
              v-bind="props"
              class="title"
            >
              <v-tooltip activator="parent" location="end">
                {{ primary.nombre }}
              </v-tooltip>
            </v-list-item>
          </template>

          <template v-for="secondary in primary.childs" :key="secondary.id">
            <v-list-item
              :value="secondary.id"
              :title="secondary.nombre"
              class="subtitle"
              base-color="primary"
              @click="redirectSiderBar(secondary)"
            >
              <v-tooltip activator="parent" location="end">
                {{ secondary.nombre }}
              </v-tooltip>
            </v-list-item>
          </template>
        </v-list-group>
        <v-list-item
          :prepend-icon="primary.icono"
          :title="primary.nombre"
          :value="primary.id"
          base-color="primary"
          @click="redirectSiderBar(primary)"
          class="title"
          color="primary"
          v-else
        >
          <v-tooltip activator="parent" location="end">
            {{ primary.nombre }}
          </v-tooltip>
        </v-list-item>
      </template>
    </v-list>

    <template v-slot:append v-if="!Store.showSidebar || mobile">
      <v-list
        base-color="text"
        :disabled="false"
        class="mb-4 d-flex flex-column ga-2 px-4"
      >
        <template v-for="(item, i) in listOptions" :key="i">
          <v-list-item
            class="item-menu"
            :prepend-icon="item.icon"
            :title="item.title"
            :value="item"
            @click="handleAction(item.id)"
            base-color="text"
            v-if="!item.hide"
          />
        </template>
      </v-list>
    </template>

    <ModalConfirmationComponent
      v-model="showModalConf"
      icon-type
      icon="mdi-information-outline"
      subtitle="¿Estás seguro de que deseas cerrar sesión?"
      show-cancel
      @accept="logoutMutation.mutate()"
      @cancel="showModalConf = false"
    />
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import appServices from '@/services/app.service'
import type { Route } from '@/interfaces/general.interface'

const Store = useAppStore()
const Router = useRouter()
const { mobile, width } = useDisplay()

interface ListOption {
  id: number
  title: string
  icon: string
  hide?: boolean
}

const showModalConf = ref<boolean>(false)

const listOptions: ListOption[] = [
  //   {
  //     id: 1,
  //     title: 'Perfil',
  //     icon: 'mdi-account',
  //     hide: true
  //   },
  //   {
  //     id: 2,
  //     title: 'Cambiar contraseña',
  //     icon: 'mdi-lock-outline'
  //   },
  {
    id: 3,
    title: 'Cerrar sesión',
    icon: 'mdi-logout'
  }
]

const railWidth = computed<number>(() => {
  if (mobile.value) return width.value - 45
  return Store.showSidebar ? 80 : 300
})

const drawer = computed<boolean>(() => {
  return mobile.value ? Store.showSidebar : true
})

const logoutMutation = useMutation({
  mutationFn: appServices.logout,
  onSuccess: resp => {
    Store.$reset()
    Router.push({ name: 'login' }).then(() => {
      useNotification(resp.data.message, {
        theme: 'colored',
        type: 'info',
        autoClose: 1000,
        hideProgressBar: true,
        dangerouslyHTMLString: true,
        transition: 'slide'
      })
    })
  }
})

const redirectSiderBar = (item: Route) => {
  Store.showSidebar = !Store.showSidebar
  Router.push({ name: item.nombreUri })
}

const toggleSideBar = () => {
  Store.showSidebar = !Store.showSidebar
}

const handleAction = (idOption: number) => {
  if (idOption == 3) showModalConf.value = true
}
</script>
