export function continueShoppingEvent() {
  const allGames = document.querySelector("._allGames");
  function goToGames() {
    window.location.href = `./products.html`;
  }
  allGames.addEventListener("click", goToGames);
}
