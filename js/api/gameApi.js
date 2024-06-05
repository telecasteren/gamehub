const prodUrl = "https://v2.api.noroff.dev/gamehub";
const corsUrl = "https://noroffcors.onrender.com/";
const fullGameUrl = corsUrl + prodUrl;

export async function fetchGameDetails() {
  try {
    const response = await fetch(fullGameUrl);
    const details = await response.json();

    return details.data;
  } catch (error) {
    console.error("Error occurred: ", error);
    throw error;
  }
}
