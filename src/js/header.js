const burgerEl = document.querySelector('.burger-btn');
const closeBtnEl = document.querySelector('.mob-menu-close-btn');
const mobMenuEl = document.querySelector('.mobile-menu');
const backdropEl = document.querySelector('.backdrop');
const bodyEl = document.querySelector('body');
const orderBtn = document.querySelector('.order-btn');
let root = document.querySelector(':root');
const switchEl = document.querySelector('#check-1');
const switchElMob = document.querySelector('#check-2');
const linkHomeEl = document.querySelector('.link-home');
const linkFavEl = document.querySelector('.link-fav');
const logoEl = document.querySelector('.logo-link');
const homeMobEl = document.querySelector('.home-mob');
const favMobEl = document.querySelector('.fav-mob');

burgerEl.addEventListener('click', handlerTogle);
closeBtnEl.addEventListener('click', handlerTogle);

function handlerTogle() {
  mobMenuEl.classList.toggle('is-open');
  backdropEl.classList.toggle('is-open');
  bodyEl.classList.toggle('is-hidden');

  backdropEl.addEventListener('click', hendlerCloseMenu);
}

checkedTheme();

function hendlerCloseMenu() {
  mobMenuEl.classList.remove('is-open');
  backdropEl.classList.remove('is-open');

  backdropEl.removeEventListener('click', hendlerCloseMenu);
}

switchEl.addEventListener('change', handleChange);
switchElMob.addEventListener('change', handleChange);

function handleChange(e) {
  switchEl.checked = e.target.checked;
  switchElMob.checked = e.target.checked;

  if (e.target.checked) {
    root.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    root.classList.remove('dark');
    localStorage.removeItem('theme');
  }
}

function checkedTheme() {
  if (localStorage.getItem('theme') === null) {
    return;
  } else {
    root.classList.add('dark');
    switchEl.setAttribute('checked', true);
    switchElMob.setAttribute('checked', true);
  }
}

const current = window.location.pathname;

if (linkFavEl.getAttribute('href') === current) {
  linkFavEl.classList.add('active');
  linkHomeEl.classList.remove('active');
  favMobEl.classList.add('active-mob-nav');
  homeMobEl.classList.remove('active-mob-nav');
}
console.log('test');
