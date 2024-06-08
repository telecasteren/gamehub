import { searchKey } from "../search/constants.js";
import { gamesHTML } from "../products/products.js";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("searchGames");

export function setSearchListeners(info) {
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
  });

  searchInput.addEventListener("input", function (event) {
    const searchTerm = event.target.value.trim();
    localStorage.setItem(searchKey, searchTerm);
    gamesHTML(info.data);
  });

  const searchTerm = localStorage.getItem(searchKey) || "";
  searchInput.value = searchTerm;
  if (searchTerm !== "") {
    gamesHTML(info.data);
  }
}
