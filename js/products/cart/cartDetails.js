import { fetchGameDetails } from "/js/api/gameApi.js";
import { loadError, alertMessage } from "/js/components/messages.js";
import { continueShoppingEvent } from "/js/script.js";
import { updateCartCounter } from "../../script.js";

document.addEventListener("DOMContentLoaded", () => {
  mimicEmptyCart();
  eachItemInCartHtml();
  initItemCounter();
  cartDetails();
  displaySubtotal();
  continueShoppingEvent();

  const orderConfirmed = localStorage.getItem("orderConfirmed");
  if (orderConfirmed === "true") {
    localStorage.removeItem("cart");
    localStorage.removeItem("orderConfirmed");
  }
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

function eachItemInCartHtml() {
  const cartContainer = document.querySelector(".cart-section");
  const cart = getItemsInLocalStorage();

  try {
    if (cartContainer) {
      cartContainer.innerHTML = "";

      cart.forEach((product) => {
        const prodId = product.id;
        const prodTitle = product.title;
        const prodQuantity = product.quantity;
        const prodIMG = product.image.url || `../images/no_image_found.jpg`;
        const prodAlt = product.image.alt || `Game cover for ${prodTitle}`;
        let prodPrice = product.price;
        const discountPrice = product.discountedPrice;
        const priceClass = product.onSale ? "discount-price" : "";
        const addItem = `../images/add-item.png`;
        const removeItem = `../images/remove-item.png`;
        const increaseIconAlt = `Plus icon for adding items in cart`;
        const decreaseIconAlt = `Minus icon for removing items in cart`;

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

  // Incrementing/decrementing cart items + updating NAV cart-items badge equally:
  function updateQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = cart.findIndex((item) => item.id === productId);

    if (productIndex !== -1) {
      cart[productIndex].quantity += change;
      if (cart[productIndex].quantity < 1) {
        cart.splice(productIndex, 1);
        cartContainer
          .querySelector(`[data-product-id="${productId}"]`)
          .remove();
      } else {
        document.getElementById(`quantity-${productId}`).textContent =
          cart[productIndex].quantity;
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      calculateTotalPrice();
      updateTotals();
      displaySubtotal();
      mimicEmptyCart();
    }
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
      sessionStorage.setItem("orderConfirmed", "true");
      window.location.href = "./checkout-success.html";
    });
  }
}

function checkoutSuccess() {
  document.addEventListener("DOMContentLoaded", () => {
    const orderConfirmed = sessionStorage.getItem("orderConfirmed");
    if (orderConfirmed === "true") {
      alertMessage("Order confirmed!");
      sessionStorage.removeItem("orderConfirmed");

      localStorage.removeItem("cart");
      updateCartCounter();
    }
  });
}

clearCartAfterOrderPlaced();
checkoutSuccess();

// ------------------------ TO DO:
// - ERROR HANDLING and errors in console
// EXTRAS:
// - HOME page: Style the overall design, title and description
// - Profile page: mimic user login and form validation
// -----------------------------------------------------------------
