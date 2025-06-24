<template>
  <div class="d-flex text-center justify-center flex-column">
    <span class="text-h5 text-primary"> TEMPLATE </span>
  </div>
  <v-form @submit.prevent="loginUser" class="mb-10 mt-5" ref="form">
    <div class="text-center">
      <span class="text-h6 text-primary"> Iniciar sesión </span>
    </div>

    <div class="px-10">
      <div class="mt-4">
        <v-text-field
          autocomplete="username"
          label="Correo electrónico *"
          placeholder="Ingresa tu correo electrónico"
          maxlength="50"
          prepend-inner-icon="mdi-account"
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
        />
      </div>
      <div>
        <v-text-field
          autocomplete="current-password"
          class="pt-3"
          label="Contraseña"
          maxlength="50"
          placeholder="Ingresa tu contraseña"
          prepend-inner-icon="mdi-lock"
          :type="showPass ? 'text' : 'password'"
          v-model="pass.value.value"
          :error-messages="pass.errorMessage.value"
        >
          <template #append-inner>
            <v-btn
              variant="plain"
              :disabled="!pass.value.value"
              :icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
              @click="showPass = !showPass"
              :color="pass.errors.value.length > 0 ? 'error' : ''"
            />
          </template>
        </v-text-field>
      </div>
    </div>
    <div class="mt-2 d-flex justify-center">
      <v-btn
        color="primary"
        height="40"
        type="submit"
        text="Iniciar sesión"
        class="text-no-style"
        :loading="loadButton"
      />
    </div>

    <br />
    <div class="d-flex justify-center text-center flex-column">
      <RecoveryPasswordComponent />
    </div>
  </v-form>
</template>

<script lang="ts" setup>
import RecoveryPasswordComponent from '../components/RecoveryPasswordComponent.vue'
import useLogin from '../composables/useLogin'

const {
  email,
  pass,
  showPass,
  loadButton,

  loginUser
} = useLogin()
</script>
