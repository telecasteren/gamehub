// const contactSection = document.querySelector(".contact-section");
import { contactSection } from "/js/utils/general/constants.js";

export function createContactBoxes(className, elements) {
  const box = document.createElement("div");
  box.className = className;

  if (elements) {
    elements.forEach(({ id, text, tabindex }) => {
      const p = document.createElement("p");
      p.id = id;
      p.innerHTML = text;
      if (tabindex) p.setAttribute("tabindex", tabindex);
      box.appendChild(p);
    });
  }

  return box;
}

if (contactSection) {
  contactSection.appendChild(
    createContactBoxes("accountsBox", [
      { id: "accountsText", text: "Accounts<br /><br />", tabindex: "0" },
      { id: "subscriptionsText", text: "Subscriptions", tabindex: "0" },
    ])
  );

  contactSection.appendChild(
    createContactBoxes("communityBox", [
      { id: "communityText", text: "Community<br /><br />", tabindex: "0" },
      { id: "onlineSafetyText", text: "Online safety", tabindex: "0" },
    ])
  );

  contactSection.appendChild(
    createContactBoxes("discountsBox", [
      { id: "discountsText", text: "Discounts<br /><br />", tabindex: "0" },
      { id: "deliveryReturnsText", text: "Delivery & returns", tabindex: "0" },
    ])
  );

  const locationBox = document.createElement("div");
  locationBox.className = "locationBox";
  locationBox.setAttribute("tabindex", "0");

  const locationLink = document.createElement("a");
  locationLink.href = "https://maps.app.goo.gl/KEezxYwjLb51rtWZ9";
  locationLink.target = "_blank";

  const locationText = document.createElement("p");
  locationText.id = "locationText";
  locationText.textContent = "Find us on Google maps";

  const locationIcon = document.createElement("div");
  locationIcon.className = "locationIcon";

  const icon = document.createElement("i");
  icon.className = "fa-solid fa-location-dot";
  icon.style.color = "#0582ca";

  locationIcon.appendChild(icon);
  locationLink.appendChild(locationText);
  locationLink.appendChild(locationIcon);
  locationBox.appendChild(locationLink);
  contactSection.appendChild(locationBox);
}
