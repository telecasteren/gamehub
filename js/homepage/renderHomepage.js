import { fetchGames } from "/js/api/productsApi.js";
import { UNKNOWN_KEY } from "/js/utils/general/constants.js";
import { goToProduct } from "/js/script.js";
import { displayContent } from "/js/homepage/indexHtml.js";

// Adding event listener to the carousel product button:
document.addEventListener("DOMContentLoaded", async () => {
  const getBtn = document.querySelector(".getBTN");

  if (!getBtn) {
    console.log("Button not found!");
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
      getBtn.textContent = `Error upon loading button`;
      specificProductId = UNKNOWN_KEY;
      console.log(
        `Error ocurred while loading product-id: ${specificProductId}`
      );
    }
  } catch (error) {
    console.log("Error ocurred:", error);
  }

  displayContent();
});
