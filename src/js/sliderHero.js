

import Swiper from 'swiper/swiper-bundle.min.mjs';
import 'swiper/swiper-bundle.css';
import 'swiper/modules/pagination.min.css';
import { TastyAPI } from './tasty-api';
import { Notify } from 'notiflix';


new Swiper('.swiper', {
  // пагінація по булетам
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
    dynamicBullets: true,
  },
  // відстань між слайдами
  spaceBetween: 10,

  // -------------автоматичне відтворення з затримкою 5сек-------------
 // autoplay: {
  //  delay: 5000,
    // вимкнення зупинки автовідтворення
  //  disableOnInteraction: false,
 // },

  // ручка при наведенні
  grabCursor: true,
  // //   безкінечне гортання
  loop: true,
  // //   гортання мишкою
  mousewheel: {
    invert: true,
  },
  // к-сть показаних слайдів на сторінку
  slidesPerView: 1,
  // к-сть слайдів які пролистуються
  slidesPerGroup: 1,
});

const slider = document.querySelector('.swiper-wrapper');
const TastyApi = new TastyAPI;
const fetchEvents = TastyApi.getEvents();

fetchEvents.then(events => {
  createMarkup(events);
}).catch(
  err => console.err
)

function createMarkup(arr) {
  const markup = arr
    .map(
      ({
        cook: { name: cookName, imgWebpUrl: cookImgUrl },
        topic: { name: topicName, area, previewUrl: topicImgUrl },
      }) => `
      <div class="swiper-slide slider">
        <div class='swiper-img-wrapper swiper-img-human'>
          <img src="${cookImgUrl}" loading="lazy" alt="${cookName}" class='swiper-slide-img cook-card' width='285' height=''618'>
        </div>

        <div class="swiper-img-wrapper swiper-img-dish">
          <img src="${topicImgUrl}" loading="lazy" alt="${topicName}" class='swiper-slide-img food-center-card' width='150' height='150'>
          <h3 class="master-class">${topicName}</h3>
          <p class="master-class-country">${area}</p>
        </div>

        <div class='swiper-img-wrapper swiper-img-second-dish'>
          <img src="${topicImgUrl}" loading="lazy" alt="${topicName}" class='swiper-slide-img big-slide-img' width='529' height='529'>
        </div>

      </div>
        `
    )
    .join('');

    //slider.insertAdjacentHTML('beforeend', markup);
slider.innerHTML = markup;
}
//   slider.insertAdjacentHTML('beforeend', createMarkup(response));

// async function fetchSwiper() {
//   const response = await fetchEvents();
// }
// fetchSwiper();