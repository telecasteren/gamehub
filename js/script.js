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

// Render everything from here
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

// Mobile menu
togglemenu();
