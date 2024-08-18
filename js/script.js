import { updateCartCounter } from "/js/cart/updateCart/updateCartCounter.js";
import { saveCurrentPage } from "/js/utils/storage/saveCurrentPage.js";
import { loadPreviousPage } from "/js/utils/storage/loadPreviousPage.js";
import { displayContent } from "/js/homepage/indexHtml.js";
import { homeContainer } from "/js/utils/general/constants.js";

document.addEventListener("DOMContentLoaded", function () {
  updateCartCounter();
  saveCurrentPage();
  loadPreviousPage();
  if (homeContainer) {
    displayContent();
  }
});

// Redirect to specific products:
export function goToProduct(productID) {
  window.location.href = `/navigate/products/?gameId=${productID}`;
}

// Continue shopping button at cart/checkout:
export function continueShoppingEvent() {
  const allGames = document.querySelector("._allGames");

  if (allGames) {
    function goToGames() {
      window.location.href = `/navigate/products/product-list/`;
    }
    allGames.addEventListener("click", goToGames);
  }
}
