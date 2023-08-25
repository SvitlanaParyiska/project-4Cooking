import { pagination } from './pagination';
import { onRenderMarkup, clearRecipeCardsContent } from './dishes_list';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { createPlugMarkup } from './plug';
import { tastyApi } from './pagination';

const filtersContainer = document.querySelector('.filters-container');
const searchInput = document.querySelector('.search-query');
const filterArea = document.querySelector('.filters-areas');
const filterIngredients = document.querySelector('.filters-ingredients');
const iconSearch = document.querySelector('.icon-search');
const inputReset = document.querySelector('.icon-reset-input');
const filtersReset = document.querySelector('.reset-filters-btn');
const loaderEl = document.querySelector('.loader');
const dishesList = document.querySelector('.dishes-list-wrap');

function createOptions() {
    tastyApi.getAreas().then(data => {
        filterArea.insertAdjacentHTML('beforeend', createAreas(data));
    });
    tastyApi.getIngredients().then(data => {
        filterIngredients.insertAdjacentHTML('beforeend', createIngredients(data));
        createCustomSelect();
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
    tastyApi.title = '';
    tastyApi.time = '';
    tastyApi.area = '';
    tastyApi.ingredient = '';
    getFiltersData();
    document.querySelector('.same-as-selected').style.color = 'var(--categories-text-color-light-theme)';
    const selects = document.querySelectorAll('.select-selected');
    selects.forEach(element => {
        element.textContent = 'All';
    });
}

function getFiltersSelect(evt) {
    const inputs = evt.target.parentNode.parentNode.childNodes;
    inputs.forEach(element => {
        if (element.classList) {
            if (element.classList.contains('filters-times')) {
                element.childNodes.forEach(select => {
                    if (select.textContent === evt.target.textContent) {
                        tastyApi.time = select.value;
                        getFiltersData();
                    }
                })
            }
            if (element.classList.contains('filters-areas')) {
                element.childNodes.forEach(select => {
                    if (select.textContent === evt.target.textContent) {
                        tastyApi.area = select.value;
                        getFiltersData();
                    }
                })
            }
            if (element.classList.contains('filters-ingredients')) {
                element.childNodes.forEach(select => {
                    if (select.textContent === evt.target.textContent) {
                        tastyApi.ingredient = select.value;
                        getFiltersData();
                    }
                })
            }
        }
    });
}

function getFiltersInput(evt) {
    if (searchInput.value.trim() !== '') {
    inputReset.style.display = 'inline-block'; 
    } else {
    inputReset.style.display = 'none'; 
    }
    tastyApi.title = evt.target.value.trim();
    getFiltersData();
}

function getFiltersData() {
    clearRecipeCardsContent();
    loaderEl.classList.remove('visually-hidden');
    tastyApi.getRecipeByFilter().then(data => {
        pagination.reset(Number(data.perPage) * Number(data.totalPages));
        if (data.results.length === 0) {
            Notiflix.Notify.failure('Sorry, but nothing was found for your search');
            dishesList.innerHTML = createPlugMarkup();
        }
        onRenderMarkup(data);
        loaderEl.classList.add('visually-hidden');
    });
}

filtersReset.addEventListener('click', resetFilters);
searchInput.addEventListener('input', debounce(getFiltersInput, 300));
filtersContainer.addEventListener('click', getFiltersSelect)

searchInput.addEventListener('focus', () => {
    iconSearch.classList.add('active');
});
searchInput.addEventListener('blur', () => {
    iconSearch.classList.remove('active');
});


inputReset.addEventListener('click', () => {
    searchInput.value = ''; 
    tastyApi.title = '';
    getFiltersData();
    inputReset.style.display = 'none'; 
});


function createCustomSelect() {
var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
}