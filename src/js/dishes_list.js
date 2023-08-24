import svg from '../images/sprite.svg';
import { openCloseModal } from './create-modal';
import { markupRecipe } from './recipe';

const elements = {
  dishesList: document.querySelector('.dishes-list-wrap'),
};
const KEY_FAVOURITE = 'favourite';
let favouriteArrLocalStor =
  JSON.parse(localStorage.getItem(KEY_FAVOURITE)) ?? [];

// обов'язкове
export function onRenderMarkup(searchValue) {
  createMarkup(searchValue);
  addToFavorites();
  openCloseModal();
  const btnsSeeRecipeArray = document.querySelectorAll('.see-recipe-btn');
  btnsSeeRecipeArray.forEach(btnSeeRecipe => {
    btnSeeRecipe.addEventListener('click', onListClick);
  });
}
function onListClick(event) {
  const btnSeeRecipeID = event.target.dataset.id;
  markupRecipe(btnSeeRecipeID);
}

// то також потрібне
function createMarkup(searchValue) {
  const markup = searchValue.results
    .map(({ _id, title, category, description, preview, rating }) => {
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
            
            <div class="dishes-list-item-wrapper">
                <h3 class="dishes-list-item-title">${title}</h3>
                <p class="dishes-list-item-text">${description}</p>
                <div class="dishes-list-item-wrapper-rating">
                    <div class="dishes-list-item-wrapper-rating-star">
                        <p class="dishes-list-item-wrapper-rating-text">${rating.toFixed(
                          1
                        )}</p>
                        <div class="dishes-list-item-wrapper-rating-star-5">
                            ${generateStars(rating)}
                        </div>
                    </div>
                    <button type="button" data-id="${_id}" data-open="recipe" class="see-recipe-btn js-see-recipe">See recipe</button>
                </div>
            </div>
        </li>`;
    })
    .join('');

  elements.dishesList.insertAdjacentHTML('beforeend', markup);
}
// то нам нада
export function clearRecipeCardsContent() {
  elements.dishesList.innerHTML = '';
}
// функція для обчислення кількості рецептів в залежності від розміру поточного екрану
export function resizePage() {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 1280) {
    tastyApi.limit = 9;
    //  return 'per_page=9&limit=9';
  }

  if (screenWidth >= 768 && screenWidth < 1280) {
    // return 'per_page=8&limit=8';
    tastyApi.limit = 8;
  }

  if (screenWidth < 768) {
    tastyApi.limit = 6;
    // return 'per_page=6&limit=6';
  }
}

//Функція для кнопки "Add to favorite" і "Remove to favorite"
export function localStorageFavourite() {
  const storedData = localStorage.getItem('favourite');
  if (storedData) {
    favouriteArrLocalStor = JSON.parse(storedData);
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
    favouriteArrLocalStor.map((value, index) => {
      if (btnFavouriteCard.id === value.id) {
        favouriteArrLocalStor.splice(index, 1);
      }
    });
    const favouriteArrLocalStorString = JSON.stringify(favouriteArrLocalStor);
    localStorage.setItem('favourite', favouriteArrLocalStorString);
  } else {
    checkbox.forEach(heart => {
      const heartId = heart.getAttribute('id');
      if (heartId === btnFavouriteCard.id) {
        heart.checked = true;
      }
    });
    btnFavourite.textContent = 'Remove to favorite';
    if (favouriteArrLocalStor.includes(btnFavouriteCard)) {
      return;
    }
    favouriteArrLocalStor.push(btnFavouriteCard);
    const favouriteArrLocalStorString = JSON.stringify(favouriteArrLocalStor);
    localStorage.setItem('favourite', favouriteArrLocalStorString);
  }
}

// =======================
export function addToFavorites() {
  const allHeartCheckBox = document.querySelectorAll('.heart-checkbox');

  allHeartCheckBox.forEach(checkbox => {
    checkbox.addEventListener('change', onCheckboxChange);
  });

  // let favouriteArrLocalStor = []; // from local storage
  checkAndReadStorage();
  function onCheckboxChange(evt) {
    const checkbox = evt.target;
    const checkboxId = checkbox.id;
    const checkboxCategory = checkbox.dataset.category;

    if (checkbox.checked) {
      favouriteArrLocalStor.push({
        id: checkboxId,
        category: checkboxCategory,
      });
    } else {
      const index = favouriteArrLocalStor.findIndex(
        cardHeart => cardHeart.id == checkboxId
      );
      favouriteArrLocalStor.splice(index, 1);
    }
    const heartCheckBoxElLocalStorage = JSON.stringify(favouriteArrLocalStor);
    localStorage.setItem('favourite', heartCheckBoxElLocalStorage);
  }
  function checkAndReadStorage() {
    const storedData = localStorage.getItem('favourite');
    if (storedData) {
      favouriteArrLocalStor = JSON.parse(storedData);
      allHeartCheckBox.forEach(checkbox => {
        const checkboxId = checkbox.id;

        favouriteArrLocalStor.forEach(favoriteId => {
          if (checkboxId === favoriteId.id) {
            checkbox.checked = true;
          }
        });
      });
    }
  }
}
