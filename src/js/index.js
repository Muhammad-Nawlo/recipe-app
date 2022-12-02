import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";
import Like from "./models/Like";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import * as likeView from "./views/likeView";
import { elements, renderLoader, removeLoader } from "./views/base";
const state = {};
async function searchController() {
  const query = searchView.getInput();
  if (query) {
    state.search = new Search(query);
    searchView.clearInput();
    searchView.clearResult();
    renderLoader(elements.search);
    await state.search.getResult();
    removeLoader();
    searchView.renderResult(state.search.result);
  }
}
const recipeController = async () => {
  const id = window.location.hash.replace("#", "");
  if (id) {
    if (state.search) {
      searchView.highlightSelected(id);
    }
    recipeView.removeRecipe();
    renderLoader(elements.recipe);
    state.recipe = new Recipe(id);
    await state.recipe.getRecipe();
    state.recipe.calculatingTime();
    state.recipe.calculatingServings();
    state.recipe.parseIngredients();
    removeLoader();
    recipeView.renderRecipe(state.recipe, state.likes?.isLiked(id));
  }
};
const listController = () => {
  if (!state.list) {
    state.list = new List();
  }
  state.recipe.ingredients.forEach((el) => {
    const item = state.list.addItem(el.amount, el.unit, el.ingredient);
    listView.renderItem(item);
  });
};
const likeController = () => {
  if (!state.likes) state.likes = new Like();
  const recipeId = state.recipe.id;
  if (!state.likes.isLiked(recipeId)) {
    const newLike = state.likes.addLike(
      recipeId,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );
    console.log(newLike);
    likeView.likeButton(true);
    likeView.renderLike(newLike);
  } else {
    state.likes.removeLike(recipeId);
    likeView.likeButton(false);
    likeView.removeLike(recipeId);
  }
  likeView.likeMenu(state.likes.getNumberOfLikes());
};

elements.shoppingList.addEventListener("click", (e) => {
  const itemId = e.target.closest(".shopping__item").dataset.id;
  if (itemId) {
    if (e.target.matches(".shopping__delete,.shopping__delete *")) {
      state.list.removeItem(itemId);
      listView.removeItem(itemId);
    } else if (e.target.matches(".shopping__count-value")) {
      const amount = +e.target.value;
      state.list.updateItem(itemId, amount);
    }
  }
});

// Event listeners
elements.searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  searchController();
});

elements.searchResultPages.addEventListener("click", (event) => {
  const button = event.target.closest(".btn-inline");
  if (button) {
    const page = +button.dataset.goto;
    searchView.clearResult();
    searchView.renderResult(state.search.result, page);
  }
});
["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, recipeController)
);
elements.recipe.addEventListener("click", (e) => {
  if (e.target.matches(".btn-decrease,.btn-decrease *")) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      recipeView.updateServingsAndIngredients(state.recipe);
    }
  } else if (e.target.matches(".btn-increase,.btn-increase *")) {
    state.recipe.updateServings("inc");
    recipeView.updateServingsAndIngredients(state.recipe);
  } else if (e.target.matches(".recipe__btn-add,.recipe__btn-add *")) {
    listController();
  } else if (e.target.matches(".recipe__love,.recipe__love *")) {
    likeController();
  }
});
window.addEventListener("load", () => {
  state.likes = new Like();
  state.likes.readData();
  likeView.likeMenu(state.likes.getNumberOfLikes());
  state.likes.likes.forEach((like) => {
    likeView.renderLike(like);
  });
});
