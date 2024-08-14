import { updateCartCounter } from "/js/cart/updateCart/updateCartCounter.js";
import { PREVIOUS_PAGE_KEY } from "./utils/general/constants.js";

document.addEventListener("DOMContentLoaded", function () {
  updateCartCounter();
});

// ---------- Redirect user locations:

// Saving current page to localStorage:
function saveCurrentPage() {
  window.addEventListener("beforeunload", () => {
    localStorage.setItem(PREVIOUS_PAGE_KEY, window.location.href);
  });
}
saveCurrentPage();

// Loading previous page from localStorage:
function loadPreviousPage() {
  document.addEventListener("DOMContentLoaded", () => {
    let previousPage = localStorage.getItem(PREVIOUS_PAGE_KEY);
    const arrowCursor = document.querySelector("#backArrow");

    if (arrowCursor) {
      document.querySelector("#backArrow").addEventListener("click", () => {
        if (previousPage) {
          window.location.href = previousPage;
        } else {
          console.log("Error occurred upon loading previous page");
          alert("Last browser history not found!");
        }
      });
    }
  });
}
loadPreviousPage();

// Redirection to specific products:
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
