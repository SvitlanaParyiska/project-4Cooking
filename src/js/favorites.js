import axios from 'axios';
import svg from '../images/sprite.svg';
import { createPlugFavoriteMarkup } from './plug';
import { save, load, remove } from './localStorageJSON';
import {} from './dishes_list';

const refs = {
  favoritesCategoriesList: document.querySelector('.favorites-category-list'),
  favoritesRecipesList: document.querySelector('.favorites-recipes-list'),
  emptyStorage: document.querySelector('.empty-storage-js'),
};

const KEY_FAVOURITE = 'favourite';
let favCatArrObj = [];

const arrFavorites = load(KEY_FAVOURITE) ?? [];

refs.favoritesCategoriesList.addEventListener(
  'click',
  filterFavRecipeByCategory
);

checkArrFavoritesId();

async function checkArrFavoritesId() {
  const arrFavoritesId = arrFavorites.map(local => local.id);
  console.log(arrFavoritesId);
  if (!arrFavoritesId || arrFavoritesId.length === 0) {
    const markStr = createPlugFavoriteMarkup();
    refs.emptyStorage.innerHTML = markStr;
  } else {
    try {
      const recipesList = await fetchUsers(arrFavoritesId);
      console.log(recipesList);
      favCatArrObj = createFavCatArrObj(recipesList);
      MarkUpFavSearch(favCatArrObj);
      MarkUpRecipes(favCatArrObj);
      addHearFavoritesListeners();
    } catch (error) {
      console.log(error.message);
    }
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
    return recipes.map(recipe => recipe.value);
  } catch {
    throw new Error('ERROR');
  }
}

