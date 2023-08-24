import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { openCloseModal } from './create-modal';

const heroModalBackdrop = document.querySelector('.hero-modal-backdrop');
const openBtnHero = document.querySelectorAll('[data-open-hero]');
const closeBtnHero = document.querySelectorAll('[data-close-hero]');
const heroModal = document.querySelector('[data-hero]');
const heroForm = document.querySelector('.form-hero');
openCloseModal();
heroForm.addEventListener('submit', onHeroFormSubmit);
heroForm.addEventListener('input', debounce(onHeroFormInput, 300));
// heroModal.addEventListener('mousedown', onBackdropCloseModal);

let formHeroValue = {};
const LOCAL_NAME = 'form-hero-values';
// let zIndexModal = null;
// openBtnHero.forEach(btn => {
//   btn.addEventListener('click', onOpenModal);
// });

// closeBtnHero.forEach(btn => {
//   btn.addEventListener('click', onCloseModal);
// });

// function onBackdropCloseModal(e) {
//   if (e.currentTarget === e.target) {
//     onCloseModal();
//   }
// }

// function onOpenModal(e) {
//   const dataAttribute = e.currentTarget.getAttribute('data-open-hero');
//   zIndexModal += 1;
//   document.body.classList.add('modal-is-open');
//   heroModalBackdrop.style.zIndex = zIndexModal;
//   document
//     .querySelector(`[data-hero='${dataAttribute}']`)
//     .classList.remove('modal-is-hidden');
//   window.addEventListener('keydown', onEscPress);
// }
populateValueInput();

// function onCloseModal(e) {
//   const dataAttribute = e.currentTarget.getAttribute('data-close-hero');
//   document
//     .querySelector(`[data-hero='${dataAttribute}']`)
//     .classList.add('modal-is-hidden');
//   window.removeEventListener('keydown', onEscPress);
//   document.body.classList.remove('modal-is-open');
// }

function onHeroFormSubmit(e) {
  e.preventDefault();
  localStorage.removeItem(LOCAL_NAME);
  Notiflix.Notify.success('Your order has been accepted!');
  formHeroValue = {};
  e.target.reset();
}

function onHeroFormInput(e) {
  formHeroValue[e.target.name] = e.target.value;
  localStorage.setItem(LOCAL_NAME, JSON.stringify(formHeroValue));
}

// function onEscPress(key) {
//   if (key.code === 'Escape') {
//     onCloseModal();
//   }
// }

function populateValueInput(params) {
  const savedMessage = localStorage.getItem(LOCAL_NAME);
  const parsedDataHero = JSON.parse(localStorage.getItem(LOCAL_NAME));
  const { name, number, email, comment } = heroForm.elements;
  if (savedMessage) {
    name.value = parsedDataHero.name || '';
    number.value = parsedDataHero.number || '';
    email.value = parsedDataHero.email || '';
    comment.value = parsedDataHero.comment || '';
  }
  formHeroValue = { ...parsedDataHero };
}

/**SCROLL */
const scrollBtn = document.querySelector('.scroll-btn-show');

window.onload = () => {
  window.onscroll = function (e) {
    let winY = window.scrollY;
    if (winY > 300) {
      progressBar();

      scrollAnimation();

      winY = null;
    }
  };

  window.onscroll = () => {
    if (window.scrollY > 500) {
      scrollBtn.classList.remove('scroll-top-hide');
    } else if (window.scrollY < 500) {
      scrollBtn.classList.add('scroll-top-hide');
    }
  };

  scrollBtn.addEventListener('mousedown', onScrlBtnClick);
  function onScrlBtnClick(e) {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
};
