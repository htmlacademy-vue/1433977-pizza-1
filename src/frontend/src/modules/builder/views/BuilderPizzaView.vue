<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>

      <div class="content__dough">
        <div class="sheet">
          <h2 class="title title--small sheet__title">Выберите тесто</h2>

          <div class="sheet__content dough">
            <pizza-radio-button
              v-for="doughItem in dough"
              :key="doughItem.id"
              :label-class="['dough__input', getDoughStyle(doughItem)]"
              :radio-value="doughItem.id"
              :label="doughItem.description"
              :title="doughItem.name"
              name="dough"
              v-model="pizzaValue.dough"
              :is-hidden="true"
            />
          </div>
        </div>
      </div>

      <div class="content__diameter">
        <div class="sheet">
          <h2 class="title title--small sheet__title">Выберите размер</h2>

          <div class="sheet__content diameter">
            <pizza-radio-button
              v-for="size in sizes"
              :key="size.id"
              :label-class="['diameter__input', getSizeStyle(size)]"
              :radio-value="size.id"
              :label="size.name"
              name="size"
              v-model="pizzaValue.size"
              :is-hidden="true"
            />
          </div>
        </div>
      </div>

      <div class="content__ingredients">
        <div class="sheet">
          <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

          <div class="sheet__content ingredients">
            <div class="ingredients__sauce">
              <p>Основной соус:</p>
              <pizza-radio-button
                v-for="sauce in sauces"
                :key="sauce.id"
                label-class="radio ingredients__input"
                :radio-value="sauce.id"
                :label="sauce.name"
                name="sauce"
                v-model="pizzaValue.sauce"
              />
            </div>

            <div class="ingredients__filling">
              <p>Начинка:</p>
              <ul class="ingredients__list">
                <builder-ingredient-filling
                  v-for="ingredient in ingredients"
                  :key="ingredient.id"
                  :id="ingredient.id"
                  :name="ingredient.name"
                  :image="ingredient.image"
                  :price="ingredient.price"
                  v-model="ingredient.count"
                />
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
            v-model="pizzaValue.name"
            placeholder="Введите название пиццы"
          />
        </label>

        <div
          class="content__constructor"
          droppable="true"
          @dragover.prevent
          @drop="onDrop"
        >
          <div :class="['pizza', pizzaFoundationStyle]">
            <div class="pizza__wrapper">
              <div
                v-for="filling in pizzaValue.fillings"
                :key="filling.id"
                :class="[
                  'pizza__filling',
                  getFillingStyle(filling),
                  getFillingStyleCount(filling.count),
                ]"
              ></div>
            </div>
          </div>
        </div>

        <div class="content__result">
          <p>Итого: {{ pizzaPrice }} ₽</p>
          <button
            type="button"
            class="button"
            @click="addToCart"
            :disabled="
              this.pizzaValue.fillings.length === 0 ||
              this.pizzaValue.name === ''
            "
          >
            Готовьте!
          </button>
        </div>
      </div>
    </div>
    <pizza-modal v-if="isOpen" @close="closeModal" />
  </form>
</template>

<script>
import { extractImageName } from "@/common/helpers";

// import BuilderIngredientsSelector from "../components/BuilderIngredientsSelector.vue";
import PizzaRadioButton from "../../../common/components/PizzaRadioButton.vue";
import BuilderIngredientFilling from "../components/BuilderIngredientFilling.vue";
import PizzaModal from "../../../common/components/PizzaModal.vue";

const MAX_FILLING = 3;

