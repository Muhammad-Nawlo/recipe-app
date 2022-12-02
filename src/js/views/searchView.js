import { elements } from "./base";

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
  elements.searchInput.value = "";
};
export const clearResult = () => {
  elements.searchResultList.innerHTML = "";
  elements.searchResultPages.innerHTML = "";
};
export const renderResult = (recipes, page = 1, limit = 10) => {
  const start = (page - 1) * limit;
  const end = page * limit;
  recipes.slice(start, end).forEach(render);
  renderPaginationButtons(page, recipes.length, limit);
};

const render = (recipe) => {
  const markup = `
            <li>
                <a class="results__link " href="#${recipe.id}">
                    <figure class="results__fig">
                        <img src="${recipe.image}" alt="${recipe.title}">
                    </figure>
                    <div class="results__data">
                        <h4 class="results__name">${limitRecipeTitle(
                          recipe.title
                        )}</h4>
                        <p class="results__author">Unknown</p>
                    </div>
                </a>
            </li>
`;
  document
    .querySelector(".results__list")
    .insertAdjacentHTML("beforeend", markup);
};
export const highlightSelected = (id) => {
  Array.from(document.querySelectorAll(".results__link")).map((el) => {
    el.classList.remove("results__link--active");
  });
  document
    .querySelector(`.results__link[href="#${id}"]`)
    .classList.add("results__link--active");
};

export const limitRecipeTitle = (recipeTitle, limit = 15) => {
  const newTitle = [];
  if (recipeTitle.length > limit) {
    recipeTitle.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return cur;
    }, 0);
    return `${newTitle.join(" ")}...`;
  }
  return recipeTitle;
};

const renderPaginationButtons = (page, total, limit) => {
  const pages = Math.ceil(total / limit);
  let buttons;
  if (page === 1 && pages > 1) {
    buttons = createButton(page, "next");
  } else if (page === pages && pages > 1) {
    buttons = createButton(page, "prev");
  } else if (page < pages) {
    buttons = `${createButton(page, "prev")}${createButton(page, "next")}`;
  }
  document
    .querySelector(".results__pages")
    .insertAdjacentHTML("afterbegin", buttons);
};
const createButton = (page, type) => `
<button class="btn-inline results__btn--${
  type === "prev" ? "prev" : "next"
}" data-goto="${type === "prev" ? page - 1 : page + 1}">
    <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${
          type === "prev" ? "left" : "right"
        }"></use>
    </svg>
</button>
`;
