import { CART_KEY } from "/js/components/constants.js";

export function getItemsInLocalStorage() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}
