import { getFromStorage, saveToStorage } from "./utils/storage.js";
import { cartKey } from "./settings/key.js";
import { baseUrl } from "./settings/api.js";

const cartContainer = document.querySelector(".shopping-cart__table");
const totalPrice = document.querySelector(".shopping-cart__total");

const cart = getFromStorage(cartKey);
let totalPriceValue = 0;

if (cart.length === 0) {
  cartContainer.innerHTML = "No products added to cart";
  totalPrice.innerHTML = `<h4 class="shopping-cart__total"><span>Total Price:</span> $${totalPriceValue}</h4>`;
} else {
  showCart();
}

function showCart() {
  const cart = getFromStorage(cartKey);
  let totalPriceValue = 0;
  if (cart.length === 0) {
    cartContainer.innerHTML = "No products added to cart";
    totalPrice.innerHTML = `<h4 class="shopping-cart__total"><span>Total Price:</span> $${totalPriceValue}</h4>`;
  } else {
    cartContainer.innerHTML = "";
    cartContainer.innerHTML = `<tr>
            <th>Product</th>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
            <th>Remove</th>
          </tr>`;
    cart.forEach((product) => {
      totalPriceValue += product.price;
      cartContainer.innerHTML += `<tr>
            <td>
              <img
               class="shopping-cart__img"
                                           src="${baseUrl}${product.image.formats.medium.url}"
                                           alt="${product.title}"
              />
            </td>
            <td>${product.title}</td>
            <td>$${product.price}</td>
            <td><a href="detail.html?id=${product.id}">Link</a></td>
            <td><i class="fa-solid fa-xmark shopping-cart__icon" data-id="${product.id}"></i></td>
          </tr>`;
    });

    totalPrice.innerHTML = `<h4 class="shopping-cart__total"><span>Total Price:</span> $${totalPriceValue}</h4>`;

    const remove = document.querySelectorAll(".shopping-cart__icon");

    remove.forEach((btn) => {
      btn.addEventListener("click", handleClick);
    });

    function handleClick() {
      const id = this.dataset.id;
      const newCart = cart.filter((product) => product.id != id);
      saveToStorage(cartKey, newCart);
      showCart();
    }
  }
}
