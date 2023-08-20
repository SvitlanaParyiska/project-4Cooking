import axios from 'axios';
import { BASE_URL } from './tasty-api';

const categoryUrl =`${BASE_URL}/categories`;

export async function fetchCategories() {
try{
    const categories = await axios.get(categoryUrl);
    
    return categories.data;

}catch(error){
    console.log(error);
};
};

async function fetchDataAndRender(category = '') {
    try {
        const recipesUrl = `${BASE_URL}/recipes`;
        const response = await axios.get(recipesUrl, {
            params: { category, page: 1, limit: 0 },
        });

        const data = response.data;
        renderCardsList(data);

        return data;
    } catch (error) {
        console.log(error);
        Notiflix.Report.failure(
            'Error',
            'Failed to fetch data. Please try again later.',
            'OK'
        );
        return null;
    }
}


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
    fetchDataAndRender();
});

categoryList.innerHTML = '';

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
    fetchDataAndRender();
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
