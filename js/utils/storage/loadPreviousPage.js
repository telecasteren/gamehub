import { PREVIOUS_PAGE_KEY } from "/js/utils/general/constants.js";

// Loading previous page from localStorage:
export function loadPreviousPage() {
  let previousPage = localStorage.getItem(PREVIOUS_PAGE_KEY);
  const arrowCursor = document.querySelector("#backArrow img");

  if (arrowCursor) {
    document.querySelector("#backArrow").addEventListener("click", () => {
      if (previousPage) {
        window.location.href = previousPage;
      } else {
        console.log("Error occurred upon loading previous page");
        alert("Last browser history not found!");
      }
    });
  }
}
