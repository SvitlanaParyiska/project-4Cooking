import axios from 'axios';
import svg from '../images/sprite.svg';
import { createPlugFavoriteMarkup } from './plug';

const refs = {
  favoritesCategoriesList: document.querySelector('.favorites-category-list'),
  favoritesRecipesList: document.querySelector('.favorites-recipes-list'),
  emptyStorage: document.querySelector('.empty-storage-js'),

  //paginationBox: document.getElementById('pagination'),
  //allBtn: document.querySelector('.all-btn'),
};

checkArrFavoritesId();

async function checkArrFavoritesId() {
  // const arrFavoritesId = function Vova; // нужна функция

  //   if (!arrFavoritesId || arrFavoritesId.length === 0)
  if (1) {
    const MarkStr = createPlugFavoriteMarkup();
    refs.emptyStorage.innerHTML = MarkStr;
  }

  try {
    const recipesList = await fetchUsers(arrFavoritesId);
    MarkUpRecipes(recipesList);
  } catch (error) {
    console.log(error.message);
  }
}

async function fetchUsers(arrId) {
  const BASE_URL_RECIPES =
    'https://tasty-treats-backend.p.goit.global/api/recipes/';
  try {
    const arrOfPromises = arrId.map(async itemId => {
      const response = await fetch(`${BASE_URL_RECIPES}${itemId}`);
      return response.json();
    });
    const recipes = await Promise.allSettled(arrOfPromises);
    return recipes;
  } catch {
    throw new Error('ERROR');
  }
}

function MarkUpFavSearch(arr) {
  const favSearchArr = arr.map(
    search => ` <li class="fav-search-item">
          <button type="button" class="fav-search-button">${search}</button>
        </li>`
  );
  refs.favoritesCategoriesList.innerHTML;
}

function MarkUpRecipes(arr) {
  const favorArr = arr
    .map(
      (
        preview,
        category,
        title,
        description,
        rating
      ) => `<li class="dishes-list-fav-item"> 
            <svg class="dishes-list-heart-icon is-active-heart" width='22' height='22'> 
                <use href="${svg}#icon-heart"> 
                </use> 
            </svg> 
            <img class="dishes-list-image" src="${preview}" alt="${category}" loading="lazy"> 
            <div class="dishes-list-fav-item-wrapper"> 
                <h3 class="dishes-list-item-title">${title}</h3> 
                <p class="dishes-list-item-text">${description}</p> 
                <div class="dishes-list-item-wrapper-rating"> 
                    <div class="dishes-list-item-wrapper-rating-star"> 
                        <p class="dishes-list-item-wrapper-rating-text">${rating}</p> 
                        <div class="dishes-list-item-wrapper-rating-star-5"> 
                            <svg class="dishes-list-star-icon is-active-star"> 
                                <use href="./images/sprite.svg#icon-star"> 
                                </use> 
                            </svg> 
                            <svg class="dishes-list-star-icon is-active-star"> 
                                <use href="./images/sprite.svg#icon-star"> 
                                </use> 
                            </svg> 
                            <svg class="dishes-list-star-icon is-active-star"> 
                                <use href="./images/sprite.svg#icon-star"> 
                                </use> 
                            </svg> 
                            <svg class="dishes-list-star-icon is-active-star"> 
                                <use href="./images/sprite.svg#icon-star"> 
                                </use> 
                            </svg> 
                            <svg class="dishes-list-star-icon"> 
                                <use href="./images/sprite.svg#icon-star"> 
                                </use> 
                            </svg> 
                        </div> 
                    </div> 
                    <button type="button" data-id="${_id}" class="see-recipe-btn">See recipe</button>
                </div> 
            </div> 
        </li>`
    )
    .join('');
  refs.favoritesRecipesList.innerHTML = favorArr;
}
