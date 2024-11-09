import { goToProduct } from "/js/app/components/eventListeners/goToProduct.js";
import {
  UNKNOWN_KEY,
  wrapper,
  NO_IMAGE_FOUND_IMG,
  PRODUCT_NOT_FOUND,
  PRICE_NOT_FOUND,
  CURRENCY_KEY,
} from "/js/utils/general/constants.js";

export function renderProduct(game) {
  try {
    const gameID = game.id || UNKNOWN_KEY;
    const price = game.price || PRICE_NOT_FOUND;
    const discountPrice = game.sale_price || `${price}`;

    const gameTitle = game.name || `Product Id: ${gameID}`;
    const gameAlt =
      game.images && game.images.length > 0
        ? game.images[0].alt
        : PRODUCT_NOT_FOUND;
    const gameImg =
      game.images && game.images.length > 0
        ? game.images[0].src
        : NO_IMAGE_FOUND_IMG;

    const prodDiv = document.createElement("div");
    prodDiv.classList.add("product-container");

    const imgElement = document.createElement("img");
    imgElement.classList.add("products");
    imgElement.src = gameImg;
    imgElement.alt = gameAlt;

    const overlayDiv = document.createElement("div");
    overlayDiv.classList.add("overlay");

    const textDiv = document.createElement("div");
    textDiv.classList.add("overlayText");
    textDiv.innerHTML = `
    ${gameTitle}<br>
    Price: ${price}${CURRENCY_KEY}`;

    if (game.on_sale) {
      textDiv.innerHTML = `
    ${gameTitle}<br>
    Limited offer: ${discountPrice}${CURRENCY_KEY}`;
    }

    overlayDiv.appendChild(textDiv);
    prodDiv.appendChild(imgElement);
    prodDiv.appendChild(overlayDiv);
    wrapper.appendChild(prodDiv);

    overlayDiv.addEventListener("click", () => {
      goToProduct(gameID);
    });
  } catch (error) {
    console.error("Error occurred: ", error);
    wrapper.innerHTML = `<div class="error">An error occurred in displaying the products..</div>`;
  }
}
