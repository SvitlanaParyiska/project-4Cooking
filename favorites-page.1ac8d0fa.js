function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s={},i={},n=t.parcelRequired7c6;null==n&&((n=function(e){if(e in s)return s[e].exports;if(e in i){var t=i[e];delete i[e];var n={id:e,exports:{}};return s[e]=n,t.call(n.exports,n,n.exports),n.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){i[e]=t},t.parcelRequired7c6=n),n("kyEFX").register(JSON.parse('{"bTGq4":"favorites-page.1ac8d0fa.js","lp5u4":"sprite.f129be79.svg","b3ZSW":"index.809b84a5.js"}')),n("bUb57");var a;a=new URL(n("kyEFX").resolve("lp5u4"),import.meta.url).toString();var r=n("ey8Ff"),o=n("iELe5");n("3Q2qD");const c={favoritesCategoriesList:document.querySelector(".favorites-category-list"),favoritesRecipesList:document.querySelector(".favorites-recipes-list"),emptyStorage:document.querySelector(".empty-storage-js")};let l=[];const d=(0,o.load)("favourite")??[];async function p(){const e=d.map((e=>e.id));if(console.log(e),e&&0!==e.length)try{const t=await async function(e){const t="https://tasty-treats-backend.p.goit.global/api/recipes/";try{const s=e.map((async e=>(await fetch(`${t}${e}`)).json()));return(await Promise.allSettled(s)).map((e=>e.value))}catch{throw new Error("ERROR")}}(e);console.log(t),l=function(e){const t=[];return[...new Set(e.map((e=>e.category)))].forEach((s=>{const i=e.filter((e=>e.category===s));t.push({categ:s,recipes:i})})),t}(t),function(e){const t=e.map((({categ:e})=>` <li class="fav-search-item">\n          <button type="button" class="fav-search-button">${e}</button>\n        </li>`));c.favoritesCategoriesList.innerHTML=`<li class="fav-search-item">\n          <button type="button" class="fav-search-button all-category-btn">All categories</button>\n        </li>${t.join("")}`}(l),g(l),u()}catch(e){console.log(e.message)}else{const e=(0,r.createPlugFavoriteMarkup)();c.emptyStorage.innerHTML=e}}function g(t){c.favoritesRecipesList.innerHTML="";const s=t.flatMap((({recipes:t})=>t.map((({_id:t,title:s,category:i,description:n,preview:r,rating:o})=>{const c=`<svg class="is-active-star">\n      <use href="${e(a)}#icon-star"></use>\n    </svg>`,l=`<svg class="dishes-list-star-icon">\n      <use href="${e(a)}}#icon-star"></use>\n    </svg>`;return`<li class="dishes-list-item" data-id="${t}" data-category="${i}" style="background: linear-gradient(1deg, rgba(5, 5, 5, 0.60) 0%, rgba(5, 5, 5, 0.00) 100%), url(${r}); background-position: center;\n                      background-size: cover;" loading="lazy">\n         ${d=t,p=i,`\n    <div class="heart-wraper" id="${d}">\n      <input type="checkbox" class="heart-checkbox" id="${d}" data-category="${p}" />\n      <label for="${d}" class="heart-checkbox-label">\n        <span class="heartOff fav"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9937 4.70783C9.16096 2.5652 6.10475 1.98884 3.80845 3.95085C1.51215 5.91285 1.18887 9.19323 2.99216 11.5137C4.49148 13.443 9.02894 17.5121 10.5161 18.8291C10.6825 18.9764 10.7656 19.0501 10.8627 19.0791C10.9474 19.1043 11.04 19.1043 11.1247 19.0791C11.2218 19.0501 11.305 18.9764 11.4713 18.8291C12.9585 17.5121 17.4959 13.443 18.9952 11.5137C20.7985 9.19323 20.5147 5.89221 18.179 3.95085C15.8432 2.00948 12.8264 2.5652 10.9937 4.70783Z" fill="#F8F8F8"/>\n</svg></span>\n        <span class="heartOn"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">\n  <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M10.9938 4.70783C9.16102 2.5652 6.10481 1.98884 3.80851 3.95085C1.51221 5.91285 1.18893 9.19323 2.99222 11.5137C4.49154 13.443 9.029 17.5121 10.5161 18.8291C10.6825 18.9764 10.7657 19.0501 10.8627 19.0791C10.9474 19.1043 11.0401 19.1043 11.1248 19.0791C11.2218 19.0501 11.305 18.9764 11.4714 18.8291C12.9585 17.5121 17.496 13.443 18.9953 11.5137C20.7986 9.19323 20.5148 5.89221 18.179 3.95085C15.8432 2.00948 12.8265 2.5652 10.9938 4.70783Z" stroke="#F8F8F8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n</svg></span>\n      </label>\n    </div>`}\n            \n            <div class="dishes-list-item-wrapper-fav">\n                <h3 class="dishes-list-item-title">${s}</h3>\n                <p class="dishes-list-item-text-fav">${n}</p>\n                <div class="dishes-list-item-wrapper-rating">\n                    <div class="dishes-list-item-wrapper-rating-star">\n                        <p class="dishes-list-item-wrapper-rating-text">${o.toFixed(1)}</p>\n                        <div class="dishes-list-item-wrapper-rating-star-5">\n                            ${function(e){let t="",s=Math.round(e);for(let e=0;e<5;e++)t+=e<s?c:l;return t}(o)}\n                        </div>\n                    </div>\n                    <button type="button" data-id="${t}" data-recipe-btn="click" class="see-recipe-btn js-see-recipe js-recipe">See recipe</button>\n                </div>\n            </div>\n        </li>`;var d,p}))));c.favoritesRecipesList.innerHTML=s.join("")}function u(){document.querySelectorAll(".heart-checkbox").forEach((e=>{e.addEventListener("change",f)}))}function f(e){const t=e.target,s=t.id;console.log(s);t.dataset.category;t.checked&&(index=d.findIndex((e=>e.id==s)),d.splice(index,1),localStorage.setItem("favourite",JSON.stringify(d)),p())}function g(t){c.favoritesRecipesList.innerHTML="";const s=t.flatMap((({recipes:t})=>t.map((({_id:t,title:s,category:i,description:n,preview:r,rating:o})=>{const c=`<svg class="is-active-star">\n      <use href="${e(a)}#icon-star"></use>\n    </svg>`,l=`<svg class="dishes-list-star-icon">\n      <use href="${e(a)}}#icon-star"></use>\n    </svg>`;return`<li class="dishes-list-item" data-id="${t}" data-category="${i}" style="background: linear-gradient(1deg, rgba(5, 5, 5, 0.60) 0%, rgba(5, 5, 5, 0.00) 100%), url(${r}); background-position: center;\n                      background-size: cover;" loading="lazy">\n         ${d=t,p=i,`<div class="heart-wraper" id="${d}">\n      <input type="checkbox" class="heart-checkbox" id="${d}" data-category="${p}" />\n      <label for="${d}" class="heart-checkbox-label">\n        <span class="heartOff fav"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9937 4.70783C9.16096 2.5652 6.10475 1.98884 3.80845 3.95085C1.51215 5.91285 1.18887 9.19323 2.99216 11.5137C4.49148 13.443 9.02894 17.5121 10.5161 18.8291C10.6825 18.9764 10.7656 19.0501 10.8627 19.0791C10.9474 19.1043 11.04 19.1043 11.1247 19.0791C11.2218 19.0501 11.305 18.9764 11.4713 18.8291C12.9585 17.5121 17.4959 13.443 18.9952 11.5137C20.7985 9.19323 20.5147 5.89221 18.179 3.95085C15.8432 2.00948 12.8264 2.5652 10.9937 4.70783Z" fill="#F8F8F8"/>\n</svg></span>\n        <span class="heartOn"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">\n  <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M10.9938 4.70783C9.16102 2.5652 6.10481 1.98884 3.80851 3.95085C1.51221 5.91285 1.18893 9.19323 2.99222 11.5137C4.49154 13.443 9.029 17.5121 10.5161 18.8291C10.6825 18.9764 10.7657 19.0501 10.8627 19.0791C10.9474 19.1043 11.0401 19.1043 11.1248 19.0791C11.2218 19.0501 11.305 18.9764 11.4714 18.8291C12.9585 17.5121 17.496 13.443 18.9953 11.5137C20.7986 9.19323 20.5148 5.89221 18.179 3.95085C15.8432 2.00948 12.8265 2.5652 10.9938 4.70783Z" stroke="#F8F8F8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n</svg></span>\n      </label>\n    </div>`}\n            \n            <div class="dishes-list-item-wrapper-fav">\n                <h3 class="dishes-list-item-title">${s}</h3>\n                <p class="dishes-list-item-text-fav">${n}</p>\n                <div class="dishes-list-item-wrapper-rating">\n                    <div class="dishes-list-item-wrapper-rating-star">\n                        <p class="dishes-list-item-wrapper-rating-text">${o.toFixed(1)}</p>\n                        <div class="dishes-list-item-wrapper-rating-star-5">\n                            ${function(e){let t="",s=Math.round(e);for(let e=0;e<5;e++)t+=e<s?c:l;return t}(o)}\n                        </div>\n                    </div>\n                    <button type="button" data-id="${t}" data-recipe-btn="click" class="see-recipe-btn js-see-recipe js-recipe">See recipe</button>\n                </div>\n            </div>\n        </li>`;var d,p}))));c.favoritesRecipesList.innerHTML=s.join("")}function u(){document.querySelectorAll(".heart-checkbox").forEach((e=>{e.addEventListener("change",f)}))}function f(e){const t=e.target,s=t.id;console.log(s);t.dataset.category;t.checked&&(index=d.findIndex((e=>e.id==s)),d.splice(index,1),localStorage.setItem("favourite",JSON.stringify(d)),p())}c.favoritesCategoriesList.addEventListener("click",(function(e){const t=e.target.textContent;if("All categories"===t)g(l),u();else{const e=l.find((e=>e.categ===t));g([e]),u()}})),p(),n("3vTQW");
//# sourceMappingURL=favorites-page.1ac8d0fa.js.map
