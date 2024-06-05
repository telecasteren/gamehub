// Common messages

// Error message upon loading cart:
export function loadError() {
  const cartSection = document.querySelector(".cart-section");
  cartSection.innerHTML = `<div class="error">Couldn't load products in cart.</div>`;
}

export function alertMessage() {
  const alertMessage = document.querySelector(".messageContent");
  alertMessage.textContent = `<div class="error">Unknown error ocurred.</div>`;
}
