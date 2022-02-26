import { getFromStorage, saveToStorage } from "./utils/storage.js";
import { favoriteKey } from "./settings/key.js";
import makeCard from "./components/makeCard.js";
import toggle from "./utils/toggle.js";

const favProducts = getFromStorage(favoriteKey);
const container = document.querySelector(".product-container");

//some error with null when loading the site
const newList = favProducts.filter((product) => product !== null);

saveToStorage(favoriteKey, newList);

if (favProducts) {
  makeCard(newList, ".product-container");
  toggle(newList);
} else {
  container.innerHTML = `<div>
  <p>No products added to favorites</p>
  </div>`;
}
