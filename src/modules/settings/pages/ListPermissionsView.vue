<template>
  <v-container fluid>
    <!-- title -->

    <div class="d-flex align-center justify-space-between">
      <title-component title="Permisos" />
      <form-permission-component @reset="permissionsQuery.refetch()" />
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
      <template v-slot:item.actions="{ item }">
        <v-btn icon="mdi-pencil" variant="text" size="small" color="primary" />
        <v-btn
          icon="mdi-delete"
          variant="text"
          size="small"
          color="error"
          @click=";(itemSelected = item), (showModalDelete = true)"
        />
      </template>
    </v-data-table-server>

    <modal-confirmation-component
      v-model="showModalDelete"
      icon-type
      icon="mdi-close"
      icon-color="error"
      subtitle="¿Estás seguro de que deseas desactivar este permiso?"
      show-cancel
      @cancel="closeModalDelete"
      @accept="deletePermissionById"
    />
  </v-container>
</template>

<script setup lang="ts">
import type {
  DataTableServerOptions,
  DataTableColumn,
  SortItem
} from '@/interfaces/vuetify.interfaces'
import type { DataListPermissions } from '../interfaces/permissions.interfaces'
import permissionsServices from '../services/permissions.services'
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
  { title: 'Etiqueta', key: 'tag', align: 'center' },
  { title: 'Acciones', key: 'actions', sortable: false, align: 'center' }
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
const showModalDelete = ref(false)
const itemSelected = ref<DataListPermissions | null>()

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
    permissionsServices.getListPermissions({
      page: paramsPermissions.page,
      per_page: paramsPermissions.perPage,
      name: paramsPermissions.search
    })
})

const permissionDelete = useMutation({
  mutationFn: permissionsServices.deletePermissionById,
  onSuccess: (data) => {
    useNotification(data.data.message, { type: 'success' })

    permissionsQuery.refetch()

    closeModalDelete()
  }
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

const closeModalDelete = () => {
  showModalDelete.value = false
  itemSelected.value = null
}

const deletePermissionById = () => {
  if (itemSelected.value) {
    permissionDelete.mutate(itemSelected.value.id)
  }
}
</script>
