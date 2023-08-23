import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { TastyAPI } from './tasty-api';
import { createMarkup } from './dishes_list';
import svg from '../images/sprite.svg';

function resizeVisPage() {
  const screenWidth = window.innerWidth;

  if (screenWidth < 768) {
    return 2;
  }

  if (screenWidth >= 768) {
    return 3;
  }
}

const API = new TastyAPI();

const container = document.getElementById('tui-pagination-container');
const listEl = document.querySelector('.dishes-list-wrap');

const options = {
  totalItems: 0,
  itemsPerPage: 9,
  visiblePages: resizeVisPage(),
  page: 1,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

// =========================================
function AcreateMarkup(searchValue) {
  return searchValue
    .map(({ _id, title, category, description, preview, rating }) => {
      const activeStarMarkup = `<svg class="is-active-star">
      <use href="${svg}}#icon-star"></use>
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
      return `<li class="dishes-list-item" data-id="${_id}" data-category="${category}" style="background: linear-gradient(1deg, rgba(5, 5, 5, 0.60) 0%, rgba(5, 5, 5, 0.00) 100%), url(${preview}); background-position: center;
                      background-size: cover;">
        <button type="button" class="heart-btn js-favourite" data-id="${_id}" data-heart="heart">
        <svg  class="dishes-list-heart-icon" data-id="${_id}">
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
                            // ${generateStars(rating)}
                        </div>
                    </div>
                    <button type="button" data-id="${_id}" data-modal-recipe-open class="see-recipe-btn js-see-recipe">See recipe</button>
                </div>
            </div>
        </li>`;
    })
    .join('');
}
// ===========================================================================

const pagination = new Pagination(container, options);

const page = pagination.getCurrentPage();

console.log(API.getAllRecipes(page).then(data => console.log(data)));
API.getAllRecipes(page).then(({ perPage, totalPages, results }) => {
  pagination.reset(Number(perPage) * Number(totalPages));
  console.log(results);
  const markup = AcreateMarkup(results);
  listEl.innerHTML = markup;
});

pagination.on('afterMove', getPopular);

function getPopular(event) {
  const currentPage = event.page;
  API.getAllRecipes(currentPage).then(({ perPage, totalPages, results }) => {
    const markup = AcreateMarkup(results);
    listEl.innerHTML = markup;
  });
}
