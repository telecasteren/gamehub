import { ORDER_CONFIRMED_KEY, CART_KEY } from "/js/utils/general/constants.js";
import { alertMessage } from "/js/utils/auth/messages.js";
import { updateCartCounter } from "/js/cart/updateCart/updateCartCounter.js";

// Clear the cart upon checkout success
export function clearCartAfterOrderPlaced() {
  const placeOrderBtn = document.querySelector("._placeOrder");

  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", () => {
      sessionStorage.setItem(ORDER_CONFIRMED_KEY, "true");
      window.location.href = "/navigate/cart/checkout-success/";
    });
  }
}

// Order confirmed, remove cart items from sessionStorage
export function checkoutSuccess() {
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
