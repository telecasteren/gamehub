import { searchInput } from "/js/utils/general/constants.js";

export function clearSearchIconInit() {
  const existingClearSearchIcon = document.querySelector(".clearSearch");
  if (existingClearSearchIcon) return;

  const clearSearchIcon = document.createElement("span");
  clearSearchIcon.classList.add("clearSearch", "close-alert");
  clearSearchIcon.innerHTML = "&times;";
  clearSearchIcon.style.display = "none";
  searchInput.parentElement.appendChild(clearSearchIcon);

  return clearSearchIcon;
}

export function updateSearchIconVisibility(clearSearchIcon) {
  const searchTerm = searchInput.value.trim();
  clearSearchIcon.style.display = searchTerm === "" ? "none" : "inline";
}
