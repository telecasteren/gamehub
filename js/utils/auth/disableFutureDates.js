export function disableFutureDates() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  const formattedToday = `${yyyy}-${mm}-${dd}`;

  const dateInput = document.getElementById("BirthDate");
  if (dateInput) {
    console.log("Setting max date to today:", formattedToday); // Debugging
    dateInput.setAttribute("max", formattedToday);
  } else {
    console.error("Date input field not found.");
  }
}