export default {
  components: {
    PizzaRadioButton,
    BuilderIngredientFilling,
    PizzaModal,
  },
  props: {
    pizza: {
      type: Object,
      default: () => ({}),
    },
    pizzaValue: {
      type: Object,
      default: () => ({
        name: "",
        size: 1,
        sauce: 1,
        dough: 1,
        fillings: [],
      }),
    },
  },
  data() {
    return {
      isOpen: false,
      name: "",
      dough: [],
      ingredients: [],
      sauces: [],
      sizes: [],
      cart: {
        summ: 0,
        items: [],
      },
    };
  },
  watch: {
    ingredients: {
      handler: function (newValue) {
        this.pizzaValue.fillings = newValue
          .filter((filling) => filling.count > 0)
          .map((filling) => ({ id: filling.id, count: filling.count }));
      },
      deep: true,
    },
  },
  computed: {
    pizzaPrice() {
      //  стоимость пиццы формируется так: мультипликатор размера х (стоимость теста + соус + ингредиенты).
      let price = 0;
      if (this.pizzaValue.fillings.length === 0) return 0;
      const dough_item = this.dough.find((f) => f.id === this.pizzaValue.dough);
      const size_item = this.sizes.find((f) => f.id === this.pizzaValue.size);
      const sauce_item = this.sauces.find(
        (f) => f.id === this.pizzaValue.sauce
      );
      // ингредиенты
      let price_ingredients = 0;
      this.pizzaValue.fillings.forEach((element) => {
        const ingredient_item = this.ingredients.find(
          (f) => f.id === element.id
        );
        price_ingredients =
          price_ingredients + ingredient_item.price * ingredient_item.count;
      });
      price =
        size_item.multiplier *
        (dough_item.price + sauce_item.price + price_ingredients);
      return price;
    },
    pizzaFoundationStyle() {
      const dough_item = this.dough.find((f) => f.id === this.pizzaValue.dough);
      const sauce_item = this.sauces.find(
        (f) => f.id === this.pizzaValue.sauce
      );

      const doughChoices = {
        1: "small",
        2: "big",
      };
      const saucesChoices = {
        1: "tomato",
        2: "creamy",
      };

      if (dough_item && sauce_item) {
        return `pizza--foundation--${doughChoices[dough_item.id]}-${
          saucesChoices[sauce_item.id]
        }`;
      }
      return "";
    },
  },
  methods: {
    closeModal() {
      this.isOpen = false;
    },
    addToCart() {
      this.isOpen = true;
      this.initValue();
    },
    addFilling(id) {
      const ingredientId = Number(id);
      const filling_item = this.ingredients.find((f) => f.id === ingredientId);
      if (filling_item) {
        if (filling_item.count < MAX_FILLING) filling_item.count += 1;
      }
    },
    onDrop(event) {
      const ingredientId = event.dataTransfer.getData("ingredient");
      this.addFilling(ingredientId);
    },
    initValue() {
      this.name = "";
      this.pizzaValue.name = "";
      this.pizzaValue.size = 1;
      this.pizzaValue.sauce = 1;
      this.pizzaValue.dough = 1;

      this.dough = this.pizza.dough;
      this.pizza.ingredients.forEach((element) => {
        element.count = 0;
      });
      this.ingredients = JSON.parse(JSON.stringify(this.pizza.ingredients));
      this.sauces = this.pizza.sauces;
      this.sizes = this.pizza.sizes;
    },
    getDoughStyle(item) {
      const doughChoices = {
        Тонкое: "dough__input--light",
        Толстое: "dough__input--large",
      };
      if (doughChoices[item.name]) return doughChoices[item.name];
      return "";
    },
    getFillingStyleCount(value) {
      if (Number(value) === 2) return "pizza__filling--second";
      if (Number(value) === 3) return "pizza__filling--third";
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
    getFillingStyle(item) {
      const index = this.ingredients.findIndex((f) => f.id === item.id);
      const ingredientItem = this.ingredients[index];
      if (!ingredientItem) return "";
      const ingredientName = extractImageName(ingredientItem.image);
      if (ingredientName) return `pizza__filling--${ingredientName}`;
      return "";
    },
  },
  beforeMount() {
    this.initValue();
  },
};
</script>

<style lang="scss" scoped></style>
