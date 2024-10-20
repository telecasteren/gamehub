import { createProductsHtml } from "/js/app/homepage/homeHtml/productsHtml.js";
import { createArticlesHtml } from "/js/app/homepage/homeHtml/articlesHtml.js";
import { homeContainer } from "/js/utils/general/constants.js";
import { loadError } from "/js/utils/auth/messages.js";
import { handleGetButton } from "/js/app/homepage/getButton/handleButtonLogic.js";
import { articlePopupModalEvents } from "/js/app/homepage/articles/articleModal.js";
import { fetchGames } from "/js/utils/api/productsApi.js";
import { getSelectedProductIndices } from "/js/utils/storage/getSelectedProductIndices.js";

export async function displayLandingContent() {
  try {
    const productData = await fetchGames();

    if (!productData || !Array.isArray(productData)) {
      throw new Error("Failed to fetch product data");
    }

    const [productElements, articleElements] = await Promise.all([
      createProductsHtml([]),
      createArticlesHtml(),
    ]);

    if (productElements.length || articleElements.length) {
      homeContainer.innerHTML = "";

      const selectedProductIndices = await getSelectedProductIndices(
        productData
      );

      articleElements.forEach((article) => {
        if (article instanceof Node) {
          homeContainer.appendChild(article);
        } else {
          console.warn("Invalid article element:", article);
        }
      });

      const productsHtml = await createProductsHtml(selectedProductIndices);
      if (productsHtml instanceof Node) {
        homeContainer.appendChild(productsHtml);
      } else {
        console.warn("productsHtml is not a valid DOM node:", productsHtml);
      }

      handleGetButton(productData);
      await articlePopupModalEvents();
    } else {
      homeContainer.innerHTML = `<div class="error">An error occurred when loading the content.</div>`;
    }
  } catch (error) {
    loadError("Error occurred while loading content");
    throw error;
  }
}
