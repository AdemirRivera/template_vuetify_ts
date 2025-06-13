<template>
  <v-dialog max-width="500" v-model="isActive">
    <template v-slot:activator>
      <div>
        <a @click="isActive = true" class="text-grey text-no-style custom-link">
          <span> Recupera tu contraseña</span>
        </a>
      </div>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card class="rounded-xl">
        <v-card-text
          class="d-flex flex-column text-primary text-no-style px-12 my-8"
        >
          <span class="title-modal mx-auto"> Recuperar contraseña </span>
          <p class="subtitle-modal text-center">
            Se enviará un correo con los pasos para restablecer tu contraseña.
          </p>

          <v-form>
            <v-text-field
              autocomplete="email"
              label="Correo electrónico"
              placeholder="Ingresa tu correo electrónico"
              maxlength="50"
              prepend-inner-icon="mdi-account"
            />
          </v-form>

          <div
            class="mt-6 d-flex flex-column flex-sm-row ga-4 ga-sm-8 justify-center"
          >
            <v-btn
              class="text-no-style"
              color="primary"
              variant="outlined"
              @click="isActive.value = false"
            >
              <span> Cancelar </span>
            </v-btn>
            <v-btn
              class="text-no-style"
              color="primary"
              type="submit"
            >
              <span> Enviar </span>
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>

  <ModalConfirmationComponent
    v-model="showModalConf"
    icon-type
    icon="mdi-check-circle-outline"
    subtitle="Correo enviado con éxito para restablecer tu contraseña."
    @accept="showModalConf = false"
  />
</template>

<script setup lang="ts">
import useRecoverPass from '../composables/useRecoverPass'

const { isActive, showModalConf } = useRecoverPass()
</script>

<style scoped lang="scss">
.custom-link {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 19.2px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
</style>