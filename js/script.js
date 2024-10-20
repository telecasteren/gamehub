import { initCarouselSlider } from "/js/app/components/carousel/carousel.js";
import { togglemenu } from "/js/app/components/navbar/menuList.js";
import { updateCartCounter } from "/js/app/cart/updateCart/updateCartCounter.js";
import { saveCurrentPage } from "/js/utils/storage/saveCurrentPage.js";
import { loadPreviousPage } from "/js/utils/storage/loadPreviousPage.js";
import { displayLandingContent } from "/js/app/homepage/displayContent.js";
import { displayFAQtexts } from "/js/app/components/FAQEvents/displayFAQtexts.js";
import {
  homeContainer,
  carousel,
  createAccountBtn,
} from "/js/utils/general/constants.js";
import { createAccountEvents } from "/js/app/components/profile/createAccount/createAccount.js";
import {
  updateHelpTextEvents,
  displayHelpTextOnProfile,
} from "/js/app/components/profile/login/popUpText.js";

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
    displayFAQtexts();
  } else if (window.location.pathname.includes("/login/")) {
    displayHelpTextOnProfile();
  }

  if (createAccountBtn) {
    createAccountEvents();
  }
});

// Mobile menu
togglemenu();
