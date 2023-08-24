import Notiflix from 'notiflix';
import { RatingAPI } from './rating_api';

const RatingAdd = new RatingAPI();

console.log(RatingAdd);

function modalRating() {
  const refs = {
    // closeBtnModal: document.querySelector('.btn-close-rating'),
    ratingBackdrop: document.querySelector('.rating-backdrop'),
    ratingEmailBtn: document.querySelector('.rating-email-btn'),
    starInputs: document.querySelectorAll('.star-input'),
    ratingEmailInput: document.querySelector('.rating-form-input'),
    allRatingForm: document.querySelector('.form-rating'),
    // raringModal: document.querySelector('[data-hero]'),
    // openModalBtn: document.querySelector(".modal-open"),
  };

 
refs.allRatingForm.addEventListener('submit', onRatingFormSubmit);
refs.allRatingForm.addEventListener('input', onRatingFormInput);
refs.ratingEmailInput.addEventListener('input', onRatingFormInput);

  let formRatingValue = {};
  const LOCAL_NAME = 'form-rating';
 
  // click on the stars
  refs.starInputs.forEach(input => {
    input.addEventListener('click', event => {
      const star = event.target;

      const ratingValue = star.value;
      RatingAdd.setRatingValue(ratingValue);
    });
  });

  populateValueInput();

  // refs.ratingEmailBtn.addEventListener('submit', event => {
  //   event.preventDefault();
  //   refs.ratingBackdrop.classList.add('visible');
  //   removeScroll();
  //   changeColor(0); // при натисканні на кнопку Send, повинні оновитися зірки та відправитися

  //   const inputValue = refs.ratingEmailInput.value.trim();

  //   if (inputValue === '') {
  //     Notiflix.Notify.failure('Please enter a valid email');
  //     return;
  //   }
  //   const id = refs.ratingEmailBtn.id;
  //   RatingAdd.setInputValue(inputValue);
  //   RatingAdd.setId(id);
  //   RatingAdd.addRating();
  //   refs.ratingEmailInput.value = '';
  // });

  // refs.ratingBackdrop.addEventListener('click', event => {
  //   if (event.target === refs.ratingBackdrop) {
  //     // refs.ratingBackdrop.classList.add('visible');
  //     // removeScroll();
  //   } 
  // });

  function onRatingFormSubmit(event) {
    event.preventDefault();
      // refs.ratingBackdrop.classList.add('visible');
      // removeScroll();
      changeColor(0); // при натисканні на кнопку Send, повинні оновитися зірки та відправитися 
  
      const inputValue = refs.ratingEmailInput.value.trim();
  
      if (inputValue === '') {
        Notiflix.Notify.failure('Please enter a valid email');
        return;
      }

      //треба зберегти не видаляти!!!

      localStorage.removeItem(LOCAL_NAME);
      Notiflix.Notify.success('Your rating has been accepted!');
      formRatingValue = {};
      event.target.reset();

  }

  function onRatingFormInput(event) {
    formRatingValue[event.target.name] = event.target.value;
    localStorage.setItem(LOCAL_NAME, JSON.stringify(formRatingValue));
    console.log(formRatingValue);
  }   // Це требе зберігати при сабміті , а не при інпуті!!!


  function populateValueInput(params) {
    const savedMessage = localStorage.getItem(LOCAL_NAME);
    const parsedDataHero = JSON.parse(localStorage.getItem(LOCAL_NAME));
    const {rate,  email } = refs.allRatingForm.elements;
    if (savedMessage) {
      rate.value = parsedDataHero.rate || '';
      email.value = parsedDataHero.email || '';

    }
    formRatingValue = { ...parsedDataHero };
  }





  // populateValueInput();
  // function populateValueInput(params) {
  //   const savedMessage = localStorage.getItem(LOCAL_NAME);
  //   const parsedDataHero = JSON.parse(localStorage.getItem(LOCAL_NAME));
  //   const { email } = refs.allRatingForm.elements;
  //   if (savedMessage) {
  //           email.value = parsedDataHero.email || '';
     
  //   }
    
  // }

  // document.addEventListener('keydown', event => {
  //   if (event.key === 'Escape') {
  //     changeColor(0);
  //     refs.ratingBackdrop.classList.add('visible');
  //     removeScroll();
  //   }
  // });

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

// видаляємо overflow: hidden

// function removeScroll() {
//   document.body.classList.remove('no-scroll');
// }

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

// Local


export function ratingModal(_id) {
const recipeId= _id;
// ввод даних в поля(зірочки і майл)
// при сабміті форма зберігається на локал та очищ.
}