<template>
  <v-dialog max-width="650" v-model="showDialog">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        class="text-no-style"
        color="primary"
        append-icon="mdi-plus"
        text="Agregar"
      />
    </template>

    <template v-slot:default>
      <v-card title="Agregar permiso">
        <v-card-text>
          <form @submit.prevent="createPermission">
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
                  text="Guardar"
                  class="text-no-style"
                  type="submit"
                />
                <v-btn
                  color="primary"
                  text="Cancelar"
                  class="text-no-style"
                  variant="outlined"
                  @click="closeModal"
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

const emit = defineEmits(['reset'])
const {
  showDialog,
  optionActions,
  action,
  prefix,
  name,
  description,
  tag,
  namePrefix,
  createPermission,
  closeModal
} = useFormPermission(emit)
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
