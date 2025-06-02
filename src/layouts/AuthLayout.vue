<template>
  <section
    class="d-flex flex-column justify-center"
    style="
      background: linear-gradient(180deg, #1c1e4d 31.34%, #6b6fc9 99.66%);
      height: 100dvh;
    "
  >
    <div
      class="d-flex flex-column flex-md-row justify-center align-center"
      style="gap: 20rem; flex-wrap: wrap"
    >
      <v-img
        src="https://es.vuejs.org/images/logo.png"
        alt="logo"
        max-width="340"
        v-if="lgAndUp"
      />

      <v-card elevation="2" class="pa-5" max-width="455" rounded="lg">
        <router-view />
      </v-card>
    </div>
  </section>
</template>
<script setup lang="ts">
const { lgAndUp } = useDisplay()
</script>
