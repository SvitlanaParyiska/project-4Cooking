import axios from 'axios';
import Notiflix from 'notiflix';
import { BASE_URL } from './tasty-api';

const categoryUrl = `${BASE_URL}/categories`;
const allCategories = document.querySelector('.all-categories-button');

let sort = '';

function fetchDataAndRender() {
    const recipesUrl = `${BASE_URL}/recipes`;
    axios
        .get(recipesUrl, {
            params: { category: sort, page: 1, limit: 0 },
        })
        .then(response => {
            if (response.data.totalPages === 0) {
                Notiflix.Report.warning(
                    'Sorry, there are no images matching your search query. Please try again'
                );
            } else {
                pictures = [response.data];
            }
            renderCardsList(response.data);
        })
        .catch(error => {
            console.log(error);
            Notiflix.Report.failure(
                'Error',
                'Failed to fetch data. Please try again later.',
                'OK'
            );
        });
}

axios.get(categoryUrl).then(response => {
    const recipes = document.querySelector('.sidebar');
    const recipesMarkup = response.data
        .map(category => `<button class="buttons-nav">${category.name}</button>`)
        .join('');
    recipes.innerHTML = recipesMarkup;

    recipes.addEventListener('click', e => {
        for (const item of response.data) {
            if (item.name === e.target.innerText) {
                sort = e.target.innerText;
                fetchDataAndRender();
            }
        }
    });
});

allCategories.addEventListener('click', () => {
    sort = '';
    fetchDataAndRender();
});

fetchDataAndRender();
