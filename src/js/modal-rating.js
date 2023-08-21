import Notiflix from 'notiflix';
import { RatingAPI } from './rating_api';

const RatingAdd = new RatingAPI();

function modalRating() {
  const refs = {
    closeBtnModal: document.querySelector('.btn-close-rating'),
    ratingBackdrop: document.querySelector('.rating-backdrop'),
    ratingEmailBtn: document.querySelector('.rating-email-btn'),
    starInputs: document.querySelectorAll('.star-input'),
    ratingEmailInput: document.querySelector('.rating-form-input'),
  };

  refs.closeBtnModal.addEventListener('click', () => {
    refs.ratingBackdrop.classList.add('visible');
    changeColor(0);
    enableScroll();
  });

  refs.starInputs.forEach(input => {
    input.addEventListener('click', event => {
      const star = event.target;

      const ratingValue = star.value;
      RatingAdd.setRatingValue(ratingValue);
    });
  });

  refs.ratingEmailBtn.addEventListener('click', event => {
    // event.preventDefault(); треба чи ні?
    refs.ratingBackdrop.classList.add('visible');
    enableScroll();
    changeColor(0); // при натисканні на кнопку Send, повинні оновитися зірки та відправитися

    const inputValue = refs.ratingEmailInput.value.trim();

    if (inputValue === '') {
      Notiflix.Report.failure('Please enter a valid email');
      return;
    }
    const id = refs.ratingEmailBtn.id;
    RatingAdd.setInputValue(inputValue);
    RatingAdd.setId(id);
    RatingAdd.addRating();
    refs.ratingEmailInput.value = '';
  });

  refs.ratingBackdrop.addEventListener('click', event => {
    if (event.target === refs.ratingBackdrop) {
      refs.ratingBackdrop.classList.add('visible');
      enableScroll();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      changeColor(0);
      refs.ratingBackdrop.classList.add('visible');
      enableScroll();
    }
  });

  const stars = document.querySelectorAll('.rating-star input[type="radio"]');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const starCount = parseInt(star.value);
      changeColor(starCount);
    });
  });
}

function changeColor(starCount) {
  const stars = document.querySelectorAll('.rating-star input[type="radio"]');
  const ratingValue = document.querySelector('.rating_value');
  for (let i = 0; i < stars.length; i += 1) {
    const starLabel = stars[i].nextElementSibling;
    const starSVG = starLabel.querySelector('.star-rating');
    if (i < starCount) {
      starSVG.classList.add('active-modal-stars');
    } else {
      starSVG.classList.remove('active-modal-stars');
    }
  }
  ratingValue.textContent = starCount.toFixed(1);
}

// видаляємо overflow: hidden

function enableScroll() {
  document.body.classList.remove('no-scroll');
}

// викликаємо головну функцію

modalRating();

// Перевіряємо на валідність

const emailInput = document.querySelector('.rating-form-input');
const ratingInputs = document.querySelectorAll('.star-input');
const submitButton = document.querySelector('.rating-email-btn');

// Перевіряємо валідність email
// Метод checkValidity() перевіряє чи є у елемента якісь обмеження і чи задовольняє він їм.
// Якщо елемент не відповідає своїм обмеженням, браузер запускає скасовану invalid подію для елемента, а потім повертає значення false.

function isValidEmail(email) {
  return emailInput.checkValidity();
}

// Перевіряємо стан вибраного рейтингу та присутність елемету з класом 'star-input'

function isRatingSelected() {
  return [...ratingInputs].some(input => input.checked);
}

// Оновлюємо стан кнопки та перевіряємо валідність email + вибраного рейтингу

function updateSubmitButtonState() {
  const isEmailValid = isValidEmail(emailInput.value);
  const isRatingValid = isRatingSelected();

  // Якщо все ок знімаємо клас css 'submit-btn[disabled]'
  submitButton.disabled = !(isEmailValid && isRatingValid);
}

// Слухаємо події зміни поля email та вибору рейтингу
emailInput.addEventListener('input', updateSubmitButtonState);
ratingInputs.forEach(input =>
  input.addEventListener('change', updateSubmitButtonState)
);
