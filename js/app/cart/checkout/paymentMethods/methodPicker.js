export function methodPicker() {
  const cardDetails = document.querySelector(".cardDetails");
  const paymentSelect = document.querySelector("#paymentMethod");

  if (!cardDetails) return;
  if (!paymentSelect) return;

  cardDetails.style.display = "none";

  paymentSelect.addEventListener("change", function () {
    const selectedPayment = paymentSelect.value;

    if (
      ["option-one", "option-two", "option-three"].includes(selectedPayment)
    ) {
      cardDetails.style.display = "block";
    } else {
      cardDetails.style.display = "none";
    }
  });
}
