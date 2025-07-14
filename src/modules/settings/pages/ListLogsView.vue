<template>
  <v-container fluid>
    <title-component title="Bitácora" />

    <v-row>
      <v-col cols="12" sm="8" md="6">
        <v-text-field
          label="Buscar"
          append-inner-icon="mdi-magnify"
          placeholder="Por descripción"
          v-model="searchInput"
          @input="handleDebouncedInput"
          maxlength="100"
          :rules="[minLengthRule]"
          clearable
          @click:clear="paramsLogs.search = null"
        />
      </v-col>
    </v-row>

    <v-data-table-server
      :headers="headers"
      :items="listLogs"
      :items-per-page="paramsLogs.perPage"
      :page="paramsLogs.page"
      :items-length="totalItems"
      :loading="logsQuery.isLoading.value"
      @update:options="onPaginate"
    >
      <template v-slot:item.error="{ item }">
        <div class="d-flex align-center">
          <p>
            {{ item.message || item.description }}
          </p>

          <v-dialog max-width="500">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                v-bind="activatorProps"
                icon="mdi-arrow-top-right"
                variant="text"
                size="small"
                color="primary"
                class="ml-2"
              />
            </template>

            <template v-slot:default="{ isActive }">
              <v-card title="Detalles del error">
                <v-card-text>
                  <span class="text-primary"> Mensaje </span>
                  <p class="text-grey" v-text="item.message || 'No posee'" />
                  <span class="text-primary"> Descripción </span>
                  <p
                    class="text-grey"
                    v-text="item.description || 'No posee'"
                  />
                </v-card-text>
              </v-card>
            </template>
          </v-dialog>
        </div>
      </template>
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
  DataTableColumn,
  SortItem
} from '@/interfaces/vuetify.interfaces'
import settingsServices from '../services/settings.services'
import { sortArray } from '@/utils/globalFunctions'
import { useQuery } from '@tanstack/vue-query'

interface ParamsLogs {
  page: number
  perPage: number
  search: string | null
}

// variables
const headers: DataTableColumn[] = [
  { title: 'Código', key: 'error_code', align: 'center', maxWidth: '80' },
  { title: 'Categoría', key: 'category', align: 'center' },
  { title: 'Error', key: 'error' },
  { title: 'Fecha', key: 'created_at', align: 'center' }
]

const paramsLogs: ParamsLogs = reactive({
  page: 1,
  perPage: 10,
  search: null
})

const sortByLogs: SortItem = reactive({
  key: null,
  order: null
})

const totalItems = ref(0)
const searchInput = ref('')

// rule
const minLengthRule = (v: string) =>
  !v || v.length >= 3 || 'Debe tener al menos 3 caracteres'

// query
const logsQuery = useQuery({
  queryKey: ['list_logs', paramsLogs],
  queryFn: () =>
    settingsServices.getListLogs({
      page: paramsLogs.page,
      per_page: paramsLogs.perPage,
      name: paramsLogs.search
    })
})

// computadas
const listLogs = computed(() => {
  const data = logsQuery.data.value?.data || []
  return sortArray(sortByLogs, data)
})

watch(
  () => logsQuery.data.value?.pagination.total,
  newTotal => {
    if (newTotal !== undefined && newTotal !== null) {
      totalItems.value = newTotal
    }
  }
)

// functions
let timeout: ReturnType<typeof setTimeout> | null = null
const handleDebouncedInput = () => {
  if (timeout) clearTimeout(timeout)

  timeout = setTimeout(() => {
    const trimmed = searchInput.value?.trim() || ''
    if (trimmed.length >= 3 || trimmed.length === 0) {
      paramsLogs.search = trimmed || null
    }
  }, 1000)
}

const onPaginate = ({ page, itemsPerPage, sortBy }: DataTableServerOptions) => {
  paramsLogs.page = page
  paramsLogs.perPage = itemsPerPage
  const { key = null, order = null } = sortBy[0] || {}
  sortByLogs.key = key
  sortByLogs.order = order
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
