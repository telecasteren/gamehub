import { CART_KEY, CURRENCY_TYPE } from "/js/utils/general/constants.js";

export function displaySubtotal() {
  const cartItems = JSON.parse(localStorage.getItem(CART_KEY)) || [];
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
    subtotalElement.textContent = `${CURRENCY_TYPE} ${subtotal.toFixed(2)}`;
  }

  return subtotal;
}
