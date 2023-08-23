import axios from 'axios';
import svg from '../images/sprite.svg';
import { createPlugFavoriteMarkup } from './plug';
import { save, load, remove } from './localStorageJSON';

const refs = {
  favoritesCategoriesList: document.querySelector('.favorites-category-list'),
  favoritesRecipesList: document.querySelector('.favorites-recipes-list'),
  emptyStorage: document.querySelector('.empty-storage-js'),
};

const KEY_FAVOURITE = 'favourite';
let favCatArrObj = [];

refs.favoritesCategoriesList.addEventListener('click', filterFavRecipeByCategory);

checkArrFavoritesId();

async function checkArrFavoritesId() {
  const arrFavoritesId = load(KEY_FAVOURITE);

  if (!arrFavoritesId || arrFavoritesId.length === 0) {
    const markStr = createPlugFavoriteMarkup();
    refs.emptyStorage.innerHTML = markStr;
  } else {
    try {
      const recipesList = await fetchUsers(arrFavoritesId);
      favCatArrObj = createFavCatArrObj(recipesList);
      MarkUpFavSearch(favCatArrObj);
      MarkUpRecipes(favCatArrObj);
    } catch (error) {
      console.log(error.message);
    }
  }
}

async function fetchUsers(arrId) {
  const BASE_URL_RECIPES = 'https://tasty-treats-backend.p.goit.global/api/recipes/';
  try {
    const arrOfPromises = arrId.map(async itemId => {
      const response = await fetch(`${BASE_URL_RECIPES}${itemId}`);
      return response.json();
    });
    const recipes = await Promise.allSettled(arrOfPromises);
    return recipes.map(recipe => recipe.value);
  } catch {
    throw new Error('ERROR');
  }
}

function createFavCatArrObj(recipesList) {
  const favCatArr = [];
  const uniqueCategories = [...new Set(recipesList.map(recipe => recipe.category))];
  
  uniqueCategories.forEach(category => {
    const recipesInCategory = recipesList.filter(recipe => recipe.category === category);
    favCatArr.push({ categ: category, recipes: recipesInCategory });
  });

  return favCatArr;
}

function MarkUpFavSearch(arr) {
  const favSearchArr = arr.map(
    ({ categ }) => ` <li class="fav-search-item">
          <button type="button" class="fav-search-button">${categ}</button>
        </li>`
  );
  refs.favoritesCategoriesList.innerHTML = `<li class="fav-search-item">
          <button type="button" class="fav-search-button all-category-btn">All categories</button>
        </li>${favSearchArr.join('')}`;
}

function filterFavRecipeByCategory(event) {
  const selectedCategory = event.target.textContent;

  if (selectedCategory === 'All categories') {
    MarkUpRecipes(favCatArrObj);
  } else {
    const selectedCategoryObj = favCatArrObj.find(obj => obj.categ === selectedCategory);
    MarkUpRecipes([selectedCategoryObj]);
  }
}

function MarkUpRecipes(arr) {
  refs.favoritesRecipesList.innerHTML = '';
  const favorArr = arr.flatMap(
    ({ recipes }) => recipes.map(
      ({ _id, title, category, description, preview, rating }) => `<li class=" dishes-list-item-fav" data-id="${_id}" data-category="${category}" style="background: linear-gradient(1deg, rgba(5, 5, 5, 0.60) 0%, rgba(5, 5, 5, 0.00) 100%), url(${preview}); background-position: center;
                      background-size: cover;">
        <button type="button" aria-label="Favorite Button" class="heart-btn js-favourite" data-heart="heart">
        <svg class="dishes-list-heart-icon">
        <use href="${svg}#icon-heart">
        </use>
    </svg>
</button>
            
            <div class="dishes-list-item-wrapper-fav">
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
        </li>`)
      
    );

refs.favoritesRecipesList.innerHTML = favorArr.join('');
}

// console.log(favCatArrObj);

// function filterFavRecipeByCategory(event) {
//   let favSortArr = [];
//   const selectedCategory = event.target.textContent;
//   favCatArrObj.forEach(obj => {
//     if (obj.categ[0] === selectedCategory) {
//       favSortArr.push(...obj.id);
//     }
//   });
//   console.log(favSortArr);
//   getArrPromiseFilterById(favSortArr);
// }

// async function getArrPromiseFilterById(catArr) {
//   // if (!catArr || catArr.length === 0) {
//   //   return;
//   // }

//   try {
//     const recipesListByCategory = await fetchUsers(catArr);
//     MarkUpRecipes(recipesListByCategory);
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// function filterFavoriteCard() {
//   const cardsLisCategory = document.querySelectorAll('.fav-search-button');
//   console.log(cardsLisCategory);
//   cardsLisCategory.forEach(button => {
//     button.addEventListener('click', event => {
//       const selectedCategory = event.target.textContent;
//       console.log(selectedCategory);
//       save('category', selectedCategory);
//       save('page', 1);

//       favSortArr = [];

//       favCatArrObj.forEach(obj => {
//         if (obj.categ[0] === selectedCategory) {
//           favSortArr.push(...obj.id);
//         }
//         console.log(favSortArr);
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
// filterFavoriteCard();
