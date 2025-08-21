<template>
  <v-layout>
    <app-bar-component />

    <v-main class="d-flex justify-center">
      <div class="w-100 px-0 px-lg-0 w-lg-66 px-sm-12">
        <RouterView v-slot="{ Component, route }">
          <Transition name="zoom-fade" mode="out-in" appear>
            <component :is="Component" :key="route.fullPath" />
          </Transition>
        </RouterView>
      </div>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import AppBarComponent from './components/AppBarComponent.vue'
</script>

<style>
.zoom-fade-enter-active,
.zoom-fade-leave-active {
  transition: all 0.35s ease;
}
.zoom-fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.zoom-fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>
