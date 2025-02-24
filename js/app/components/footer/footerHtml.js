export function footerElement() {
  const footer = document.createElement("footer");

  const footerRow = document.createElement("div");
  footerRow.className = "footerRow";

  const copyrightText = document.createElement("p");
  copyrightText.className = "copyright-text";
  copyrightText.innerHTML =
    "<b>¡THIS WEBSITE IS A PROTOTYPE!</b> Copyright &copy; 2023 All Rights Reserved by GameHub";

  footerRow.appendChild(copyrightText);
  footer.appendChild(footerRow);

  document.body.appendChild(footer);
}
