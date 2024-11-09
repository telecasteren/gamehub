import { wrapper } from "/js/utils/general/constants.js";
import { wooComApiKey, wooComApiSecret } from "/js/utils/auth/keys/apiKeys.js";

export async function fetchProductsFilteredByPrice() {
  try {
    const url = `https://gamehub-shop.no/wp-json/wc/v3/products?orderby=price`;

    const response = await fetch(url, {
      headers: {
        Authorization: "Basic " + btoa(wooComApiKey + ":" + wooComApiSecret),
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const info = await response.json();
    return info;
  } catch (error) {
    if (wrapper) {
      wrapper.innerHTML = `<div class="error">An error occurred while filtering the products by price</div>`;
    }

    throw error;
  }
}
