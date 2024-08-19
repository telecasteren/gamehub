import { fetchGames } from "/js/api/productsApi.js";
import { goToProduct } from "/js/script.js";
import { gamesHTML } from "/js/utils/components/search/filterProducts.js";
import { setSearchListeners } from "/js/utils/components/search/searchListeners.js";
import { UNKNOWN_KEY, wrapper } from "/js/utils/general/constants.js";

document.addEventListener("DOMContentLoaded", () => {
  fetchGamesAPI();
});

export async function fetchGamesAPI() {
  try {
    const info = await fetchGames();
    const allGames = info.data;

    setSearchListeners(info);
    gamesHTML(allGames);
  } catch (error) {
    console.error("Error occurred: ", error);
    wrapper.innerHTML = `<div class="error">An error occurred when loading the products..</div>`;
  }
}

export function renderProduct(game) {
  try {
    const gameID = game.id || UNKNOWN_KEY;
    const gameTitle = game.title || `Product Id: ${gameID}`;
    const gameAlt =
      game.image && game.image.alt
        ? game.image.alt
        : `Game cover for ${gameTitle}`;
    const gameImg =
      game.image && game.image.url
        ? game.image.url
        : `../images/no_image_found.jpg`;

    const prodDiv = document.createElement("div");
    const imgElement = document.createElement("img");

    imgElement.classList.add("products");
    imgElement.src = gameImg;
    imgElement.alt = gameAlt;

    prodDiv.appendChild(imgElement);
    wrapper.appendChild(prodDiv);

    imgElement.addEventListener("click", () => {
      goToProduct(gameID);
    });
  } catch (error) {
    console.error("Error occurred: ", error);
    wrapper.innerHTML = `<div class="error">An error occurred in displaying the products..</div>`;
  }
}
