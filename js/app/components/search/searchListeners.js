import {
  SEARCH_KEY,
  searchForm,
  searchInput,
  navigateAway,
} from "/js/utils/general/constants.js";
import { searchGames } from "/js/app/components/search/filterProducts.js";
import {
  clearSearchIconInit,
  updateSearchIconVisibility,
} from "/js/app/components/search/clearSearch.js";
import { loadError } from "/js/utils/auth/messages.js";

export function setSearchListeners(info) {
  try {
    const clearSearchIcon = clearSearchIconInit();

    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
    });

    searchInput.addEventListener("input", function (event) {
      const searchTerm = event.target.value.trim();
      searchTerm === "";
      localStorage.setItem(SEARCH_KEY, searchTerm);

      searchGames(info);
      updateSearchIconVisibility(clearSearchIcon);
    });

    if (clearSearchIcon) {
      clearSearchIcon.addEventListener("click", function () {
        searchInput.value = "";
        localStorage.removeItem(SEARCH_KEY);
        searchGames(info);
        updateSearchIconVisibility(clearSearchIcon);
      });
    }

    if (sessionStorage.getItem(navigateAway) === "true") {
      searchInput.value = "";
      localStorage.removeItem(SEARCH_KEY);
      sessionStorage.removeItem(navigateAway);
    } else {
      const searchTerm = localStorage.getItem(SEARCH_KEY) || "";
      searchInput.value = searchTerm;
      if (searchTerm !== "") {
        searchGames(info);
      }
      updateSearchIconVisibility(clearSearchIcon);
    }

    window.addEventListener("beforeunload", function () {
      sessionStorage.setItem(navigateAway, "true");
    });
  } catch (error) {
    loadError();
  }
}
