getArrFavorites();

function getArrFavorites() {
  const arrFavorites = JSON.parse(localStorage(KEY_FAVORITE));
  return arrFavorites;
}

function MarkUp() {
  const createArr = getArrFavorites();
  //createArr.map(return ``);
}

function findProduct(recipeId) {}
