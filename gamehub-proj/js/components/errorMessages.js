// Common error messages

// Error in loading cart:
export function loadError() {
  const cartSection = document.querySelector(".cart-section");
  cartSection.innerHTML = `<div class="error">Couldn't load products in cart.</div>`;
}
