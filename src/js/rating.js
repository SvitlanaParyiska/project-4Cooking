// import { openCloseModal } from "./create-modal";

// function createRetingModal(){
//   openCloseModal();
// }

// const refs = {
//   openModalBtn: document.querySelector(".modal-open"),
  
//   modal: document.querySelector(".modal"),
//   body: document.querySelector('body')
// };

// function openModalRating() {
//   refs.openModalBtn.addEventListener("click", toggleModal);
// }



// function toggleModal() {
//   refs.modal.classList.toggle("visible");
//   refs.body.classList.toggle("no-scroll");
//   console.log("click event listener rating btn")
// }
// openModalRating();
// refs.openModalBtn.removeEventListener("click", toggleModal);


// const sendCart = () => {

//     const cartFrom = document.querySelector('.form-rating-email');

//     cartFrom.addEventListener('submit', e => {
//         e.preventDefault();

//         const formData = new FormData(cartFrom);

//         const data = {
            
//                 "rate": 5,
//                 "email": "test@gmail.com"
              
//         };

//         for (const [key, value] of formData) {
// data[key] = value;
//         }

//         data.order = userData.cartList;

//         sendData('https://tasty-treats-backend.p.goit.global/api/recipes/', JSON.stringify(data)).then(() => {
//             cartFrom.reset();
//         }).catch((err) => {
//             console.log(err);
//         })
//     })
// }


// (() => {
//     const refs = {
//       openModalBtn: document.querySelector("[data-modal-open]"),
//       closeModalBtn: document.querySelector("[data-modal-close]"),
//       modal: document.querySelector("[data-modal]"),
//       body: document.querySelector('body')
//     };
  
//     refs.openModalBtn.addEventListener("click", toggleModal);
//     refs.closeModalBtn.addEventListener("click", toggleModal);
  
//     function toggleModal() {
//       refs.modal.classList.toggle("is-hidden");
//       refs.body.classList.toggle("no-scroll");
//     }
//   })();