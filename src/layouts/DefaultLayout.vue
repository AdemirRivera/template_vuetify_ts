<template>
  <side-bar-component />
  <v-main>
    <router-view />
  </v-main>
</template>

<script lang="ts" setup>
import SideBarComponent from './components/SideBarComponent.vue'
</script>
