import { SEARCH_KEY, wrapper } from "/js/utils/general/constants.js";
import { noResultMessage } from "/js/utils/auth/messages.js";
import { renderProduct } from "/js/products/products.js";

export async function gamesHTML(games) {
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
