import { goToProduct } from "/js/app/components/eventListeners/goToProduct.js";
import { fetchGames } from "/js/utils/api/products/productsApi.js";

export async function goToCarouselProduct(prodTitle, overlayDiv) {
  const info = await fetchGames();

  const response = info;
  let specificProductId;

  if (response.length > 2) {
    specificProductId = response[0].id;

    overlayDiv.addEventListener("click", () => {
      goToProduct(specificProductId);
    });
  } else {
    specificProductId = UNKNOWN_KEY;
    overlayDiv.addEventListener("click", () => {
      alertMessage(
        `Error occurred while loading carousel product: ${prodTitle}`,
        "error"
      );
    });
  }
}
