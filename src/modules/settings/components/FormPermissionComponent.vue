<template>
  <v-dialog max-width="650" v-model="modelValue" @after-leave="handleReset()">
    <template v-slot:default>
      <v-card>
        <v-card-title>
          {{ mode === 'create' ? 'Crear' : 'Editar' }} permiso
        </v-card-title>
        <v-card-text>
          <form @submit.prevent="submitForm">
            <v-row>
              <v-col cols="12" md="6">
                <v-autocomplete
                  name="input-action"
                  label="Acción *"
                  v-model="action.value.value"
                  :error-messages="action.errorMessage.value"
                  :items="optionActions"
                  item-title="name"
                  return-object
                />
              </v-col>
              <v-col cols="12" md="6" lg="4" v-if="action.value.value?.id == 8">
                <v-text-field
                  name="input-prefix"
                  label="Prefijo *"
                  v-model="prefix.value.value"
                  v-uppercase
                  :error-messages="prefix.errorMessage.value"
                  maxlength="8"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  name="input-name"
                  class="name-input"
                  label="Nombre *"
                  :prefix="namePrefix || ''"
                  v-model="name.value.value"
                  v-uppercase
                  maxlength="20"
                  :error-messages="name.errorMessage.value"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  name="input-description"
                  label="Descripción *"
                  v-model="description.value.value"
                  maxlength="200"
                  :error-messages="description.errorMessage.value"
                  auto-grow
                  rows="1"
                />
              </v-col>
              <v-col cols="12" md="6" lg="4">
                <v-text-field
                  name="input-tag"
                  label="Etiqueta *"
                  v-model="tag.value.value"
                  v-uppercase
                  :error-messages="tag.errorMessage.value"
                  maxlength="8"
                />
              </v-col>
              <v-col cols="12" class="d-flex ga-3 justify-center">
                <v-btn
                  color="primary"
                  text="Cancelar"
                  class="text-no-style"
                  variant="outlined"
                  @click="modelValue = false"
                />
                <v-btn
                  color="primary"
                  text="Guardar"
                  class="text-no-style"
                  type="submit"
                />
              </v-col>
            </v-row>
          </form>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import useFormPermission from '../composables/useFormPermission'
import type { DataListPermissions } from '../interfaces/permissions.interfaces'

const modelValue = defineModel<boolean>()

const emit = defineEmits(['reset'])

const props = defineProps<{
  mode: 'create' | 'edit'
  initialValues: DataListPermissions | null
}>()

const { mode, initialValues } = toRefs(props)

const {
  optionActions,
  action,
  prefix,
  name,
  description,
  tag,
  namePrefix,
  submitForm,
  handleReset
} = useFormPermission(emit, mode, initialValues, modelValue)
</script>

<style lang="scss" scoped>
.name-input {
  :deep(.v-field__input) {
    padding-left: 0px !important;
  }
}
</style>

<style lang="scss" scoped>
.name-input {
  :deep(.v-field__input) {
    padding-left: 0px !important;
  }
}
</style>
