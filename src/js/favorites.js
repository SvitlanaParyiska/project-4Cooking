import axios from 'axios';
import svg from '../images/sprite.svg';
import { createPlugFavoriteMarkup } from './plug';
import { save, load, remove } from './localStorageJSON';

const refs = {
  favoritesCategoriesList: document.querySelector('.favorites-category-list'),
  favoritesRecipesList: document.querySelector('.favorites-recipes-list'),
  emptyStorage: document.querySelector('.empty-storage-js'),
  listRecipeEl: document.querySelector('.favorites-recipes-list'),

  //paginationBox: document.getElementById('pagination'),
  //allBtn: document.querySelector('.all-btn'),
};
const KEY_FAVOURITE = 'favourite';
let favArrList = [];
let favCatArrObj = [];
let favSortArr = [];

refs.listRecipeEl.addEventListener('click', selectId);

checkArrFavoritesId();

async function checkArrFavoritesId() {
  const arrFavoritesId = load(KEY_FAVOURITE);

  if (!arrFavoritesId || arrFavoritesId.length === 0) {
    const markStr = createPlugFavoriteMarkup();
    refs.emptyStorage.innerHTML = markStr;
  }

  try {
    const recipesList = await fetchUsers(arrFavoritesId);
    MarkUpRecipes(recipesList);
    const favoritListArr = favArrList
      .filter((course, index, array) => array.indexOf(course) === index)
      .sort((a, b) => a.localeCompare(b));
    MarkUpFavSearch(favoritListArr);
    const seeRecipeBtn = document.querySelectorAll('.js-recipe');
  } catch (error) {
    console.log(error.message);
  }
}

function selectId(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  const selectedId = event.target.dataset.id;
  seeRecipe(selectedId);
}

function seeRecipe(id) {}

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
  refs.favoritesCategoriesList.innerHTML = `<li class="fav-search-item">
          <button type="button" class="fav-search-button all-category-btn">All  categories</button>
        </li>${favSearchArr.join('')}`;
}

function MarkUpRecipes(arr) {
  const favorArr = arr
    .map(
      ({ value: { _id, title, category, description, preview, rating } }) => {
        favArrList.push(category);
        favCatArrObj.push({ categ: [category], id: [_id] });
        return `<li class=" dishes-list-item-fav" data-id="${_id}" data-category="${category}" style="background: linear-gradient(1deg, rgba(5, 5, 5, 0.60) 0%, rgba(5, 5, 5, 0.00) 100%), url(${preview}); background-position: center;
                      background-size: cover;">
        <button type="button" aria-label="Favorite Button" class="heart-btn js-favourite" data-heart="heart">
        <svg class="dishes-list-heart-icon">
        <use href="${svg}#icon-heart">
        </use>
    </svg>
</button>
            
            <div class="dishes-list-item-wrapper">
                <h3 class="dishes-list-item-title">${title}</h3>
                <p class="dishes-list-item-text-fav">${description}</p>
                <div class="dishes-list-item-wrapper-rating">
                    <div class="dishes-list-item-wrapper-rating-star">
                        <p class="dishes-list-item-wrapper-rating-text">${rating}</p>
                        <div class="dishes-list-item-wrapper-rating-star-5">
                            <svg class="dishes-list-star-icon is-active-star">
                                <use href="${svg}#icon-star">
                                </use>
                            </svg>
                            <svg class="dishes-list-star-icon is-active-star">
                                <use href="${svg}#icon-star">
                                </use>
                            </svg>
                            <svg class="dishes-list-star-icon is-active-star">
                                <use href="${svg}#icon-star">
                                </use>
                            </svg>
                            <svg class="dishes-list-star-icon is-active-star">
                                <use href="${svg}#icon-star">
                                </use>
                            </svg>
                            <svg class="dishes-list-star-icon">
                                <use href="${svg}#icon-star">
                                </use>
                            </svg>
                        </div>
                    </div>
                    <button type="button" data-id="${_id}" data-recipe-btn="click" class="see-recipe-btn js-see-recipe js-recipe">See recipe</button>
                </div>
            </div>
        </li>`;
      }
    )

    .join('');
  refs.favoritesRecipesList.innerHTML = favorArr;
}

console.log(favCatArrObj);

// function filterFavoriteCard() {
//   const cardsLisCategory = document.querySelectorAll('.fav-search-button');

//   cardsLisCategory.forEach(button => {
//     button.addEventListener('click', event => {
//       const selectedCategory = event.target.textContent;
//       save('category', selectedCategory);
//       save('page', 1);

//       favSortArr = [];
      
//       favCatArrObj.forEach(obj => {
//         if (obj.categ[0] === selectedCategory) {
//           favSortArr.push(...obj.id);
//         }
//       });

//       rend();
//       pagination.reset(favSortArr.length); 
//     });
//   });
// }

// function rend() {
//   const recipesList = favSortArr.map(recipeId => {
//     return recipes.find(recipe => recipe._id === recipeId);
//   });

//   MarkUpRecipes(recipesList);
// }
// filterFavoriteCard()
