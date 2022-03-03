import { baseUrl } from "../settings/api.js";
import { getToken } from "../utils/storage.js";
import displayMessage from "./displayMessage.js";

export default async function addProduct(
  title,
  price,
  description,
  url,
  featured
) {
  const productUrl = baseUrl + "/products";
  const addForm = document.querySelector(".add-products__form");

  const data = JSON.stringify({
    title: title,
    price: price,
    description: description,
    image_url: url,
    featured: featured,
  });

  const token = getToken();

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(productUrl, options);
    const json = await response.json();

    if (json.created_at) {
      displayMessage(
        "success",
        "Product added sucessfully",
        ".add-products__message"
      );
      addForm.reset();
    }

    if (json.error) {
      displayMessage("error", json.message, ".add-products__message");
    }
  } catch (error) {
    console.log(error);
    displayMessage("error", "An error occured", ".add-products__message");
  }
}
