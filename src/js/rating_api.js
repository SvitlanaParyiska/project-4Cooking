import axios from 'axios';
import Notiflix from 'notiflix';


const ratingBackdrop = document.querySelector('.rating-backdrop');
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
      // return responseFromRating;
      // console.log(responseFromRating);

      Notiflix.Report.success(
        'Your rating was successfully added,please enter a new Email '
      );
    
    } catch (err) {
      if (err.response.status === 409) {
        Notiflix.Notify.failure(
          'You have already rated this recipe',
          err.message
        );
      }
      if (err.response.status === 400) {
        Notiflix.Notify.failure(
          'An error occurred, please try again',
          err.message
        );
      }
      ratingBackdrop.classList.remove('visible');
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
};