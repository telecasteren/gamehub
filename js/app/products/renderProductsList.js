import { goToProduct } from "/js/app/components/eventListeners/goToProduct.js";
import { CURRENCY_KEY } from "/js/utils/general/constants.js";
import { extractProductData } from "/js/utils/api/products/productsApi.js";

export async function renderProduct(product) {
  const productWrapper = document.querySelector(".product-wrapper");
  try {
    const { id, title, price, onSale, salePrice, imgSrc, imgAlt } =
      extractProductData(product);

    const prodDiv = document.createElement("div");
    prodDiv.classList.add("product-container");

    const imgElement = document.createElement("img");
    imgElement.classList.add("products");
    imgElement.src = imgSrc;
    imgElement.alt = imgAlt;

    const overlayDiv = document.createElement("div");
    overlayDiv.classList.add("overlay");

    const textDiv = document.createElement("div");
    textDiv.classList.add("overlayText");
    textDiv.innerHTML = `
    ${title}<br>
    Price: ${price}${CURRENCY_KEY}`;

    if (onSale) {
      textDiv.innerHTML = `
    ${title}<br>
    Limited offer: ${salePrice}${CURRENCY_KEY}`;
    }

    overlayDiv.appendChild(textDiv);
    prodDiv.appendChild(imgElement);
    prodDiv.appendChild(overlayDiv);

    if (productWrapper) {
      productWrapper.appendChild(prodDiv);
    }

    overlayDiv.addEventListener("click", () => {
      goToProduct(id);
    });
  } catch (error) {
    console.error("Error occurred: ", error);
    productWrapper.innerHTML = `<div class="error">An error occurred in displaying the products</div>`;
  }
}
