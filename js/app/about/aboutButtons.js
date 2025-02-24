export function createAboutButtons() {
  const aboutButtonsContainer = document.querySelector(
    ".aboutButtonsContainer"
  );

  if (!aboutButtonsContainer) {
    console.warn(".aboutButtonsContainer not found");
    return;
  }

  const buyLink = document.createElement("a");
  buyLink.href = "/navigate/products/product-list/";

  const buyButton = document.createElement("button");
  buyButton.className = "buyBTN";
  buyButton.textContent = "BUY GAMES";

  buyLink.appendChild(buyButton);

  const sellLink = document.createElement("a");
  sellLink.href = "/navigate/profile/login/";

  const sellButton = document.createElement("button");
  sellButton.className = "sellBTN";
  sellButton.textContent = "SELL GAMES";

  sellLink.appendChild(sellButton);

  aboutButtonsContainer.appendChild(buyLink);
  aboutButtonsContainer.appendChild(sellLink);
}
