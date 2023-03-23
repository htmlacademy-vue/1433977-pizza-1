<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="minusValue"
      :disabled="isDisabledMinus"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="value" />
    <button
      @click="plusValue"
      :disabled="isDisabledPlus"
      type="button"
      class="counter__button counter__button--plus"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String],
      default: 0,
    },
  },
  computed: {
    isDisabledMinus() {
      if (this.value === 0) return true;
      return false;
    },
    isDisabledPlus() {
      if (this.value >= 3) return true;
      return false;
    },
  },
  methods: {
    onChange() {
      // TODO:
    },
    plusValue() {
      let new_value = Number(this.value);
      new_value = new_value + 1;
      this.$emit("input", new_value);
    },
    minusValue() {
      let new_value = Number(this.value);
      new_value = new_value - 1;
      this.$emit("input", new_value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
