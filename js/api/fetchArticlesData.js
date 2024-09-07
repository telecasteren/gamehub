export async function fetchArticlesData() {
  try {
    const response = await fetch("/js/utils/data/textFiles/articles.json");
    const data = await response.json();

    return data;
  } catch (error) {
    loadError("Failed to fetch articlesData", error);
    return [];
  }
}
