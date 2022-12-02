import { elements } from "./base";
import {limitRecipeTitle} from './searchView'
export const likeButton = (isLiked) => {
  const likeClass = isLiked ? "icon-heart" : "icon-heart-outlined";
  document
    .querySelector(".recipe__love use")
    .setAttribute("href", `img/icons.svg#${likeClass}`);
};

export const renderLike = (recipe) => {
  const markup= `
    <li>
    <a class="likes__link" href="#${recipe.id}">
        <figure class="likes__fig">
            <img src="${recipe.img}" alt="${recipe.title}">
        </figure>
        <div class="likes__data">
            <h4 class="likes__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="likes__author">${recipe.author}</p>
        </div>
    </a>
</li>    
    `;
    elements.likeList.insertAdjacentHTML('beforeend', markup);
};
export const removeLike = (id) => {
  const item = document.querySelector(`a.likes__link[href="#${id}"]`);
  item.parentElement.removeChild(item);
};
export const likeMenu = (numOfLikes) => {
  elements.likeMenu.style.visibility = numOfLikes > 0 ? "visible" : "hidden";
};
