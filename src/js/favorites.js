import axios from 'axios';
import svg from '../images/sprite.svg';
import { createPlugFavoriteMarkup } from './plug';

const refs = {
  favoritesCategoriesList: document.querySelector('.favorites-categories'),
  favoritesRecipesList: document.querySelector('.favorites-list'),
    emptyStorage: document.querySelector('.empty-storage-js'),
    URL_RECIPE:'https://tasty-treats-backend.p.goit.global/api/recipes/';
  //paginationBox: document.getElementById('pagination'),
  //allBtn: document.querySelector('.all-btn'),
};

checkArrFavorites();

function checkArrFavorites() {
  const arrFavorites = JSON.parse(localStorage(KEY_FAVORITE)); // надо функцию Миши
  const arrFavSearch = JSON.parse(localStorage(KEY_FAVORITE.CATEGORIES)); // надо функцию Миши
  if (!arrFavorites || arrFavorites.length === 0) {
    const MarkStr = createPlugFavoriteMarkup();
    refs.emptyStorage.innerHTML = MarkStr;
  }
  MarkUpRecipes(arrFavorites);
  MarkUpFavSearch(arrFavSearch);
  //return arrFavorites;
}

function MarkUpFavSearch(arr) {
  const favSearchArr = arr.map(
    search => ` <li class="fav-search-item">
          <button type="button" class="fav-search-button">${search}</button>
        </li>`
  );
  refs.favoritesCategoriesLis.innerHTML;
}

function MarkUpRecipes(arr) {
  const favorArr = arr.map(
    (
      preview,
      category,
      title,
      description,
      rating
    ) => `<li class="dishes-list-item"> 
            <svg class="dishes-list-heart-icon is-active-heart" width='22' height='22'> 
                <use href="${svg}#icon-heart"> 
                </use> 
            </svg> 
            <img class="dishes-list-image" src="${preview}" alt="${category}" loading="lazy"> 
            <div class="dishes-list-item-wrapper"> 
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
  );
  refs.favoritesRecipesList.innerHTML = favorArr.join('');
}
