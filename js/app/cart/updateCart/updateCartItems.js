import { CART_KEY, cartContainer } from "/js/utils/general/constants.js";
import { calculateTotalPrice } from "/js/app/cart/checkout/price/calculateTotalPrice.js";
import { updateTotals } from "/js/app/cart/updateCart/updateTotals.js";
import { displaySubtotal } from "/js/app/cart/checkout/price/displaySubtotal.js";
import { mimicEmptyCart } from "/js/app/cart/checkout/mimicEmptyCart.js";
import { getItemsInLocalStorage } from "/js/utils/storage/getItemsInLocalStorage.js";

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
