import { loadError, alertMessage } from "/js/utils/auth/messages.js";
import { setUserIDs } from "/js/utils/components/profile/createAccount/setUserIDs.js";

export async function createUserInfo(userInfo) {
  if (
    !userInfo.UserName ||
    !userInfo.UserEmail ||
    !userInfo.UserPassword ||
    !userInfo.BirthDate ||
    !userInfo.Address ||
    !userInfo.PostalCode ||
    !userInfo.Country
  ) {
    loadError("Incomplete user information");
    return;
  }

  try {
    // Fetch existing users here
    const response = await fetch("/js/utils/data/users/users.json");
    if (!response.ok) {
      throw new Error("Failed to fetch existing users.");
    }
    const userData = await response.json();
    const existingUsers = userData.users || [];

    // Get the unique ID and assign it
    const { assignNewUserId } = await setUserIDs();
    if (!assignNewUserId) {
      throw new Error("Failed to get unique ID logic.");
    }

    const userId = assignNewUserId(userInfo.UserName);
    userInfo.id = userId;

    existingUsers.push(userInfo);

    // Update the users.json file by sending the new users list to the server
    const updateResponse = await fetch(
      "http://127.0.0.1:3000/update-users?project=gamehub-website&file=users.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ users: existingUsers }),
      }
    );

    if (!updateResponse.ok) {
      throw new Error("Failed to update users.json on the server.");
    }

    const message = await updateResponse.text();
    console.log(message);

    alertMessage(
      `Welcome to GameHub!

    Login to activate your new user :)`,
      "success"
    );
  } catch (error) {
    console.error("Error creating user:", error);
    loadError("Error creating user.");
  }
}
