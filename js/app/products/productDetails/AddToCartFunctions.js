import { CART_KEY } from "/js/utils/general/constants.js";
import { updateCartCounter } from "/js/app/cart/updateCart/updateCartCounter.js";

export function addToCartEvent(product) {
  const cartButton = document.querySelector(".addToCartBTN");

  function goToCart() {
    addToCart(product);

    // Setting a small timeout to make sure
    // the actions in addToCartEvent happens before going to cart:
    setTimeout(() => {
      window.location.href = `/navigate/cart/your-cart/`;
    }, 100);
  }
  cartButton.addEventListener("click", goToCart);
}

export function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  const existingProducts = cart.findIndex((item) => item.id === product.id);

  if (existingProducts !== -1) {
    cart[existingProducts].quantity++;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCounter();
}
