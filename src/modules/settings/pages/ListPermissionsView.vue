<template>
  <v-container fluid>
    <!-- title -->
    <title-component title="Permisos" />

    <!-- table -->
    <v-data-table-server
      :headers="headers"
      :items="permissionsQuery.data.value?.data || []"
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
  DataTableColumn
} from '@/interfaces/vuetify.interfaces'
import settingsServices from '@/modules/settings/settings.services'

const headers: DataTableColumn[] = [
  { title: 'Nombre', key: 'name', sortable: false },
  { title: 'Descripción', key: 'description', sortable: false }
]

const paramsPermissions = reactive({
  page: 1,
  perPage: 10
})

const totalItems = computed(
  () => permissionsQuery.data.value?.pagination.total || 0
)

const permissionsQuery = useQuery({
  queryKey: ['list_permissions', paramsPermissions],
  queryFn: () =>
    settingsServices.getListPermissions({
      page: paramsPermissions.page,
      per_page: paramsPermissions.perPage
    })
})

const onPaginate = (params: DataTableServerOptions) => {
  paramsPermissions.page = params.page
  paramsPermissions.perPage = params.itemsPerPage
}
</script>
