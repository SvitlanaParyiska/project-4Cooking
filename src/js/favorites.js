import svg from '../images/sprite.svg';
import { createPlugFavoriteMarkup } from './plug';
import { save, load, remove } from './localStorageJSON';
import { TastyAPI } from './tasty-api';
import { markupRecipeFav } from './recipeFav';
import { openCloseModal } from './create-modal';
import { modalRating } from './modal-rating';
import { pagination } from './paginationFav';

const refs = {
  favoritesCategoriesList: document.querySelector('.favorites-category-list'),
  favoritesRecipesList: document.querySelector('.favorites-recipes-list'),
  emptyStorage: document.querySelector('.empty-storage-js'),
  paginationConteiner: document.getElementById('tui-pagination-container'),
};

const TastyApi = new TastyAPI();
const KEY_FAVOURITE = 'favourite';

let recipesList = [];

refs.favoritesCategoriesList.addEventListener(
  'click',
  filterFavRecipeByCategory
);

checkArrFavoritesId();

// main//
export async function checkArrFavoritesId(page = 1, sort = false) {
  const arrFavorites = load(KEY_FAVOURITE);
  const list = window.innerWidth < 768 ? 9 : 12;
  const arrFavoritesId = arrFavorites.map(local => local.id);
  if (!arrFavoritesId || arrFavoritesId.length === 0) {
    const markStr = createPlugFavoriteMarkup();
    refs.emptyStorage.innerHTML = markStr;
  } else {
    try {
      recipesList = await fetchRecipes(arrFavoritesId);
      pagination.setTotalItems(recipesList.length);
      MarkUpFavSearch(createSortFavCat(arrFavorites));
      const paginationArr = recipesList.slice(list * (page - 1), list * page);
      MarkUpRecipes(paginationArr);
      addHearFavoritesListeners();
      const btnSeeRecipeArray = document.querySelectorAll('.see-recipe-btn');
      btnSeeRecipeArray.forEach(btnSeeRecipe => {
        btnSeeRecipe.addEventListener('click', onClickByRecipe);
      });
      openCloseModal();
      itemsPerPage();
      if (!sort) {
        pagination.reset(recipesList.length);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

//get sort list categories//
function createSortFavCat(arrFavorites) {
  const newArr = [];
  arrFavorites.forEach(item => newArr.push(item.category));
  const arrMark = newArr
    .filter((course, index, array) => array.indexOf(course) === index)
    .sort((a, b) => a.localeCompare(b));
  return arrMark;
}

//get cards of recipes from API
async function fetchRecipes(arrId) {
  try {
    const arrOfPromises = arrId.map(async itemId => {
      const response = TastyApi.getRecipeById(itemId);
      return response;
    });
    const recipes = await Promise.allSettled(arrOfPromises);
    return recipes.map(recipe => recipe.value);
  } catch {
    throw new Error('ERROR');
  }
}

function MarkUpFavSearch(arr) {
  const favSearchArr = arr.map(
    categ => ` <li class="fav-search-item">
          <button type="button" class="fav-search-button ">${categ}</button>
        </li>`
  );
  refs.favoritesCategoriesList.innerHTML = `<li class="fav-search-item">
          <button type="button" class="fav-search-button all-category-btn active-button">All categories</button>
        </li>${favSearchArr.join('')}`;
}

function filterFavRecipeByCategory(event) {
  const selectedCategory = event.target.textContent;

  if (selectedCategory === 'All categories') {
    checkArrFavoritesId();
  } else {
    const selectedCategoryObj = recipesList.filter(
      item => item.category === selectedCategory
    );
    MarkUpRecipes(selectedCategoryObj);
    addHearFavoritesListeners();
    const btnSeeRecipeArray = document.querySelectorAll('.see-recipe-btn');
    btnSeeRecipeArray.forEach(btnSeeRecipe => {
      btnSeeRecipe.addEventListener('click', onClickByRecipe);
    });
    openCloseModal();
    itemsPerPage();
    pagination.reset(selectedCategoryObj.length);
  }
  const cardsLisCategory = document.querySelectorAll('.fav-search-button');
  cardsLisCategory.forEach(button => {
    button.classList.remove('active-button');
  });

  event.target.classList.add('active-button');
}

export function MarkUpRecipes(arr) {
  refs.favoritesRecipesList.innerHTML = '';
  const favorArr = arr.map(
    ({ _id, title, category, description, preview, rating }) => {
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
        <span class="heartOff">${heartIconOff}</span>
        <span class="heartOn">${heartIconOn}</span>
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
                    <button type="button" data-id="${_id}" data-open='recipe' data-recipe-btn="click" class="see-recipe-btn js-see-recipe js-recipe">See recipe</button>
                </div>
            </div>
        </li>`;
    }
  );

  refs.favoritesRecipesList.innerHTML = favorArr.join('');
}

function addHearFavoritesListeners() {
  const allHeartCheckBox = document.querySelectorAll('.heart-checkbox');

  allHeartCheckBox.forEach(checkbox => {
    checkbox.addEventListener('click', onCheckboxClick);
    checkbox.checked = true;
  });
}

function onCheckboxClick(evt) {
  const arrFavorites = load(KEY_FAVOURITE);
  const checkbox = evt.target;
  const checkboxId = checkbox.id;
  const index = arrFavorites.findIndex(cardHeart => cardHeart.id == checkboxId);
  arrFavorites.splice(index, 1);

  localStorage.setItem(KEY_FAVOURITE, JSON.stringify(arrFavorites));
  checkArrFavoritesId();

  return;
}

function onClickByRecipe(event) {
  const btnSeeRecipeID = event.target.dataset.id;
  markupRecipeFav(btnSeeRecipeID);
  modalRating(btnSeeRecipeID);
}

export function localStorageFavourite() {
  const storedData = localStorage.getItem('favourite');
  if (storedData) {
    const favouriteArrLocalStor = JSON.parse(storedData);
    const btnFavourite = document.querySelector('.favorite-btn');
    const btnFavouriteID = btnFavourite.dataset.id;
    favouriteArrLocalStor.forEach(FavoriteObj => {
      if (btnFavouriteID === FavoriteObj.id) {
        btnFavourite.textContent = 'Remove to favorite';
      }
    });
  }
}

export function onBtnFavouriteClick() {
  const arrFavorites = load(KEY_FAVOURITE);
  const btnFavourite = document.querySelector('.favorite-btn');
  const btnFavouriteCard = btnFavourite.dataset;
  const checkbox = document.querySelectorAll('.heart-checkbox');
  if (btnFavourite.textContent === 'Remove to favorite') {
    btnFavourite.textContent = 'Add to favorite';
    checkbox.forEach(heart => {
      const heartId = heart.getAttribute('id');
      if (heartId === btnFavouriteCard.id) {
        heart.checked = false;
      }
    });
    arrFavorites.map((value, index) => {
      if (btnFavouriteCard.id === value.id) {
        arrFavorites.splice(index, 1);
      }
    });
    const favouriteArrLocalStorString = JSON.stringify(arrFavorites);
    localStorage.setItem('favourite', favouriteArrLocalStorString);
  } else {
    checkbox.forEach(heart => {
      const heartId = heart.getAttribute('id');
      if (heartId === btnFavouriteCard.id) {
        heart.checked = true;
      }
    });
    btnFavourite.textContent = 'Remove to favorite';
    if (arrFavorites.includes(btnFavouriteCard)) {
      return;
    }
    arrFavorites.push(btnFavouriteCard);
    const favouriteArrLocalStorString = JSON.stringify(arrFavorites);
    localStorage.setItem('favourite', favouriteArrLocalStorString);
  }
  checkArrFavoritesId();
}

/**SCROLL */
const scrollBtn = document.querySelector('.scroll-btn-show');

window.onload = () => {
  window.onscroll = function (e) {
    let winY = window.scrollY;
    if (winY > 300) {
      progressBar();

      scrollAnimation();

      winY = null;
    }
  };

  window.onscroll = () => {
    if (window.scrollY > 500) {
      scrollBtn.classList.remove('scroll-top-hide');
    } else if (window.scrollY < 500) {
      scrollBtn.classList.add('scroll-top-hide');
    }
  };

  scrollBtn.addEventListener('mousedown', onScrlBtnClick);
  function onScrlBtnClick(e) {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
};

// Pagination//

function itemsPerPage() {
  if (window.innerWidth <= 768) {
    pagination.setItemsPerPage(9);
    return 9;
  } else {
    pagination.setItemsPerPage(12);
    return 12;
  }
}
