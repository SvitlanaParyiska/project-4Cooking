const burgerEl = document.querySelector('.burger-btn');
const closeBtnEl = document.querySelector('.mob-menu-close-btn');
const mobMenuEl = document.querySelector('.mobile-menu');
const backdropEl = document.querySelector('.backdrop');
const bodyEl = document.querySelector('body');

burgerEl.addEventListener('click', handlerTogle);
closeBtnEl.addEventListener('click', handlerTogle);

function handlerTogle() {
  mobMenuEl.classList.toggle('is-open');
  backdropEl.classList.toggle('is-open');
  bodyEl.classList.toggle('is-hidden');

  backdropEl.addEventListener('click', hendlerCloseMenu);
}

function hendlerCloseMenu() {
  mobMenuEl.classList.remove('is-open');
  backdropEl.classList.remove('is-open');

  backdropEl.removeEventListener('click', hendlerCloseMenu);
}

const switchEl = document.querySelector('#check-1');
const switchElMob = document.querySelector('#check-2');

switchEl.addEventListener('change', handleChange);
switchElMob.addEventListener('change', handleChange);

let root = document.querySelector(':root');
console.dir(root);

function handleChange(e) {
  switchEl.checked = e.target.checked;
  switchElMob.checked = e.target.checked;

  if (e.target.checked) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}
