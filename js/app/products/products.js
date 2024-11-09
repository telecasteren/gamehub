import { fetchGames } from "/js/utils/api/products/productsApi.js";
import { renderProduct } from "/js/app/products/productListHtml.js";
import { gamesHTML } from "/js/app/components/search/filterProducts.js";
import { setFilterOptions } from "/js/app/components/search/filters/filterOptions.js";
import { setSearchListeners } from "/js/app/components/search/searchListeners.js";
import { wrapper } from "/js/utils/general/constants.js";
import { fetchSortedProducts } from "/js/utils/api/products/fetchSortedProducts.js";
import { fetchProductsFilteredByPrice } from "/js/utils/api/products/filteredByPrice.js";
import { fetchProductsFilteredByCategory } from "/js/utils/api/products/filteredByCategory.js";

document.addEventListener("DOMContentLoaded", () => {
  fetchGamesAPI();
  setFilterOptions(onSortChange, onFilterChange);
});

async function fetchGamesAPI() {
  try {
    const info = await fetchGames();
    const allGames = info;

    setSearchListeners(info);
    gamesHTML(allGames);
  } catch (error) {
    console.error("Error occurred: ", error);
    wrapper.innerHTML = `<div class="error">An error occurred when loading the products..</div>`;
  }
}

async function onSortChange(sortOrder) {
  try {
    const sortedProducts = await fetchSortedProducts(sortOrder);
    gamesHTML(sortedProducts);
  } catch (error) {
    console.error("Error occurred while sorting products");
    wrapper.innerHTML = `<div class="error">An error occurred when sorting the products</div>`;
  }
}

async function onFilterChange(filterType) {
  try {
    let filteredProducts;

    if (filterType === "price") {
      filteredProducts = await fetchProductsFilteredByPrice();

      gamesHTML(filteredProducts);
    } else if (filterType === "category") {
      const productsByCategory = await fetchProductsFilteredByCategory();

      wrapper.innerHTML = "";

      Object.keys(productsByCategory).forEach((categoryId) => {
        productsByCategory[categoryId].forEach((product) =>
          renderProduct(product)
        );
      });
    }
  } catch (error) {
    console.error(`Error occurred while filtering by ${filterType}`);
    wrapper.innerHTML = `<div class="error">An error occurred when filtering by category</div>`;
  }
}
