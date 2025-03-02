import { levenshtein } from "/js/utils/general/tool-scripts/levenshtein.js";
import { SEARCH_KEY } from "/js/utils/general/constants.js";
import { noResultMessage } from "/js/utils/auth/messages.js";
import { renderProduct } from "/js/app/products/renderProductsList.js";

export async function searchGames(games) {
  const wrapper = document.querySelector(".product-wrapper");
  if (wrapper) {
    wrapper.innerHTML = "";
  } else {
    console.warn("OHno..!! wrapper is null inside searchGames");
    return;
  }

  try {
    const searchTerm = localStorage.getItem(SEARCH_KEY) || "";

    const filteredProducts = games.filter((game) =>
      approximateMatch(searchTerm, game.name)
    );

    if (filteredProducts.length) {
      filteredProducts.forEach((game) => renderProduct(game));
    } else {
      noResultMessage();
    }
  } catch (error) {
    wrapper.innerHTML = `<div class="error">An error occurred when loading products..</div>`;
    throw error;
  }
}

function sortSearchString(string) {
  return string.toLowerCase().split("").sort().join("");
}

function approximateMatch(input, title, threshold = 2) {
  if (title.toLowerCase().includes(input.toLowerCase())) {
    return true;
  }

  const sortedInput = sortSearchString(input);
  const sortedTitle = sortSearchString(title);

  if (sortedInput === sortedTitle) {
    return true;
  }

  const distance = levenshtein(input.toLowerCase(), title.toLowerCase());
  return distance <= threshold;
}
