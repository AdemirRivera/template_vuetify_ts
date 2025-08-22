<template>
  <v-dialog max-width="650" v-model="modelValue">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h5 font-weight-medium text-primary">
          {{ roleDetail?.name || 'Detalle' }}
        </span>
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          @click="modelValue = false"
        />
      </v-card-title>

      <v-card-text>
        <div
          v-if="
            groupedPermissions && Object.keys(groupedPermissions).length > 0
          "
        >
          <!-- Iteramos por cada tag -->
          <div
            v-for="(permissions, tag) in groupedPermissions"
            :key="tag"
            class="px-2"
          >
            <!-- Header del tag -->
            <h4 class="mb-1 text-primary">{{ tag }}</h4>
            <v-divider class="mb-3" />

            <!-- Lista numerada de permisos del tag -->
            <ol class="permission-list">
              <li
                v-for="permission in permissions"
                :key="permission.id"
                class="permission-item"
              >
                <span
                  v-text="formatPermissionName(permission.name)"
                  class="text-body-2"
                />
              </li>
            </ol>
          </div>
        </div>

        <!-- Estado vacío -->
        <div v-else class="text-center py-4">
          <v-icon
            icon="mdi-shield-off-outline"
            size="48"
            color="grey-lighten-1"
          />
          <p class="text-body-2 text-grey mt-2">No hay permisos asignados</p>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DataRoleById } from '../interfaces/settings.interfaces'

const props = defineProps<{
  roleDetail: DataRoleById | undefined | null
}>()

const modelValue = defineModel<boolean>()

// Computed para agrupar permisos por tag
const groupedPermissions = computed(() => {
  if (!props.roleDetail?.permissions) return {}

  return props.roleDetail.permissions.reduce((acc, permission) => {
    const tag = permission.tag || 'SIN_TAG'

    if (!acc[tag]) {
      acc[tag] = []
    }

    acc[tag].push(permission)

    return acc
  }, {} as Record<string, typeof props.roleDetail.permissions>)
})

// Función para formatear nombres de permisos
const formatPermissionName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, letter => letter.toUpperCase())
}
</script>

<style scoped>
.permission-list {
  padding-left: 20px;
  margin: 0;
}

.permission-item {
  padding: 2px 0;
  line-height: 1.4;
}
</style>
