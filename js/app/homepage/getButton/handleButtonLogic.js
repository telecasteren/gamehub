import { alertMessage } from "/js/utils/auth/messages.js";
import { UNKNOWN_KEY } from "/js/utils/general/constants.js";
import { goToProduct } from "/js/app/components/eventListeners/goToProduct.js";

export function handleGetButton(products) {
  const getBtn = document.querySelector(".getBTN");

  if (!getBtn) {
    console.log("Button not found: ", error);
    alertMessage("Button not found!", "warning");
    return;
  }

  try {
    let specificProductId;

    if (products.length > 2) {
      specificProductId = products[0].id;

      getBtn.addEventListener("click", () => {
        goToProduct(specificProductId);
      });
    } else {
      specificProductId = UNKNOWN_KEY;
      getBtn.addEventListener("click", () => {
        alertMessage(
          `Error occurred while loading product-id: ${specificProductId}`,
          "error"
        );
        getBtn.textContent = `Button: bad request`;
      });
    }
  } catch (error) {
    console.log("Error occurred: ", error);
    alertMessage("Error occurred: ", error, "error");
  }
}
