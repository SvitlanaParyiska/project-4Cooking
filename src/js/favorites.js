import svg from '../../images/sprite.svg';

const refs = {
  favoritesCategoriesList: document.querySelector('.favorites-categories'),
  favoritesRecipesList: document.querySelector('.favorites-list'),
  //warning: document.querySelector('.empty-storage'),
  //paginationBox: document.getElementById('pagination'),
  //allBtn: document.querySelector('.all-btn'),
};

function getArrFavorites() {
  const arrFavorites = JSON.parse(localStorage(KEY_FAVORITE));
  if (!arrFavorites || arrFavorites.length === 0) {
  }
  return arrFavorites;
}

function MarkUp() {
  const createArr = getArrFavorites();

  const markUpFavor = createArr.map(
    (
      preview,
      category,
      title,
      description,
      rating
    ) => `<li class="dishes-list-item"> 
            <svg class="dishes-list-heart-icon is-active-heart" width='22' height='22'> 
                <use href="${svg}#icon-heart"> 
                </use> 
            </svg> 
            <img class="dishes-list-image" src="${preview}" alt="${category}" loading="lazy"> 
            <div class="dishes-list-item-wrapper"> 
                <h3 class="dishes-list-item-title">${title}</h3> 
                <p class="dishes-list-item-text">${description}</p> 
                <div class="dishes-list-item-wrapper-rating"> 
                    <div class="dishes-list-item-wrapper-rating-star"> 
                        <p class="dishes-list-item-wrapper-rating-text">${rating}</p> 
                        <div class="dishes-list-item-wrapper-rating-star-5"> 
                            <svg class="dishes-list-star-icon is-active-star"> 
                                <use href="./images/sprite.svg#icon-star"> 
                                </use> 
                            </svg> 
                            <svg class="dishes-list-star-icon is-active-star"> 
                                <use href="./images/sprite.svg#icon-star"> 
                                </use> 
                            </svg> 
                            <svg class="dishes-list-star-icon is-active-star"> 
                                <use href="./images/sprite.svg#icon-star"> 
                                </use> 
                            </svg> 
                            <svg class="dishes-list-star-icon is-active-star"> 
                                <use href="./images/sprite.svg#icon-star"> 
                                </use> 
                            </svg> 
                            <svg class="dishes-list-star-icon"> 
                                <use href="./images/sprite.svg#icon-star"> 
                                </use> 
                            </svg> 
                        </div> 
                    </div> 
                    <button type="button" class="see-recipe-btn">See recipe</button> 
                </div> 
            </div> 
        </li>`
  );
  refs.favoritesRecipesList.innerHTML = markUpFavor.join('');
}
