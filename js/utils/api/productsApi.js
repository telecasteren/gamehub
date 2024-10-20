// This is the wordpress products API

import { wrapper } from "/js/utils/general/constants.js";
import {
  wooComApiKey,
  wooComApiSecret,
} from "/js/utils/auth/secrets/apiKeys.js";

const baseUrl = "https://gamehub-shop.no/wp-json/wc/v3/products";

export async function fetchGames(id) {
  try {
    const url = id ? `${baseUrl}/${id}` : baseUrl;

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
    console.error("Error occurred: ", error.message);
    console.log("Full error details: ", error);

    if (wrapper) {
      wrapper.innerHTML = `<div class="error">An error occurred when fetching the products..</div>`;
    }

    throw error;
  }
}

// Function to get product data parameters
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

// This is the Noroff GameHub API

// import { wrapper, gameUrl } from "/js/utils/general/constants.js";

// export async function fetchGames(id) {
//   try {
//     const url = id ? `${gameUrl}/${id}` : `${gameUrl}`;

//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const info = await response.json();
//     return info;
//   } catch (error) {
//     console.log("Error occurred: ", error);
//     if (wrapper) {
//       wrapper.innerHTML = `<div class="error">An error occurred when loading the products..</div>`;
//     }

//     throw error;
//   }
// }

// -------------------------------------------------------------
