export function faqToggleMessage(text, type = "info") {
  const faqToggle = document.createElement("div");
  faqToggle.classList.add("faq-message", "faq", `faq-${type}`);
  faqToggle.setAttribute("role", "text");
  faqToggle.tabIndex = -1;

  const faqContent = document.createElement("div");
  faqContent.classList.add("faqToggle-content");

  const closeFaq = document.createElement("span");
  closeFaq.classList.add("close-faq");
  closeFaq.innerHTML = "&times;";

  const faqContentText = document.createElement("div");
  faqContentText.classList.add("faqContentText");
  faqContentText.innerText = text;

  faqContent.appendChild(faqContentText);
  faqContent.appendChild(closeFaq);

  faqToggle.appendChild(faqContent);

  const container = document.querySelector(".faq-toggle-container");
  if (container) {
    container.style.display = "block";
    container.appendChild(faqToggle);
    faqToggle.focus();
  }

  const close = () => {
    const contactForm = document.querySelector(".contactForm-container");
    contactForm.style.display = "block";
    container.style.display = "none";
    faqToggle.style.display = "none";

    document
      .querySelectorAll(
        "#subscriptionsText, #onlineSafetyText, #deliveryReturnsText"
      )
      .forEach(function (el) {
        el.style.fontWeight = "normal";
      });

    faqToggle.removeEventListener("click", onClickOutside);
    closeFaq.removeEventListener("click", onCloseClick);
  };

  const onCloseClick = (event) => {
    if (event.target === closeFaq) {
      close();
    }
  };

  const onClickOutside = (event) => {
    if (event.target === faqToggle) {
      close();
    }
  };

  closeFaq.addEventListener("click", onCloseClick);
  window.addEventListener("click", onClickOutside);
}
