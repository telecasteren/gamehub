export async function fetchSortedProducts() {
  try {
    const url =
      "https://gamehub-shop.no/wp-json/wc/v3/products?order_by=id&order=asc";

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
      wrapper.innerHTML = `<div class="error">An error occurred when fetching the products..</div>`;
    }

    throw error;
  }
}
