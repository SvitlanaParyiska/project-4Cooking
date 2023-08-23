
import axios from 'axios';
import Swiper from 'swiper/swiper-bundle.min.mjs';
import 'swiper/swiper-bundle.css';
import { Notify } from 'notiflix';

const slider = document.querySelector('.swiper-wrapper');

const URL = `https://tasty-treats-backend.p.goit.global/api/events`;

async function fetchEvents() {
  try {
    const response = await axios.get(URL);
    const data = response.data;
    return data;
  } catch (err) {
    console.warn(err);
  }
}

async function fetchSlider() {
  const response = await fetchEvents();
  slider.innerHTML = createMarkup(response);
}
fetchSlider();

const swiper = new Swiper('.swiper', {
  loop: true,
  effect: 'cube',
  grabCursor: true,
  speed: 1500,
  autoplay: {
    delay: 2000,
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
    dynamicBullets: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  mousewheel: {
    invert: true,
  },
});


// new Swiper('.swiper', {
//   pagination: {
//     el: '.swiper-pagination',
//     type: 'bullets',
//     clickable: true,
//     dynamicBullets: true,
//   },
//   spaceBetween: 10,
//   // autoplay: {
//   //   delay: 3000,
//   //   disableOnInteraction: false,
//   //},

//   grabCursor: true,
//   loop: true,
//   mousewheel: {
//     invert: true,
//   },
// });

function createMarkup(arr) {
  const markup = arr
    .map(
      ({
        cook: { name: cookName, imgWebpUrl: cookImgUrl },
        topic: {
          name: topicName,
          area,
          previewUrl: topicImgUrl,
          imgWebpUrl: bigImgUrl,
        },
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
          <img src="${bigImgUrl}" loading="lazy" alt="${topicName}" class='swiper-slide-img big-slide-img' width='663' height='663'>
        </div>

      </div>
        `
    )
    .join('');
  return markup;
}
