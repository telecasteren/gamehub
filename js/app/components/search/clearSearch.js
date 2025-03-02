export function clearSearchIconInit() {
  const searchInput = document.getElementById("searchGames");

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
  const searchInput = document.getElementById("searchGames");

  const searchTerm = searchInput.value.trim();
  clearSearchIcon.style.display = searchTerm === "" ? "none" : "inline";
}
