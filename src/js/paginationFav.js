import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

function resizeVisPageFav() {
  const screenWidth = window.innerWidth;

  if (screenWidth < 768) {
    return 3;
  }

  if (screenWidth >= 768) {
    return 4;
  }
}

function resizePageItemPaginationFav() {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 1280) {
    return 12;
  }

  if (screenWidth >= 768 && screenWidth < 1280) {
    return 12;
  }

  if (screenWidth < 768) {
    return 9;
  }
}

const container = document.getElementById('tui-pagination-container');
const listEl = document.querySelector('.favorites - recipes - list');

const optionsFav = {
  totalItems: 0,
  itemsPerPage: resizePageItemPaginationFav(),
  visiblePages: resizeVisPageFav(),
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

export const paginationFav = new Pagination(container, options);

const pageFav = paginationFav.getCurrentPage();

paginationFav.on('afterMove', getAll);

function getAll(event) {
  const currentPage = event.page;
  // tastyApi.page = currentPage;
  //resizePage();

  //tastyApi.getRecipeByFilter().then(data => {
  //clearRecipeCardsContent();
  // onRenderMarkup(data);
  // });
}
