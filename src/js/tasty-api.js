// export const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
import axios from 'axios';

export class TastyAPI {
  #BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

  getAllRecipes(page) {
    const url = `${this.#BASE_URL}/recipes?limit=9&page=${page}`;
    return axios.get(url).then(resp => resp.data);
  }

  getEvents() {
    const url = `${this.#BASE_URL}/events`;
    return axios.get(url).then(resp => resp.data);
  }
}
///https://tasty-treats-backend.p.goit.global/api/recipes/
