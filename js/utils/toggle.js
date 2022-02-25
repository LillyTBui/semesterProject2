import { favoriteKey } from "../settings/key.js";
import { saveToStorage, getFromStorage } from "./storage.js";

export default function toggle(products) {
  const heartIcons = document.querySelectorAll(".fa-heart");

  heartIcons.forEach(function (product) {
    product.addEventListener("click", handleClick);
  });

  function handleClick(event) {
    event.target.classList.toggle("fa-solid");
    event.target.classList.toggle("fa-regular");
    const id = event.target.dataset.id;
    const currentFavs = getFromStorage(favoriteKey);

    const checkProduct = currentFavs.find(function (product) {
      return product.id.toString() == id.toString();
    });

    if (products.length > 0 && !checkProduct) {
      const currentProduct = products.find((product) => product.id == id);
      currentFavs.push(currentProduct);
      saveToStorage(favoriteKey, currentFavs);
    } else if (checkProduct === undefined) {
      currentFavs.push(products);
      saveToStorage(favoriteKey, currentFavs);
    } else {
      const newList = currentFavs.filter(
        (product) => product.id.toString() !== id
      );
      saveToStorage(favoriteKey, newList);
    }
  }
}
