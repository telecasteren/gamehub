import { aboutTextContent } from "/js/utils/data/textFiles/aboutText.js";
import { aboutSection } from "/js/utils/general/constants.js";

export function createAboutText() {
  if (!aboutSection) {
    console.warn("Element .about-section not found");
    return;
  } else {
    const paragraph = document.createElement("p");

    paragraph.innerHTML = `
      <b>GameHub</b><br />
      ${aboutTextContent.intro}<br /><br />
      ${aboutTextContent.pricing}<br /><br />
      <b>Gamers</b><br />
      ${aboutTextContent.gamersCall}<br /><br />
      <b>Join</b><br />
      ${aboutTextContent.joinUs}
    `;

    aboutSection.appendChild(paragraph);
  }
}
