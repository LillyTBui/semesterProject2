import { getFromStorage } from "./utils/storage.js";
import { favoriteKey } from "./settings/key.js";
import displayMessage from "./components/displayMessage.js";

const favProducts = getFromStorage(favoriteKey);
const container = document.querySelector(".favorite-container");

console.log(favProducts);

if (!favProducts) {
  console.log("n");
} else {
  container.innerHTML = `<div>
  <p>No products added to favorites</p>
  </div>`;
}
