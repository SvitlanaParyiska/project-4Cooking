import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import { RatingAPI } from './rating_api';

const RatingAdd = new RatingAPI();

export function modalRating(idRecipe) {
  const refs = {
    starInputs: document.querySelectorAll('.star-input'),
    ratingEmailInput: document.querySelector('.rating-email-input'),
    allRatingForm: document.querySelector('.form-rating'),

    ratingModalBackdrop: document.querySelector('.js-modal-backdrop-rating'),
  };
  
  refs.allRatingForm.addEventListener('submit', onRatingFormSubmit);
  refs.allRatingForm.addEventListener(
    'input',
    debounce(onRatingFormInput, 300)
  );

  let formRatingValue = {};
  const LOCAL_KEY = 'form-rating';
  // click on the stars
  refs.starInputs.forEach(input => {
    input.addEventListener('click', event => {
      const star = event.target;

      const ratingValue = star.value;
      RatingAdd.setRatingValue(ratingValue);
    });
  });

  populateValueInput();

  function onRatingFormSubmit(event) {
    event.preventDefault();

    changeColor(0);

    RatingAdd.setId(idRecipe);

    localStorage.removeItem(LOCAL_KEY);
    Notify.success('Your rating has been accepted!');
    formRatingValue = {};
    event.target.reset();

    refs.ratingModalBackdrop.classList.add('modal-is-hidden');
  }

  function onRatingFormInput(event) {
    formRatingValue['id'] = idRecipe;

    formRatingValue[event.target.name] = event.target.value;
    localStorage.setItem(LOCAL_KEY, JSON.stringify(formRatingValue));  
  }

  function populateValueInput(params) {
    const savedMessage = localStorage.getItem(LOCAL_KEY);
    const parsedDataRating = JSON.parse(localStorage.getItem(LOCAL_KEY));
    const { rate, email } = refs.allRatingForm.elements;
    
    if (savedMessage) {
      rate.value = parsedDataRating.rate || '';
      email.value = parsedDataRating.email || '';
    }
    formRatingValue = { ...parsedDataRating };
  }

  const stars = document.querySelectorAll('.rating-star input[type="radio"]');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const starCount = parseInt(star.value);
      changeColor(starCount);
    });
  });
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
  ratingValue.textContent = starCount.toFixed(1);
}

// викликаємо головну функцію

modalRating();

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
