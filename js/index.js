import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";
import makeCard from "./components/makeCard.js";
import createCarousel from "./components/carousel.js";
import { saveToStorage } from "./utils/storage.js";
import { maxCard } from "./settings/key.js";

const url = baseUrl + "/home";

(async function getHero() {
  const imgContainer = document.querySelector(".hero__img-container");

  try {
    const response = await fetch(url);
    const hero = await response.json();

    imgContainer.innerHTML = ` 
          <img
            src="${baseUrl}${hero.hero_banner.formats.medium.url}"
            alt="${hero.hero_banner_alt_text}"
            class="hero__img"
          />`;
  } catch (error) {
    displayMessage("error", error, ".hero");
  }
})();

const productsUrl = baseUrl + "/products";

(async function getProducts() {
  let featuredProducts = [];
  let maxProducts = 0;

  try {
    const response = await fetch(productsUrl);
    const products = await response.json();

    products.forEach(function (product) {
      if (product.featured == true) {
        maxProducts++;
        featuredProducts.push(product);
      }
    });

    makeCard(featuredProducts, ".product-carousel__container");
    saveToStorage(maxCard, maxProducts);
  } catch (error) {
    displayMessage("error", error, ".product-carousel__container");
  }
})();

createCarousel(maxCard);
