import { displaySubtotal } from "/js/app/cart/checkout/price/displaySubtotal.js";
import { getItemsInLocalStorage } from "/js/utils/storage/getItemsInLocalStorage.js";
import { updateQuantity } from "/js/app/cart/updateCart/updateCartItems.js";
import { loadError } from "/js/utils/auth/messages.js";
import { goToProduct } from "/js/app/components/eventListeners/goToProduct.js";
import {
  INCREASE_ICON_IMG,
  DECREASE_ICON_IMG,
  INCREASE_ICON_ALT,
  DECREASE_ICON_ALT,
  PRICE_NOT_FOUND,
  PRODUCT_NOT_FOUND,
  NO_IMAGE_FOUND_IMG,
  cartContainer,
  CURRENCY_KEY,
} from "/js/utils/general/constants.js";

// Creating the html:
export function renderCartProducts() {
  const cart = getItemsInLocalStorage();

  try {
    if (cartContainer) {
      cartContainer.innerHTML = "";

      cart.forEach((product) => {
        const prodId = product.id || PRODUCT_NOT_FOUND;
        const prodTitle = product.name || `ProductID: ${prodId}`;
        const prodQuantity = product.quantity;

        const prodAlt =
          product.images && product.images.length > 0
            ? product.images[0].alt
            : PRODUCT_NOT_FOUND;
        const prodIMG =
          product.images && product.images.length > 0
            ? product.images[0].src
            : NO_IMAGE_FOUND_IMG;

        let prodPrice = product.price || PRICE_NOT_FOUND;
        const discountPrice = product.sale_price || `${prodPrice}`;
        const priceClass = product.on_sale ? "discount-price" : "";

        if (product.on_sale) {
          prodPrice = discountPrice;
        }

        const addItem = INCREASE_ICON_IMG;
        const removeItem = DECREASE_ICON_IMG;
        const increaseIconAlt = INCREASE_ICON_ALT;
        const decreaseIconAlt = DECREASE_ICON_ALT;

        const cartItems = document.createElement("div");
        cartItems.setAttribute(`data-product-id`, prodId);
        cartItems.classList.add("cartItems");

        const cartImgDiv = document.createElement("div");
        cartImgDiv.classList.add("cartIMG");
        const cartImage = document.createElement("img");
        cartImage.alt = `${prodAlt}`;
        cartImage.src = `${prodIMG}`;
        cartImage.classList.add("cart-image");

        cartImage.addEventListener("click", () => {
          goToProduct(prodId);
        });

        const counterIconContainer = document.createElement("div");
        counterIconContainer.classList.add("counterIconContainer");

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

        counterIconDivDecrease.appendChild(decreaseIcon);
        counterIconContainer.appendChild(counterIconDivDecrease);

        counterIconContainer.appendChild(counter);

        counterIconDivIncrease.appendChild(increaseIcon);
        counterIconContainer.appendChild(counterIconDivIncrease);

        const cartItemTitle = document.createElement("div");
        cartItemTitle.classList.add("cartInfo-title");
        cartItemTitle.innerHTML = `<p><b>${prodTitle}: <span class="${priceClass}">${prodPrice}${CURRENCY_KEY}</span></b></p>`;

        cartItemTitle.addEventListener("click", () => {
          goToProduct(prodId);
        });

        const separationLine = document.createElement("hr");

        cartImgDiv.appendChild(cartImage);
        cartItems.appendChild(cartImgDiv);

        cartItems.appendChild(counterIconContainer);
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
