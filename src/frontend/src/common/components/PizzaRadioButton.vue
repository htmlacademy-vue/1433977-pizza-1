<template>
  <label :class="labelClass">
    <input
      :checked="isChecked"
      type="radio"
      :name="name"
      :value="radioValue"
      @input="updateValue"
      :class="[hiddenStyle]"
    />
    <b v-if="title">{{ title }}</b>
    <span>{{ label }}</span>
  </label>
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String, Boolean],
      default: "",
    },
    radioValue: {
      type: [Number, String, Boolean],
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    labelClass: {
      type: [String, Array],
      default: "",
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    updateValue() {
      this.$emit("input", this.radioValue);
    },
  },
  computed: {
    isChecked() {
      if (this.value == this.radioValue) return true;
      return false;
    },
    hiddenStyle() {
      if (this.isHidden) return "visually-hidden";
      return "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
