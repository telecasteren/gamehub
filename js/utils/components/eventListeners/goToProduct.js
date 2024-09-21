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
