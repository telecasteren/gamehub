import { alertMessage } from "/js/utils/auth/messages.js";

window.addEventListener("DOMContentLoaded", () => {
  const accountCreatedMessage = localStorage.getItem("accountCreatedMessage");

  if (accountCreatedMessage) {
    alertMessage(accountCreatedMessage, "success");

    localStorage.removeItem("accountCreatedMessage");
  }
});
