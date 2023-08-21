import svg from '../images/sprite.svg';

function createPlugFavoriteMarkup() {
  return `
  <span>
  <svg class='favorites-icon' width='97' height='83'>
    <use href='${svg}#icon-favorites'></use>
  </svg>
</span>
<p class='plug-text-favorite'>It appears that you haven't added any recipes to your favorites yet. To get started, you can add recipes that you like to your favorites for easier access in the future.</p>`;
}

function createPlugMarkup() {
  return `
  <span>
  <svg class='favorites-icon' width='97' height='83'>
    <use href='${svg}#icon-favorites'></use>
  </svg>
</span>
<p>Not found</p>`;
}

export { createPlugFavoriteMarkup, createPlugMarkup };
