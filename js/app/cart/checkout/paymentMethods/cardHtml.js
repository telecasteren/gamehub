export function cardDetailsHtml() {
  const cardDetailsDiv = document.querySelector(".cardDetails");

  const dateLabel = document.createElement("label");
  dateLabel.setAttribute("for", "date");
  dateLabel.hidden = true;
  dateLabel.textContent = "Expiration date";

  const dateInput = document.createElement("input");
  dateInput.setAttribute("type", "date");
  dateInput.setAttribute("name", "date");
  dateInput.setAttribute("id", "cardDetails");
  dateInput.required = true;

  const cardNumberInput = document.createElement("input");
  cardNumberInput.setAttribute("type", "number");
  cardNumberInput.setAttribute("name", "number");
  cardNumberInput.setAttribute("placeholder", "cardnumber *");
  cardNumberInput.required = true;

  const cvcLabel = document.createElement("label");
  cvcLabel.setAttribute("for", "number");
  cvcLabel.hidden = true;
  cvcLabel.textContent = "CVC code";

  const cvcInput = document.createElement("input");
  cvcInput.setAttribute("type", "number");
  cvcInput.setAttribute("name", "number");
  cvcInput.setAttribute("placeholder", "cvc number *");
  cvcInput.required = true;

  cardDetailsDiv.appendChild(dateLabel);
  cardDetailsDiv.appendChild(dateInput);
  cardDetailsDiv.appendChild(cardNumberInput);
  cardDetailsDiv.appendChild(cvcLabel);
  cardDetailsDiv.appendChild(cvcInput);
}
