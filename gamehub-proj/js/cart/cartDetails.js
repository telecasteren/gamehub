import { fetchGameDetails } from "../api/gameApi.js";
import { loadError } from "../components/errorMessages.js";
import { continueShoppingEvent } from "../components/continueShopping.js";

// Hide checkout button if cart is empty:
function emptyCart() {
  const checkoutButton = document.querySelector("._checkout");
  const subtotalPrice = document.querySelector("#subtotal-price");

  const cartItems = getItemsInLocalStorage();

  if (Array.isArray(cartItems) && cartItems.length < 1) {
    checkoutButton.style.display = "none";
    subtotalPrice.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  emptyCart();
  loadCartItems();
  initItemCounter();
  cartDetails();
  displaySubtotal();
  continueShoppingEvent();
});

async function cartDetails() {
  try {
    const details = await fetchGameDetails();
  } catch (error) {
    console.error("Error occurred: ", error);
    loadError();
  }
}

function getItemsInLocalStorage() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function loadCartItems() {
  const cartContainer = document.querySelector(".cart-section");
  const cart = getItemsInLocalStorage();

  try {
    cartContainer.innerHTML = "";

    cart.forEach((product) => {
      const prodId = product.id;
      const prodTitle = product.title;
      const prodQuantity = product.quantity;
      const prodIMG = product.image.url;
      const prodAlt = product.image.alt;
      let prodPrice = product.price;
      const discountPrice = product.discountedPrice;
      const priceClass = product.onSale ? "discount-price" : "";

      if (product.onSale) {
        prodPrice = discountPrice;
      }

      const eachItemInCartHtml = `
    <div class="cart-items" data-product-id="${prodId}">
        <div class="cartIMG">
          <img class="cart-image" src="${prodIMG}"
          alt="${prodAlt || `Game cover for ${prodTitle}`}">
        </div>
        <div class="counter-icon-div">
          <img class="increase-icon" src="../images/add-item.png" alt="plus icon for adding items in cart">
        </div>
        <div class="quantity-number" id="quantity-${prodId}">
        ${prodQuantity}
        </div>
        <div class="counter-icon-div">
          <img class="decrease-icon" src="../images/remove-item.png" alt="minus icon for removing items in cart">
        </div>
        <div class="cartInfo-title"><p><b>${prodTitle}</b>
        - full game + digital soundtrack: <b><span class="${priceClass}">$${prodPrice}</span></b></p></div>
      </div>
      <div><hr /></div>
    `;

      cartContainer.innerHTML += eachItemInCartHtml;
    });
    displaySubtotal();
    initCartItemEvents();
  } catch (error) {
    console.error("Error occurred: ", error);
    loadError();
  }
  emptyCart();
}

// ---------
// Incrementing/decrementing cart items + updating NAV cart-items badge equally:
function initCartItemEvents() {
  const cartItems = document.querySelectorAll(".cart-items");

  cartItems.forEach((item) => {
    const increaseNumber = item.querySelector(".increase-icon");
    const decreaseNumber = item.querySelector(".decrease-icon");
    const quantityNumber = item.querySelector(".quantity-number");
    const productId = item.dataset.productId;

    increaseNumber.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const product = cart.find((item) => item.id === productId);

      product.quantity++;
      quantityNumber.textContent = product.quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateTotals();
      displaySubtotal();
      emptyCart();
    });

    decreaseNumber.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const productIndex = cart.findIndex((item) => item.id === productId);

      if (productIndex !== -1) {
        if (cart[productIndex].quantity > 1) {
          cart[productIndex].quantity--;
          quantityNumber.textContent = cart[productIndex].quantity;
        } else {
          cart.splice(productIndex, 1);
          item.remove();
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateTotals();
        displaySubtotal();
        emptyCart();
      }
    });
  });
}

function updateTotals() {
  let totalQuantity = 0;
  const allQuantities = document.querySelectorAll(".quantity-number");

  allQuantities.forEach((quantityNumber) => {
    totalQuantity += parseInt(quantityNumber.textContent);
  });

  const itemCounter = document.getElementById("item-counter");
  itemCounter.textContent = totalQuantity;
  localStorage.setItem("itemCounter", totalQuantity);
}

function initItemCounter() {
  const itemCounter = document.getElementById("item-counter");
  const currentTotalCount = localStorage.getItem("itemCounter");

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
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
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
  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;

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

// ------------------------ TO DO:
// - DEPLOY AND TEST
// - CLEAN UP ALL CODE AND STRUCTURE - REWRITE: eachItemInCartHtml at cartDetails.js
// - Check all loaders throughout all pages
// - ERROR HANDLING in general
// EXTRAS:
// - HOME page: Style the overall design, title and description
// - Add working filtering functionality in search in products page
// - Profile page, mimic user login etc
// -----------------------------------------------------------------
