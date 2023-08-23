import Swiper from 'swiper/swiper-bundle.min.mjs';
import 'swiper/swiper-bundle.css';
// import { TastyAPI } from './tasty-api';
import { Notify } from 'notiflix';


const slider = document.querySelector('.swiper-wrapper');
// const TastyApi = new TastyAPI;
// const fetchEvents = TastyApi.getEvents();



const URL = `https://tasty-treats-backend.p.goit.global/api/events`;
export async function fetchEvent(){
    try {
      const response = await axios.get(URL);
      if (response.status === 404) {
        throw new Error(response.status);
      };
      return response.data;
    } catch (error) {
      console.log(error);
    };
};
  

new Swiper('.swiper', {
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
    dynamicBullets: true,
  },
  spaceBetween: 10,
  autoplay: {
    delay: 3000,
  disableOnInteraction: false,
  },

  grabCursor: true,
  loop: true,
  mousewheel: {
    invert: true,
  },
});



// fetchEvents.then(events => {
//   createMarkup(events);
// }).catch(
//   err => console.err
// )

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
          <img src="${topicImgUrl}" loading="lazy" alt="${topicName}" class='swiper-slide-img big-slide-img' width='663' height='663'>
        </div>

      </div>
        `
    )
    .join('');

    slider.innerHTML = markup;
}

async function fetchSwiper() {
  const response = await fetchEvents();
  createMarkup(response);
}
fetchSwiper();
