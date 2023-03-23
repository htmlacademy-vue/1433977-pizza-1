<template>
  <app-layout :summ="summ">
    <main class="content">
      <builder-pizza-view
        :pizza="pizza"
        :pizza-value="pizzaValue"
        :summ.sync="summ"
      />
    </main>
  </app-layout>
</template>

<script>
import pizza from "@/static/pizza.json";
import BuilderPizzaView from "../modules/builder/views/BuilderPizzaView.vue";
import AppLayout from "../layouts/AppLayout.vue";

export default {
  components: {
    BuilderPizzaView,
    AppLayout,
  },
  data() {
    return {
      summ: 0,
      pizza: pizza,
      pizzaValue: {
        name: "",
        size: 1,
        sauce: 1,
        dough: 1,
        fillings: [
          // {
          //   id: 2,
          //   count: 1,
          // },
          {
            id: 5,
            count: 1,
          },
          {
            id: 6,
            count: 1,
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
