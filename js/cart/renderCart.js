import { fetchGames } from "/js/utils/api/productsApi.js";
import { loadError } from "/js/utils/auth/messages.js";
import { continueShoppingEvent } from "/js/script.js";
import { renderCartProducts } from "./cartHtml.js";
import { getItemsInLocalStorage } from "/js/utils/storage/getItemsInLocalStorage.js";
import { renderPurchase } from "/js/cart/checkout/success/renderPurchase.js";
import { displaySubtotal } from "/js/cart/checkout/price/displaySubtotal.js";
import { initItemCounter } from "/js/cart/updateCart/updateTotals.js";
import { mimicEmptyCart } from "/js/cart/checkout/mimicEmptyCart.js";
import {
  CART_KEY,
  ORDER_CONFIRMED_KEY,
  cardDetailsDiv,
} from "/js/utils/general/constants.js";
import { cardDetailsHtml } from "/js/cart/checkout/paymentMethods/cardHtml.js";
import {
  storeItemsAfterOrderPlaced,
  checkoutSuccess,
} from "/js/cart/checkout/success/checkoutSuccess.js";

// Initialize cart page when DOM is fully loaded:
document.addEventListener("DOMContentLoaded", async () => {
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

  // Render purchase on checkout success
  renderPurchase();
});

// Fetching data from the API upon changes and update items in localStorage if needed:
async function updateCartWithAPI() {
  try {
    const apiData = await fetchGames();
    const localData = getItemsInLocalStorage();

    const updatedCartData = localData.map((localItem) => {
      const apiItem = apiData.data.find(
        (apiItem) => apiItem.id === localItem.id
      );
      return apiItem ? { ...localItem, ...apiItem } : localItem;
    });

    localStorage.setItem(CART_KEY, JSON.stringify(updatedCartData));
  } catch (error) {
    console.log("Error occurred while fetching API details:", error);
    loadError();
  }
}

storeItemsAfterOrderPlaced();
checkoutSuccess();
