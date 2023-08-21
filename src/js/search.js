import { TastyAPI } from './tasty-api';
import { onRenderMarkup, clearRecipeCardsContent } from './dishes_list';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const filtersContainer = document.querySelector('.filters-container');
const searchInput = document.querySelector('.search-query');
const filterTime = document.querySelector('.filters-times');
const filterArea = document.querySelector('.filters-areas');
const filterIngredients = document.querySelector('.filters-ingredients');
const iconSearch = document.querySelector('.icon-search');
const inputReset = document.querySelector('.icon-reset');
const filtersReset = document.querySelector('.reset-filters-btn');
const loaderEl = document.querySelector('.loader');
const tastyApi = new TastyAPI();

function createOptions() {
    tastyApi.getAreas().then(data => {
        filterArea.insertAdjacentHTML('beforeend', createAreas(data));
    });
    tastyApi.getIngredients().then(data => {
        filterIngredients.insertAdjacentHTML('beforeend', createIngredients(data));
    });
}

createOptions();

function createAreas(arr) {
    return arr.map(({ name }) => `<option value="${name}">${name}</option>`).join('');
}

function createIngredients(arr) {
    return arr.map(({ name, _id }) => `<option value="${_id}">${name}</option>`).join('');
}

function resetFilters() {
    inputReset.style.display = 'none';
    searchInput.value = '';
    filterTime.value = '';
    filterArea.value = '';
    filterIngredients.value = '';
    tastyApi.title = '';
    tastyApi.time = '';
    tastyApi.area = '';
    tastyApi.ingredient = '';
    getFiltersData();
}

function getFiltersSelect(evt) {
    if (evt.target.name === 'searchQuery') {
        tastyApi.title = evt.target.value.trim();
        getFiltersData();
    };
    if (evt.target.name === 'times') {
        tastyApi.time = `${evt.target.value}`;
        getFiltersData();
    };
    if (evt.target.name === 'areas') {
        tastyApi.area = evt.target.value;
        getFiltersData();
    };
    if (evt.target.name === 'ingredients') {
        tastyApi.ingredient = evt.target.value;
        getFiltersData();
    };
}

function getFiltersData() {
    clearRecipeCardsContent();
    loaderEl.classList.remove('visually-hidden');
    tastyApi.getRecipeByFilter().then(data => {
        if (data.results.length === 0) {
            Notiflix.Notify.failure('Sorry, but nothing was found for your search')
        }
        onRenderMarkup(data);
        loaderEl.classList.add('visually-hidden');
    });
}

filtersReset.addEventListener('click', resetFilters);
filtersContainer.addEventListener('input', debounce(getFiltersSelect, 300));

searchInput.addEventListener('focus', () => {
    iconSearch.classList.add('active');
});
searchInput.addEventListener('blur', () => {
    iconSearch.classList.remove('active');
});
    
searchInput.addEventListener('input', () => {
    if (searchInput.value.trim() !== '') {
        inputReset.style.display = 'inline-block'; 
    } else {
        inputReset.style.display = 'none'; 
    }
});

inputReset.addEventListener('click', () => {
    searchInput.value = ''; 
    tastyApi.title = '';
    getFiltersData();
    inputReset.style.display = 'none'; 
});
