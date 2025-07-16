<template>
  <v-container fluid>
    <!-- title -->
    <div class="d-flex align-center justify-space-between">
      <title-component title="Roles" />
      <v-btn
        class="text-no-style"
        color="primary"
        append-icon="mdi-plus"
        text="Agregar"
        @click="$router.push({ name: 'addRole' })"
      />
    </div>

    <!-- table -->
    <v-data-table-server
      :headers="headers"
      :items="listRoles"
      :items-per-page="paramsRoles.perPage"
      :page="paramsRoles.page"
      :items-length="totalItems"
      :loading="rolesQuery.isLoading.value"
      @update:options="onPaginate"
    >
      <template v-slot:item.status="{ item }">
        <v-chip
          :text="item.activo ? 'Activo' : 'Inactivo'"
          :color="item.activo ? 'success' : 'error'"
        />
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          icon="mdi-pencil"
          variant="text"
          size="small"
          color="primary"
          v-tooltip:bottom="'Editar'"
          @click="$router.push({ name: 'editRole', params: { id: item.id } })"
        />
        <v-btn
          :icon="`${
            item.activo
              ? 'mdi-close-circle-outline'
              : 'mdi-check-circle-outline'
          }`"
          variant="text"
          size="small"
          :color="`${item.activo ? 'error' : 'success'}`"
          v-tooltip:bottom="item.activo ? 'Desactivar' : 'Activar'"
          @click=";(itemSelected = item), (showModalStatus = true)"
        />
      </template>
    </v-data-table-server>

    <modal-confirmation-component
      @after-leave="itemSelected = null"
      v-model="showModalStatus"
      icon-type
      :icon="`${
        itemSelected?.activo
          ? 'mdi-close-circle-outline'
          : 'mdi-check-circle-outline'
      }`"
      :icon-color="`${itemSelected?.activo ? 'error' : 'success'}`"
      :subtitle="`¿Estás seguro que deseas ${
        itemSelected?.activo ? 'desactivar' : 'activar'
      } este rol?`"
      show-cancel
      @cancel="showModalStatus = false"
      @accept="changeStatusRole"
    />
  </v-container>
</template>

<script setup lang="ts">
import type {
  DataTableServerOptions,
  DataTableColumn,
  SortItem
} from '@/interfaces/vuetify.interfaces'
import settingsServices from '../../services/settings.services'
import { sortArray } from '@/utils/globalFunctions'
import type { DataRoles } from '../../interfaces/settings.interfaces'

const headers: DataTableColumn[] = [
  { title: 'Nombre', key: 'name' },
  { title: 'Estado', key: 'status' },
  { title: 'Acciones', key: 'actions', sortable: false }
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
const itemSelected = ref<DataRoles | null>(null)
const showModalStatus = ref(false)

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

const roleMutation = useMutation({
  mutationFn: settingsServices.patchRoleById,
  onSuccess: data => {
    useNotification(data.data.message, { type: 'success' })

    rolesQuery.refetch()

    showModalStatus.value = false
  }
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

const changeStatusRole = () => {
  if (itemSelected.value) {
    roleMutation.mutate(itemSelected.value.id)
  }
}
</script>
