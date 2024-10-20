import {
  UNKNOWN_KEY,
  PRODUCT_NOT_FOUND,
  PRICE_NOT_FOUND,
  NO_IMAGE_FOUND_IMG,
  PURCHASED_ITEMS_KEY,
} from "/js/utils/general/constants.js";
import { loadError } from "/js/utils/auth/messages.js";

export function renderPurchase() {
  const purchaseContainer = document.querySelector(".success");
  const purchasedItems =
    JSON.parse(sessionStorage.getItem(PURCHASED_ITEMS_KEY)) || [];

  try {
    if (purchaseContainer) {
      purchaseContainer.innerHTML = "";

      purchasedItems.forEach((product) => {
        const prodId = product.id || PRODUCT_NOT_FOUND;
        const prodTitle = product.name || `Title ${UNKNOWN_KEY}`;

        const prodAlt =
          product.images && product.images.length > 0
            ? product.images[0].alt
            : PRODUCT_NOT_FOUND;
        const prodIMG =
          product.images && product.images.length > 0
            ? product.images[0].src
            : NO_IMAGE_FOUND_IMG;

        const purchaseItem = document.createElement("div");
        purchaseItem.setAttribute("data-product-id", prodId);

        const purchaseImgDiv = document.createElement("div");
        purchaseImgDiv.classList.add("purchaseImgDiv");

        const purchaseImage = document.createElement("img");
        purchaseImage.alt = `${prodAlt}`;
        purchaseImage.src = `${prodIMG}`;
        purchaseImage.classList.add("purchase-image");

        const purchaseItemTitle = document.createElement("div");
        purchaseItemTitle.classList.add("purchaseInfo-title");
        purchaseItemTitle.innerHTML = `<p><b>${prodTitle}</b></p>`;

        purchaseImgDiv.appendChild(purchaseImage);
        purchaseItem.appendChild(purchaseImgDiv);
        purchaseItem.appendChild(purchaseItemTitle);

        purchaseContainer.appendChild(purchaseItem);
      });
    }
  } catch (error) {
    loadError("Couldn't display purchased items");
  }
}
