<template>
  <v-dialog max-width="650">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        class="text-no-style"
        color="primary"
        append-icon="mdi-plus"
        text="Agregar"
      />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Agregar permiso">
        <v-card-text>
          <form @submit.prevent="">
            <v-row>
              <v-col cols="12" md="6">
                <v-autocomplete
                  label="Acción *"
                  v-model="action.value.value"
                  :error-messages="name.errorMessage.value"
                  :items="optionActions"
                  item-title="name"
                  return-object
                />
              </v-col>
              <v-col cols="12" md="6" lg="4" v-if="action.value.value?.id == 8">
                <v-text-field
                  label="Prefijo *"
                  v-model="prefix.value.value"
                  :error-messages="prefix.errorMessage.value"
                  maxlength="8"
                />
              </v-col>
              <v-col cols="12">
                {{ namePrefix }}
                <v-text-field
                  label="Nombre *"
                  :prefix="namePrefix || ''"
                  v-model="name.value.value"
                  maxlength="20"
                  :error-messages="name.errorMessage.value"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea label="Descripción *" />
              </v-col>
            </v-row>
          </form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { permissionSchema } from '../settings.schemas'

interface ActionOption {
  id: number
  name: string
}

const { handleSubmit, handleReset } = useForm({
  validationSchema: permissionSchema
})

const optionActions = [
  { id: 1, name: 'VER' },
  { id: 2, name: 'LISTAR' },
  { id: 3, name: 'CREAR' },
  { id: 4, name: 'ACTIVAR' },
  { id: 5, name: 'EDITAR' },
  { id: 6, name: 'AGREGAR' },
  { id: 7, name: 'ELIMINAR' },
  { id: 8, name: 'OTRO' }
]

const action = useField<ActionOption>('action')
const prefix = useField<string>('prefix')
const name = useField<string>('name')
const description = useField<string>('description')

const namePrefix = computed(() => {
  if (action.value.value?.id) {
    if (action.value.value?.id == 8 && prefix.value.value) {
      return `${prefix.value.value}_`
    }

    return `${action.value.value.name}_`
  }
})

const createPermission = handleSubmit(values => {
  // mutate
})
</script>
