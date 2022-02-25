import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";
import makeCard from "./components/makeCard.js";
import { searchProducts } from "./utils/search.js";
import toggle from "./utils/toggle.js";

const productsUrl = baseUrl + "/products";

(async function () {
  try {
    const response = await fetch(productsUrl);
    const products = await response.json();

    makeCard(products, ".product-container");
    toggle(products);
  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".product-container");
  }
})();

/* search products */

const input = document.querySelector("#search-input");
input.addEventListener("input", checkInput);

function checkInput(e) {
  const inputValue = e.target.value;
  searchProducts(inputValue, ".product-container");
}
