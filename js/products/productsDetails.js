import { fetchGames } from "../api/allProductsApi.js";
import { goToProduct } from "../script.js";

const wrapper = document.querySelector(".product-wrapper");

document.addEventListener("DOMContentLoaded", () => {
  fetchGamesAPI();
});

async function fetchGamesAPI() {
  try {
    const info = await fetchGames();
    gamesHTML(info);
  } catch (error) {
    console.error("Error occurred: ", error);
    wrapper.innerHTML = `<div class="error">An error occurred when loading the products..</div>`;
  }
}

// Creating the html for each product
function gamesHTML(info) {
  wrapper.innerHTML = "";

  info.data.forEach((game) => {
    const gameImg = game.image.url;
    const gameAlt = game.image.alt;
    const productID = game.id;

    const prodDiv = document.createElement("div");
    const imgElement = document.createElement("img");

    imgElement.classList.add("products");
    imgElement.src = gameImg;
    imgElement.alt = gameAlt;

    prodDiv.appendChild(imgElement);
    wrapper.appendChild(prodDiv);

    if (!gameAlt.length) {
      imgElement.alt = `Game cover for ${game.title}`;
    }

    imgElement.addEventListener("click", () => {
      goToProduct(productID);
    });
  });
}
