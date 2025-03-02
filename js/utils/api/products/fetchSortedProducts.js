import { wooComApiKey, wooComApiSecret } from "/js/utils/auth/keys/apiKeys.js";

export async function fetchSortedProducts(sortOrder = "asc") {
  const wrapper = document.querySelector(".product-wrapper");
  try {
    const url = `https://gamehub-shop.no/wp-json/wc/v3/products?orderby=title&order=${sortOrder}`;

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
      wrapper.innerHTML = `<div class="error">An error occurred when sorting the products..</div>`;
    }

    throw error;
  }
}
