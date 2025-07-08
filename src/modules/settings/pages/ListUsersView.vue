<template>
  <v-container fluid>
    <!-- title -->
    <title-component title="Usuarios" />

    <!-- table -->
    <v-data-table-server
      :headers="headers"
      :items="listUsers"
      :items-per-page="paramsUsers.perPage"
      :page="paramsUsers.page"
      :items-length="totalItems"
      :loading="usersQuery.isLoading.value"
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
  { title: 'Email', key: 'email' },
  { title: 'Estado', key: 'active' },
  { title: 'Doble factor', key: 'is_two_factor' },
]

const paramsUsers = reactive({
  page: 1,
  perPage: 10
})

const sortByUsers: SortItem = reactive({
  key: null,
  order: null
})

const totalItems = ref(0)

const listUsers = computed(() => {
  const data = usersQuery.data.value?.data || []
  return sortArray(sortByUsers, data)
})

const usersQuery = useQuery({
  queryKey: ['list_users', paramsUsers],
  queryFn: () =>
    settingsServices.getlistUsers({
      page: paramsUsers.page,
      per_page: paramsUsers.perPage
    })
})

watch(
  () => usersQuery.data.value?.pagination.total,
  newTotal => {
    if (newTotal !== undefined && newTotal !== null) {
      totalItems.value = newTotal
    }
  }
)

const onPaginate = ({ page, itemsPerPage, sortBy }: DataTableServerOptions) => {
  paramsUsers.page = page
  paramsUsers.perPage = itemsPerPage

  const { key = null, order = null } = sortBy[0] || {}

  sortByUsers.key = key
  sortByUsers.order = order
}
</script>
