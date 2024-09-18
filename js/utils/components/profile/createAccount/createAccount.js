import { createUserInfo } from "/js/utils/components/profile/createAccount/createUser.js";
import { fields } from "/js/utils/components/profile/createAccount/fields.js";
import { loadError, alertMessage } from "/js/utils/auth/messages.js";
import { isUserOldEnough } from "/js/utils/auth/ageChecker.js";
import { disableFutureDates } from "/js/utils/auth/disableFutureDates.js";
import {
  createAccountBtn,
  createAccountBackArrow,
} from "/js/utils/general/constants.js";

export function createAccountEvents() {
  try {
    createAccountBtn.addEventListener("click", () => {
      const loginForm = document.querySelector(".logInForm");
      if (loginForm) {
        loginForm.style.display = "none";
      }

      const newUserFormContainer = document.createElement("div");
      newUserFormContainer.classList.add("newUserFormContainer");

      const newUserForm = document.createElement("form");
      newUserForm.classList.add("newUserForm", "form-container");
      if (newUserForm) {
        createAccountBtn.style.display = "none";
        createAccountBackArrow.style.display = "block";
      }

      fields.forEach((field) => {
        const input = document.createElement("input");
        input.id = field.id;
        input.type = field.type;
        input.placeholder = field.placeholder;

        Object.keys(field.attributes).forEach((attr) => {
          input.setAttribute(attr, field.attributes[attr]);
        });

        newUserForm.appendChild(input);
      });

      const submitButton = document.createElement("button");
      submitButton.type = "submit";
      submitButton.classList.add("saveAccountBtn");
      submitButton.innerText = "Create account";
      newUserForm.appendChild(submitButton);

      const createAccountContainer = document.querySelector(
        ".createAccount-container"
      );
      newUserFormContainer.appendChild(newUserForm);
      createAccountContainer.appendChild(newUserFormContainer);

      // Prevent user from picking dates in future
      const birthDateInput = document.getElementById("BirthDate");
      if (birthDateInput) {
        birthDateInput.addEventListener("focus", disableFutureDates);
      } else {
        console.error("BirthDate input not found.");
      }

      // Gather the form input values
      newUserForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const FirstName = document.querySelector("#FirstName").value;
        const LastName = document.querySelector("#LastName").value;
        const UserName = FirstName + " " + LastName;

        const userInfo = {
          UserName: UserName,
          UserEmail: document.querySelector("#UserEmail").value,
          UserPassword: document.querySelector("#UserPassword").value,
          BirthDate: document.querySelector("#BirthDate").value,
          Address: document.querySelector("#Address").value,
          PostalCode: document.querySelector("#PostalCode").value,
          Country: document.querySelector("#Country").value,
          active: false,
        };

        // Check if the user is at least 14 years old
        if (!isUserOldEnough(userInfo.BirthDate)) {
          alertMessage(
            `Hey there buddy..
            
          We're sorry but you can't create an account until you've turned 14.

          Welcome back!`,
            "warning"
          );
          return;
        }

        // If form input values are valid, create the new user
        if (newUserForm.checkValidity()) {
          createUserInfo(userInfo);
          alertMessage(
            "Welcome to GameHub! Login to activate your new user :)",
            "success"
          );
        } else {
          loadError("Please fill in all the required fields.");
        }
      });
    });
  } catch (error) {
    loadError("Couldn't create account");
    throw error;
  }
}
