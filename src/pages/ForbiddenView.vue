<template>
  <v-empty-state
    headline="404"
    title="Página no encontrada"
    icon="mdi-progress-close"
  >
    <template v-slot:actions>
      <v-btn
        v-if="hasToken"
        class="text-no-style"
        rounded="lg"
        text="Regresar"
        @click="$router.go(-1)"
      />

      <v-btn
        class="text-no-style"
        rounded="lg"
        text="Ir al Login"
        @click="$router.push({ name: 'login' })"
      />
    </template>
  </v-empty-state>
</template>

<script setup lang="ts">
const hasToken = ref<Boolean>(false)

onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) hasToken.value = true
})
</script>
