// Common javascript

import {
  CART_KEY,
  ITEM_COUNT_KEY,
  PREVIOUS_PAGE_KEY,
} from "./components/constants.js";

document.addEventListener("DOMContentLoaded", function () {
  updateCartCounter();
});

// Item counter element in the NAV:
export function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  const totalQuantity = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );
  const itemCounter = document.getElementById("item-counter");

  itemCounter.textContent = totalQuantity;
  localStorage.setItem(ITEM_COUNT_KEY, totalQuantity);
}

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
