function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i={},s={},n=t.parcelRequired7c6;null==n&&((n=function(e){if(e in i)return i[e].exports;if(e in s){var t=s[e];delete s[e];var n={id:e,exports:{}};return i[e]=n,t.call(n.exports,n,n.exports),n.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){s[e]=t},t.parcelRequired7c6=n),n("kyEFX").register(JSON.parse('{"bTGq4":"favorites-page.cfbe2734.js","lp5u4":"sprite.f129be79.svg","b3ZSW":"index.bc460a6f.js"}')),n("bUb57");var a;a=new URL(n("kyEFX").resolve("lp5u4"),import.meta.url).toString();var r=n("ey8Ff"),o=n("iELe5"),c=n("5vmvQ"),l=n("kgHXB"),d=n("795th");const p={favoritesCategoriesList:document.querySelector(".favorites-category-list"),favoritesRecipesList:document.querySelector(".favorites-recipes-list"),emptyStorage:document.querySelector(".empty-storage-js")},f=new(0,c.TastyAPI);let u=[];const g=(0,o.load)("favourite")??[];async function v(){const e=g.map((e=>e.id));if(e&&0!==e.length)try{const t=await async function(e){try{const t=e.map((async e=>f.getRecipeById(e)));return(await Promise.allSettled(t)).map((e=>e.value))}catch{throw new Error("ERROR")}}(e);u=function(e){const t=[];return[...new Set(e.map((e=>e.category)))].forEach((i=>{const s=e.filter((e=>e.category===i));t.push({categ:i,recipes:s})})),t}(t),function(e){const t=e.map((({categ:e})=>` <li class="fav-search-item">\n          <button type="button" class="fav-search-button">${e}</button>\n        </li>`));p.favoritesCategoriesList.innerHTML=`<li class="fav-search-item">\n          <button type="button" class="fav-search-button all-category-btn">All categories</button>\n        </li>${t.join("")}`}(u),h(u),b(),(0,d.openCloseModal)()}catch(e){console.log(e.message)}else{const e=(0,r.createPlugFavoriteMarkup)();p.emptyStorage.innerHTML=e}}function h(t){p.favoritesRecipesList.innerHTML="";const i=t.flatMap((({recipes:t})=>t.map((({_id:t,title:i,category:s,description:n,preview:r,rating:o})=>{const c=`<svg class="is-active-star">\n      <use href="${e(a)}#icon-star"></use>\n    </svg>`,l=`<svg class="dishes-list-star-icon">\n      <use href="${e(a)}}#icon-star"></use>\n    </svg>`;return`<li class="dishes-list-item" data-id="${t}" data-category="${s}" style="background: linear-gradient(1deg, rgba(5, 5, 5, 0.60) 0%, rgba(5, 5, 5, 0.00) 100%), url(${r}); background-position: center;\n                      background-size: cover;" loading="lazy">\n         ${d=t,p=s,`\n    <div class="heart-wraper" id="${d}">\n      <input type="checkbox" class="heart-checkbox" id="${d}" data-category="${p}" />\n      <label for="${d}" class="heart-checkbox-label">\n        <span class="heartOff fav"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9937 4.70783C9.16096 2.5652 6.10475 1.98884 3.80845 3.95085C1.51215 5.91285 1.18887 9.19323 2.99216 11.5137C4.49148 13.443 9.02894 17.5121 10.5161 18.8291C10.6825 18.9764 10.7656 19.0501 10.8627 19.0791C10.9474 19.1043 11.04 19.1043 11.1247 19.0791C11.2218 19.0501 11.305 18.9764 11.4713 18.8291C12.9585 17.5121 17.4959 13.443 18.9952 11.5137C20.7985 9.19323 20.5147 5.89221 18.179 3.95085C15.8432 2.00948 12.8264 2.5652 10.9937 4.70783Z" fill="#F8F8F8"/>\n</svg></span>\n        <span class="heartOn"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">\n  <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M10.9938 4.70783C9.16102 2.5652 6.10481 1.98884 3.80851 3.95085C1.51221 5.91285 1.18893 9.19323 2.99222 11.5137C4.49154 13.443 9.029 17.5121 10.5161 18.8291C10.6825 18.9764 10.7657 19.0501 10.8627 19.0791C10.9474 19.1043 11.0401 19.1043 11.1248 19.0791C11.2218 19.0501 11.305 18.9764 11.4714 18.8291C12.9585 17.5121 17.496 13.443 18.9953 11.5137C20.7986 9.19323 20.5148 5.89221 18.179 3.95085C15.8432 2.00948 12.8265 2.5652 10.9938 4.70783Z" stroke="#F8F8F8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n</svg></span>\n      </label>\n    </div>`}\n            \n            <div class="dishes-list-item-wrapper-fav">\n                <h3 class="dishes-list-item-title">${i}</h3>\n                <p class="dishes-list-item-text-fav">${n}</p>\n                <div class="dishes-list-item-wrapper-rating">\n                    <div class="dishes-list-item-wrapper-rating-star">\n                        <p class="dishes-list-item-wrapper-rating-text">${o.toFixed(1)}</p>\n                        <div class="dishes-list-item-wrapper-rating-star-5">\n                            ${function(e){let t="",i=Math.round(e);for(let e=0;e<5;e++)t+=e<i?c:l;return t}(o)}\n                        </div>\n                    </div>\n                    <button type="button" data-id="${t}" data-open='recipe' data-recipe-btn="click" class="see-recipe-btn js-see-recipe js-recipe">See recipe</button>\n                </div>\n            </div>\n        </li>`;var d,p}))));p.favoritesRecipesList.innerHTML=i.join("")}function b(){document.querySelectorAll(".heart-checkbox").forEach((e=>{e.addEventListener("change",y)}))}function y(e){const t=e.target,i=t.id;if(t.checked){const e=g.findIndex((e=>e.id==i));g.splice(e,1),localStorage.setItem("favourite",JSON.stringify(g)),v()}}p.favoritesCategoriesList.addEventListener("click",(function(e){const t=e.target.textContent;if("All categories"===t)h(u),b();else{h([u.find((e=>e.categ===t))]),b()}})),p.favoritesRecipesList.addEventListener("click",(function(e){let t=e.target.closest(".see-recipe-btn").dataset.id;(0,l.markupRecipe)(t)})),v(),n("3vTQW");
//# sourceMappingURL=favorites-page.cfbe2734.js.map
