import { getFromStorage } from "../utils/storage.js";
import { favoriteKey } from "../settings/key.js";

export default function makeCard(products, targetElement) {
  const container = document.querySelector(targetElement);
  container.innerHTML = "";

  const favouriteProducts = getFromStorage(favoriteKey);

  if (products != "") {
    products.forEach(function (product) {
      let cssClass = "fa-regular";

      const productExist = favouriteProducts.find(
        (fav) => parseInt(fav.id) === product.id
      );

      if (productExist) {
        cssClass = "fa-solid";
      }

      container.innerHTML += `
                                      <div class="card carousel__card">
                                       <a href="detail.html?id=${product.id}">
                                        <img
                                           class="card-img-top card__img-top"
                                           src="${product.image_url}"
                                           alt="${product.title}"
                                        />
                                       </a>
                                       <a href="detail.html?id=${product.id}">
                                        <div class="card-body card__body">
                                           <h5 class="card-title card__title">
                                             ${product.title}
                                           </h5>
                                           <p class="card-text card__text">
                                             $${product.price}
                                            </p>
                                        </div>
                                      </a>
                                      <div class="card-icon__container">
                                      <i class="${cssClass} fa-heart card__icon" data-id="${product.id}"></i>
                                      </div
                                      
                                    </div>
                             `;
    });
  } else {
    container.innerHTML = `
    <div class="card-error">
      <h5>No products found</h5>
    </div>`;
  }
}
