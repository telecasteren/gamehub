import { fetchGames } from "/js/api/productsApi.js";
import { goToProduct } from "/js/script.js";
import { SEARCH_KEY } from "/js/utils/general/constants.js";
import { setSearchListeners } from "/js/utils/components/search/searchProducts.js";
import { noResultMessage } from "/js/utils/auth/messages.js";

const wrapper = document.querySelector(".product-wrapper");

document.addEventListener("DOMContentLoaded", () => {
  fetchGamesAPI();
});

async function fetchGamesAPI() {
  try {
    const info = await fetchGames();
    const allGames = info.data;

    gamesHTML(allGames);
    setSearchListeners(info);
  } catch (error) {
    console.error("Error occurred: ", error);
    wrapper.innerHTML = `<div class="error">An error occurred when loading the products..</div>`;
  }
}

export function gamesHTML(games) {
  wrapper.innerHTML = "";

  try {
    const searchTerm = localStorage.getItem(SEARCH_KEY) || "";
    const filteredProducts = games.filter((game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredProducts.length) {
      filteredProducts.forEach((game) => renderProduct(game));
    } else {
      noResultMessage();
    }
  } catch (error) {
    console.error("Error occurred: ", error);
    wrapper.innerHTML = `<div class="error">An error occurred when loading products..</div>`;
  }
}

export function renderProduct(game) {
  try {
    const gameID = game.id;
    const gameTitle = game.title || `Product Id: ${gameID}`;
    const gameAlt = game.image.alt || `Game cover for ${gameTitle}`;
    const gameImg = game.image.url || `../images/no_image_found.jpg`;

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
