!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},t.parcelRequired7c6=a),a("iE7OH").register(JSON.parse('{"1Z6Xn":"favorites-page.4ecc0a02.js","ee16w":"sprite.f129be79.svg","1sXBe":"index.23da52ff.js"}')),a("i8Q71");var i,s=a("bpxeT"),c=a("8nrFW"),o=a("2TvXO");i=a("aNJCr").getBundleURL("1Z6Xn")+a("iE7OH").resolve("ee16w");var l,u=a("bHHEi"),p=a("dIy1I"),d={favoritesCategoriesList:document.querySelector(".favorites-category-list"),favoritesRecipesList:document.querySelector(".favorites-recipes-list"),emptyStorage:document.querySelector(".empty-storage-js")},f="favourite",v=[],g=null!==(l=(0,p.load)(f))&&void 0!==l?l:[];function h(){return b.apply(this,arguments)}function b(){return(b=e(s)(e(o).mark((function t(){var n,r,a;return e(o).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=g.map((function(e){return e.id})),console.log(n),n&&0!==n.length){e.next=6;break}r=(0,u.createPlugFavoriteMarkup)(),d.emptyStorage.innerHTML=r,e.next=20;break;case 6:return e.prev=6,e.next=9,w(n);case 9:a=e.sent,console.log(a),x(v=m(a)),C(v),k(),e.next=20;break;case 17:e.prev=17,e.t0=e.catch(6),console.log(e.t0.message);case 20:case"end":return e.stop()}}),t,null,[[6,17]])})))).apply(this,arguments)}function w(e){return y.apply(this,arguments)}function y(){return y=e(s)(e(o).mark((function t(n){var r,a;return e(o).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"https://tasty-treats-backend.p.goit.global/api/recipes/",t.prev=1,r=n.map(function(){var t=e(s)(e(o).mark((function t(n){var r;return e(o).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("https://tasty-treats-backend.p.goit.global/api/recipes/").concat(n));case 2:return r=e.sent,e.abrupt("return",r.json());case 4:case"end":return e.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),t.next=5,Promise.allSettled(r);case 5:return a=t.sent,t.abrupt("return",a.map((function(e){return e.value})));case 9:throw t.prev=9,t.t0=t.catch(1),new Error("ERROR");case 12:case"end":return t.stop()}}),t,null,[[1,9]])}))),y.apply(this,arguments)}function m(t){var n=[];return e(c)(new Set(t.map((function(e){return e.category})))).forEach((function(e){var r=t.filter((function(t){return t.category===e}));n.push({categ:e,recipes:r})})),n}function x(e){var t=e.map((function(e){var t=e.categ;return' <li class="fav-search-item">\n          <button type="button" class="fav-search-button">'.concat(t,"</button>\n        </li>")}));d.favoritesCategoriesList.innerHTML='<li class="fav-search-item">\n          <button type="button" class="fav-search-button all-category-btn">All categories</button>\n        </li>'.concat(t.join(""))}function C(t){d.favoritesRecipesList.innerHTML="";var n=t.flatMap((function(t){return t.recipes.map((function(t){var n=t._id,r=t.title,a=t.category,s=t.description,c=t.preview,o=t.rating,l='<svg class="is-active-star">\n      <use href="'.concat(e(i),'#icon-star"></use>\n    </svg>'),u='<svg class="dishes-list-star-icon">\n      <use href="'.concat(e(i),'}#icon-star"></use>\n    </svg>');var p,d;return'<li class="dishes-list-item" data-id="'.concat(n,'" data-category="').concat(a,'" style="background: linear-gradient(1deg, rgba(5, 5, 5, 0.60) 0%, rgba(5, 5, 5, 0.00) 100%), url(').concat(c,'); background-position: center;\n                      background-size: cover;" loading="lazy">\n         ').concat((p=n,d=a,'\n    <div class="heart-wraper" id="'.concat(p,'">\n      <input type="checkbox" class="heart-checkbox" id="').concat(p,'" data-category="').concat(d,'" />\n      <label for="').concat(p,'" class="heart-checkbox-label">\n        <span class="heartOff fav">').concat('<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9937 4.70783C9.16096 2.5652 6.10475 1.98884 3.80845 3.95085C1.51215 5.91285 1.18887 9.19323 2.99216 11.5137C4.49148 13.443 9.02894 17.5121 10.5161 18.8291C10.6825 18.9764 10.7656 19.0501 10.8627 19.0791C10.9474 19.1043 11.04 19.1043 11.1247 19.0791C11.2218 19.0501 11.305 18.9764 11.4713 18.8291C12.9585 17.5121 17.4959 13.443 18.9952 11.5137C20.7985 9.19323 20.5147 5.89221 18.179 3.95085C15.8432 2.00948 12.8264 2.5652 10.9937 4.70783Z" fill="#F8F8F8"/>\n</svg>','</span>\n        <span class="heartOn">').concat('<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">\n  <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M10.9938 4.70783C9.16102 2.5652 6.10481 1.98884 3.80851 3.95085C1.51221 5.91285 1.18893 9.19323 2.99222 11.5137C4.49154 13.443 9.029 17.5121 10.5161 18.8291C10.6825 18.9764 10.7657 19.0501 10.8627 19.0791C10.9474 19.1043 11.0401 19.1043 11.1248 19.0791C11.2218 19.0501 11.305 18.9764 11.4714 18.8291C12.9585 17.5121 17.496 13.443 18.9953 11.5137C20.7986 9.19323 20.5148 5.89221 18.179 3.95085C15.8432 2.00948 12.8265 2.5652 10.9938 4.70783Z" stroke="#F8F8F8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n</svg>',"</span>\n      </label>\n    </div>")),'\n            \n            <div class="dishes-list-item-wrapper-fav">\n                <h3 class="dishes-list-item-title">').concat(r,'</h3>\n                <p class="dishes-list-item-text-fav">').concat(s,'</p>\n                <div class="dishes-list-item-wrapper-rating">\n                    <div class="dishes-list-item-wrapper-rating-star">\n                        <p class="dishes-list-item-wrapper-rating-text">').concat(o.toFixed(1),'</p>\n                        <div class="dishes-list-item-wrapper-rating-star-5">\n                            ').concat(function(e){for(var t="",n=Math.round(e),r=0;r<5;r++)t+=r<n?l:u;return t}(o),'\n                        </div>\n                    </div>\n                    <button type="button" data-id="').concat(n,'" data-recipe-btn="click" class="see-recipe-btn js-see-recipe js-recipe">See recipe</button>\n                </div>\n            </div>\n        </li>')}))}));d.favoritesRecipesList.innerHTML=n.join("")}function k(){document.querySelectorAll(".heart-checkbox").forEach((function(e){e.addEventListener("change",S)}))}function S(e){var t=e.target,n=t.id;console.log(n);t.dataset.category;t.checked&&(index=g.findIndex((function(e){return e.id==n})),g.splice(index,1),localStorage.setItem(f,JSON.stringify(g)),h())}d.favoritesCategoriesList.addEventListener("click",(function(e){var t=e.target.textContent;if("All categories"===t)C(v),k();else{C([v.find((function(e){return e.categ===t}))]),k()}})),h(),a("4m3QF")}();
//# sourceMappingURL=favorites-page.4ecc0a02.js.map
