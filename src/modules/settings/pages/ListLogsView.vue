<template>
  <v-container fluid>
    <!-- title -->
    <title-component title="Bitácora" />

    <!-- table -->
    <v-data-table-server
      :headers="headers"
      :items="logsQuery.data.value?.data || []"
      :items-per-page="paramsLogs.perPage"
      :page="paramsLogs.page"
      :items-length="totalItems"
      :loading="logsQuery.isLoading.value"
      @update:options="onPaginate"
    >
      <template v-slot:item.category="{ item }">
        <div class="d-flex align-center justify-center">
          <v-icon :color="getCategoryColor(item.error_code)" size="20">
            {{ getCategoryIcon(item.error_code) }}
          </v-icon>
          <span
            :class="`ml-1 font-weight-medium text-${getCategoryColor(
              item.error_code
            )}`"
          >
            {{ getCategoryLabel(item.error_code) }}
          </span>
        </div>
      </template>
    </v-data-table-server>
  </v-container>
</template>

<script setup lang="ts">
import type {
  DataTableServerOptions,
  DataTableColumn
} from '@/interfaces/vuetify.interfaces'
import settingsServices from '../settings.services'

const headers: DataTableColumn[] = [
  { title: 'Código', key: 'error_code', align: 'center', maxWidth: '45' },
  { title: 'Categoría', key: 'category', align: 'center' },
  { title: 'Descripción', key: 'description' },
  { title: 'Fecha', key: 'created_at', align: 'center' }
]

const paramsLogs = reactive({
  page: 1,
  perPage: 10
})

const totalItems = computed(() => logsQuery.data.value?.pagination.total || 0)

const logsQuery = useQuery({
  queryKey: ['list_logs', paramsLogs],
  queryFn: () =>
    settingsServices.getListLogs({
      page: paramsLogs.page,
      per_page: paramsLogs.perPage
    })
})

const onPaginate = (params: DataTableServerOptions) => {
  paramsLogs.page = params.page
  paramsLogs.perPage = params.itemsPerPage
}

const getCategoryLabel = (code: number): string => {
  if (code >= 100 && code < 200) return 'Informativo'
  if (code >= 200 && code < 300) return 'Éxito'
  if (code >= 300 && code < 400) return 'Redirección'
  if (code >= 400 && code < 500) return 'Error Cliente'
  if (code >= 500 && code < 600) return 'Error Servidor'
  return 'Desconocido'
}

const getCategoryColor = (code: number): string => {
  if (code >= 100 && code < 200) return 'info'
  if (code >= 200 && code < 300) return 'success'
  if (code >= 300 && code < 400) return 'info'
  if (code >= 400 && code < 500) return 'warning'
  if (code >= 500 && code < 600) return 'error'
  return 'default'
}

const getCategoryIcon = (code: number): string => {
  if (code >= 100 && code < 200) return 'mdi-information'
  if (code >= 200 && code < 300) return 'mdi-check-circle'
  if (code >= 300 && code < 400) return 'mdi-arrow-decision'
  if (code >= 400 && code < 500) return 'mdi-alert-circle'
  if (code >= 500 && code < 600) return 'mdi-alert-rhombus'
  return 'mdi-help-circle'
}
</script>
