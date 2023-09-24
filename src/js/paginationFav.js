import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { save, load, remove } from './localStorageJSON';
import { checkArrFavoritesId } from './favorites';

const container = document.getElementById('tui-pagination-container');
const KEY_FAVOURITE = 'favourite';

let storedData = load(KEY_FAVOURITE);
let length = 0;
if (storedData) {
  length = storedData.length;
}

const optionsFav = {
  totalItems: length,
  itemsPerPage: window.innerWidth < 768 ? 9 : 12,
  visiblePages: window.innerWidth < 768 ? 2 : 3,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
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

export const pagination = new Pagination(container, optionsFav);

pagination.on('afterMove', getAll);

function getAll(event) {
  const currentPage = event.page;
  checkArrFavoritesId(currentPage, true);
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}
