import axios from 'axios';
import svg from '../images/sprite.svg';

export class RatingAPI {
  #BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

  async fetchRating() {
    const response = await axios.get(`${this.#BASE_URL}/recipes`, {
      params: {
        limit: 3,
      },
    });
    return response;
  }
}

const ratingTumb = document.querySelector('.rating-container');

const ratingApiInstance = new RatingAPI();

const renderStarsInContainer = async () => {
  try {
    const response = await ratingApiInstance.fetchRating();
    const rating = response.data.results;

    ratingTumb.innerHTML = createMarkupRating(rating);
  } catch (error) {
    console.log(error);
  }
};

ratingTumb.insertAdjacentHTML('beforeend', renderStarsInContainer());

const createRatingStars = rating => {
  const roundRating = Math.round(rating);
  const activeStarMarkup = `<svg class="star-active"><use href="${svg}}#icon-star"></use></svg>`;
  const inactiveStarMarkup = `<svg class="star-notActive"><use href="${svg}}#icon-star"></use></svg>`;
  let starsArray = [];
  for (let i = 1; i <= 5; i += 1) {
    starsArray.push(i > roundRating ? inactiveStarMarkup : activeStarMarkup);
  }
  return starsArray.join('');
};

export function createMarkupRating(arr) {
  return arr
    .map(
      ({ rating }) => `                         
                        <div class='rating'>
              <div class="rating__body">
                <div class="rating__active">
                <div class='favorites__cards-rating'>${rating}</div>
                ${createRatingStars(rating)}
                </div>
                <div class="rating__items">
                  <input type="radio" class="rating__item" value="1" name="rating">
                  <input type="radio" class="rating__item" value="2" name="rating">
                  <input type="radio" class="rating__item" value="3" name="rating">
                  <input type="radio" class="rating__item" value="4" name="rating">
                  <input type="radio" class="rating__item" value="5" name="rating">
                </div>
              </div>
  
    </div>`
    )
    .join('');
}
