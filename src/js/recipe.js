import { TastyAPI } from './tasty-api';
import svg from '../images/sprite.svg';
import { localStorageFavourite, onBtnFavouriteClick } from './dishes_list';
// import { alternativeImg } from '../images/alternativepic.jpg';
const refs = {
  markupRecipe: document.querySelector('.recipe-markup'),
  videoRecipe: document.querySelector('.recipe-video'),
};
const tastyApi = new TastyAPI();

export async function markupRecipe(idRecipe) {
  await tastyApi
    .getRecipeById(idRecipe)
    .then(recipe => {
      refs.markupRecipe.innerHTML = createMarkupRecipe(recipe);
      const btnFavourite = document.querySelector('.favorite-btn');
      localStorageFavourite();
      btnFavourite.addEventListener('click', onBtnFavouriteClick);
    })
    .catch(() => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}

function createMarkupRecipe(recipe) {
  const {
    _id,
    title,
    category,
    instructions,
    time,
    youtube,
    tags,
    ingredients,
    rating,
  } = recipe;
  const activeStarMarkup = `<svg class="star-active">
      <use href="${svg}#icon-star"></use>
    </svg>`;
  const inactiveStarMarkup = `<svg class="star-notActive">
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

  const ingredientList = ingredients
    .map(
      ({ name, measure }) =>
        `
    <li class="ingredients-item">
      <span class="ingredients-item-name">${name}</span>
      <span class="ingredients-item-measure">${measure}</span>
    </li>
    `
    )
    .join(' ');

  const tagsList = tags
    .map(tag => {
      return `
    <li class="tags-item">#${tag}</li>
    `;
    })
    .join(' ');

  return `
 <div class="recipe-main-info">
    <iframe
    class="recipe-video"
    src="${youtube.replace('watch?v=', 'embed/')}" 
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay;
    clipboard-write;
    encrypted-media;
    gyroscope;
    picture-in-picture;
     web-share" allowfullscreen>
     </iframe> 

     <h2 class="recipe-title">${title}</h2>
 </div>

<div class="recipe-details-info">
    <div class="recipe-rating-time">
      <div  class="rating">${rating}
     <div class="test-tumb">${generateStars(rating)}</div>
          </div>
      <p class="time-cooking">${time}min</p>
    </div>

    <div class="recipe-ingredients-tags">
        <ul class="recipe-ingredients">${ingredientList}</ul>
        <ul class="recipe-tags">${tagsList}</ul>
    </div>
  </div>

  <p class="recipe-text">${instructions}</p>
  
   <div class="modal-btn">
    <button type="button" class="favorite-btn btn" data-id="${_id}" data-category="${category}">Add to favorite</button>
    <button type="button" class="rating-btn btn" data-open="rating">Give a rating</button>
   </div>
    `;
}
