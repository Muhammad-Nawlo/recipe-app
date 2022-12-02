import { elements } from "./base";
import Fraction from "fraction.js";
export const renderRecipe = (recipe,isLiked) => {
  let markupIngredients = "";
  recipe.ingredients.forEach((ing) => {
    markupIngredients += `
        <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formattingAmount(ing.amount)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.ingredient}
        </div>
    </li>
        `;
  });
  let markup = `
    <figure class="recipe__fig">
        <img src="${recipe.img}" alt="${recipe.name}" class="recipe__img">
        <h1 class="recipe__title">
            <span>${recipe.title}</span>
        </h1>
    </figure>
    <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text"> servings</span>

            <div class="recipe__info-buttons">
                <button class="btn-tiny btn-decrease">
                    <svg> 
                        <use href="img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny btn-increase">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>

        </div>
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart${isLiked?'':'-outlined'}"></use>
            </svg>
        </button>
    </div>

    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
            ${markupIngredients}
        </ul>

        <button class="btn-small recipe__btn recipe__btn-add">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>

    <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>

        </a>
    </div>
    `;
  elements.recipe.insertAdjacentHTML("beforeend", markup);
};
export const removeRecipe = () => {
  elements.recipe.innerHTML = "";
};
const formattingAmount = (number) => {
  if (number) {
    const [int, dec] = number
      .toString()
      .split(".")
      .map((el) => +el);
    if (!dec) {
      return number;
    }
    if (int === 0) {
      const fr = new Fraction(number);
      return `${fr.n}/${fr.d}`;
    } else {
      const fr = new Fraction(number - int);
      return `${int} ${fr.n}/${fr.d}`;
    }
  }
  return "?";
};

export const updateServingsAndIngredients = (recipe) => {
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;
    const ingredientAmountElement = Array.from(document.querySelectorAll('.recipe__count'));
    ingredientAmountElement.map((el, i) => {
    el.textContent = formattingAmount(recipe.ingredients[i].amount)
})
};
