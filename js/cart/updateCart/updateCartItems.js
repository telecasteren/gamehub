import { CART_KEY, cartContainer } from "/js/utils/general/constants.js";
import { calculateTotalPrice } from "/js/cart/checkout/calculateTotalPrice.js";
import { updateTotals } from "/js/cart/updateCart/updateTotals.js";
import { displaySubtotal } from "/js/cart/checkout/displaySubtotal.js";
import { mimicEmptyCart } from "/js/cart/checkout/mimicEmptyCart.js";
import { getItemsInLocalStorage } from "/js/cart/storage/getItemsInLocalStorage.js";

// Incrementing/decrementing cart items + item counter equally:
export function updateQuantity(productId, change) {
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
