import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const openBtnHero = document.querySelectorAll('[data-modal-open]');
const closeBtnHero = document.querySelectorAll('[data-modal-close]');
const heroModal = document.querySelector('[data-modal]');
const heroForm = document.querySelector('.form-hero');

openBtnHero.forEach(btn => {
  btn.addEventListener('click', onOpenModal);
});

closeBtnHero.forEach(btn => {
  btn.addEventListener('click', onCloseModal);
});

heroForm.addEventListener('submit', onHeroFormSubmit);
heroForm.addEventListener('input', debounce(onHeroFormInput, 300));
heroModal.addEventListener('mousedown', onBackdropCloseModal);

let formHeroValue = {};
const LOCAL_NAME = 'form-hero-values';

function onBackdropCloseModal(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

function onOpenModal(e) {
  let currentButton = e.currentTarget.getAttribute('data-modal-open');

  document.body.classList.add('modal-is-open');
  document
    .querySelector(`[data-modal='${currentButton}']`)
    .classList.remove('modal-is-hidden');
  window.addEventListener('keydown', onEscPress);
}
populateValueInput();

function onCloseModal(e) {
  let currentButtonClose = e.currentTarget.getAttribute('data-modal-close');

  document
    .querySelector(`[data-modal='${currentButtonClose}']`)
    .classList.add('modal-is-hidden');
  window.removeEventListener('keydown', onEscPress);
  document.body.classList.remove('modal-is-open');
}

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

function onEscPress(key) {
  if (key.code === 'Escape') {
    onCloseModal();
  }
}

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
