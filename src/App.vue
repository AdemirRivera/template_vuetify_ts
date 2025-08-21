<template>
  <v-app>
    <RouterView v-slot="{ Component, route }">
      <!-- Cambia el key SOLO cuando cambia el layout -->
      <Transition name="slide-left" mode="out-in" appear>
        <component :is="Component" :key="route.meta.layout" />
      </Transition>
    </RouterView>
  </v-app>

  <LoaderComponent />
  <VueQueryDevtools />
</template>

<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<style>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.35s ease;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
