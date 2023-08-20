import debounce from "lodash.debounce";
import { TastyAPI } from './tasty-api';


const searchInput = document.querySelector('.search-query');
const filterTime = document.querySelector('.filters-times');
const filterArea = document.querySelector('.filters-areas');
const filterIngredients = document.querySelector('.filters-ingredients');
const iconSearch = document.querySelector('.icon-search');
const inputReset = document.querySelector('.icon-reset');
const filtersReset = document.querySelector('.reset-filters-btn');
const tastyApi = new TastyAPI();

function createOptions() {
    tastyApi.getAreas().then(data => {
        filterArea.insertAdjacentHTML('beforeend', createOptionMarkup(data));
    });
    tastyApi.getIngredients().then(data => {
        filterIngredients.insertAdjacentHTML('beforeend', createOptionMarkup(data))
    });
}

createOptions();

function createOptionMarkup(arr) {
    const markup = arr.map(({ name, _id }) => `<option value="${_id}">${name}</option>`);
    return markup.join('');
}

function resetFilters() {
    inputReset.style.display = 'none';
    searchInput.value = '';
    filterTime.value = '';
    filterArea.value = '';
    filterIngredients.value = '';
}

filtersReset.addEventListener('click', resetFilters);

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
    inputReset.style.display = 'none'; 
});
