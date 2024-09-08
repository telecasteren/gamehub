import { createProductsHtml } from "/js/homepage/homeHtml/productsHtml.js";
import { createArticlesHtml } from "/js/homepage/homeHtml/articlesHtml.js";
import { homeContainer } from "/js/utils/general/constants.js";
import { loadError } from "/js/utils/auth/messages.js";
import { handleGetButton } from "/js/homepage/getButton/handleButtonLogic.js";
import { articlePopupModalEvents } from "/js/homepage/articles/articleModal.js";
import { fetchGames } from "/js/api/productsApi.js";

function getRandomSubset(array, size) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
}

async function getSelectedProductIndices(productElements) {
  const lastUpdate = localStorage.getItem("lastProductUpdate");
  const presentTime = new Date().getTime();
  const oneMonth = 30 * 24 * 60 * 60 * 1000;

  if (lastUpdate && presentTime - lastUpdate < oneMonth) {
    const storedIndices = sessionStorage.getItem("selectedProductIndices");
    if (storedIndices) {
      return JSON.parse(storedIndices);
    }
  }

  const numProductsToSelect = 4;
  const indices = getRandomSubset(
    productElements.map((_, index) => index),
    numProductsToSelect
  ).sort((a, b) => a - b);

  sessionStorage.setItem("selectedProductIndices", JSON.stringify(indices));
  localStorage.setItem("lastProductUpdate", presentTime);

  return indices;
}

export async function displayLandingContent() {
  try {
    const productData = await fetchGames();

    if (!productData || !Array.isArray(productData.data)) {
      throw new Error("Failed to fetch product data");
    }

    const [productElements, articleElements] = await Promise.all([
      createProductsHtml([]),
      createArticlesHtml(),
    ]);

    if (productElements.length || articleElements.length) {
      homeContainer.innerHTML = "";

      const selectedProductIndices = await getSelectedProductIndices(
        productData.data
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

      handleGetButton(productData.data);
      await articlePopupModalEvents();
    } else {
      homeContainer.innerHTML = `<div class="error">An error occurred when loading the content.</div>`;
    }
  } catch (error) {
    loadError("Error occurred while loading content");
    throw error;
  }
}
