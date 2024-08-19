// API call
const url = "https://v2.api.noroff.dev/gamehub";
const proxy = "https://noroffcors.onrender.com/";
export const gameUrl = proxy + url;

// Containers
export const cartContainer = document.querySelector(".cart-section");
export const cartWindow = document.getElementById("cartWindow-box");
export const imageContainer = document.querySelector(".prodImg-container");
export const homeContainer = document.querySelector(".home-container");
export const wrapper = document.querySelector(".product-wrapper");

// Search
export const searchForm = document.getElementById("search-form");
export const searchInput = document.getElementById("searchGames");

// Carousel
export const carousel = document.querySelector(".carousel");
export const carouselImages = [
  { src: "/images/carousel-img1.svg", alt: "Archer shooting at a dragon" },
  {
    src: "/images/carousel-img2.svg",
    alt: "Warrior scouting over the lands",
  },
  { src: "/images/carousel-img3.svg", alt: "Portrait of an elf warrior" },
];

// Storage
export const CART_KEY = "product by id";
export const ITEM_COUNT_KEY = "item count";
export const PREVIOUS_PAGE_KEY = "previous page";
export const ORDER_CONFIRMED_KEY = "order confirmed";
export const SEARCH_KEY = "search";
export const navigateAway = "navigated away";

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
