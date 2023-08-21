import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import svg from '../images/sprite.svg';
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

export async function searchOnCategory(searchQuery, page) {
  const apiUrl = `${BASE_URL}?category=${searchQuery}&page=${page}&${resizePage()}`;

  const response = await axios.get(apiUrl);
  return response.data;
}

// export async function getAllRecipesTest(
//   //   shownCategory,
//   shownPage,
//   shownPerPage
//   //   shownTime,
//   //   shownArea,
//   //   shownIngredient
// ) {
//   const options = {
//     headers: {
//       'Content-Type': 'application/json; charset=UTF-8',
//     },
//     params: {
//       //   category: `${shownCategory}`,
//       page: `${shownPage}`,
//       limit: `${shownPerPage}`,
//       //   time: `${shownTime}`,
//       //   area: `${shownArea}`,
//       //   ingredients: `${shownIngredient}`,
//     },
//   };
//   const response = await axios.get(BASE_URL, options);
//   return response.data;
// }
// =========================== апішка==========
const elements = {
  dishesList: document.querySelector('.dishes-list-wrap'),
  renderMarkup: document.querySelector('.render-markup'),
  seeRecipeBtn: document.querySelector('.see-recipe-btn'),
  heartIcon: document.querySelector('.js-favourite'),
};

// elements.renderMarkup.addEventListener('click', renderOnClickCategory);
// elements.heartIcon.addEventListener('click', addToFavourite);
// elements.heartIcon.addEventListener('click', () => {
//   console.log('Button was clicked');
// });

async function renderOnClickCategory(category, page) {
  try {
    const response = await searchOnCategory(category, page);
    console.log(response);
    onRenderMarkup(response);
  } catch (error) {
    Notify.failure(error.message);
  }
}

function onRenderMarkup(searchValue) {
  const markup = searchValue.results
    .map(({ _id, title, category, description, preview, rating }) => {
      return `<li class="dishes-list-item" data-category="${category}" style="background: linear-gradient(1deg, rgba(5, 5, 5, 0.60) 0%, rgba(5, 5, 5, 0.00) 100%), url(${preview}); background-position: center;
                      background-size: cover;">
        <button type="button" aria-label="Favorite Button" class="heart-btn js-favourite">
        <svg class="dishes-list-heart-icon">
        <use href="${svg}#icon-heart">
        </use>
    </svg>
</button>
            
            <div class="dishes-list-item-wrapper">
                <h3 class="dishes-list-item-title">${title}</h3>
                <p class="dishes-list-item-text">${description}</p>
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
                    <button type="button" data-id="${_id}" class="see-recipe-btn">See recipe</button>
                </div>
            </div>
        </li>`;
    })
    .join('');

  elements.dishesList.insertAdjacentHTML('beforeend', markup);
}

export function clearRecipeCardsContent() {
  elements.dishesList.innerHTML = '';
}

function resizePage() {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 1280) {
    return 'per_page=9&limit=9';
  }

  if (screenWidth >= 768 && screenWidth < 1280) {
    return 'per_page=8&limit=8';
  }

  if (screenWidth < 768) {
    return 'per_page=6&limit=6';
  }
}

function addToFavourite() {}
export { onRenderMarkup, renderOnClickCategory };

// ==============серця======
import { save, load, remove } from './localStorageJSON';

export function heartsFillStorage() {
  const cardFavouritesBtns = document.querySelectorAll('.card_favourites_btn');

  let storedData = load('cardData');
  if (storedData) {
    const identArray = storedData.map(item => item.ident);

    cardFavouritesBtns.forEach(button => {
      const cardId = button.parentNode.querySelector('.card_btn').id;
      const hertWaihte = button.parentNode.querySelector('.card_heart');

      if (identArray.includes(cardId)) {
        button.classList.add('heart-filled');
        hertWaihte.classList.add('heart-filled');
      } else {
        button.classList.remove('heart-filled');
        hertWaihte.classList.remove('heart-filled');
      }
    });
  } else {
    cardFavouritesBtns.forEach(button => {
      const hertWaihte = button.parentNode.querySelector('.card_heart');
      button.classList.remove('heart-filled');
      hertWaihte.classList.remove('heart-filled');
    });
  }
}
