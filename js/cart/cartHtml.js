import { displaySubtotal } from "/js/cart/checkout/displaySubtotal.js";
import { getItemsInLocalStorage } from "/js/utils/storage/getItemsInLocalStorage.js";
import { updateQuantity } from "/js/cart/updateCart/updateCartItems.js";
import { loadError } from "/js/utils/auth/messages.js";
import {
  INCREASE_ICON_IMG,
  DECREASE_ICON_IMG,
  INCREASE_ICON_ALT,
  DECREASE_ICON_ALT,
  PRICE_NOT_FOUND,
  PRODUCT_NOT_FOUND,
  NO_IMAGE_FOUND_IMG,
  cartContainer,
} from "/js/utils/general/constants.js";

// Creating the html:
export function renderCartProducts() {
  const cart = getItemsInLocalStorage();

  try {
    if (cartContainer) {
      cartContainer.innerHTML = "";

      cart.forEach((product) => {
        const prodId = product.id || PRODUCT_NOT_FOUND;
        const prodTitle = product.title || `ProductID: ${prodId}`;
        const prodQuantity = product.quantity;
        const prodIMG =
          product.image && product.image.url
            ? product.image.url
            : NO_IMAGE_FOUND_IMG;
        const prodAlt =
          product.image && product.image.alt
            ? product.image.alt
            : `Game cover for ${prodTitle}`;
        let prodPrice = product.price || PRICE_NOT_FOUND;
        const discountPrice = product.discountedPrice || `${prodPrice}`;
        const priceClass = product.onSale ? "discount-price" : "";
        const addItem = INCREASE_ICON_IMG;
        const removeItem = DECREASE_ICON_IMG;
        const increaseIconAlt = INCREASE_ICON_ALT;
        const decreaseIconAlt = DECREASE_ICON_ALT;

        if (product.onSale) {
          prodPrice = discountPrice;
        }

        const cartItems = document.createElement("div");
        cartItems.setAttribute(`data-product-id`, prodId);

        const cartImgDiv = document.createElement("div");
        cartImgDiv.classList.add("cartIMG");
        const cartImage = document.createElement("img");
        cartImage.alt = `${prodAlt}`;
        cartImage.src = `${prodIMG}`;
        cartImage.classList.add("cart-image");

        const counterIconDivIncrease = document.createElement("div");
        counterIconDivIncrease.classList.add("counter-icon-div");

        const increaseIcon = document.createElement("img");
        increaseIcon.src = `${addItem}`;
        increaseIcon.alt = `${increaseIconAlt}`;
        increaseIcon.classList.add("increase-icon");
        increaseIcon.addEventListener("click", () => {
          updateQuantity(prodId, 1);
        });

        const counter = document.createElement("div");
        counter.classList.add("quantity-number");
        counter.id = `quantity-${prodId}`;
        counter.innerHTML = `${prodQuantity}`;

        const counterIconDivDecrease = document.createElement("div");
        counterIconDivDecrease.classList.add("counter-icon-div");

        const decreaseIcon = document.createElement("img");
        decreaseIcon.src = `${removeItem}`;
        decreaseIcon.alt = `${decreaseIconAlt}`;
        decreaseIcon.classList.add("decrease-icon");
        decreaseIcon.addEventListener("click", () => {
          updateQuantity(prodId, -1);
        });

        const cartItemTitle = document.createElement("div");
        cartItemTitle.classList.add("cartInfo-title");
        cartItemTitle.innerHTML = `<p><b>${prodTitle}</b>
              - full game: <b><span class="${priceClass}">$${prodPrice}</span></b></p>`;

        const separationLine = document.createElement("hr");

        cartImgDiv.appendChild(cartImage);
        cartItems.appendChild(cartImgDiv);

        counterIconDivIncrease.appendChild(increaseIcon);
        cartItems.appendChild(counterIconDivIncrease);

        cartItems.appendChild(counter);

        counterIconDivDecrease.appendChild(decreaseIcon);
        cartItems.appendChild(counterIconDivDecrease);

        cartItems.appendChild(cartItemTitle);

        cartContainer.appendChild(cartItems);
        cartContainer.appendChild(separationLine);
      });
    }

    displaySubtotal();
  } catch (error) {
    console.error("Error occurred: ", error);
    loadError();
  }
}
