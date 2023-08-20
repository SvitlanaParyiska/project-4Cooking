const openBtnHero = document.querySelector('button[data-open]');
const closeBtnHero = document.querySelector('button[data-close]');
const heroModal = document.querySelector('div[data-modal]');
const heroForm = document.querySelector('.form-hero');

openBtnHero.addEventListener('click', onOpenModal);
closeBtnHero.addEventListener('click', onCloseModal);
heroForm.addEventListener('submit', onHeroFormSubmit);
heroForm.addEventListener('input', onHeroFormInput);

let formHeroValue = {};
const LOCAL_NAME = 'form-hero-values';

function onOpenModal(e) {
  heroModal.classList.remove('modal-is-hidden');
  window.addEventListener('keydown', onEscPress);
}
populateValueInput();

function onCloseModal(e) {
  heroModal.classList.add('modal-is-hidden');
  window.removeEventListener('keydown', onEscPress);
}

function onHeroFormSubmit(e) {
  e.preventDefault();
  localStorage.removeItem(LOCAL_NAME);
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
