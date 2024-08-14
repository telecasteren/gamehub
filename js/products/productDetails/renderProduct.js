import { fetchGames } from "/js/api/productsApi.js";
import { loadError } from "/js/utils/auth/messages.js";
import { addToCartEvent } from "/js/products/productDetails/AddToCartFunctions.js";
import {
  UNKNOWN_KEY,
  PRICE_NOT_FOUND,
  PRODUCT_NOT_FOUND,
  NO_IMAGE_FOUND_IMG,
} from "/js/utils/general/constants.js";

const cartWindow = document.getElementById("cartWindow-box");
const imageContainer = document.querySelector(".prodImg-container");

// Fetching the product by id, creating the html, and calling the add to cart event::
async function specificGame() {
  try {
    const details = await fetchGames();

    const cartButton = document.querySelector(".addToCartBTN").outerHTML;

    imageContainer.innerHTML = "";
    cartWindow.innerHTML = "";

    const gameId = new URLSearchParams(window.location.search).get("gameId");
    const specificProd = details.data.find((product) => product.id === gameId);

    gameDetails(specificProd);

    cartWindow.insertAdjacentHTML("beforeend", cartButton);
    addToCartEvent(specificProd);
  } catch (error) {
    console.log("Error occurred: ", error);
    cartWindow.innerHTML = `<div class="error">An error occurred when loading the product..</div>`;
  }
}
specificGame();

// Creating the HTML for the specific product page
function gameDetails(product) {
  try {
    if (product) {
      const prodId = product.id || PRODUCT_NOT_FOUND;
      const price = product.price || PRICE_NOT_FOUND;
      const discountPrice = product.discountedPrice || `${price}`;
      const genre = product.genre || UNKNOWN_KEY;
      const gameTitle = product.title || `ProductID: ${prodId}`;
      const ageRate = product.ageRating || UNKNOWN_KEY;
      const releaseDate = product.released || UNKNOWN_KEY;
      const gameText = product.description;
      const textContainer = document.querySelector(".productText");

      const pageTitle = document.querySelector("title");
      pageTitle.innerHTML = `GameHub | ${gameTitle}`;

      textContainer.innerHTML = "";

      const titleHead = document.createElement("div");
      titleHead.classList.add("title");
      titleHead.innerHTML = `<p>${gameTitle}</p>`;

      const gameTag = document.createElement("div");
      gameTag.classList.add("tagline");
      gameTag.innerHTML = `<p>
            Ages: ${ageRate}</br>
            Genre: ${genre}</br>
            Price: $${price}</p>`;

      if (product.onSale) {
        gameTag.innerHTML = `<p>
            Ages: ${ageRate}</br>
            Genre: ${genre}</br>
            Price: $${price}</br><b>Now only: <span class="discount-price">${discountPrice}</span></b></p>`;
      }

      textContainer.innerHTML = `<p>About:</br>${gameText}</br></br>Release year: ${releaseDate}</p>`;

      cartWindow.appendChild(titleHead);
      cartWindow.appendChild(gameTag);

      specificGameImg(product);
    } else {
      cartWindow.innerHTML = `<div class="error">Couldn't load the product.</div>`;
    }

    function specificGameImg(product) {
      const gameImg = product.image.url || NO_IMAGE_FOUND_IMG;
      const gameAlt = product.image.alt || `Game cover for ${product.title}`;

      const imgEl = document.createElement("img");
      imgEl.classList.add("productIMG");
      imgEl.src = gameImg;
      imgEl.alt = gameAlt;

      imageContainer.appendChild(imgEl);
    }
  } catch (error) {
    console.log("Error occurred: ", error);
    loadError();
  }
}
