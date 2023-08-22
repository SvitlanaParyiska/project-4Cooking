import { markupRecipe } from './recipe';
import { changeColor } from './modal-rating';

export function ModalRecipe(idRecipe) {
  openCloseModal('[data-modal-recipe]');
  markupRecipe(idRecipe);
}

export function openCloseModal(dataAtr) {
  const refs = {
    openModalBtn: document.querySelectorAll('[data-modal-recipe-open]'),
    closeModalBtn: document.querySelector('[data-modal-recipe-close]'),
    modal: document.querySelector(`${dataAtr}`),
  };

  refs.openModalBtn.forEach(element => {
    element.addEventListener('click', openModal);
  });
  refs.closeModalBtn.addEventListener('click', closeModal);
  refs.modal.addEventListener('click', removeModal);
  window.addEventListener('keydown', onEscPress);

  function removeModal(e) {
    if (e.target === e.currentTarget) {
      refs.modal.classList.add('modal-is-hidden');
      document.body.classList.remove('modal-is-open');
    }
  }
  function openModal() {
    refs.modal.classList.toggle('modal-is-hidden');
    document.body.classList.toggle('modal-is-open');    
  }
  function closeModal() {
    refs.modal.classList.add('modal-is-hidden');
    document.body.classList.remove('modal-is-open');
    changeColor(0);
  }
  function onEscPress(key) {
    if (key.code === 'Escape') {
      closeModal();
      changeColor(0);
    }
  }
}
