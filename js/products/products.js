import { fetchGames } from "../api/allProductsApi.js";
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
  const searchTerm = localStorage.getItem(searchKey) || "";
  const filteredProducts = games.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  filteredProducts.forEach((game) => renderProduct(game));
}

export function renderProduct(game) {
  const gameImg = game.image.url;
  const gameAlt = game.image.alt;
  const gameID = game.id;
  const gameTitle = game.title;

  const prodDiv = document.createElement("div");
  const imgElement = document.createElement("img");

  imgElement.classList.add("products");
  imgElement.src = gameImg;
  imgElement.alt = gameAlt;

  prodDiv.appendChild(imgElement);
  wrapper.appendChild(prodDiv);

  if (!gameAlt.length) {
    imgElement.alt = `Game cover for ${gameTitle}`;
  }

  imgElement.addEventListener("click", () => {
    goToProduct(gameID);
  });
}
