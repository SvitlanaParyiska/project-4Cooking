function e(e,t,s,i){Object.defineProperty(e,t,{get:s,set:i,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var s="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i={},n={},r=s.parcelRequired7c6;null==r&&((r=function(e){if(e in i)return i[e].exports;if(e in n){var t=n[e];delete n[e];var s={id:e,exports:{}};return i[e]=s,t.call(s.exports,s,s.exports),s.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},s.parcelRequired7c6=r),r.register("kyEFX",(function(t,s){var i,n;e(t.exports,"register",(function(){return i}),(function(e){return i=e})),e(t.exports,"resolve",(function(){return n}),(function(e){return n=e}));var r={};i=function(e){for(var t=Object.keys(e),s=0;s<t.length;s++)r[t[s]]=e[t[s]]},n=function(e){var t=r[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),r("kyEFX").register(JSON.parse('{"bTGq4":"favorites-page.73930b0b.js","lp5u4":"sprite.0c854115.svg","b3ZSW":"index.23b74786.js"}')),r("bUb57");var a;a=new URL(r("kyEFX").resolve("lp5u4"),import.meta.url).toString();var o=r("iELe5");const c={favoritesCategoriesList:document.querySelector(".favorites-category-list"),favoritesRecipesList:document.querySelector(".favorites-recipes-list"),emptyStorage:document.querySelector(".empty-storage-js"),listRecipeEl:document.querySelector(".favorites-recipes-list")};let l=[];c.listRecipeEl.addEventListener("click",(function(e){if("BUTTON"!==e.target.nodeName)return;e.target.dataset.id})),async function(){const e=(0,o.load)("favourite");if(!e||0===e.length){const e=`\n  <span>\n  <svg class='favorites-icon' width='97' height='83'>\n    <use href='${t(a)}#icon-favorites'></use>\n  </svg>\n</span>\n<p class='plug-text-favorite'>It appears that you haven't added any recipes to your favorites yet. To get started, you can add recipes that you like to your favorites for easier access in the future.</p>`;c.emptyStorage.innerHTML=e}try{!function(e){const s=e.map((({value:{_id:e,title:s,category:i,description:n,preview:r,rating:o}})=>(l.push(i),`<li class="dishes-list-item" data-id="${e}" data-category="${i}" style="background: linear-gradient(1deg, rgba(5, 5, 5, 0.60) 0%, rgba(5, 5, 5, 0.00) 100%), url(${r}); background-position: center;\n                      background-size: cover;">\n        <button type="button" aria-label="Favorite Button" class="heart-btn js-favourite" data-heart="heart">\n        <svg class="dishes-list-heart-icon">\n        <use href="${t(a)}#icon-heart">\n        </use>\n    </svg>\n</button>\n            \n            <div class="dishes-list-item-wrapper">\n                <h3 class="dishes-list-item-title">${s}</h3>\n                <p class="dishes-list-item-text">${n}</p>\n                <div class="dishes-list-item-wrapper-rating">\n                    <div class="dishes-list-item-wrapper-rating-star">\n                        <p class="dishes-list-item-wrapper-rating-text">${o}</p>\n                        <div class="dishes-list-item-wrapper-rating-star-5">\n                            <svg class="dishes-list-star-icon is-active-star">\n                                <use href="${t(a)}#icon-star">\n                                </use>\n                            </svg>\n                            <svg class="dishes-list-star-icon is-active-star">\n                                <use href="${t(a)}#icon-star">\n                                </use>\n                            </svg>\n                            <svg class="dishes-list-star-icon is-active-star">\n                                <use href="${t(a)}#icon-star">\n                                </use>\n                            </svg>\n                            <svg class="dishes-list-star-icon is-active-star">\n                                <use href="${t(a)}#icon-star">\n                                </use>\n                            </svg>\n                            <svg class="dishes-list-star-icon">\n                                <use href="${t(a)}#icon-star">\n                                </use>\n                            </svg>\n                        </div>\n                    </div>\n                    <button type="button" data-id="${e}" data-recipe-btn="click" class="see-recipe-btn js-see-recipe js-recipe">See recipe</button>\n                </div>\n            </div>\n        </li>`))).join("");c.favoritesRecipesList.innerHTML=s}(await async function(e){const t="https://tasty-treats-backend.p.goit.global/api/recipes/";try{const s=e.map((async e=>(await fetch(`${t}${e}`)).json()));return await Promise.allSettled(s)}catch{throw new Error("ERROR")}}(e));!function(e){const t=e.map((e=>` <li class="fav-search-item">\n          <button type="button" class="fav-search-button">${e}</button>\n        </li>`));c.favoritesCategoriesList.innerHTML=`<li class="fav-search-item">\n          <button type="button" class="fav-search-button all-category-btn">All  categories</button>\n        </li>${t.join("")}`}(l.filter(((e,t,s)=>s.indexOf(e)===t)).sort(((e,t)=>e.localeCompare(t))));document.querySelectorAll(".js-recipe")}catch(e){console.log(e.message)}}();
//# sourceMappingURL=favorites-page.73930b0b.js.map
