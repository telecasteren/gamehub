export function createAboutBackgroundImage() {
  const aboutSection = document.querySelector(".about-section");

  const aboutBackground = document.createElement("div");
  aboutBackground.className = "about-backgroundIMG";

  if (!aboutSection) {
    console.warn(".aboutSection not found");
    return;
  }

  const img = document.createElement("img");
  img.src = "/images/game-background-images.svg";
  img.alt = "game cover images";

  aboutBackground.appendChild(img);
  aboutSection.appendChild(aboutBackground);
}
