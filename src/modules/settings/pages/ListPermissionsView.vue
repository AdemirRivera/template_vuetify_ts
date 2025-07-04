<template>
  <v-container fluid>
    <!-- title -->
    <title-component title="Permisos" />

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

const totalItems = computed(
  () => permissionsQuery.data.value?.pagination.total || 0
)

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

const onPaginate = ({ page, itemsPerPage, sortBy }: DataTableServerOptions) => {
  paramsPermissions.page = page
  paramsPermissions.perPage = itemsPerPage

  const { key = null, order = null } = sortBy[0] || {}

  sortByPermissions.key = key
  sortByPermissions.order = order
}
</script>
