import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";
import makeCard from "./components/makeCard.js";
import { searchProducts } from "./utils/search.js";
import toggle from "./utils/toggle.js";

const productsUrl = baseUrl + "/products";
const sortBy = document.querySelector(".sortby__select");
const sortByValue = sortBy.value;

displayProducts(sortByValue);

sortBy.addEventListener("change", sortProducts);

function sortProducts() {
  const value = sortBy.value;
  displayProducts(value);
}

async function displayProducts(value) {
  try {
    const response = await fetch(productsUrl);
    const products = await response.json();
    let sortArray;

    if (value === "highest") {
      sortArray = products.sort(function (productA, productB) {
        return productB.price - productA.price;
      });
    } else {
      sortArray = products.sort(function (productA, productB) {
        return productA.price - productB.price;
      });
    }

    makeCard(sortArray, ".product-container");
    toggle(sortArray);
  } catch (error) {
    console.log(error);
    displayMessage("error", "No products found", ".product-container");
  }
}

/* search products */

const input = document.querySelector("#search-input");
input.addEventListener("input", checkInput);

function checkInput(e) {
  const inputValue = e.target.value;
  searchProducts(inputValue, ".product-container");
}
