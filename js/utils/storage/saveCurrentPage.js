import { PREVIOUS_PAGE_KEY } from "/js/utils/general/constants.js";

// Saving current page to localStorage:
export function saveCurrentPage() {
  window.addEventListener("beforeunload", () => {
    localStorage.setItem(PREVIOUS_PAGE_KEY, window.location.href);
  });
}
