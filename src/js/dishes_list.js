// import axios from 'axios';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import svg from '../images/sprite.svg';
import { save, load, remove } from './localStorageJSON';
// import { ModalRecipe } from './create-modal';

// const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

// export async function searchOnCategory(searchQuery, page) {
//   const apiUrl = `${BASE_URL}?category=${searchQuery}&page=${page}&${resizePage()}`;

//   const response = await axios.get(apiUrl);
//   return response.data;
// }

// =========================== апішка==========
const elements = {
  dishesList: document.querySelector('.dishes-list-wrap'),
};
const KEY_FAVOURITE = 'favourite';
let favouriteArrLocalStor =
  JSON.parse(localStorage.getItem(KEY_FAVOURITE)) ?? [];
console.log(favouriteArrLocalStor);

// обов'язкове
export function onRenderMarkup(searchValue) {
  createMarkup(searchValue);
  addToFavorites();
  // localStorageHeart();
  //   додавання по рисічу в обране та модалка
  // elements.dishesList.addEventListener('click', onListClick);
}

// Ф-ція для відмальовки сердець при оновленні сторінки
// function localStorageHeart() {
//   if (favouriteArrLocalStor) {
//     const heartsBtns = document.querySelectorAll('.js-favourite');
//     heartsBtns.forEach(heartBtn => {
//       const heartId = heartBtn.dataset.id;
//       if (favouriteArrLocalStor.includes(heartId)) {
//         heartBtn.classList.add('is-active-heart');
//       }
//     });
//   }
// }

// функція для опрацювання кліку по рецептам яка відслідковує клік на серце або кнопку і відкриває модалку або додає клас на серце та айдішку на локал сторидж
// export function onListClick(event) {
//   event.preventDefault();
//   if (event.target.classList.contains('js-see-recipe')) {
//     const { id } = event.target.closest('.dishes-list-item').dataset;
//     ModalRecipe(id);
//   }
//   console.log('hello');
//   if (
//     // event.target.classList.contains('dishes-list-heart-icon') ||
//     event.target.classList.contains('js-favourite')
//   ) {
//     const { id } = event.target.closest('.dishes-list-item').dataset;
//     const heart = event.target.closest('.dishes-list-heart-icon');
//     const heartBtn = event.target.closest('.js-favourite');
//     console.log(heart, 'клік на свг');
//     console.log(heartBtn, 'клік на кнопку');

//     // Перевірка на наявність і додавання(видалення) активного класу і додавання(видалення) Id в LocalStorage
//     if (
//       heartBtn.classList.contains('is-not-active-heart') ||
//       heartBtn.classList.contains('is-active-heart')
//     ) {
//       //   heart.classList.remove('is-active-heart');
//       //   heart.addEventListener('click', () => {
//       //     heart.classList.togle('is-active-heart');
//       //   });
//       heartBtn.classList.remove('is-active-heart');
//       // heartBtn.classList.add('is-not-active-heart');
//       console.log('hello');
//       favouriteArrLocalStor.map((idIcon, index) => {
//         if (idIcon === id) {
//           favouriteArrLocalStor.splice(index, 1);
//         }
//       });
//       save(KEY_FAVOURITE, favouriteArrLocalStor);
//     } else {
//       heartBtn.classList.add('is-active-heart');
//       // heartBtn.classList.remove('is-not-active-heart');
//       //   heart.classList.add('is-active-heart');
//       if (favouriteArrLocalStor.includes(id)) {
//         return;
//       }
//       favouriteArrLocalStor.push(id);
//       save(KEY_FAVOURITE, favouriteArrLocalStor);
//     }
//   }
// }

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
                    <button type="button" data-id="${_id}" data-modal-recipe-open class="see-recipe-btn js-see-recipe">See recipe</button>
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

// це не моє но комусь потрібне
export function localStorageFavourite() {
  if (favouriteArrLocalStor) {
    const btnFavourite = document.querySelector('.favorite-btn');
    const btnFavouriteID = btnFavourite.dataset.id;
    console.log(btnFavouriteID);
    if (favouriteArrLocalStor.includes(btnFavouriteID)) {
      btnFavourite.textContent = 'Remove to favorite';
    }
  }
}

export function onBtnFavouriteClick() {
  const btnFavourite = document.querySelector('.favorite-btn');
  const btnFavouriteID = btnFavourite.dataset.id;
  if (btnFavourite.textContent === 'Remove to favorite') {
    btnFavourite.textContent = 'Add to favorite';
    favouriteArrLocalStor.map((value, index) => {
      if (btnFavouriteID === value) {
        favouriteArrLocalStor.splice(index, 1);
      }
    });
    save(KEY_FAVOURITE, favouriteArrLocalStor);
  } else {
    btnFavourite.textContent = 'Remove to favorite';
    if (favouriteArrLocalStor.includes(btnFavouriteID)) {
      return;
    }
    favouriteArrLocalStor.push(btnFavouriteID);
    save(KEY_FAVOURITE, favouriteArrLocalStor);
  }
  location.reload();
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
      index = favouriteArrLocalStor.findIndex(
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
