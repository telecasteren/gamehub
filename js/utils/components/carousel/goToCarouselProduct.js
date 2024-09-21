import { goToProduct } from "/js/utils/components/eventListeners/goToProduct.js";
import { fetchGames } from "/js/utils/api/productsApi.js";

export async function goToCarouselProduct(prodTitle, overlayDiv) {
  const info = await fetchGames();
  const response = info.data;
  let specificProductId;

  if (response.length > 2) {
    specificProductId = response[3].id;

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
