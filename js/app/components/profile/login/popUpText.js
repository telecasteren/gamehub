import { loggedInUser } from "/js/utils/general/constants.js";

function popupHelpText(helpText) {
  if (!loggedInUser) {
    localStorage.setItem("HelpText", helpText);
    window.location.href = "/navigate/profile/login/";
  } else {
    // Proceed as if user is logged in
    window.location.href = "/navigate/profile/";
  }
}

export function updateHelpTextEvents() {
  document
    .querySelector("#accountsText")
    .addEventListener("click", function () {
      popupHelpText(`Log in to view your account`);
    });

  document
    .querySelector("#communityText")
    .addEventListener("click", function () {
      popupHelpText(`Log in to connect with the community`);
    });

  document
    .querySelector("#discountsText")
    .addEventListener("click", function () {
      popupHelpText(`Log in to view your discounts`);
    });
}

export function displayHelpTextOnProfile() {
  const helpTextDiv = document.querySelector(".locationHelpText");
  const storedText = localStorage.getItem("HelpText");

  if (helpTextDiv && storedText) {
    helpTextDiv.innerText = storedText;
    helpTextDiv.style.fontStyle = "italic";
    helpTextDiv.style.color = "var(--logo-dark-blue)";

    localStorage.removeItem("HelpText");
  }
}
