export function createProductsHtml() {
  const productsSection = document.querySelector(".products-section");

  if (productsSection) {
    const form = document.createElement("form");
    form.id = "search-form";

    const searchWrapper = document.createElement("div");
    searchWrapper.className = "search-wrapper";

    const searchInput = document.createElement("input");
    searchInput.id = "searchGames";
    searchInput.type = "text";
    searchInput.name = "search-games";
    searchInput.placeholder = "Search games..";

    searchWrapper.appendChild(searchInput);
    form.appendChild(searchWrapper);

    const optionsContainer = document.createElement("div");
    optionsContainer.className = "options-container";

    const productWrapper = document.createElement("div");
    productWrapper.className = "product-wrapper";

    const loader = document.createElement("div");
    loader.className = "loader";
    productWrapper.appendChild(loader);

    const expandBtn = document.createElement("button");
    expandBtn.id = "expandBTN";

    const expandLink = document.createElement("a");
    expandLink.href = "/navigate/products/product-list/more/";

    const expandImg = document.createElement("img");
    expandImg.src = "/images/icons-symbols/expand-products.svg";
    expandImg.alt = "expand-arrow";

    expandLink.appendChild(expandImg);
    expandBtn.appendChild(expandLink);

    productsSection.appendChild(form);
    productsSection.appendChild(optionsContainer);
    productsSection.appendChild(productWrapper);
    productsSection.appendChild(expandBtn);
  } else {
    console.log("Not found productsSection");
  }
}
