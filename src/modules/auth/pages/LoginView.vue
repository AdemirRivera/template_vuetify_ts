<template>
  <div class="d-flex text-center justify-center flex-column">
    <span class="text-h5 text-primary"> TEMPLATE </span>
  </div>
  <v-form @submit.prevent="() => {}" class="mb-10 mt-5" ref="form">
    <div class="text-center">
      <span class="text-h6 text-primary"> Iniciar sesión </span>
    </div>

    <div class="px-10">
      <div class="mt-4">
        <v-text-field
          :rules="[]"
          autocomplete="username"
          label="Correo electrónico"
          placeholder="Ingresa tu correo electrónico"
          maxlength="50"
          prepend-inner-icon="mdi-account"
        />
      </div>
      <div>
        <!-- :type="show_pass_var ? 'text' : 'password'" -->
        <v-text-field
          :rules="[]"
          autocomplete="current-password"
          class="pt-3"
          label="Contraseña"
          maxlength="50"
          placeholder="Ingresa tu contraseña"
          prepend-inner-icon="mdi-lock"
        >
          <template #append-inner>
            <!-- :disabled="!pass_var"
              :icon="show_pass_var ? 'mdi-eye-off' : 'mdi-eye'"
              @click="show_pass_var = !show_pass_var"
              :color="getItemColor(1)" -->
            <v-btn variant="plain" />
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
        class="text-none"
      />
    </div>

    <br />
    <div class="d-flex justify-center text-center flex-column">
      <!-- <spacer-component /> -->
      <!-- <recovery-password-component /> -->
    </div>
  </v-form>
</template>
