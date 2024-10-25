export async function fetchFAQData() {
  try {
    const response = await fetch("/js/utils/data/textFiles/faq.json");
    const data = await response.json();

    return data;
  } catch (error) {
    loadError("Failed to fetch FAQ Data", error);
    return [];
  }
}
