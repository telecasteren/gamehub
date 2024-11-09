import { alertMessage } from "/js/utils/auth/messages.js";

export function setFilterOptions(onSortChange, onFilterChange) {
  try {
    const filterOptionsContainer = document.querySelector(".options-container");

    const options = document.createElement("select");
    options.classList.add("options");

    const defaultOption = document.createElement("option");
    defaultOption.innerText = "Filter products";
    defaultOption.disabled = true;
    defaultOption.selected = true;

    const sortAscending = document.createElement("option");
    sortAscending.value = "asc";
    sortAscending.innerText = "Sort ascending";

    const sortDescending = document.createElement("option");
    sortDescending.value = "desc";
    sortDescending.innerText = "Sort descending";

    const filterByPrice = document.createElement("option");
    filterByPrice.value = "filter_price";
    filterByPrice.innerText = "Filter by price";

    const filterByCategory = document.createElement("option");
    filterByCategory.value = "filter_category";
    filterByCategory.innerText = "Filter by category";

    options.appendChild(defaultOption);
    options.appendChild(sortAscending);
    options.appendChild(sortDescending);
    options.appendChild(filterByPrice);
    options.appendChild(filterByCategory);

    filterOptionsContainer.appendChild(options);

    options.addEventListener("change", (event) => {
      const selectedOption = event.target.value;
      if (selectedOption === "asc" || selectedOption === "desc") {
        const sortOrder = event.target.value;
        onSortChange(sortOrder);
      } else if (selectedOption === "filter_price") {
        onFilterChange("price");
      } else if (selectedOption === "filter_category") {
        onFilterChange("category");
      }
    });
  } catch (error) {
    alertMessage("Couldn't sort products right now");
  }
}
