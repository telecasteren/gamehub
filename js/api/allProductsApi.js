const wrapper = document.querySelector(".product-wrapper");
const url = "https://v2.api.noroff.dev/gamehub";
const proxy = "https://noroffcors.onrender.com/";
const gameUrl = proxy + url;

export async function fetchGames() {
  try {
    const response = await fetch(gameUrl);
    const info = await response.json();
    return info;
  } catch (error) {
    console.log("Error occurred: ", error);
    wrapper.innerHTML = `<div class="error">An error occurred when loading the products..</div>`;
    throw error;
  }
}
fetchGames();
