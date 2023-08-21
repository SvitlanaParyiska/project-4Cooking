import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { TastyAPI } from './tasty-api';
import { ModalRecipe } from './create-modal';


const popularRecipesList = document.querySelector('.popular-list');
const TastyApi = new TastyAPI();
const fetchPopularRecipes = TastyApi.getPopularRecipes();

fetchPopularRecipes
  .then(popularRecipes => {
    renderPopularRecipes(popularRecipes);
  })
  .catch(() => {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  });
function renderPopularRecipes(popularRecipes) {
  const markup = popularRecipes
    .map(({ _id, title, description, preview }) => {
      return `<li class="popular-item" data-modal-recipe-open>
        <a href="#" class="popular-link"  data-id="${_id}" >
        <img
          src="${preview}"
          alt="${title}"
          class="popular-item-img"
          width="64px"
          height="64px"
        />
        <div class="popular-item-tumb">
          <h3 class="popular-item-title">${title}</h3>
          <p class="popular-item-text">
            ${description}
          </p>
        </div>
        </a>
      </li>`;
    })
    .join('');

  popularRecipesList.innerHTML = markup;
}

popularRecipesList.addEventListener('click', onClickByPopularRecipe);

function onClickByPopularRecipe(event) {
  event.preventDefault();
  const itemElement = event.target.closest('.popular-link');
  let idRecipe = itemElement.dataset.id;
  console.log(idRecipe);
  ModalRecipe(idRecipe);
}
