import { favoriteKey } from "../settings/key.js";
import { saveToStorage, getFromStorage } from "./storage.js";

export default function toggle(products) {
  const heartIcons = document.querySelectorAll(
    ".card-icon__container .fa-heart"
  );

  heartIcons.forEach(function (product) {
    product.addEventListener("click", handleClick);
  });

  function handleClick(event) {
    event.target.classList.toggle("fa-solid");
    event.target.classList.toggle("fa-regular");
    const id = event.target.dataset.id;
    const currentFavs = getFromStorage(favoriteKey);

    const checkProduct = currentFavs.find(function (product) {
      return parseInt(product.id) == id;
    });

    if (!checkProduct) {
      const currentProduct = products.find((product) => product.id == id);
      if (currentProduct !== null) {
        currentFavs.push(currentProduct);
        saveToStorage(favoriteKey, currentFavs);
      }
    } else {
      const newList = currentFavs.filter(
        (product) => product.id.toString() !== id
      );
      if (newList !== null) {
        saveToStorage(favoriteKey, newList);
      }
    }
  }
}
