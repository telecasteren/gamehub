import { fetchGames } from "../api/allProductsApi.js";
// import { alertMessage } from "../components/messages.js";
import { goToProduct } from "../script.js";
import { searchKey } from "../search/constants.js";
import { setSearchListeners } from "../search/searchProducts.js";

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
    const searchTerm = localStorage.getItem(searchKey) || "";
    const filteredProducts = games.filter((game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredProducts.length) {
      filteredProducts.forEach((game) => renderProduct(game));
    } else {
      wrapper.innerHTML = `<h3 class="no-results">No results here, buddy. Try again.</h3>`;
    }
  } catch (error) {
    console.error("Error occurred: ", error);
    wrapper.innerHTML = `<div class="error">An error occurred when searching for products..</div>`;
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
