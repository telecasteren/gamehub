import { loadError } from "/js/utils/auth/messages.js";
import {
  cartWindow,
  imageContainer,
  CURRENCY_KEY,
} from "/js/utils/general/constants.js";
import {
  UNKNOWN_KEY,
  PRICE_NOT_FOUND,
  PRODUCT_NOT_FOUND,
  NO_IMAGE_FOUND_IMG,
} from "/js/utils/general/constants.js";

export function gameDetails(product) {
  try {
    if (product) {
      const prodId = product.id || PRODUCT_NOT_FOUND;
      const price = product.price || PRICE_NOT_FOUND;
      const discountPrice = product.sale_price || `${price}`;
      const genre =
        product.categories.map((cat) => cat.name).join(", ") || UNKNOWN_KEY;
      const gameTitle = product.name || `Product Id: ${prodId}`;
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

      const p = document.createElement("p");
      p.classList.add("tagline");

      const genreText = document.createTextNode(`Genre: ${genre}`);
      p.appendChild(genreText);
      p.appendChild(document.createElement("br"));

      const priceText = document.createTextNode(`Price: ${price}`);
      p.appendChild(priceText);

      if (product.on_sale) {
        p.appendChild(document.createElement("br"));

        const discountText = document.createTextNode("Limited offer: ");
        p.appendChild(discountText);

        const discountSpan = document.createElement("span");
        discountSpan.classList.add("discount-price");
        discountSpan.textContent = `${discountPrice} ${CURRENCY_KEY}`;
        p.appendChild(discountSpan);
      }
      gameTag.appendChild(p);

      textContainer.innerHTML = `${gameText}`;

      cartWindow.appendChild(titleHead);
      cartWindow.appendChild(gameTag);

      specificGameImg(product);
    } else {
      cartWindow.innerHTML = `<div class="error">Couldn't load the product.</div>`;
    }

    function specificGameImg(product) {
      const gameImg =
        product.images && product.images.length > 0
          ? product.images[0].src
          : NO_IMAGE_FOUND_IMG;
      const gameAlt =
        product.images && product.images.length > 0
          ? product.images[0].alt
          : `Game cover for ${product.name}`;

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
