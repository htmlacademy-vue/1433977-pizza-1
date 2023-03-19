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
        <a href="cart.html">0 ₽</a>
      </div>
      <div class="header__user">
        <a href="#" class="header__login"><span>Войти</span></a>
      </div>
    </header>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <div class="content__dough">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите тесто</h2>

              <div class="sheet__content dough">
                <label
                  v-for="doughItem in dough"
                  :key="doughItem.id"
                  :class="['dough__input', getDoughStyle(doughItem)]"
                >
                  <input
                    type="radio"
                    name="dought"
                    value="light"
                    class="visually-hidden"
                    checked
                  />
                  <b>{{ doughItem.name }}</b>
                  <span>{{ doughItem.description }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>

              <div class="sheet__content diameter">
                <label
                  :class="['diameter__input', getSizeStyle(size)]"
                  v-for="size in sizes"
                  :key="size.id"
                >
                  <input
                    type="radio"
                    name="diameter"
                    value="small"
                    class="visually-hidden"
                  />
                  <span>{{ size.name }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__ingredients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">
                Выберите ингредиенты
              </h2>

              <div class="sheet__content ingredients">
                <div class="ingredients__sauce">
                  <p>Основной соус:</p>

                  <label
                    v-for="sauce in sauces"
                    :key="sauce.id"
                    class="radio ingredients__input"
                  >
                    <input type="radio" name="sauce" value="tomato" />
                    <span>{{ sauce.name }}</span>
                  </label>
                </div>

                <div class="ingredients__filling">
                  <p>Начинка:</p>

                  <ul class="ingredients__list">
                    <li
                      class="ingredients__item"
                      v-for="ingredient in ingredients"
                      :key="ingredient.id"
                    >
                      <span
                        :class="['filling', getIngredientStyle(ingredient)]"
                        >{{ ingredient.name }}</span
                      >

                      <div class="counter counter--orange ingredients__counter">
                        <button
                          type="button"
                          class="counter__button counter__button--minus"
                          disabled
                        >
                          <span class="visually-hidden">Меньше</span>
                        </button>
                        <input
                          type="text"
                          name="counter"
                          class="counter__input"
                          value="0"
                        />
                        <button
                          type="button"
                          class="counter__button counter__button--plus"
                        >
                          <span class="visually-hidden">Больше</span>
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input
                type="text"
                name="pizza_name"
                placeholder="Введите название пиццы"
              />
            </label>

            <div class="content__constructor">
              <div class="pizza pizza--foundation--big-tomato">
                <div class="pizza__wrapper">
                  <div
                    v-for="filling in fillings"
                    :key="filling.id"
                    :class="['pizza__filling', getFillingStyle(filling)]"
                  ></div>
                </div>
              </div>
            </div>

            <div class="content__result">
              <p>Итого: 0 ₽</p>
              <button type="button" class="button" disabled>Готовьте!</button>
            </div>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import pizza from "../static/pizza.json";
import { extractImageName } from "../common/helpers";
export default {
  data() {
    return {
      dough: [],
      ingredients: [],
      sauces: [],
      sizes: [],
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
    };
  },
  methods: {
    getDoughStyle(item) {
      const doughChoices = {
        Тонкое: "dough__input--light",
        Толстое: "dough__input--large",
      };
      if (doughChoices[item.name]) return doughChoices[item.name];
      return "";
    },
    getSizeStyle(item) {
      const sizeChoices = {
        1: "diameter__input--small",
        2: "diameter__input--normal",
        3: "diameter__input--big",
      };
      if (sizeChoices[item.multiplier]) return sizeChoices[item.multiplier];
      return "";
    },
    getIngredientStyle(item) {
      const image = item.image;
      const ingredientName = extractImageName(image);
      if (ingredientName) return `filling--${ingredientName}`;
      return "";
    },
    getFillingStyle(item) {
      const index = this.ingredients.findIndex((f) => f.id === item.id);
      const ingredientItem = this.ingredients[index];
      const ingredientName = extractImageName(ingredientItem.image);
      if (ingredientName) return `pizza__filling--${ingredientName}`;
      return "";
    },
  },
  mounted() {
    this.dough = pizza.dough;
    this.ingredients = pizza.ingredients;
    this.sauces = pizza.sauces;
    this.sizes = pizza.sizes;
  },
};
</script>

<style lang="scss" scoped></style>
