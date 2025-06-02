<template>
  <section>
    <div class="content">
      <v-img
        src="https://es.vuejs.org/images/logo.png"
        alt="logo"
        max-width="340"
        v-if="!useDisplay().mdAndDown"
      />
      <div class="container">
        <router-view />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  background: linear-gradient(180deg, #1c1e4d 31.34%, #6b6fc9 99.66%);
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20rem;
  flex-wrap: wrap;
}

div .container {
  width: 100%;
  max-width: 455px;
  padding: 20px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

@media screen and (max-width: 768px) {
  .content {
    flex-direction: column;
  }
}
</style>
