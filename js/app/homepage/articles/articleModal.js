import { createModal } from "/js/app/components/articleModal/modal.js";

export function articlePopupModalEvents() {
  createModal();

  function openModal(title, content) {
    const modal = document.querySelector(".modal");
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");
    const closeButton = document.querySelector(".close-modal");

    modalTitle.innerHTML = title;
    modalBody.innerHTML = "";

    content.forEach((paragraph) => {
      const p = document.createElement("p");
      p.innerHTML = paragraph;
      modalBody.appendChild(p);
    });

    modal.style.display = "block";
    modal.focus();

    const closeModal = () => {
      modal.style.display = "none";
      closeButton.removeEventListener("click", onCloseClick);
      window.removeEventListener("click", onClickOutside);
    };

    const onCloseClick = (event) => {
      if (event.target === closeButton) {
        closeModal();
      }
    };

    const onClickOutside = (event) => {
      if (event.target === modal) {
        closeModal();
      }
    };

    closeButton.addEventListener("click", onCloseClick);
    window.addEventListener("click", onClickOutside);
  }

  // Set up click handlers:
  function articleClickHandlers() {
    const articles = document.querySelectorAll(".articleColumn");

    articles.forEach((article) => {
      const titleElement = article.querySelector(".articleTitle");
      const imageElement = article.querySelector(".articleIMG");

      const handleClick = () => {
        const title = titleElement.innerText;
        const content = JSON.parse(
          article
            .querySelector(".articleContainer")
            .getAttribute("data-content")
        );
        openModal(title, content);
      };

      titleElement.addEventListener("click", handleClick);
      imageElement.addEventListener("click", handleClick);
    });
  }
  articleClickHandlers();
}
