export function getBTN() {
  const topContent = document.querySelector(".landingTopContent");

  const getBtn = document.createElement("button");
  getBtn.className = "getBTN";
  getBtn.innerText = "GET YOURS NOW";

  if (topContent) {
    topContent.appendChild(getBtn);
  }

  return getBtn;
}
