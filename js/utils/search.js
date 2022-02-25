import { baseUrl } from "../settings/api.js";
import searchCard from "../components/searchCard.js";
import displayMessage from "../components/displayMessage.js";
import makeCard from "../components/makeCard.js";

const navSearch = document.querySelector("#search-input-nav");
const navSearch_container = document.querySelector(".nav-search");
const navSearch_close = document.querySelector(".nav-search__icon");
const productsUrl = baseUrl + "/products";

navSearch.addEventListener("input", checkInputNav);
navSearch_close.addEventListener("click", function () {
  navSearch_container.style.visibility = "hidden";
});

function checkInputNav(e) {
  const inputValue = e.target.value;
  if (inputValue != "") {
    navSearch_container.style.visibility = "visible";
  } else {
    navSearch_container.style.visibility = "hidden";
  }

  searchProducts(inputValue, ".nav-search__products-container");
}

async function searchProducts(input, targetElement) {
  try {
    const response = await fetch(productsUrl);
    const products = await response.json();
    const value = input.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(value) == true ||
        product.description.toLowerCase().includes(value) == true
    );

    if (targetElement == ".product-container") {
      makeCard(filtered, targetElement);
    } else if (targetElement == ".nav-search__products-container") {
      searchCard(filtered, targetElement);
    }
  } catch (error) {
    displayMessage("error", "No products found", targetElement);
  }
}

export { searchProducts };
