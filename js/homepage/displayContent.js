import { createProductsHtml } from "/js/homepage/homeHtml/productsHtml.js";
import { createArticlesHtml } from "/js/homepage/homeHtml/articlesHtml.js";
import { homeContainer } from "/js/utils/general/constants.js";
import { loadError } from "/js/utils/auth/messages.js";
import { handleGetButton } from "/js/homepage/getButton/handleButtonLogic.js";
import { articlePopupModalEvents } from "/js/homepage/articles/articleModal.js";
import { fetchGames } from "/js/api/productsApi.js";

export async function displayLandingContent() {
  try {
    const productData = await fetchGames();

    if (!productData || !Array.isArray(productData.data)) {
      throw new Error("Failed to fetch product data");
    }

    const [productElements, articleElements] = await Promise.all([
      createProductsHtml(),
      createArticlesHtml(),
    ]);

    if (productElements.length || articleElements.length) {
      homeContainer.innerHTML = "";

      // ----- TESTING

      const combinedContent = [];
      let productIndex = 0;

      for (let i = 0; i < articleElements.length; i++) {
        combinedContent.push(articleElements[i]);

        if (productElements[productIndex]) {
          combinedContent.push(productElements[productIndex]);
        }
        if (productElements[productIndex + 1]) {
          combinedContent.push(productElements[productIndex + 1]);
        }

        productIndex += 2;
      }

      while (productIndex < productElements.length) {
        combinedContent.push(productElements[productIndex]);
        productIndex++;
      }

      combinedContent.forEach((element) => {
        homeContainer.appendChild(element);
      });

      handleGetButton(productData.data);
      await articlePopupModalEvents();
    } else {
      homeContainer.innerHTML = `<div class=error>An error occurred when loading the content.</div>`;
    }
  } catch (error) {
    loadError("Error occurred while loading content");
    throw error;
  }
}

// Starting with products before articles:
// for (let i = 0; i < articleElements.length || productIndex < productElements.length; i++) {
//   // Add two products first, if available
//   if (productElements[productIndex]) {
//     combinedContent.push(productElements[productIndex]);
//   }
//   if (productElements[productIndex + 1]) {
//     combinedContent.push(productElements[productIndex + 1]);
//   }

//   // Move to the next pair of products
//   productIndex += 2;

//   // Add an article, if available
//   if (articleElements[i]) {
//     combinedContent.push(articleElements[i]);
//   }
// }

// combinedContent.forEach((element) => {
//   homeContainer.appendChild(element);
// });
