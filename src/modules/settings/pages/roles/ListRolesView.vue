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

    <div v-if="isLoading" class="text-center my-12">
      <span> Cargando roles </span>
      <v-progress-linear height="6" indeterminate rounded />
    </div>

    <Transition name="zoom-fade" mode="out-in" appear>
      <v-row dense v-if="!isLoading">
        <v-col
          v-if="listRoles && listRoles.length > 0"
          cols="12"
          sm="4"
          md="3"
          v-for="role in listRoles || []"
          :key="role.id"
        >
          <v-card variant="outlined">
            <v-card-text class="d-flex flex-column pt-0 pr-0">
              <div class="d-flex justify-space-between align-center mb-2">
                <div>
                  <span
                    v-text="role.activo ? 'Activo' : 'Inactivo'"
                    :class="role.activo ? 'text-success' : 'text-error'"
                  />
                  <v-icon
                    :icon="`${
                      role.activo
                        ? 'mdi-close-circle-outline'
                        : 'mdi-check-circle-outline'
                    }`"
                    variant="text"
                    size="small"
                    :color="`${role.activo ? 'error' : 'success'}`"
                    v-tooltip:bottom="role.activo ? 'Desactivar' : 'Activar'"
                    @click=";(itemSelected = role), (showModalStatus = true)"
                    class="ml-2"
                  />
                </div>
                <v-btn
                  icon="mdi-pencil"
                  variant="text"
                  size="small"
                  color="primary"
                  @click="
                    $router.push({ name: 'editRole', params: { id: role.id } })
                  "
                />
              </div>
              <span
                :class="`text-h5 font-weight-medium ${
                  role.activo ? '' : 'text-grey-lighten-1'
                }`"
                v-text="role.name"
              />
              <span
                :class="`cursor-pointer ${
                  role.activo ? 'text-blue-darken-2' : 'text-grey-lighten-1'
                }`"
              >
                Ver permisos
              </span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col v-else cols="12" class="text-center my-12">
          <span>No hay roles disponibles</span>
        </v-col>
      </v-row>
    </Transition>

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
import settingsServices from '../../services/settings.services'
import type { DataRoles } from '../../interfaces/settings.interfaces'

const paramsRoles = reactive({
  page: 1,
  perPage: 10
})

const totalItems = ref(0)
const itemSelected = ref<DataRoles | null>(null)
const showModalStatus = ref(false)

const listRoles = computed(() => {
  const data = rolesQuery.value?.data || []
  return data
})

const {
  isLoading,
  data: rolesQuery,
  refetch
} = useQuery({
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

    refetch()

    showModalStatus.value = false
  }
})

watch(
  () => rolesQuery.value?.pagination.total,
  newTotal => {
    if (newTotal !== undefined && newTotal !== null) {
      totalItems.value = newTotal
    }
  }
)

const changeStatusRole = () => {
  if (itemSelected.value) {
    roleMutation.mutate(itemSelected.value.id)
  }
}
</script>
