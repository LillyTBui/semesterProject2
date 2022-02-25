import { baseUrl } from "../settings/api.js";

export default function searchCard(products, targetElement) {
  const container = document.querySelector(targetElement);
  if (products != "") {
    container.innerHTML = "";
    products.forEach(function (product) {
      container.innerHTML += `<a href="detail.html?id=${product.id}">
        <div class="nav-search__product">
          <img
            class="nav-search__product-img"
            src="${baseUrl}${product.image.formats.medium.url}"
            alt="${product.title}"
          />
          <div class="nav-search__product-info">
            <h7 class="nav-search__product-title">${product.title}</h7>
            <p>$${product.price}5</p>
          </div>
        </div>
      </a>`;
    });
  } else {
    container.innerHTML = `<h5 class="nav-search__error">No products found</h5>`;
  }
}
