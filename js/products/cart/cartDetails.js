import { fetchGames } from "/js/api/productsApi.js";
import { loadError, alertMessage } from "/js/components/messages.js";
import { continueShoppingEvent } from "/js/script.js";
import { updateCartCounter } from "../../script.js";
import {
  INCREASE_ICON_ALT,
  DECREASE_ICON_ALT,
  PRICE_NOT_FOUND,
  PRODUCT_NOT_FOUND,
  CART_KEY,
  ITEM_COUNT_KEY,
  NO_IMAGE_FOUND_IMG,
  ORDER_CONFIRMED_KEY,
} from "/js/components/constants.js";

const cartContainer = document.querySelector(".cart-section");

// Initialize cart page when DOM is fully loaded:
document.addEventListener("DOMContentLoaded", async () => {
  await updateCartWithAPI();
  mimicEmptyCart();
  renderCartProducts();
  initItemCounter();
  displaySubtotal();
  continueShoppingEvent();

  const orderConfirmed = localStorage.getItem(ORDER_CONFIRMED_KEY);
  if (orderConfirmed === "true") {
    localStorage.removeItem(CART_KEY);
    localStorage.removeItem(ORDER_CONFIRMED_KEY);
  }
});

// Fetching data from the API upon changes and update items in localStorage if needed:
async function updateCartWithAPI() {
  try {
    const apiData = await fetchGames();
    const localData = getItemsInLocalStorage();

    const updatedCartData = localData.map((localItem) => {
      const apiItem = apiData.data.find(
        (apiItem) => apiItem.id === localItem.id
      );
      return apiItem ? { ...localItem, ...apiItem } : localItem;
    });

    localStorage.setItem(CART_KEY, JSON.stringify(updatedCartData));
  } catch (error) {
    console.log("Error occurred while fetching details:", error);
    loadError();
  }
}

function getItemsInLocalStorage() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

// Incrementing/decrementing cart items + item counter equally:
function updateQuantity(productId, change) {
  const cart = getItemsInLocalStorage();
  const productIndex = cart.findIndex((item) => item.id === productId);

  if (productIndex !== -1) {
    cart[productIndex].quantity += change;

    if (cart[productIndex].quantity < 1) {
      cart.splice(productIndex, 1);
      cartContainer.querySelector(`[data-product-id="${productId}"]`).remove();
    } else {
      document.getElementById(`quantity-${productId}`).textContent =
        cart[productIndex].quantity;
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    calculateTotalPrice();
    updateTotals();
    displaySubtotal();
    mimicEmptyCart();
  }
}

// Creating the html:
function renderCartProducts() {
  const cart = getItemsInLocalStorage();

  try {
    if (cartContainer) {
      cartContainer.innerHTML = "";

      cart.forEach((product) => {
        const prodId = product.id || PRODUCT_NOT_FOUND;
        const prodTitle = product.title || `ProductID: ${prodId}`;
        const prodQuantity = product.quantity;
        const prodIMG = product.image.url || NO_IMAGE_FOUND_IMG;
        const prodAlt = product.image.alt || `Game cover for ${prodTitle}`;
        let prodPrice = product.price || PRICE_NOT_FOUND;
        const discountPrice = product.discountedPrice || `${prodPrice}`;
        const priceClass = product.onSale ? "discount-price" : "";
        const addItem = `../images/add-item.png`;
        const removeItem = `../images/remove-item.png`;
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

function updateTotals() {
  let totalQuantity = 0;
  const allQuantities = document.querySelectorAll(".quantity-number");

  allQuantities.forEach((quantityNumber) => {
    totalQuantity += parseInt(quantityNumber.textContent);
  });

  const itemCounter = document.getElementById("item-counter");
  itemCounter.textContent = totalQuantity;
  localStorage.setItem(ITEM_COUNT_KEY, totalQuantity);
}

function initItemCounter() {
  const itemCounter = document.getElementById("item-counter");
  const currentTotalCount = localStorage.getItem(ITEM_COUNT_KEY);

  if (currentTotalCount) {
    itemCounter.textContent = currentTotalCount;
  } else {
    itemCounter.textContent = 0;
  }
  updateTotals();
}
updateTotals();

// Calculate and display subtotal price:
function displaySubtotal() {
  const cartItems = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  let subtotal = 0;

  cartItems.forEach((product) => {
    let prodPrice = product.price;
    const prodQuantity = product.quantity;

    if (product.onSale) {
      prodPrice = product.discountedPrice;
    }
    subtotal += prodPrice * prodQuantity;
  });

  const subtotalElement = document.getElementById("subtotal-price");
  if (subtotalElement) {
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  }

  return subtotal;
}

// Calculate and display total price:
function calculateTotalPrice() {
  const totalSum = document.querySelector(".totalSum");

  if (totalSum) {
    function displayTotal(subtotal) {
      const selectedDelivery = document.querySelector(
        `input[name="delivery"]:checked`
      );
      const deliveryPrice = selectedDelivery
        ? parseFloat(selectedDelivery.dataset.price)
        : 0;
      const total = subtotal + deliveryPrice;

      const totalPrice = document.querySelector("#total-price");
      totalPrice.textContent = `$${total.toFixed(2)}`;
    }

    document.querySelectorAll(`input[name="delivery"]`).forEach((radio) => {
      radio.addEventListener(`change`, () => {
        const subtotal = displaySubtotal();
        displayTotal(subtotal);
      });
    });
    const cartSub = displaySubtotal();
    displayTotal(cartSub);
  }
}
calculateTotalPrice();

// Hide checkout button if cart is empty:
function mimicEmptyCart() {
  const checkoutButton = document.querySelector("._checkout");
  const subtotalPrice = document.querySelector("#subtotal-price");

  if (checkoutButton) {
    const cartItems = getItemsInLocalStorage();

    if (Array.isArray(cartItems) && cartItems.length < 1) {
      checkoutButton.style.display = "none";
      subtotalPrice.style.display = "none";
    }
  }
}

function clearCartAfterOrderPlaced() {
  const placeOrderBtn = document.querySelector("._placeOrder");

  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", () => {
      sessionStorage.setItem(ORDER_CONFIRMED_KEY, "true");
      window.location.href = "./checkout-success.html";
    });
  }
}

function checkoutSuccess() {
  document.addEventListener("DOMContentLoaded", () => {
    const orderConfirmed = sessionStorage.getItem(ORDER_CONFIRMED_KEY);
    if (orderConfirmed === "true") {
      alertMessage("Order confirmed!");
      sessionStorage.removeItem(ORDER_CONFIRMED_KEY);

      localStorage.removeItem(CART_KEY);
      updateCartCounter();
    }
  });
}

clearCartAfterOrderPlaced();
checkoutSuccess();
