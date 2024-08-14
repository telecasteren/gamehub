const menuList = document.getElementById("menuList");
menuList.style.maxHeight = "0px";

const menuIcon = document.getElementById("menuIcon");
menuIcon.addEventListener("click", togglemenu);

function togglemenu() {
  if (menuList.style.maxHeight === "0px") {
    menuList.style.maxHeight = "500px";
  } else {
    menuList.style.maxHeight = "0px";
  }
}
