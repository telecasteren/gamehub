import { loadError } from "/js/utils/auth/messages.js";
import { fetchArticlesData } from "/js/utils/api/fetchArticlesData.js";

export async function createArticlesHtml() {
  try {
    const articlesData = await fetchArticlesData();

    if (articlesData && Array.isArray(articlesData.articles)) {
      return articlesData.articles.map((article) => {
        const column = document.createElement("div");
        column.classList.add("articleColumn");

        const articleImage = document.createElement("img");
        articleImage.src = article.image.url;
        articleImage.alt = article.image.alt || "Article image";
        articleImage.classList.add("articleIMG");

        const articleTitle = document.createElement("h2");
        articleTitle.innerHTML = article.title;
        articleTitle.classList.add("articleTitle");

        const articleContainer = document.createElement("div");
        articleContainer.classList.add("articleContainer");

        articleContainer.setAttribute(
          "data-content",
          JSON.stringify(article.content)
        );

        column.appendChild(articleImage);
        column.appendChild(articleTitle);
        column.appendChild(articleContainer);

        return column;
      });
    } else {
      throw new Error("Error fetching article data");
    }
  } catch (error) {
    loadError("Error occurred while creating article: ", error);
    return [];
  }
}
