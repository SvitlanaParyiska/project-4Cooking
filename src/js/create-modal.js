import { changeColor } from './modal-rating';

export function openCloseModal() {
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const openBtnsModal = document.querySelectorAll('[data-open]');
  const closeBtnsModal = document.querySelectorAll('[data-close]');
  const modals = document.querySelectorAll('[data-modal]');
  let zIndexModal = 0;
  openBtnsModal.forEach(btnOpen => {
    btnOpen.addEventListener('click', onOpenModal);
  });
  closeBtnsModal.forEach(btnClose => {
    btnClose.addEventListener('click', onCloseModal);
  });
  modals.forEach(modal => {
    modal.addEventListener('mousedown', onBackdropCloseModal);
  });

  function onOpenModal(event) {
    const dataAttribute = event.currentTarget.getAttribute('data-open');
    console.log(dataAttribute);
    zIndexModal += 1;
    modalBackdrop.computedStyleMap.zIndex = zIndexModal;
    document.body.classList.add('modal-is-open');
    document
      .querySelector(`[data-modal='${dataAttribute}']`)
      .classList.remove('modal-is-hidden');
    window.addEventListener('keydown', onEscPress);
  }

  function onCloseModal() {
    document.body.classList.remove('modal-is-open');
    modals.forEach(modal => {
      if (!modal.classList.contains('modal-is-hidden')) {
        modal.classList.add('modal-is-hidden');
      }
    });
  }

  function onBackdropCloseModal(event) {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  }
  function onEscPress(key) {
    if (key.code === 'Escape') {
      onCloseModal();
    }
  }
}
