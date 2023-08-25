import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { TastyAPI } from './tasty-api';
import { onRenderMarkup, clearRecipeCardsContent } from './dishes_list';
import { resizePage } from './dishes_list';

function resizeVisPage() {
  const screenWidth = window.innerWidth;

  if (screenWidth < 768) {
    return 2;
  }

  if (screenWidth >= 768) {
    return 3;
  }
}

function resizePageItemPagination() {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 1280) {
    return 9;
  }

  if (screenWidth >= 768 && screenWidth < 1280) {
    return 8;
  }

  if (screenWidth < 768) {
    return 6;
  }
}

export const tastyApi = new TastyAPI();

const container = document.getElementById('tui-pagination-container');
const listEl = document.querySelector('.dishes-list-wrap');

const options = {
  totalItems: 0,
  itemsPerPage: resizePageItemPagination(),
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

export const pagination = new Pagination(container, options);

const page = pagination.getCurrentPage();

pagination.on('afterMove', getAll);

function getAll(event) {
  const currentPage = event.page;
  tastyApi.page = currentPage;
  resizePage();

  tastyApi.getRecipeByFilter().then(data => {
    clearRecipeCardsContent();
    onRenderMarkup(data);
  });
}
