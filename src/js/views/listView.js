import { elements } from "./base";
export const renderItem = (item) => {
  const markup = `
        <li class="shopping__item" data-id="${item.id}">
        <div class="shopping__count">
            <input type="number" value="${item.amount}" step="${item.amount}" class="shopping__count-value">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
        `;
  elements.shoppingList.insertAdjacentHTML("beforeend", markup);
};
export const removeItem = (id) => {
  const item = document.querySelector(`[data-id="${id}"]`);
  item.parentElement.removeChild(item);
};
