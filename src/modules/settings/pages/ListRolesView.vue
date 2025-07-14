<template>
  <v-container fluid>
    <!-- title -->
    <title-component title="Roles" />

    <!-- table -->
    <v-data-table-server
      :headers="headers"
      :items="listRoles"
      :items-per-page="paramsRoles.perPage"
      :page="paramsRoles.page"
      :items-length="totalItems"
      :loading="rolesQuery.isLoading.value"
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
import settingsServices from '../services/settings.services'
import { sortArray } from '@/utils/globalFunctions'

const headers: DataTableColumn[] = [
  { title: 'Nombre', key: 'name' },
  { title: 'Descripción', key: 'description' }
]

const paramsRoles = reactive({
  page: 1,
  perPage: 10
})

const sortByRoles: SortItem = reactive({
  key: null,
  order: null
})

const totalItems = ref(0)

const listRoles = computed(() => {
  const data = rolesQuery.data.value?.data || []
  return sortArray(sortByRoles, data)
})

const rolesQuery = useQuery({
  queryKey: ['list_roles', paramsRoles],
  queryFn: () =>
    settingsServices.getListRoles({
      page: paramsRoles.page,
      per_page: paramsRoles.perPage
    })
})

watch(
  () => rolesQuery.data.value?.pagination.total,
  newTotal => {
    if (newTotal !== undefined && newTotal !== null) {
      totalItems.value = newTotal
    }
  }
)

const onPaginate = ({ page, itemsPerPage, sortBy }: DataTableServerOptions) => {
  paramsRoles.page = page
  paramsRoles.perPage = itemsPerPage

  const { key = null, order = null } = sortBy[0] || {}

  sortByRoles.key = key
  sortByRoles.order = order
}
</script>
