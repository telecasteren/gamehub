import { ITEM_COUNT_KEY, CART_KEY } from "/js/utils/general/constants.js";

// Item counter element in the nav bar and in localStorage:
export function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  const totalQuantity = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );
  const itemCounter = document.getElementById("item-counter");

  itemCounter.textContent = totalQuantity;
  localStorage.setItem(ITEM_COUNT_KEY, totalQuantity);
}
