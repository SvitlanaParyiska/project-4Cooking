import { TastyAPI } from './tasty-api';

const buttEl = document.querySelector('.test-api');
const boxEl = document.querySelector('.box');
buttEl.addEventListener('click', markup);

const arrBack = new TastyAPI();

function markup() {
  arrBack.getPopularRecipes().then(data => {
    const mark = createCatInfo(data);
    boxEl.innerHTML = mark;
    console.log(mark);
  });
}

function createCatInfo(arr) {
  console.log(arr);
  return arr
    .map(
      ({
        title,
        description,
        preview,
      }) => `<img src=${preview} alt=${title} width=500>
<div class="text-box"><h2>${title}</h2>
<p>${description}</p>
</div>`
    )
    .join('');
}