function createFavCatArrObj(recipesList) {
  const favCatArr = [];
  const uniqueCategories = [
    ...new Set(recipesList.map(recipe => recipe.category)),
  ];

  uniqueCategories.forEach(category => {
    const recipesInCategory = recipesList.filter(
      recipe => recipe.category === category
    );
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
    addHearFavoritesListeners();
  } else {
    const selectedCategoryObj = favCatArrObj.find(
      obj => obj.categ === selectedCategory
    );
    MarkUpRecipes([selectedCategoryObj]);
    addHearFavoritesListeners();
  }
}

function MarkUpRecipes(arr) {
  refs.favoritesRecipesList.innerHTML = '';
  const favorArr = arr.flatMap(({ recipes }) =>
    recipes.map(({ _id, title, category, description, preview, rating }) => {
      const activeStarMarkup = `<svg class="is-active-star">
      <use href="${svg}#icon-star"></use>
    </svg>`;
      const inactiveStarMarkup = `<svg class="dishes-list-star-icon">
      <use href="${svg}#icon-star"></use>
    </svg>`;

      function generateStars(rating) {
        let stars = '';
        let roundedRating = Math.round(rating);
        for (let i = 0; i < 5; i++) {
          stars += i < roundedRating ? activeStarMarkup : inactiveStarMarkup;
        }
        return stars;
      }
      const heartIconOff = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M10.9938 4.70783C9.16102 2.5652 6.10481 1.98884 3.80851 3.95085C1.51221 5.91285 1.18893 9.19323 2.99222 11.5137C4.49154 13.443 9.029 17.5121 10.5161 18.8291C10.6825 18.9764 10.7657 19.0501 10.8627 19.0791C10.9474 19.1043 11.0401 19.1043 11.1248 19.0791C11.2218 19.0501 11.305 18.9764 11.4714 18.8291C12.9585 17.5121 17.496 13.443 18.9953 11.5137C20.7986 9.19323 20.5148 5.89221 18.179 3.95085C15.8432 2.00948 12.8265 2.5652 10.9938 4.70783Z" stroke="#F8F8F8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
      const heartIconOn = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9937 4.70783C9.16096 2.5652 6.10475 1.98884 3.80845 3.95085C1.51215 5.91285 1.18887 9.19323 2.99216 11.5137C4.49148 13.443 9.02894 17.5121 10.5161 18.8291C10.6825 18.9764 10.7656 19.0501 10.8627 19.0791C10.9474 19.1043 11.04 19.1043 11.1247 19.0791C11.2218 19.0501 11.305 18.9764 11.4713 18.8291C12.9585 17.5121 17.4959 13.443 18.9952 11.5137C20.7985 9.19323 20.5147 5.89221 18.179 3.95085C15.8432 2.00948 12.8264 2.5652 10.9937 4.70783Z" fill="#F8F8F8"/>
</svg>`;

      function generateHeart(id, category) {
        return `
    <div class="heart-wraper" id="${id}">
      <input type="checkbox" class="heart-checkbox" id="${id}" data-category="${category}" />
      <label for="${id}" class="heart-checkbox-label">
        <span class="heartOff fav">${heartIconOn}</span>
        <span class="heartOn">${heartIconOff}</span>
      </label>
    </div>`;
      }

      return `<li class="dishes-list-item" data-id="${_id}" data-category="${category}" style="background: linear-gradient(1deg, rgba(5, 5, 5, 0.60) 0%, rgba(5, 5, 5, 0.00) 100%), url(${preview}); background-position: center;
                      background-size: cover;" loading="lazy">
         ${generateHeart(_id, category)}
            
            <div class="dishes-list-item-wrapper-fav">
                <h3 class="dishes-list-item-title">${title}</h3>
                <p class="dishes-list-item-text-fav">${description}</p>
                <div class="dishes-list-item-wrapper-rating">
                    <div class="dishes-list-item-wrapper-rating-star">
                        <p class="dishes-list-item-wrapper-rating-text">${rating.toFixed(
                          1
                        )}</p>
                        <div class="dishes-list-item-wrapper-rating-star-5">
                            ${generateStars(rating)}
                        </div>
                    </div>
                    <button type="button" data-id="${_id}" data-recipe-btn="click" class="see-recipe-btn js-see-recipe js-recipe">See recipe</button>
                </div>
            </div>
        </li>`;
    })
  );

  refs.favoritesRecipesList.innerHTML = favorArr.join('');
}

function addHearFavoritesListeners() {
  const allHeartCheckBox = document.querySelectorAll('.heart-checkbox');

  allHeartCheckBox.forEach(checkbox => {
    checkbox.addEventListener('change', onCheckboxChange);
  });
}

function onCheckboxChange(evt) {
  const checkbox = evt.target;
  const checkboxId = checkbox.id;
  console.log(checkboxId);
  const checkboxCategory = checkbox.dataset.category;

  if (checkbox.checked) {
    index = arrFavorites.findIndex(cardHeart => cardHeart.id == checkboxId);
    arrFavorites.splice(index, 1);

    localStorage.setItem(KEY_FAVOURITE, JSON.stringify(arrFavorites));
    checkArrFavoritesId();
  }

  return;
}

function MarkUpRecipes(arr) {
  refs.favoritesRecipesList.innerHTML = '';
  const favorArr = arr.flatMap(({ recipes }) =>
    recipes.map(({ _id, title, category, description, preview, rating }) => {
      const activeStarMarkup = `<svg class="is-active-star">
      <use href="${svg}#icon-star"></use>
    </svg>`;
      const inactiveStarMarkup = `<svg class="dishes-list-star-icon">
      <use href="${svg}}#icon-star"></use>
    </svg>`;

      function generateStars(rating) {
        let stars = '';
        let roundedRating = Math.round(rating);
        for (let i = 0; i < 5; i++) {
          stars += i < roundedRating ? activeStarMarkup : inactiveStarMarkup;
        }
        return stars;
      }

      const heartIconOff = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M10.9938 4.70783C9.16102 2.5652 6.10481 1.98884 3.80851 3.95085C1.51221 5.91285 1.18893 9.19323 2.99222 11.5137C4.49154 13.443 9.029 17.5121 10.5161 18.8291C10.6825 18.9764 10.7657 19.0501 10.8627 19.0791C10.9474 19.1043 11.0401 19.1043 11.1248 19.0791C11.2218 19.0501 11.305 18.9764 11.4714 18.8291C12.9585 17.5121 17.496 13.443 18.9953 11.5137C20.7986 9.19323 20.5148 5.89221 18.179 3.95085C15.8432 2.00948 12.8265 2.5652 10.9938 4.70783Z" stroke="#F8F8F8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
      const heartIconOn = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9937 4.70783C9.16096 2.5652 6.10475 1.98884 3.80845 3.95085C1.51215 5.91285 1.18887 9.19323 2.99216 11.5137C4.49148 13.443 9.02894 17.5121 10.5161 18.8291C10.6825 18.9764 10.7656 19.0501 10.8627 19.0791C10.9474 19.1043 11.04 19.1043 11.1247 19.0791C11.2218 19.0501 11.305 18.9764 11.4713 18.8291C12.9585 17.5121 17.4959 13.443 18.9952 11.5137C20.7985 9.19323 20.5147 5.89221 18.179 3.95085C15.8432 2.00948 12.8264 2.5652 10.9937 4.70783Z" fill="#F8F8F8"/>
</svg>`;

      function generateHeart(id, category) {
        return `<div class="heart-wraper" id="${id}">
      <input type="checkbox" class="heart-checkbox" id="${id}" data-category="${category}" />
      <label for="${id}" class="heart-checkbox-label">
        <span class="heartOff fav">${heartIconOn}</span>
        <span class="heartOn">${heartIconOff}</span>
      </label>
    </div>`;
      }

      return `<li class="dishes-list-item" data-id="${_id}" data-category="${category}" style="background: linear-gradient(1deg, rgba(5, 5, 5, 0.60) 0%, rgba(5, 5, 5, 0.00) 100%), url(${preview}); background-position: center;
                      background-size: cover;" loading="lazy">
         ${generateHeart(_id, category)}
            
            <div class="dishes-list-item-wrapper-fav">
                <h3 class="dishes-list-item-title">${title}</h3>
                <p class="dishes-list-item-text-fav">${description}</p>
                <div class="dishes-list-item-wrapper-rating">
                    <div class="dishes-list-item-wrapper-rating-star">
                        <p class="dishes-list-item-wrapper-rating-text">${rating.toFixed(
                          1
                        )}</p>
                        <div class="dishes-list-item-wrapper-rating-star-5">
                            ${generateStars(rating)}
                        </div>
                    </div>
                    <button type="button" data-id="${_id}" data-recipe-btn="click" class="see-recipe-btn js-see-recipe js-recipe">See recipe</button>
                </div>
            </div>
        </li>`;
    })
  );

  refs.favoritesRecipesList.innerHTML = favorArr.join('');
}

function addHearFavoritesListeners() {
  const allHeartCheckBox = document.querySelectorAll('.heart-checkbox');

  allHeartCheckBox.forEach(checkbox => {
    checkbox.addEventListener('change', onCheckboxChange);
  });
}

function onCheckboxChange(evt) {
  const checkbox = evt.target;
  const checkboxId = checkbox.id;
  console.log(checkboxId);
  const checkboxCategory = checkbox.dataset.category;

  if (checkbox.checked) {
    index = arrFavorites.findIndex(cardHeart => cardHeart.id == checkboxId);
    arrFavorites.splice(index, 1);

    localStorage.setItem(KEY_FAVOURITE, JSON.stringify(arrFavorites));
    checkArrFavoritesId();
  }

  return;
}
