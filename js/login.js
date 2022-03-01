import displayMessage from "./components/displayMessage.js";
import { baseUrl } from "./settings/api.js";
import { getToken, saveToken, saveUser } from "./utils/storage.js";
import { getUsername } from "./utils/storage.js";

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

const titleError = document.querySelector("#titleError");
const priceError = document.querySelector("#priceError");
const descriptionError = document.querySelector("#descriptionError");
const urlError = document.querySelector("#urlError");

let validTitle;
let validPrice;
let validDescription;
let validUrl;

if (user) {
  loginContainer.style.display = "none";
  welcome.innerHTML = `<h1 class="user-welcome__title">Welcome ${user}!</h1>`;
  addProducts.style.display = "flex";

  addForm.addEventListener("submit", validateForm);
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

async function addProduct(title, price, description, url, featured) {
  const productUrl = baseUrl + "/products";

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
