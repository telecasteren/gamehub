// Common messages

// Error message upon loading cart:
export function loadError() {
  const cartSection = document.querySelector(".cart-section");

  if (cartSection) {
    cartSection.innerHTML = `<div class="error">Couldn't load products in cart.</div>`;
  }
}

// Reusable message:
export function alertMessage() {
  const alertMessage = document.querySelector(".messageContent");

  if (alertMessage) {
    alertMessage.textContent = "Unknown error ocurred.";
    alertMessage.classList.add("error");
  }
}
