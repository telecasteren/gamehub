// Containers
export const cartContainer = document.querySelector(".cart-section");
export const cardDetailsDiv = document.querySelector(".cardDetails");
export const cartWindow = document.getElementById("cartWindow-box");
export const imageContainer = document.querySelector(".prodImg-container");
export const homeContainer = document.querySelector(".home-container");
export const aboutSection = document.querySelector(".about-text");
export const contactFormContainer = document.querySelector(
  ".contactForm-container"
);
export const contactSection = document.querySelector(".contact-section");
export const createAccountBtn = document.querySelector("#createAccountBtn");
export const createAccountBackArrow = document.querySelector(
  ".createAccountBackArrow"
);

// Carousel
export const carousel = document.querySelector(".carousel");
export const carouselImages = [
  {
    src: "/images/carousel-imgs/carousel-img1.webp",
    alt: "Archer shooting at a dragon",
  },
  {
    src: "/images/carousel-imgs/carousel-img2.webp",
    alt: "Warrior scouting over the lands",
  },
  {
    src: "/images/carousel-imgs/carousel-img3.webp",
    alt: "Portrait of an elf warrior",
  },
];

// Storage
export const CART_KEY = "product by id";
export const ITEM_COUNT_KEY = "item count";
export const PREVIOUS_PAGE_KEY = "previous page";
export const ORDER_CONFIRMED_KEY = "order confirmed";
export const PURCHASED_ITEMS_KEY = "purchased items";
export const SEARCH_KEY = "search";
export const navigateAway = "navigated away";

// General
export const UNKNOWN_KEY = "Unknown";
export const NO_IMAGE_FOUND_IMG = `/images/no_image_found.jpg`;
export const PRODUCT_NOT_FOUND = "Product not found";
export const PRICE_NOT_FOUND = "Price not found";
export const INCREASE_ICON_ALT = `Icon for adding items`;
export const DECREASE_ICON_ALT = `Icon for removing items`;
export const INCREASE_ICON_IMG = `/images/icons-symbols/add-item.png`;
export const DECREASE_ICON_IMG = `/images/icons-symbols/remove-item.png`;

// Currency
export const CURRENCY_KEY = " kr"; // This should be dynamically determined based on country / user chosen currency
export const CURRENCY_TYPE = "NOK "; // This should be dynamically determined based on country / user chosen currency

// User
export const UserEmail = "UserEmail";
export const loggedInUser = false; // This should be dynamically determined based on login authentication logic

// TO BE USED LATER:
// export const USERS_KEY = "users";
// export const FAVOURITES_KEY = "favourites";
