import { wrapper } from "/js/utils/general/constants.js";
import { wooComApiKey, wooComApiSecret } from "/js/utils/auth/keys/apiKeys.js";

export async function fetchProductsFilteredByCategory() {
  try {
    const url = `https://gamehub-shop.no/wp-json/wc/v3/products`;

    const response = await fetch(url, {
      headers: {
        Authorization: "Basic " + btoa(wooComApiKey + ":" + wooComApiSecret),
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products = await response.json();

    const productsByCategory = products.reduce((accumulator, product) => {
      product.categories.forEach((category) => {
        if (!accumulator[category.id]) accumulator[category.id] = [];
        accumulator[category.id].push(product);
      });
      return accumulator;
    }, {});

    return productsByCategory;
  } catch (error) {
    if (wrapper) {
      wrapper.innerHTML = `<div class="error">An error occurred while sorting products by category</div>`;
    }

    throw error;
  }
}
