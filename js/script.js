import { initCarouselSlider } from "/js/utils/components/carousel/carousel.js";
import { togglemenu } from "/js/utils/components/navbar/menuList.js";
import { updateCartCounter } from "/js/cart/updateCart/updateCartCounter.js";
import { saveCurrentPage } from "/js/utils/storage/saveCurrentPage.js";
import { loadPreviousPage } from "/js/utils/storage/loadPreviousPage.js";
import { displayLandingContent } from "/js/homepage/displayContent.js";
import {
  homeContainer,
  carousel,
  createAccountBtn,
} from "/js/utils/general/constants.js";
import { createAccountEvents } from "/js/utils/components/profile/createAccount/createAccount.js";
import {
  updateHelpTextEvents,
  displayHelpTextOnProfile,
} from "/js/utils/components/profile/login/popUpText.js";

document.addEventListener("DOMContentLoaded", function () {
  updateCartCounter();
  saveCurrentPage();
  loadPreviousPage();
  if (homeContainer) {
    // Display landing page
    displayLandingContent();
  }
  if (carousel) {
    initCarouselSlider();
  }

  // Help text for certain actions when user is not logged in
  if (window.location.pathname.includes("/contact/")) {
    updateHelpTextEvents();
  } else if (window.location.pathname.includes("/login/")) {
    displayHelpTextOnProfile();
  }

  if (createAccountBtn) {
    createAccountEvents();
  }
});

// Redirect to specific products:
export function goToProduct(productID) {
  window.location.href = `/navigate/products/?gameId=${productID}`;
}

// Continue shopping button at cart/checkout:
export function continueShoppingEvent() {
  const allGames = document.querySelector("._allGames");

  if (allGames) {
    function goToGames() {
      window.location.href = `/navigate/products/product-list/`;
    }
    allGames.addEventListener("click", goToGames);
  }
}

// Mobile menu
togglemenu();
