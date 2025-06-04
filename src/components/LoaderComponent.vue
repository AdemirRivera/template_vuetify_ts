<template>
  <section class="container" v-if="Store.showLoader">
    <v-progress-circular
      :size="150"
      bg-color="transparent"
      color="blue"
      indeterminate
    />
  </section>
</template>

<script setup>
// stores
import { useAppStore } from '../stores/app'

// references
const Store = useAppStore()
</script>

<style scoped lang="scss">
.container {
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  min-width: 100vw;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  pointer-events: auto;

  // Fondo con efecto frosted glass y gradiente moderno
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);

  // Animación de entrada suave
  animation: fadeIn 0.6s ease-in-out;

  // Opción de sombra sutil para mayor profundidad
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
