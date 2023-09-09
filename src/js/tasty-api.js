import axios from 'axios';
import Notiflix from 'notiflix';

const ratingModal = document.querySelector('.js-modal-backdrop-rating');

export class TastyAPI {
  #BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
  title = '';
  category = '';
  page = '1';
  limit = '9';
  time = '';
  area = '';
  ingredient = '';

  // GET ALL RECIPES
  getAllRecipes(page) {
    const url = `${this.#BASE_URL}/recipes?limit=9&page=${page}`;
    return axios.get(url).then(resp => resp.data);
  }

  // GET EVENTS
  getEvents() {
    const url = `${this.#BASE_URL}/events`;
    return axios.get(url).then(resp => resp.data);
  }

  // GET CATEGORIES
  getCategories() {
    const url = `${this.#BASE_URL}/categories`;
    return axios.get(url).then(resp => resp.data);
  }

  // GET RECIPES BY FILTER
  getRecipeByFilter() {
    const searchParams = new URLSearchParams({
      title: this.title,
      category: this.category,
      page: this.page,
      limit: this.limit,
      time: this.time,
      area: this.area,
      ingredient: this.ingredient,
    });
    // const url = `${
    //   this.#BASE_URL
    // }/recipes?category=${category}&page=${page}&limit=${limit}&time=${time}&area=${area}&ingredients=${ingredients}`;
    return axios
      .get(`${this.#BASE_URL}/recipes?${searchParams}`)
      .then(resp => resp.data);
  }

  // GET  POPULAR RECIPES
  getPopularRecipes() {
    const url = `${this.#BASE_URL}/recipes/popular`;
    return axios.get(url).then(resp => resp.data);
  }

  // GET RECIPES BY ID
  getRecipeById(id) {
    const url = `${this.#BASE_URL}/recipes/${id}`;
    return axios.get(url).then(resp => resp.data);
  }

  async getRecipeByIdAsync(id) {
    const url = `${this.#BASE_URL}/recipes/${id}`;
    try {
      return axios.get(url).then(resp => resp.data);
    } catch (error) {
      console.warn(`${error}`);
      //Notify.failure('Oops! Something went wrong! Try reloading the page!');
    }
  }

  //ADD RECIPE RATING
  async addRecipeById(id, ratingSent, emailSent) {
    const obj = {
      rate: Number(ratingSent),
      email: emailSent,
    };
    const url = `${this.#BASE_URL}/recipes/${id}/rating`;

    try {
      const responseFromRating = await axios.patch(url, obj);
      Notiflix.Report.success(
        'Your rating was successfully added!',
        'Thank you for your opinion!'
      );

      ratingModal.classList.add('modal-is-hidden');
    } catch (error) {
      if (error.response.status === 400) {
        Notiflix.Report.failure(
          'An error occurred, please try again',
          error.message
        );
      }
      if (error.response.status === 404) {
        Notiflix.Report.failure('Error! Please try again!', error.message);
      }
      if (error.response.status === 409) {
        Notiflix.Report.failure(
          'You have already rated this recipe',
          error.message
        );
      }
    }
  }
  // GET INGREDIENTS
  getIngredients() {
    const url = `${this.#BASE_URL}/ingredients`;
    return axios.get(url).then(resp => resp.data);
  }

  // GET AREAS
  getAreas() {
    const url = `${this.#BASE_URL}/areas`;
    return axios.get(url).then(resp => resp.data);
  }

  // ADD ORDER
  addOrder() {
    const url = `${this.#BASE_URL}/orders`;
    //return axios.post(url).then(resp => resp.data);  тут поміркуйте, що треба в then и додайте
  }
}
