import { baseUrl } from "../settings/api.js";
import { getToken } from "../utils/storage.js";
import displayMessage from "./displayMessage.js";

export default function editProduct(id) {
  const deleteProductsForm = document.querySelector(".delete-products__form");
  const editFeatured = document.querySelector("#edit-featured");
  const editImage = document.querySelector("#edit-image");
  const editDescription = document.querySelector("#edit-description");
  const editPrice = document.querySelector("#edit-price");
  const editTitle = document.querySelector("#deleteTitle");

  const container = document.querySelector(".edit-container");
  container.innerHTML = `<button type="button" class="form__btn edit-btn">Edit Product </button>`;
  container.style.display = "block";

  const button = document.querySelector("button.edit-btn");

  button.onclick = async function () {
    const url = baseUrl + "/products/" + id;
    const data = JSON.stringify({
      title: editTitle.value,
      price: editPrice.value,
      description: editDescription.value,
      image_url: editImage.value,
      featured: editFeatured.checked,
    });

    const token = getToken();

    const options = {
      method: "PUT",
      body: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();

      if (json.updated_at) {
        deleteProductsForm.reset();
        const editContainer = document.querySelectorAll(".edit-products__div");
        const findBtn = document.querySelector(".find-btn");
        const deleteBtn = document.querySelector(".delete-btn");

        editContainer.forEach(function (div) {
          div.style.display = "none";
        });

        findBtn.style.display = "block";
        deleteBtn.style.display = "none";
        container.style.display = "none";

        displayMessage(
          "success",
          "Product updated",
          ".delete-products__message"
        );
      }

      if (json.error) {
        displayMessage("error", json.message, ".delete-products__message");
      }
    } catch (error) {
      console.log(error);
    }
  };
}
