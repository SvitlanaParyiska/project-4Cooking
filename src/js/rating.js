

const refs = {
  openModalBtn: document.querySelector(".modal-open"),
  
  modal: document.querySelector(".modal"),
  body: document.querySelector('body')
};

function openModalRating() {
  refs.openModalBtn.addEventListener("click", toggleModal);
}



function toggleModal() {
  refs.modal.classList.toggle("visible");
  refs.body.classList.toggle("no-scroll");
  console.log("click event listener rating btn")
}
openModalRating();
// refs.openModalBtn.removeEventListener("click", toggleModal);