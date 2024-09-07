import { goToProduct } from "/js/script.js";
import { fetchGames } from "/js/api/productsApi.js";
import { loadError } from "/js/utils/auth/messages.js";

// Creating the html:
export async function createProductsHtml() {
  try {
    const info = await fetchGames();

    if (info && Array.isArray(info.data)) {
      return info.data.map((product) => {
        const productId = product.id;
        const productTitle = product.title;
        const prodDescription = product.description;

        const column = document.createElement("div");
        column.classList.add("column");

        const imgEl = document.createElement("img");
        imgEl.classList.add("product");
        imgEl.src = product.image.url;
        imgEl.alt = product.image.alt;
        imgEl.setAttribute("data-title", productTitle);

        imgEl.addEventListener("click", () => {
          goToProduct(productId);
        });

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

        captionContainer.appendChild(titleH2);
        captionContainer.appendChild(prodText);
        backgroundBox.appendChild(captionContainer);
        column.appendChild(imgEl);
        column.appendChild(backgroundBox);

        return column;
      });
    } else {
      throw new Error("Error fetching product data");
    }
  } catch (error) {
    loadError("Error occurred while loading content");
    return [];
  }
}
