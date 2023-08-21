import axios from 'axios';
import { renderOnClickCategory, clearRecipeCardsContent } from './dishes_list';
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

const categoryUrl = `${BASE_URL}/categories`;

let sort = '';
let loadPage = 1;
let pictures = [];

async function fetchCategories() {
try{
    const categories = await axios.get(categoryUrl);
    
    return categories.data;

}catch(error){
    console.log(error);
};
};

function renderCategoriesMarkup(categories) {
const categoriesContainer = document.querySelector('.categories-container');
const categoryList = categoriesContainer.querySelector('.category-list');

const allCategoryButton = document.querySelector('#all-category-btn');
allCategoryButton.addEventListener('click', () => {
    const categoryButtons = categoryList.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => button.classList.remove('active'));
    allCategoryButton.classList.add('active');
    sort = '';
    loadPage = 1;
    pictures = [];

    clearRecipeCardsContent();
    renderOnClickCategory(sort, loadPage);
});

    categoryList.innerHTML = '';
    renderOnClickCategory(sort, loadPage);

categories.forEach(category => {
    const categoryButton = document.createElement('button');
    categoryButton.classList.add('category-btn');
    categoryButton.textContent = category.name;

    categoryButton.addEventListener('click', () => {
    const categoryButtons = categoryList.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => button.classList.remove('active'));
    categoryButton.classList.add('active');
    sort = category.name;
    loadPage = 1;
    pictures = [];
    clearRecipeCardsContent(); 
    renderOnClickCategory(sort, loadPage);
    });

    const catItem = document.createElement('li');
    catItem.classList.add('cat-items');
    catItem.appendChild(categoryButton);
    categoryList.appendChild(catItem);
});
}

axios.get(categoryUrl)
.then(response => {
    const categories = response.data;
    renderCategoriesMarkup(categories);
})
.catch(error => {
    console.log(error);
});


const refs = {
categoryList: document.querySelector('.category-list'),
categoryContainer: document.querySelector('.category-container'),
allCategoryButton: document.querySelector('.all-category-button'),
};

refs.categoryContainer.addEventListener('click', onBtnCLick);

let lastClickedBtn = null;


function onBtnCLick(event) {
const Btn = event.target;

if (Btn.nodeName !== 'BUTTON') {
    return;
}

if (lastClickedBtn) {
    lastClickedBtn.classList.remove('active');
}

if (Btn === refs.allCategoryButton) {
    removeActiveClassFromAllButtons();
} else {
    refs.allCategoryButton.classList.remove('active');
}

Btn.classList.add('active');
lastClickedBtn = Btn;
};


function removeActiveClassFromAllButtons() {
const buttons = refs.categoryList.querySelectorAll('button');

buttons.forEach(button => {
    button.classList.remove('active');
});
};


refs.categoryList.addEventListener('click', event => {
if (!event.target.classList.contains('category-btn')) {
    event.stopPropagation();
}
});

