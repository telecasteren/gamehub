import { fetchGames } from "/js/utils/api/products/productsApi.js";
import { loadError } from "/js/utils/auth/messages.js";
import { getItemsInLocalStorage } from "/js/utils/storage/getItemsInLocalStorage.js";
import { CART_KEY } from "/js/utils/general/constants.js";

// Fetching data from the API upon changes and update items in localStorage if needed:
export async function updateCartWithAPI() {
  try {
    const apiData = await fetchGames();
    const localData = getItemsInLocalStorage();

    const updatedCartData = localData.map((localItem) => {
      const apiItem = apiData.find((apiItem) => apiItem.id === localItem.id);
      return apiItem ? { ...localItem, ...apiItem } : localItem;
    });

    localStorage.setItem(CART_KEY, JSON.stringify(updatedCartData));
  } catch (error) {
    console.log("Error occurred while fetching API details:", error);
    loadError();
  }
}
