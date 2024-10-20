import { loadError } from "/js/utils/auth/messages.js";
import { UserEmail } from "/js/utils/general/constants.js";

export function successMessage() {
  const messageContainer = document.querySelector(".message-container");

  if (messageContainer) {
    const subtitleElement = document.createElement("h3");
    subtitleElement.id = "thanksH3";
    subtitleElement.innerText = "Thank you for shopping with us!";

    const successMessage = document.createElement("p");
    successMessage.classList.add("successMessage");
    successMessage.innerText = `You will soon receive an order confirmation on email ${UserEmail}.`;

    messageContainer.appendChild(subtitleElement);
    messageContainer.appendChild(successMessage);
  } else {
    loadError("Couldn't load order confirmation.");
  }
}
