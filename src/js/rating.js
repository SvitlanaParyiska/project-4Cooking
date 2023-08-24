
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

