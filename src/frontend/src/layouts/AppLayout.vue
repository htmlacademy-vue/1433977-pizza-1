<template>
  <div>
    <header class="header">
      <div class="header__logo">
        <a href="index.html" class="logo">
          <img
            src="~@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <div class="header__cart">
        <a href="cart.html">{{ summ }} ₽</a>
      </div>
      <div class="header__user">
        <a href="#" class="header__login"><span>Войти</span></a>
      </div>
      <slot name="header"></slot>
    </header>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    summ: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped></style>
