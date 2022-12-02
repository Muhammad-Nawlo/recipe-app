export const elements = {
  searchInput: document.querySelector(".search__field"),
  searchForm: document.querySelector(".search"),
  searchResultList: document.querySelector(".results__list"),
  search: document.querySelector(".results"),
  loader: document.querySelector(".loader"),
  searchResultPages: document.querySelector(".results__pages"),
  recipe: document.querySelector(".recipe"),
  shoppingList: document.querySelector(".shopping__list"),
  likeMenu: document.querySelector(".likes__field"),
  likeList: document.querySelector(".likes__list"),
};
export const renderLoader = (parent) => {
  const loader = `
    <div class="loader">
        <svg>
        <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;
  parent.insertAdjacentHTML("afterbegin", loader);
};
export const removeLoader = () => {
  const loader = document.querySelector(".loader");
  if (loader) loader.parentElement.removeChild(loader);
};
