<template>
  <v-app>
    <router-view />
  </v-app>
  <LoaderComponent />
  <VueQueryDevtools />
</template>

<script lang="ts" setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>
