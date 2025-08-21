<template>
  <v-app-bar scroll-behavior="hide" :elevation="0" color="primary">
    <v-app-bar-nav-icon @click="Store.showSidebar = !Store.showSidebar" />
    <template v-slot:append>
      <div class="d-flex align-center">
        <!-- <div class="d-flex align-center"> -->
        <div class="d-flex flex-row mr-2">
          <span class="font-weight-medium" v-text="Store.userInfo.name" />
          <v-divider class="mx-3" vertical />
          <span class="text-grey-lighten-1" v-text="Store.userInfo.roles" />
        </div>
        <!-- <v-avatar>
            <v-img
              alt="User Avatar"
              :src="`https://ui-avatars.com/api/?name=${}`"
            />
          </v-avatar> -->
        <!-- </div> -->

        <!-- Menú que solo se activa con los tres puntos -->
        <!-- <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              icon="mdi-dots-vertical"
              v-bind="props"
              variant="text"
              class="ml-2"
            />
          </template>

          <v-list base-color="text" :disabled="false">
            <template v-for="(item, i) in listOptions" :key="i">
              <v-list-item
                :value="item"
                @click="handleAction(item.id)"
                v-if="!item.hide"
              >
                <v-list-item-title class="text-primary">
                  {{ item.title }}
                </v-list-item-title>
                <template #prepend>
                  <v-icon color="primary">{{ item.icon }}</v-icon>
                </template>
              </v-list-item>
            </template>
          </v-list>
        </v-menu> -->
      </div>
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="Store.showSidebar" temporary>
    <!-- rail
    :elevation="1"
    :scrim="false"
    :rail-width="railWidth"
    disable-route-watcher
    :mobile="mobile" -->
    <!-- <div class="d-flex justify-start pa-4">
      <v-app-bar-nav-icon :icon="mobile ? 'mdi-close' : 'mdi-menu'" @click="toggleSideBar" />
    </div> -->

    <v-list dense nav class="px-4 d-flex flex-column ga-2">
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
    <template v-slot:append v-if="smAndUp">
      <v-list dense nav class="px-4 d-flex flex-column ga-2">
        <v-list-item
          prepend-icon="mdi-logout"
          title="Cerrar sesión"
          base-color="primary"
          @click="showModalConf = true"
          class="title"
          color="primary"
        />
      </v-list>
      <!-- <v-list
        base-color="text"
        :disabled="false"
        class="mb-4 d-flex flex-column ga-2 px-4"
      >
        <template v-for="(item, i) in listOptions" :key="i">
          <v-list-item
            :value="item"
            @click="handleAction(item.id)"
            v-if="!item.hide"
          >
            <v-list-item-title class="text-primary">
              {{ item.title }}
            </v-list-item-title>
            <template #prepend>
              <v-icon color="primary">{{ item.icon }}</v-icon>
            </template>
          </v-list-item>
        </template>
      </v-list> -->
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
const { smAndUp } = useDisplay()

// interface ListOption {
//   id: number
//   title: string
//   icon: string
//   hide?: boolean
// }

const showModalConf = ref<boolean>(false)

// const listOptions: ListOption[] = [
//   {
//     id: 1,
//     title: 'Mi cuenta',
//     icon: 'mdi-account-circle'
//   },
//   {
//     id: 2,
//     title: 'Cerrar sesión',
//     icon: 'mdi-logout'
//   }
// ]

// const railWidth = computed<number>(() => {
//   if (mobile.value) return width.value - 45
//   return Store.showSidebar ? 80 : 300
// })

// const drawer = computed<boolean>(() => {
//   return mobile.value ? Store.showSidebar : true
// })

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
  Router.push({ name: item.nombre_uri })
}

// const toggleSideBar = () => {
//   Store.showSidebar = !Store.showSidebar
// }

// const handleAction = (idOption: number) => {
//   if (idOption == 2) showModalConf.value = true
// }
</script>
<style scoped lang="scss">
:deep(.v-list-item .v-icon) {
  opacity: 1 !important;
  color: rgb(var(--v-theme-primary)) !important;
}
</style>
