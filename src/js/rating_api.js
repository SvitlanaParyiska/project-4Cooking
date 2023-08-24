import axios from 'axios';
import Notiflix from 'notiflix';

export class RatingAPI {
  constructor() {
    this.id = '';
    this.inputValue = '';
    this.ratingValue = 1;
  }

  async addRating() {
    try {
      const URL = `https://tasty-treats-backend.p.goit.global/api/recipes/${this.id}/rating`;

      const obj = {
        rate: this.ratingValue,
        email: this.inputValue,
      };

      const responseFromRating = await axios.patch(URL, obj);
    } catch (err) {
      Notiflix.Notify.failure(
        'We`re sorry, but ыomething went wrong!',
        err.message
      );
    }
  }

  setRatingValue(rating) {
    this.ratingValue = Number(rating);
  }

  setInputValue(inputValue) {
    this.inputValue = inputValue;
  }
  setId(id) {
    this.id = id;
  }
}
