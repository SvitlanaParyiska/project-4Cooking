import svg from '../images/sprite.svg';

function createPlugFavoriteMarkup() {
  return `
  <span class='not-found'>
  <svg class='favorites-icon' width='68' height='58'>
    <use href='${svg}#icon-favorites'></use>
  </svg>
  <p class='plug-text-favorite'>It appears that you haven't added any recipes to your favorites yet. To get started, you can add recipes that you like to your favorites for easier access in the future.</p>
  </span>`;
}

function createPlugMarkup() {
  return `
  <span class='not-found'>
  <svg class='favorites-icon' width='68' height='58'>
    <use href='${svg}#icon-favorites'></use>
  </svg>
  <p>Not found</p>
  </span>`;
}

export { createPlugFavoriteMarkup, createPlugMarkup };
