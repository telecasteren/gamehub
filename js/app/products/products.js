import { fetchGames } from "/js/utils/api/products/productsApi.js";
import { renderProduct } from "/js/app/products/renderProductsList.js";
import { searchGames } from "/js/app/components/search/filterProducts.js";
import { setSearchListeners } from "/js/app/components/search/searchListeners.js";
import { fetchSortedProducts } from "/js/utils/api/products/fetchSortedProducts.js";
import { fetchProductsFilteredByPrice } from "/js/utils/api/products/filteredByPrice.js";
import { fetchProductsFilteredByCategory } from "/js/utils/api/products/filteredByCategory.js";

const wrapper = document.querySelector(".product-wrapper");

export async function fetchGamesAPI() {
  try {
    const info = await fetchGames();

    setSearchListeners(info);
    searchGames(info);
  } catch (error) {
    console.error("Error occurred: ", error);
    if (wrapper) {
      wrapper.innerHTML = `<div class="error">An error occurred when loading the products</div>`;
    }
  }
}

export async function onSortChange(sortOrder) {
  try {
    const sortedProducts = await fetchSortedProducts(sortOrder);
    searchGames(sortedProducts);
  } catch (error) {
    console.error("Error occurred while sorting products");
    if (wrapper) {
      wrapper.innerHTML = `<div class="error">An error occurred when sorting the products</div>`;
    }
  }
}

export async function onFilterChange(filterType) {
  try {
    let filteredProducts;

    if (filterType === "price") {
      filteredProducts = await fetchProductsFilteredByPrice();

      searchGames(filteredProducts);
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

    if (wrapper) {
      wrapper.innerHTML = `<div class="error">An error occurred when filtering by category</div>`;
    }
  }
}
