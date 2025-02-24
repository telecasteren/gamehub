export function togglemenu() {
  if (menuList.style.maxHeight === "0px") {
    menuList.style.maxHeight = "500px";
    menuList.style.borderBottom = "1px solid var(--light-blue-box)";
  } else {
    menuList.style.maxHeight = "0px";
    menuList.style.borderBottom = "0";
  }
}
