function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s={},i={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in s)return s[e].exports;if(e in i){var t=i[e];delete i[e];var a={id:e,exports:{}};return s[e]=a,t.call(a.exports,a,a.exports),a.exports}var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){i[e]=t},t.parcelRequired7c6=a),a("kyEFX").register(JSON.parse('{"bTGq4":"favorites-page.bde63353.js","lp5u4":"sprite.f129be79.svg","b3ZSW":"index.58116f26.js"}')),a("bUb57");var n;n=new URL(a("kyEFX").resolve("lp5u4"),import.meta.url).toString();var r=a("ey8Ff"),o=a("iELe5");const c={favoritesCategoriesList:document.querySelector(".favorites-category-list"),favoritesRecipesList:document.querySelector(".favorites-recipes-list"),emptyStorage:document.querySelector(".empty-storage-js"),listRecipeEl:document.querySelector(".favorites-recipes-list")};let l=[],u=[];c.listRecipeEl.addEventListener("click",(function(e){if("BUTTON"!==e.target.nodeName)return;e.target.dataset.id})),async function(){const t=(0,o.load)("favourite");if(!t||0===t.length){const e=(0,r.createPlugFavoriteMarkup)();c.emptyStorage.innerHTML=e}try{!function(t){const s=t.map((({value:{_id:t,title:s,category:i,description:a,preview:r,rating:o}})=>(l.push(i),u.push({categ:[i],id:[t]}),`<li class=" dishes-list-item-fav" data-id="${t}" data-category="${i}" style="background: linear-gradient(1deg, rgba(5, 5, 5, 0.60) 0%, rgba(5, 5, 5, 0.00) 100%), url(${r}); background-position: center;\n                      background-size: cover;">\n        <button type="button" aria-label="Favorite Button" class="heart-btn js-favourite" data-heart="heart">\n        <svg class="dishes-list-heart-icon">\n        <use href="${e(n)}#icon-heart">\n        </use>\n    </svg>\n</button>\n            \n            <div class="dishes-list-item-wrapper-fav">\n                <h3 class="dishes-list-item-title">${s}</h3>\n                <p class="dishes-list-item-text-fav">${a}</p>\n                <div class="dishes-list-item-wrapper-rating">\n                    <div class="dishes-list-item-wrapper-rating-star">\n                        <p class="dishes-list-item-wrapper-rating-text">${o}</p>\n                        <div class="dishes-list-item-wrapper-rating-star-5">\n                            <svg class="dishes-list-star-icon is-active-star">\n                                <use href="${e(n)}#icon-star">\n                                </use>\n                            </svg>\n                            <svg class="dishes-list-star-icon is-active-star">\n                                <use href="${e(n)}#icon-star">\n                                </use>\n                            </svg>\n                            <svg class="dishes-list-star-icon is-active-star">\n                                <use href="${e(n)}#icon-star">\n                                </use>\n                            </svg>\n                            <svg class="dishes-list-star-icon is-active-star">\n                                <use href="${e(n)}#icon-star">\n                                </use>\n                            </svg>\n                            <svg class="dishes-list-star-icon">\n                                <use href="${e(n)}#icon-star">\n                                </use>\n                            </svg>\n                        </div>\n                    </div>\n                    <button type="button" data-id="${t}" data-recipe-btn="click" class="see-recipe-btn js-see-recipe js-recipe">See recipe</button>\n                </div>\n            </div>\n        </li>`))).join("");c.favoritesRecipesList.innerHTML=s}(await async function(e){const t="https://tasty-treats-backend.p.goit.global/api/recipes/";try{const s=e.map((async e=>(await fetch(`${t}${e}`)).json()));return await Promise.allSettled(s)}catch{throw new Error("ERROR")}}(t));!function(e){const t=e.map((e=>` <li class="fav-search-item">\n          <button type="button" class="fav-search-button">${e}</button>\n        </li>`));c.favoritesCategoriesList.innerHTML=`<li class="fav-search-item">\n          <button type="button" class="fav-search-button all-category-btn">All  categories</button>\n        </li>${t.join("")}`}(l.filter(((e,t,s)=>s.indexOf(e)===t)).sort(((e,t)=>e.localeCompare(t))));document.querySelectorAll(".js-recipe")}catch(e){console.log(e.message)}}(),console.log(u),a("3vTQW");
//# sourceMappingURL=favorites-page.bde63353.js.map