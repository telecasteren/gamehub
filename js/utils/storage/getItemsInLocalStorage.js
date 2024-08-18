import { CART_KEY } from "/js/utils/general/constants.js";

export function getItemsInLocalStorage() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}
