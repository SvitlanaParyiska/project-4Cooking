// import { functions } from 'lodash';
import { openCloseModal } from './create-modal';
import { TastyAPI } from './tasty-api';
import svg from '../images/sprite.svg';
import alternativepic from '../images/alternativepic.jpg';
const refs = {
  closeBtnModal: document.querySelector('.js-modal-close'),
  addToFavoriteBtn: document.querySelector('.favorite-btn'),
  ratingBtn: document.querySelector('.rating-btn'),
  markupRecipe: document.querySelector('.recipe-markup'),
  videoRecipe: document.querySelector('.recipe-video'),
};
const tastyApi = new TastyAPI();

// export async function markupRecipe(idRecipe) {
// const data = await
tastyApi.getRecipeById('6462a8f74c3d0ddd288980d4').then(data => {
  refs.markupRecipe.innerHTML = createMarkupRecipe(data);
});
// }

function createMarkupRecipe(recipe) {
  const { title, instructions, time, youtube, tags, ingredients, rating } =
    recipe;
  // const videoPhotoRecipe = `
  // src="https://img.youtube.com/vi/${youtube}/sddefault.jpg"`;
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
              <svg class="dishes-list-star-icon is-active-star">
                <use href="${svg}#icon-star">
                </use>
              </svg>
          </div>
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
    <button type="button" class="favorite-btn btn"data-modal-recipe-open>Add to favorite</button>
    <button type="button" class="rating-btn btn" data-modal-recipe-open>Give a rating</button>
   </div>
    `;
}
//  <img src="${alternativepic}" alt="" class="recipe-alternative-img"/>
//  <a href="https://img.${youtube}/sddefault.jpg"></a>
