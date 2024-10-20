import { levenshtein } from "/js/utils/general/tool-scripts/levenshtein.js";
import { SEARCH_KEY, wrapper } from "/js/utils/general/constants.js";
import { noResultMessage } from "/js/utils/auth/messages.js";
import { renderProduct } from "/js/products/products.js";

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

export async function gamesHTML(games) {
  wrapper.innerHTML = "";

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
