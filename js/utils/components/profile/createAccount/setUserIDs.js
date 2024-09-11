import { loadError } from "/js/utils/auth/messages.js";

export async function setUserIDs() {
  try {
    const response = await fetch("/js/utils/data/users/users.json");
    const userData = await response.json();
    const existingUsers = userData.users || [];

    function generateUniqueID() {
      let id;
      const existingIds = new Set(existingUsers.map((user) => user.id));

      do {
        id = Math.floor(10000000 + Math.random() * 90000000).toString();
      } while (existingIds.has(id));

      return id;
    }

    const assignNewUserId = (userName) => {
      const newUserId = generateUniqueID();
      localStorage.setItem(userName, newUserId);
      return newUserId;
    };

    return { assignNewUserId };
  } catch (error) {
    loadError("Error fetching user data for ID generation.");
    console.log("Error occurred when checking userID:", error);
    return null;
  }
}
