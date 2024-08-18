import { wrapper, gameUrl } from "/js/utils/general/constants.js";

export async function fetchGames(id) {
  try {
    const url = id ? `${gameUrl}/${id}` : `${gameUrl}`;
    const response = await fetch(url);
    const info = await response.json();

    return info;
  } catch (error) {
    console.log("Error occurred: ", error);
    wrapper.innerHTML = `<div class="error">An error occurred when loading the products..</div>`;
    throw error;
  }
}
