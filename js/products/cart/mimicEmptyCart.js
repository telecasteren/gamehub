import { getItemsInLocalStorage } from "/js/products/cart/storage/getItemsInLocalStorage.js";

// Hide checkout button if cart is empty:
export function mimicEmptyCart() {
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
