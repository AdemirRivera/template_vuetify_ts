<template>
  <div>
    <h1>
      hola
    </h1>

    <v-btn @click="Store.showLoader = !Store.showLoader">
      click
    </v-btn>
  </div>
</template>
<script setup>
// stores
import { useAppStore } from "../stores/app";

// references
const Store = useAppStore();
</script>
