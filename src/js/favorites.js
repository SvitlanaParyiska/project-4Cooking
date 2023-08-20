const refs = {
  favoritesCategoriesList: document.querySelector('.favorites-categories'),
  favoritesRecipesList: document.querySelector('.favorites-list'),
  //warning: document.querySelector('.empty-storage'),
  //paginationBox: document.getElementById('pagination'),
  //allBtn: document.querySelector('.all-btn'),
};

function getArrFavorites() {
  const arrFavorites = JSON.parse(localStorage(KEY_FAVORITE));
  return arrFavorites;
}

function MarkUp() {
  const createArr = getArrFavorites();
  createArr.map(
    () => `<li class="dishes-list-item" data-category="${category}" style="background: linear-gradient(1deg, rgba(5, 5, 5, 0.60) 0%, rgba(5, 5, 5, 0.00) 100%), url(${preview}); background-position: center; 
                      background-size: cover;"> 
        <button type="button" aria-label="Favorite Button" class="heart-btn"> 
        <svg class=" dishes-list-heart-icon is-active-heart"> 
            <use href="./images/sprite.svg#icon-heart"> 
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
                    <button type="button" data-id=${_id} class="see-recipe-btn">See recipe</button> 
                </div> 
            </div> 
        </li>`
  );
}

function findProduct(recipeId) {}
