import { TastyAPI } from './tasty-api';

const tastyApi = new TastyAPI();

export function modalRating(idRecipe) {
  let ratingToSent = 0;
  let emailToSent = '';
  const refs = {
    starInputs: document.querySelectorAll('.star-input'),
    ratingEmailInput: document.querySelector('.rating-email-input'),
    allRatingForm: document.querySelector('.form-rating'),   
  };

  refs.allRatingForm.addEventListener('submit', onRatingFormSubmit);
  refs.ratingEmailInput.addEventListener('input', onRatingFormEmailInput);
  refs.starInputs.forEach(star => {
    star.addEventListener('click', onStarsClick);
  });

  function onRatingFormSubmit(event) {
    event.preventDefault();
    changeColor(0);
    event.target.reset();
    const idPatch = String(idRecipe);
    tastyApi.addRecipeById(idPatch, ratingToSent, emailToSent);
  }

  function onRatingFormEmailInput(event) {
    emailToSent = event.target.value;
  }

  function onStarsClick(event) {
    const star = event.target;
    const ratingValue = star.value;
    ratingToSent = ratingValue;
    changeColor(ratingValue);
  }
}

export function changeColor(starCount) {
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
  ratingValue.textContent = starCount;
}

// Перевіряємо на валідність

const validEmailInput = document.querySelector('.rating-email-input');
const validRatingStarsInputs = document.querySelectorAll('.star-input');
const validSubmitButton = document.querySelector('.rating-email-btn');

// Перевіряємо валідність email
// Метод checkValidity() перевіряє чи є у елемента якісь обмеження і чи задовольняє він їм.
// Якщо елемент не відповідає своїм обмеженням, браузер запускає скасовану invalid подію для елемента, а потім повертає значення false.

function isValidEmail(email) {
  return validEmailInput.checkValidity();
}

// Перевіряємо стан вибраного рейтингу та присутність елемету з класом 'star-input'

function isRatingSelected() {
  return [...validRatingStarsInputs].some(input => input.checked);
}

// Оновлюємо стан кнопки та перевіряємо валідність email + вибраного рейтингу

function updateSubmitButtonState() {
  const isEmailValid = isValidEmail(validEmailInput.value);
  const isRatingValid = isRatingSelected();

  // Якщо все ок знімаємо клас css 'submit-btn[disabled]'
  validSubmitButton.disabled = !(isEmailValid && isRatingValid);
}

// Слухаємо події зміни поля email та вибору рейтингу
validEmailInput.addEventListener('input', updateSubmitButtonState);
validRatingStarsInputs.forEach(input =>
  input.addEventListener('change', updateSubmitButtonState)
);
