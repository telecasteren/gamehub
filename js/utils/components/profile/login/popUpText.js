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
  document.querySelector(".accountsBox").addEventListener("click", function () {
    popupHelpText(
      "You must be logged in to view your account and active subscriptions"
    );
  });

  document
    .querySelector(".communityBox")
    .addEventListener("click", function () {
      popupHelpText("Log in to connect with our community!");
    });

  document
    .querySelector(".discountsBox")
    .addEventListener("click", function () {
      popupHelpText("You must be logged in to view your discount coupons");
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
