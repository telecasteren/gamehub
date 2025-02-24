// TOP & BOTTOM
import { menuBar } from "/js/app/components/navbar/menuBar.js";
import { footerElement } from "/js/app/components/footer/footerHtml.js";

// STORAGE
import { saveCurrentPage } from "/js/utils/storage/saveCurrentPage.js";
import { loadPreviousPage } from "/js/utils/storage/loadPreviousPage.js";

// LANDING
import { initCarouselSlider } from "/js/app/components/carousel/carousel.js";
import { displayLandingContent } from "/js/app/homepage/displayContent.js";
import { getBTN } from "/js/app/homepage/getButton/getBTN.js";

// CONTAINERS
import {
  homeContainer,
  carousel,
  createAccountBtn,
  wrapper,
} from "/js/utils/general/constants.js";

// ACCOUNT AND LOGIN
import { createAccountEvents } from "/js/app/components/profile/createAccount/createAccount.js";

// HELP TEXT AND FAQ's
import { displayFAQtexts } from "/js/app/components/FAQEvents/displayFAQtexts.js";
import {
  updateHelpTextEvents,
  displayHelpTextOnProfile,
} from "/js/app/components/profile/login/popUpText.js";

// SINGLE PRODUCT PAGE
import { specificGame } from "/js/app/products/productDetails/renderProduct.js";

// ABOUT
import { aboutSection } from "/js/utils/general/constants.js";
import { createAboutText } from "/js/app/about/createAboutText.js";
import { createAboutButtons } from "/js/app/about/aboutButtons.js";
import { createAboutBackgroundImage } from "/js/app/about/backgroundIMGs.js";

// FILTER PRODUCTS
import { setFilterOptions } from "/js/app/components/search/filters/filterOptions.js";
import {
  fetchGamesAPI,
  onSortChange,
  onFilterChange,
} from "/js/app/products/products.js";

// CART AND CHECKOUT
import { updateCartCounter } from "/js/app/cart/updateCart/updateCartCounter.js";
import { updateCartWithAPI } from "/js/app/cart/updateCart/updateCartWithAPI.js";
import { continueShoppingEvent } from "/js/app/components/eventListeners/continueShopping.js";
import { renderCartProducts } from "/js/app/cart/cartHtml.js";
import { renderPurchase } from "/js/app/cart/checkout/success/renderPurchase.js";
import { displaySubtotal } from "/js/app/cart/checkout/price/displaySubtotal.js";
import { initItemCounter } from "/js/app/cart/updateCart/updateTotals.js";
import { mimicEmptyCart } from "/js/app/cart/checkout/mimicEmptyCart.js";
import {
  CART_KEY,
  ORDER_CONFIRMED_KEY,
  cardDetailsDiv,
} from "/js/utils/general/constants.js";
import { cardDetailsHtml } from "/js/app/cart/checkout/paymentMethods/cardHtml.js";
import {
  storeItemsAfterOrderPlaced,
  checkoutSuccess,
} from "/js/app/cart/checkout/success/checkoutSuccess.js";
import { methodPicker } from "/js/app/cart/checkout/paymentMethods/methodPicker.js";

// Render everything from here
document.addEventListener("DOMContentLoaded", async () => {
  updateCartCounter();
  saveCurrentPage();
  loadPreviousPage();

  if (homeContainer) {
    // Display landing page
    getBTN();
    displayLandingContent();
  }
  if (carousel) {
    initCarouselSlider();
  }

  if (wrapper) {
    // Display products list
    fetchGamesAPI();
    setFilterOptions(onSortChange, onFilterChange);
  }

  if (document.querySelector(".prodImg-container")) {
    // Display single product page
    specificGame();
  }

  if (aboutSection) {
    createAboutText();
    createAboutButtons();
    createAboutBackgroundImage();
  }

  // Display help text for certain actions when user is not logged in
  if (window.location.pathname.includes("/contact/")) {
    updateHelpTextEvents();
    displayFAQtexts();
  } else if (window.location.pathname.includes("/login/")) {
    displayHelpTextOnProfile();
  }

  if (createAccountBtn) {
    createAccountEvents();
  }

  // Cart and checkout events
  if (window.location.pathname.includes("/cart/")) {
    await updateCartWithAPI();
    mimicEmptyCart();
    renderCartProducts();
    initItemCounter();
    displaySubtotal();
    continueShoppingEvent();

    if (cardDetailsDiv) {
      cardDetailsHtml();
    }

    const orderConfirmed = localStorage.getItem(ORDER_CONFIRMED_KEY);
    if (orderConfirmed === "true") {
      localStorage.removeItem(CART_KEY);
      localStorage.removeItem(ORDER_CONFIRMED_KEY);
    }

    if (window.location.pathname.includes("/navigate/cart/checkout/")) {
      methodPicker();
    }

    renderPurchase();
  }
});

// Checkout success events
storeItemsAfterOrderPlaced();
checkoutSuccess();

// Top and bottom elements
menuBar();
footerElement();
