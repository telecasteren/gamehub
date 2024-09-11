function getRandomSubset(array, size) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
}

export async function getSelectedProductIndices(productElements) {
  const lastUpdate = localStorage.getItem("lastProductUpdate");
  const lastUpdatedTime = new Date(lastUpdate).getDate();
  const presentTime = new Date().getTime();
  const oneMonth = 30 * 24 * 60 * 60 * 1000;

  if (lastUpdate && presentTime - lastUpdatedTime < oneMonth) {
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
  localStorage.setItem("lastProductUpdate", new Date().toISOString());

  return indices;
}
