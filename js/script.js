// This file contains common javascript

// Item counter badge for the #item-counter element in the NAV:
document.addEventListener("DOMContentLoaded", function () {
  updateCartCounter();
});

export function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQuantity = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );
  const itemCounter = document.getElementById("item-counter");

  itemCounter.textContent = totalQuantity;
  localStorage.setItem("itemCounter", totalQuantity);
}

// Common redirection to specific products:
export function goToProduct(productID) {
  window.location.href = `/html/specificProd.html?gameId=${productID}`;
}

// Saving current page to localStorage:
function saveCurrentPage() {
  window.addEventListener("beforeunload", () => {
    localStorage.setItem("previousPage", window.location.href);
  });
}
saveCurrentPage();

// Loading previous page from localStorage:
function loadPreviousPage() {
  document.addEventListener("DOMContentLoaded", () => {
    let previousPage = localStorage.getItem("previousPage");
    const arrowCursor = document.querySelector("#backArrow");

    if (arrowCursor) {
      arrowCursor.style.cursor = "pointer";

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
