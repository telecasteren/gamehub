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

// CONSTANTS
import {
  homeContainer,
  carousel,
  createAccountBtn,
  CART_KEY,
  ORDER_CONFIRMED_KEY,
  cardDetailsDiv,
  aboutSection,
} from "/js/utils/general/constants.js";

// ACCOUNT AND LOGIN
import { createAccountEvents } from "/js/app/components/profile/createAccount/createAccount.js";

// CONTACT FORM, HELP TEXT AND FAQ's
import { createContactBoxes } from "/js/app/contact/contactSectionHtml.js";
import { contactForm } from "/js/app/contact/contactForm.js";
import { displayFAQtexts } from "/js/app/components/FAQEvents/displayFAQtexts.js";
import {
  updateHelpTextEvents,
  displayHelpTextOnProfile,
} from "/js/app/components/profile/login/popUpText.js";

// PRODUCTS
import { specificGame } from "/js/app/products/productDetails/renderSpecificProduct.js";
import { createProductsHtml } from "/js/app/products/productListHtml.js";

// FILTER PRODUCTS
import { setFilterOptions } from "/js/app/components/search/filters/filterOptions.js";
import {
  fetchGamesAPI,
  onSortChange,
  onFilterChange,
} from "/js/app/products/products.js";

// ABOUT
import { createAboutText } from "/js/app/about/createAboutText.js";
import { createAboutButtons } from "/js/app/about/aboutButtons.js";
import { createAboutBackgroundImage } from "/js/app/about/backgroundIMGs.js";

// CART AND CHECKOUT
import { updateCartCounter } from "/js/app/cart/updateCart/updateCartCounter.js";
import { updateCartWithAPI } from "/js/app/cart/updateCart/updateCartWithAPI.js";
import { continueShoppingEvent } from "/js/app/components/eventListeners/continueShopping.js";
import { generateCheckoutContent } from "/js/app/cart/checkout/checkoutHtml.js";
import { renderCartProducts } from "/js/app/cart/cartHtml.js";
import { renderPurchase } from "/js/app/cart/checkout/success/renderPurchase.js";
import { displaySubtotal } from "/js/app/cart/checkout/price/displaySubtotal.js";
import { initItemCounter } from "/js/app/cart/updateCart/updateTotals.js";
import { mimicEmptyCart } from "/js/app/cart/checkout/mimicEmptyCart.js";
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

  // Render landing page
  if (homeContainer) {
    getBTN();
    displayLandingContent();
  }
  if (carousel) {
    initCarouselSlider();
  }

  // RENDER PRODUCT LIST
  const productsSection = document.querySelector(".products-section");
  if (productsSection) {
    createProductsHtml();

    setTimeout(() => {
      const wrapper = document.querySelector(".product-wrapper");

      if (wrapper) {
        fetchGamesAPI();
        setFilterOptions(onSortChange, onFilterChange);
      } else {
        console.warn(
          "wrapper is still null after delay! Skipping fetchGamesAPI."
        );
      }
    }, 1000);
  }

  // Render single product page
  if (document.querySelector(".prodImg-container")) {
    specificGame();
  }

  if (aboutSection) {
    createAboutText();
    createAboutButtons();
    createAboutBackgroundImage();
  }

  // Render contact page and help text for certain actions when user is not logged in
  if (window.location.pathname.includes("/contact/")) {
    createContactBoxes();
    contactForm();
    updateHelpTextEvents();
    displayFAQtexts();
  } else if (window.location.pathname.includes("/login/")) {
    displayHelpTextOnProfile();
  }

  if (createAccountBtn) {
    createAccountEvents();
  }

  // Render checkout page
  if (window.location.pathname.includes("/navigate/cart/checkout/")) {
    generateCheckoutContent();
    methodPicker();

    setTimeout(() => {
      const placeOrderBtn = document.querySelector("._placeOrder");
      if (placeOrderBtn) {
        storeItemsAfterOrderPlaced();
      } else {
        console.warn("Place Order button not found.");
      }
    }, 500);
  }

  // Cart events
  if (window.location.pathname.includes("/cart/")) {
    await updateCartWithAPI();
    mimicEmptyCart();
    renderCartProducts();
    initItemCounter();
    displaySubtotal();
    continueShoppingEvent();

    const orderConfirmed = localStorage.getItem(ORDER_CONFIRMED_KEY);
    if (orderConfirmed === "true") {
      localStorage.removeItem(CART_KEY);
      localStorage.removeItem(ORDER_CONFIRMED_KEY);
    }

    renderPurchase();
  }
});

// Render checkout success page
if (window.location.pathname.includes("/cart/checkout-success/")) {
  checkoutSuccess();
}

// Top and bottom elements
menuBar();
footerElement();
