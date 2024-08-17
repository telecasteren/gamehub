import { fetchGames } from "/js/api/productsApi.js";
import { UNKNOWN_KEY } from "/js/utils/general/constants.js";
import { goToProduct } from "/js/script.js";
import { displayContent } from "/js/homepage/indexHtml.js";
import { alertMessage } from "/js/utils/auth/messages.js";

// Adding event listener to the carousel product button:
document.addEventListener("DOMContentLoaded", async () => {
  const getBtn = document.querySelector(".getBTN");

  if (!getBtn) {
    console.log("Button not found: ", error);
    alertMessage("Button not found!", "warning");
    return;
  }

  try {
    const info = await fetchGames();
    const products = info.data.length;
    let specificProductId;

    if (products > 2) {
      specificProductId = info.data[3].id;

      getBtn.addEventListener("click", () => {
        goToProduct(specificProductId);
      });
    } else {
      specificProductId = UNKNOWN_KEY;
      getBtn.addEventListener("click", () => {
        alertMessage(
          `Error ocurred while loading product-id: ${specificProductId}`,
          "error"
        );
        getBtn.textContent = `Button: bad request`;
      });
    }
  } catch (error) {
    console.log("Error ocurred: ", error);
    alertMessage("Error ocurred: ", error, "error");
  }

  displayContent();
});
