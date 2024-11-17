import { fetchGames } from "/js/utils/api/products/productsApi.js";
import { gameDetails } from "/js/app/products/productDetails/productHtml.js";
import { imageContainer, cartWindow } from "/js/utils/general/constants.js";
import { addToCartEvent } from "/js/app/products/productDetails/AddToCartFunctions.js";

export async function specificGame() {
  try {
    const gameId = new URLSearchParams(window.location.search).get("gameId");
    if (!gameId) {
      throw new Error("Game ID not found in the url");
    }

    const specificProd = await fetchGames(gameId);
    if (!specificProd || !specificProd.id) {
      throw new Error("No product found for the given game Id");
    }

    const cartButton = document.querySelector(".addToCartBTN").outerHTML;
    imageContainer.innerHTML = "";
    cartWindow.innerHTML = "";

    gameDetails(specificProd);

    cartWindow.insertAdjacentHTML("beforeend", cartButton);
    addToCartEvent(specificProd);
  } catch (error) {
    console.log("Error occurred: ", error);
    cartWindow.innerHTML = `<div class="error">An error occurred when loading the product..</div>`;
  }
}
