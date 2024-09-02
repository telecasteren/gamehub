import {
  ORDER_CONFIRMED_KEY,
  CART_KEY,
  PURCHASED_ITEMS_KEY,
} from "/js/utils/general/constants.js";
import { alertMessage } from "/js/utils/auth/messages.js";
import { updateCartCounter } from "/js/cart/updateCart/updateCartCounter.js";
import { renderPurchase } from "/js/cart/checkout/success/renderPurchase.js";
import { successMessage } from "/js/cart/checkout/success/successMessage.js";

export function storeItemsAfterOrderPlaced() {
  const placeOrderBtn = document.querySelector("._placeOrder");

  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", () => {
      const cartData = localStorage.getItem(CART_KEY);
      sessionStorage.setItem(PURCHASED_ITEMS_KEY, cartData);

      sessionStorage.setItem(ORDER_CONFIRMED_KEY, "true");
      window.location.href = "/navigate/cart/checkout-success/";
    });
  }
}

// Order confirmed, remove items from localStorage and sessionStorage
export function checkoutSuccess() {
  document.addEventListener("DOMContentLoaded", () => {
    const orderConfirmed = sessionStorage.getItem(ORDER_CONFIRMED_KEY);
    if (orderConfirmed === "true") {
      alertMessage("Order confirmed!");

      renderPurchase();
      successMessage();

      sessionStorage.removeItem(ORDER_CONFIRMED_KEY);
      localStorage.removeItem(CART_KEY);
      updateCartCounter();

      // sessionStorage.removeItem(PURCHASED_ITEMS_KEY); <--- This cannot happen here, because then the purchase does not display
    }
  });
}
