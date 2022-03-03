import displayMessage from "./components/displayMessage.js";
import { baseUrl } from "./settings/api.js";
import { saveToken, saveUser } from "./utils/storage.js";
import { getUsername } from "./utils/storage.js";
import deleteProduct from "./components/deleteProduct.js";
import editProduct from "./components/editProduct.js";
import addProduct from "./components/addProduct.js";

const form = document.querySelector(".form__container");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".login__message");
const loginContainer = document.querySelector(".login");

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const usernameInput = username.value.trim();
  const passwordInput = password.value.trim();

  if (usernameInput.length === 0 || passwordInput.length === 0) {
    return displayMessage(
      "warning",
      "Incorrect input values",
      ".login__message"
    );
  }

  doLogin(usernameInput, passwordInput);
}

async function doLogin(username, password) {
  const url = baseUrl + "/auth/local";

  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.user) {
      saveToken(json.jwt);
      saveUser(json.user);

      location.reload();
    }

    if (json.error) {
      displayMessage("warning", "Invalid login details", ".login__message");
    }
  } catch (error) {
    console.log(error);
  }
}

const user = getUsername();
const welcome = document.querySelector(".user-welcome");
const addProducts = document.querySelector(".add-products");
const imageUrl = document.querySelector("#image");
const addForm = document.querySelector(".add-products__form");
const addFormMessage = document.querySelector(".add-products__message");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const featured = document.getElementById("featured");
const deleteProducts = document.querySelector(".delete-products");
const deleteTitle = document.querySelector("#deleteTitle");

const titleError = document.querySelector("#titleError");
const priceError = document.querySelector("#priceError");
const descriptionError = document.querySelector("#descriptionError");
const urlError = document.querySelector("#urlError");
const deleteError = document.querySelector("#deleteTitleError");

const editFeatured = document.querySelector("#edit-featured");
const editImage = document.querySelector("#edit-image");
const editDescription = document.querySelector("#edit-description");
const editPrice = document.querySelector("#edit-price");

const findBtn = document.querySelector(".find-btn");

let validTitle;
let validPrice;
let validDescription;
let validUrl;

if (user) {
  loginContainer.style.display = "none";
  welcome.innerHTML = `<h1 class="user-welcome__title">Welcome ${user}!</h1>`;
  addProducts.style.display = "flex";
  deleteProducts.style.display = "flex";

  addForm.addEventListener("submit", validateForm);
  deleteProducts.addEventListener("submit", deleteButton);
}

function deleteButton(event) {
  event.preventDefault();
  const deleteValue = deleteTitle.value;

  if (deleteValue.trim().length > 1) {
    findProduct(deleteValue);
  } else {
    deleteError.style.display = "block";
    displayMessage(
      "warning",
      "Could not find product",
      ".delete-products__message"
    );
  }
}

async function findProduct(title) {
  const url = baseUrl + "/products";
  try {
    const response = await fetch(url);
    const products = await response.json();

    const productExists = products.filter(
      (product) => product.title.toLowerCase() === title.toLowerCase()
    );

    if (productExists) {
      displayMessage("success", "Found product", ".delete-products__message");
      deleteError.style.display = "none";

      editPrice.value = productExists[0].price;
      editDescription.value = productExists[0].description;
      editImage.value = productExists[0].image_url;
      editFeatured.checked = productExists[0].featured;

      const editContainer = document.querySelectorAll(".edit-products__div");

      editContainer.forEach(function (div) {
        div.style.display = "block";
      });

      findBtn.style.display = "none";

      const id = productExists[0].id;
      deleteProduct(id);
      editProduct(id);
    }
  } catch (error) {
    console.log(error);
    deleteError.style.display = "block";
    displayMessage(
      "warning",
      "Could not find product",
      ".delete-products__message"
    );
  }
}

function validateForm(event) {
  event.preventDefault();
  validTitle = false;
  validPrice = false;
  validDescription = false;
  validUrl = false;

  addFormMessage.innerHTML = "";

  if (title.value.trim().length > 3) {
    titleError.style.display = "none";
    validTitle = true;
  } else {
    titleError.style.display = "block";
  }

  if (price.value > 10 && isNaN(price.value) === false) {
    priceError.style.display = "none";
    validPrice = true;
  } else {
    priceError.style.display = "block";
  }

  if (description.value.trim().length > 10) {
    descriptionError.style.display = "none";
    validDescription = true;
  } else {
    descriptionError.style.display = "block";
  }

  if (imageUrl.value.trim().length > 0) {
    urlError.style.display = "none";
    validUrl = true;
  } else {
    urlError.style.display = "block";
  }

  if (validTitle && validPrice && validDescription && validUrl) {
    addProduct(
      title.value,
      price.value,
      description.value,
      imageUrl.value,
      featured.checked
    );
  } else {
    return displayMessage(
      "warning",
      "Please fill in all input fields",
      ".add-products__message"
    );
  }
}
