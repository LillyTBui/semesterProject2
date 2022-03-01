import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";
import makeCard from "./components/makeCard.js";
import createCarousel from "./components/carousel.js";
import { saveToStorage, getFromStorage } from "./utils/storage.js";
import { similarKey, favoriteKey, cartKey } from "./settings/key.js";
import toggle from "./utils/toggle.js";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

if (!id) {
  document.location.href = "/";
}

const productUrl = baseUrl + "/products/" + id;
const favouriteProducts = getFromStorage(favoriteKey);
const cartArray = getFromStorage(cartKey);

(async function () {
  try {
    const response = await fetch(productUrl);
    const details = await response.json();

    document.title = details.title;

    const container = document.querySelector(".detail-container");
    const imageContainer = document.querySelector(".detail-container__img");
    const breadcrumb = document.querySelector(
      ".productHeader__breadcrumbs__product"
    );

    let cssClass = "fa-regular";
    let cartCssClass = "btn-add";
    let cartText = "Add to cart";

    const productExist = favouriteProducts.find(
      (fav) => parseInt(fav.id) === details.id
    );

    const productCart = cartArray.find(
      (product) => parseInt(product.id) === details.id
    );

    if (productCart) {
      cartText = "Remove from cart";
      cartCssClass = "btn-remove";
    }

    if (productExist) {
      cssClass = "fa-solid";
    }

    breadcrumb.innerHTML = `${details.title}`;
    imageContainer.innerHTML = `<div class="detail-img-container">
                                        <img
                                          class="detail-img"
                                          src="${details.image_url}"
                                          alt="${details.title}"
                                        /></div>`;
    container.innerHTML = `
    <h1>${details.title}</h1>
        <h4>$${details.price}</h4>
        <p>
          ${details.description}
        </p>
        <button type="button" class="product-detail__favorite">
          <i class="${cssClass} fa-heart" data-id="${details.id}"></i>
        </button>
        <button type="button" class="product-detail__add-to-cart ${cartCssClass}" data-id="${details.id}">
          ${cartText}
        </button>
    `;

    const cartBtn = document.querySelectorAll(".product-detail__add-to-cart");

    cartBtn.forEach(function (btn) {
      btn.addEventListener("click", addToCart);
    });

    function addToCart() {
      cartBtn[0].classList.toggle("btn-remove");
      cartBtn[0].classList.toggle("btn-add");
      const currentCart = getFromStorage(cartKey);
      const id = this.dataset.id;
      const productExist = currentCart.find(function (product) {
        return parseInt(product.id) === parseInt(id);
      });

      if (productExist === undefined) {
        cartBtn[0].innerText = "Remove from cart";
        currentCart.push(details);
        saveToStorage(cartKey, currentCart);
      } else {
        cartBtn[0].innerText = "Add to cart";
        const removeProduct = currentCart.filter(
          (product) => parseInt(product.id) !== parseInt(id)
        );
        saveToStorage(cartKey, removeProduct);
      }
    }

    //toggle(details);
  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".detail-container");
  }
})();

/* similar products */
const productsUrl = baseUrl + "/products";
const maxProducts = 4;

(async function () {
  try {
    const response = await fetch(productsUrl);
    const products = await response.json();

    const filteredArray = products.filter((product) => product.id != id);
    let productsArray = [];
    const randomId = Math.floor(Math.random() * filteredArray.length);
    let product = filteredArray[randomId];
    productsArray.push(product);

    let i = 0;
    while (i < maxProducts) {
      const randomIndex = Math.floor(Math.random() * filteredArray.length);
      let duplicate = false;
      productsArray.forEach(function (product) {
        if (product.id == filteredArray[randomIndex].id) {
          duplicate = true;
        }
      });

      if (duplicate == false) {
        let product = filteredArray[randomIndex];
        productsArray.push(product);
        i++;
      }
    }
    makeCard(productsArray, ".product-carousel__container");
    saveToStorage(similarKey, maxProducts);
  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".product-carousel__container");
  }
})();

createCarousel(similarKey);
