import axios from "axios";
import { apiKey } from "../config";
import { elements } from "../views/base";
export default class Recipe {
  constructor(id) {
    this.id = id;
  }
  async getRecipe() {
    const options = {
      method: "GET",
      url:
        "https://api.spoonacular.com/recipes/" +
        this.id +
        "/information?apiKey=" +
        apiKey,
    };
    try {
      const res = await axios.request(options);
      this.title = res.data.title;
      this.img = res.data.image;
      this.author = "Unknown";
      this.url = res.data.sourceUrl;
      this.ingredients = res.data.extendedIngredients;
      this.servings = res.data.servings;
      this.time = res.data.readyInMinutes;
    } catch (error) {
      alert(error);
    }
  }
  calculatingTime() {
    // const numIng = this.ingredients.length;
    // const period = Math.ceil(numIng / 3);
    // this.time = period * 15;
  }
  calculatingServings() {
    // this.servings = 4;
  }

  parseIngredients() {
    this.ingredients = this.ingredients.map((el) => {
      return {
        unit: el.unit,
        amount: el.amount,
        ingredient: el.originalName,
      };
    });
  }
  updateServings(type) {
    const newServings = type === "dec" ? this.servings - 1 : this.servings + 1;
    this.ingredients.forEach((ing) => {
      ing.amount *= newServings / this.servings;
    });
    this.servings = newServings;
  }
}
