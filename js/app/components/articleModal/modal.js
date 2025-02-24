export function createModal() {
  const modal = document.createElement("div");
  modal.id = "article-modal";
  modal.className = "modal";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const closeModal = document.createElement("span");
  closeModal.className = "close-modal";
  closeModal.innerHTML = "&times;";
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  const modalTitle = document.createElement("h2");
  modalTitle.id = "modal-title";

  const modalBody = document.createElement("div");
  modalBody.id = "modal-body";

  modalContent.appendChild(closeModal);
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(modalBody);

  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";
  modalOverlay.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.appendChild(modalContent);
  modal.appendChild(modalOverlay);

  document.body.appendChild(modal);
}
