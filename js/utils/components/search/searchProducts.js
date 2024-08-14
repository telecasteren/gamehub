import { SEARCH_KEY } from "/js/utils/general/constants.js";
import { gamesHTML } from "/js/products/products.js";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("searchGames");

export function setSearchListeners(info) {
  try {
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
    });

    searchInput.addEventListener("input", function (event) {
      const searchTerm = event.target.value.trim();
      localStorage.setItem(SEARCH_KEY, searchTerm);
      gamesHTML(info.data);
    });

    const searchTerm = localStorage.getItem(SEARCH_KEY) || "";
    searchInput.value = searchTerm;
    if (searchTerm !== "") {
      gamesHTML(info.data);
    }
  } catch (error) {
    console.log("Error occurred:", error);
  }
}
