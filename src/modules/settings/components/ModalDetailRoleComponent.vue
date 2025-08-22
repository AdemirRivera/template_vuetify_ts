<template>
  <v-dialog max-width="650" v-model="modelValue">
    <v-card :title="roleDetail?.name || 'Detalle'">
      <v-card-text>
        <ul>
          <li
            v-for="permission in roleDetail?.permissions"
            :key="permission.id"
          >
            <span v-text="permission.name" class="text-body-2" />
          </li>
        </ul>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { DataRoleById } from '../interfaces/settings.interfaces'

const props = defineProps<{
  roleDetail: DataRoleById | undefined | null
}>()

const modelValue = defineModel<boolean>()
</script>

<style scoped></style>
