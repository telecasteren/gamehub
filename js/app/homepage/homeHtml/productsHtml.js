import { goToProduct } from "/js/app/components/eventListeners/goToProduct.js";
import { fetchGames } from "/js/utils/api/productsApi.js";
import { loadError } from "/js/utils/auth/messages.js";
import {
  NO_IMAGE_FOUND_IMG,
  PRODUCT_NOT_FOUND,
} from "/js/utils/general/constants.js";

export async function createProductsHtml(selectedProductIndices) {
  try {
    const info = await fetchGames();

    if (info && Array.isArray(info)) {
      const productElements = info.map((product) => {
        const productId = product.id;
        const productTitle = product.name;
        const prodDescription = product.short_description;

        const column = document.createElement("div");
        column.classList.add("column");

        const imgEl = document.createElement("img");
        imgEl.classList.add("product");
        imgEl.src =
          product.images && product.images.length > 0
            ? product.images[0].src
            : NO_IMAGE_FOUND_IMG;
        imgEl.alt =
          product.images && product.images.length > 0
            ? product.images[0].alt
            : PRODUCT_NOT_FOUND;
        imgEl.setAttribute("data-title", productTitle);

        const backgroundBox = document.createElement("div");
        backgroundBox.classList.add("color-box");

        const captionContainer = document.createElement("div");
        captionContainer.classList.add("captionContainer-container");
        const titleH2 = document.createElement("h2");
        titleH2.classList.add("titleH2");
        titleH2.innerHTML = productTitle;

        const prodText = document.createElement("p");
        prodText.classList.add("prodText");
        prodText.innerHTML = prodDescription;

        imgEl.addEventListener("click", () => goToProduct(productId));
        backgroundBox.addEventListener("click", () => goToProduct(productId));

        captionContainer.appendChild(titleH2);
        captionContainer.appendChild(prodText);
        backgroundBox.appendChild(captionContainer);
        column.appendChild(imgEl);
        column.appendChild(backgroundBox);

        return column;
      });

      const productContainer = document.createElement("div");
      productContainer.classList.add("featuredProductsContainer");

      const containerTitle = document.createElement("h2");
      containerTitle.classList.add("featuredTitle");
      containerTitle.innerText = "Featured products";

      productContainer.appendChild(containerTitle);

      const featuredProductsWrapper = document.createElement("div");
      featuredProductsWrapper.classList.add("featuredProductsWrapper");

      selectedProductIndices.forEach((index) => {
        if (productElements[index]) {
          featuredProductsWrapper.appendChild(productElements[index]);
        }
      });
      productContainer.appendChild(featuredProductsWrapper);
      return productContainer;
    } else {
      throw new Error("Error fetching product data");
    }
  } catch (error) {
    loadError("Error occurred while loading content");
    console.error("ERROR in createProductsHtml: ", error);
    return null;
  }
}
