<template>
  <v-container fluid>
    <!-- title -->

    <div class="d-flex align-center justify-space-between">
      <title-component title="Permisos" />
      <form-permission-component />
    </div>

    <v-row>
      <v-col cols="12" sm="8" md="6">
        <v-text-field
          label="Buscar"
          append-inner-icon="mdi-magnify"
          placeholder="Por nombre"
          v-model="searchInput"
          @input="handleDebouncedInput"
          maxlength="100"
          :rules="[minLengthRule]"
          clearable
          @click:clear="paramsPermissions.search = null"
        />
      </v-col>
    </v-row>

    <!-- table -->
    <v-data-table-server
      :headers="headers"
      :items="listPermission"
      :items-per-page="paramsPermissions.perPage"
      :page="paramsPermissions.page"
      :items-length="totalItems"
      :loading="permissionsQuery.isLoading.value"
      @update:options="onPaginate"
    >
      <template v-slot:item.tag="{ item }">
        <v-chip :text="item.tag" />
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
import settingsServices from '../services/permissions.services'
import { sortArray } from '@/utils/globalFunctions'

import FormPermissionComponent from '../components/FormPermissionComponent.vue'

interface ParamsPermissions {
  page: number
  perPage: number
  search: string | null
}

const headers: DataTableColumn[] = [
  { title: 'Nombre', key: 'name' },
  { title: 'Descripción', key: 'description' },
  { title: 'Etiqueta', key: 'tag' }
]

const paramsPermissions: ParamsPermissions = reactive({
  page: 1,
  perPage: 10,
  search: null
})

const sortByPermissions: SortItem = reactive({
  key: null,
  order: null
})

const totalItems = ref(0)
const searchInput = ref('')

// rule
const minLengthRule = (v: string) =>
  !v || v.length >= 3 || 'Debe tener al menos 3 caracteres'

const listPermission = computed(() => {
  const data = permissionsQuery.data.value?.data || []
  return sortArray(sortByPermissions, data)
})

const permissionsQuery = useQuery({
  queryKey: ['list_permissions', paramsPermissions],
  queryFn: () =>
    settingsServices.getListPermissions({
      page: paramsPermissions.page,
      per_page: paramsPermissions.perPage,
      name: paramsPermissions.search
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

// functions
let timeout: ReturnType<typeof setTimeout> | null = null
const handleDebouncedInput = () => {
  if (timeout) clearTimeout(timeout)

  timeout = setTimeout(() => {
    const trimmed = searchInput.value?.trim() || ''
    if (trimmed.length >= 3 || trimmed.length === 0) {
      paramsPermissions.search = trimmed || null
    }
  }, 1000)
}
</script>
