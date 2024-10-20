import { ITEM_COUNT_KEY } from "/js/utils/general/constants.js";

export function updateTotals() {
  let totalQuantity = 0;
  const allQuantities = document.querySelectorAll(".quantity-number");

  allQuantities.forEach((quantityNumber) => {
    totalQuantity += parseInt(quantityNumber.textContent);
  });

  const itemCounter = document.getElementById("item-counter");
  itemCounter.textContent = totalQuantity;
  localStorage.setItem(ITEM_COUNT_KEY, totalQuantity);
}

export function initItemCounter() {
  const itemCounter = document.getElementById("item-counter");
  const currentTotalCount = localStorage.getItem(ITEM_COUNT_KEY);

  if (currentTotalCount) {
    itemCounter.textContent = currentTotalCount;
  } else {
    itemCounter.textContent = 0;
  }
  updateTotals();
}
updateTotals();
