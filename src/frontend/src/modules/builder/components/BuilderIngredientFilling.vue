<template>
  <li class="ingredients__item">
    <span
      @dragstart="onDragStart"
      draggable="true"
      :class="['filling', fillingStyle]"
      >{{ name }}</span
    >
    <pizza-item-counter-vue :value="value" @input="updateValue" />
  </li>
</template>

<script>
import PizzaItemCounterVue from "../../../common/components/PizzaItemCounter.vue";
import { extractImageName } from "../../../common/helpers";

export default {
  components: {
    PizzaItemCounterVue,
  },
  props: {
    name: String,
    id: Number,
    image: String,
    price: Number,
    value: Number,
  },
  computed: {
    fillingStyle() {
      if (!this.image) return "";
      const ingredientName = extractImageName(this.image);
      if (ingredientName) return `filling--${ingredientName}`;
      return "";
    },
  },
  methods: {
    updateValue(value) {
      this.$emit("input", value);
    },
    onDragStart(event) {
      event.dataTransfer.setData("ingredient", this.id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
