import Swiper from "swiper";
import 'swiper/css';
import axios from "axios";


const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
const END_POINT = '/events';

async function fetchImgForSlider() {
    try {
        const response = await axios.get(`${BASE_URL}${END_POINT}`);
        const data = response.data;
        return data;
        console.log(data);
    } catch (err) {
        console.warn(err)
    }
};
alert('hello');

fetchImgForSlider();

async function fetchSlider() {
    const response = await fetchImgForSlider();
    console.dir(response);
};

fetchSlider();

function createMarkup(arr) {
    const markupImg = arr
    .map(
        (name, imgUrl) => `
        <div class="swiper-slide"><ul>
        <li><img src="" alt=""></li>
        <li><img src="" alt=""></li>
        <li><img src="" alt=""></li>
    </ul></div>
        `
    )
    .join('');
    return markupImg;
};

const swiper = new Swiper('.swiper', {
    direction: 'vertical',
    loop: true,

    pagination: {
        el: '.swiper-pagination',
    },

});
