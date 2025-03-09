import { displaySubtotal } from "/js/app/cart/checkout/price/displaySubtotal.js";
import { CURRENCY_TYPE } from "/js/utils/general/constants.js";

export function calculateTotalPrice() {
  const totalSum = document.querySelector(".totalSum");
  const totalPrice = document.querySelector("#total-price");

  if (!totalPrice) return;

  if (totalSum) {
    function displayTotal(subtotal) {
      const selectedDelivery = document.querySelector(
        `input[name="delivery"]:checked`
      );
      const deliveryPrice = selectedDelivery
        ? parseFloat(selectedDelivery.dataset.price)
        : 0;
      const total = subtotal + deliveryPrice;

      totalPrice.textContent = `${CURRENCY_TYPE}${total.toFixed(2)}`;
    }

    document.querySelectorAll(`input[name="delivery"]`).forEach((radio) => {
      radio.addEventListener(`change`, () => {
        const subtotal = displaySubtotal();
        displayTotal(subtotal);
      });
    });
    const cartSub = displaySubtotal();
    displayTotal(cartSub);
  }
}
calculateTotalPrice();
