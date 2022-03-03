import { baseUrl } from "../settings/api.js";
import { getToken } from "../utils/storage.js";
import displayMessage from "./displayMessage.js";

export default function deleteProduct(idValue) {
  const container = document.querySelector(".delete-container");
  const deleteProductsForm = document.querySelector(".delete-products__form");
  container.innerHTML = `<button type="button" class="form__btn delete-btn">Delete Product </button>`;

  const button = document.querySelector("button.delete-btn");

  container.style.display = "block";

  button.onclick = async function () {
    const id = idValue;
    const doDelete = confirm("Are you sure you want to delete this product?");

    if (doDelete) {
      const productUrl = baseUrl + "/products/" + id;
      const token = getToken();

      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(productUrl, options);
        const json = await response.json();

        deleteProductsForm.reset();
        const editContainer = document.querySelectorAll(".edit-products__div");
        const findBtn = document.querySelector(".find-btn");
        const editBtn = document.querySelector(".edit-btn");

        editContainer.forEach(function (div) {
          div.style.display = "none";
        });

        findBtn.style.display = "block";
        editBtn.style.display = "none";
        container.style.display = "none";

        displayMessage(
          "success",
          "Product deleted",
          ".delete-products__message"
        );
      } catch (error) {
        console.log(error);
        displayMessage("error", error, ".delete-products__message");
      }
    }
  };
}
