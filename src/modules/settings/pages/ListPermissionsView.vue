<template>
  <v-container fluid>
    <!-- title -->

    <div class="d-flex align-center justify-space-between">
      <title-component title="Permisos" />
      <form-permission-component />
    </div>

    <!-- table -->
    <v-data-table-server
      :headers="headers"
      :items="listPermission"
      :items-per-page="paramsPermissions.perPage"
      :page="paramsPermissions.page"
      :items-length="totalItems"
      :loading="permissionsQuery.isLoading.value"
      @update:options="onPaginate"
    />
  </v-container>
</template>

<script setup lang="ts">
import type {
  DataTableServerOptions,
  DataTableColumn,
  SortItem
} from '@/interfaces/vuetify.interfaces'
import settingsServices from '@/modules/settings/settings.services'
import { sortArray } from '@/utils/globalFunctions'

import FormPermissionComponent from '../components/FormPermissionComponent.vue'

const headers: DataTableColumn[] = [
  { title: 'Nombre', key: 'name' },
  { title: 'Descripción', key: 'description' }
]

const paramsPermissions = reactive({
  page: 1,
  perPage: 10
})

const sortByPermissions: SortItem = reactive({
  key: null,
  order: null
})

const totalItems = ref(0)

const listPermission = computed(() => {
  const data = permissionsQuery.data.value?.data || []
  return sortArray(sortByPermissions, data)
})

const permissionsQuery = useQuery({
  queryKey: ['list_permissions', paramsPermissions],
  queryFn: () =>
    settingsServices.getListPermissions({
      page: paramsPermissions.page,
      per_page: paramsPermissions.perPage
    })
})

watch(
  () => permissionsQuery.data.value?.pagination.total,
  newTotal => {
    if (newTotal !== undefined && newTotal !== null) {
      totalItems.value = newTotal
    }
  }
)

const onPaginate = ({ page, itemsPerPage, sortBy }: DataTableServerOptions) => {
  paramsPermissions.page = page
  paramsPermissions.perPage = itemsPerPage

  const { key = null, order = null } = sortBy[0] || {}

  sortByPermissions.key = key
  sortByPermissions.order = order
}
</script>
