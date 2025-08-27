import { wooComApiKey, wooComApiSecret } from "/js/utils/auth/keys/apiKeys.js";
import { baseUrl } from "/js/utils/auth/keys/base.js";
import {
  NO_IMAGE_FOUND_IMG,
  PRODUCT_NOT_FOUND,
} from "/js/utils/general/constants.js";

const wrapper = document.querySelector(".product-wrapper");

export async function fetchGames(id) {
  try {
    const url = id ? `${baseUrl}/${id}` : baseUrl;

    const response = await fetch(url, {
      headers: {
        Authorization: "Basic " + btoa(wooComApiKey + ":" + wooComApiSecret),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
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

// Helper to get product data parameters
export function extractProductData(product) {
  return {
    id: product.id,
    title: product.name,
    description: product.description,
    shortDescription: product.short_description,
    price: product.price,
    salePrice: product.sale_price,
    onSale: product.on_sale,
    stockStatus: product.stock_status,
    stockQuantity: product.stock_quantity,
    lowStockAmount: product.low_stock_amount,
    genre: product.categories.map((cat) => cat.name).join(", "),
    imgSrc:
      product.images.length > 0 ? product.images[0].src : NO_IMAGE_FOUND_IMG,
    imgAlt:
      product.images.length > 0 ? product.images[0].alt : PRODUCT_NOT_FOUND,
  };
}
