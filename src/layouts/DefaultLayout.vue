<template>
  <v-layout>
    <app-bar-component />

    <v-main class="d-flex justify-center">
      <div class="w-100 px-0 px-lg-0 w-lg-66 px-sm-12">
        <router-view />
      </div>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import AppBarComponent from './components/AppBarComponent.vue'
</script>
