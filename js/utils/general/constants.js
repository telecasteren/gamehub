// API call
export const wrapper = document.querySelector(".product-wrapper");
const url = "https://v2.api.noroff.dev/gamehub";
const proxy = "https://noroffcors.onrender.com/";
export const gameUrl = proxy + url;

// Storage
export const SEARCH_KEY = "search";
export const CART_KEY = "cart";
export const ITEM_COUNT_KEY = "itemCounter";
export const PREVIOUS_PAGE_KEY = "previousPage";
export const ORDER_CONFIRMED_KEY = "orderConfirmed";

// Containers
export const cartContainer = document.querySelector(".cart-section");
export const cartWindow = document.getElementById("cartWindow-box");
export const imageContainer = document.querySelector(".prodImg-container");
export const homeContainer = document.querySelector(".home-container");

// General
export const UNKNOWN_KEY = "Unknown";
export const NO_IMAGE_FOUND_IMG = `/images/no_image_found.jpg`;
export const PRODUCT_NOT_FOUND = "Product not found";
export const PRICE_NOT_FOUND = "Price not found";
export const INCREASE_ICON_ALT = `Icon for adding items`;
export const DECREASE_ICON_ALT = `Icon for removing items`;
export const INCREASE_ICON_IMG = `/images/add-item.png`;
export const DECREASE_ICON_IMG = `/images/remove-item.png`;

// TO BE USED LATER:
// export const USERS_KEY = "users";
// export const PRODUCTS_KEY = "products";
