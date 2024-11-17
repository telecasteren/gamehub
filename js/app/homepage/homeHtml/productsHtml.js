import { goToProduct } from "/js/app/components/eventListeners/goToProduct.js";
import {
  fetchGames,
  extractProductData,
} from "/js/utils/api/products/productsApi.js";
import { loadError } from "/js/utils/auth/messages.js";

export async function createProductsHtml(selectedProductIndices) {
  try {
    const info = await fetchGames();

    if (info && Array.isArray(info)) {
      const productElements = info.map((product) => {
        const { id, title, shortDescription, imgSrc, imgAlt } =
          extractProductData(product);

        const column = document.createElement("div");
        column.classList.add("column");

        const imgEl = document.createElement("img");
        imgEl.classList.add("product");
        imgEl.src = imgSrc;
        imgEl.alt = imgAlt;
        imgEl.setAttribute("data-title", title);

        const backgroundBox = document.createElement("div");
        backgroundBox.classList.add("color-box");

        const captionContainer = document.createElement("div");
        captionContainer.classList.add("captionContainer-container");
        const titleH2 = document.createElement("h2");
        titleH2.classList.add("titleH2");
        titleH2.innerHTML = title;

        const prodText = document.createElement("p");
        prodText.classList.add("prodText");
        prodText.innerHTML = shortDescription;

        imgEl.addEventListener("click", () => goToProduct(id));
        backgroundBox.addEventListener("click", () => goToProduct(id));

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
