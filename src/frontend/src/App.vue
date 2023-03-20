<template>
  <div id="app">
    <index />
  </div>
</template>

<script>
import IndexVue from "./views/Index.vue";

export default {
  name: "App",
  components: {
    index: IndexVue,
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
