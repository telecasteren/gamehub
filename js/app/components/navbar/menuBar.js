import { togglemenu } from "/js/app/components/navbar/toggleMenu.js";

export function menuBar() {
  const topContent = document.querySelector(".topMenu-mobileView");

  const navBar = document.createElement("div");
  navBar.className = "nav-bar";

  const nav = document.createElement("nav");

  const menuList = document.createElement("ul");
  menuList.id = "menuList";
  menuList.style.maxHeight = "0px";

  const menuItems = [
    { text: "home", href: "/" },
    { text: "games", href: "/navigate/products/product-list/" },
    { text: "about", href: "/navigate/about/" },
    { text: "contact", href: "/navigate/contact/" },
    { text: "profile", href: "/navigate/profile/login/" },
  ];

  const currentPath = window.location.pathname;

  menuItems.forEach(({ text, href }) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = href;
    a.textContent = text;

    if (currentPath === href) {
      a.id = "current";
    }

    li.appendChild(a);
    menuList.appendChild(li);
  });

  const cartLi = document.createElement("li");
  const cartLink = document.createElement("a");
  cartLink.className = "rightNavElement";
  cartLink.href = "/navigate/cart/your-cart/";
  cartLink.textContent = "your cart ";
  if (currentPath.includes("/navigate/cart/your-cart/")) {
    cartLink.id = "current";
  }

  const itemCounter = document.createElement("span");
  itemCounter.id = "item-counter";
  itemCounter.textContent = "0";
  cartLink.appendChild(itemCounter);
  cartLi.appendChild(cartLink);
  menuList.appendChild(cartLi);

  nav.appendChild(menuList);

  const menuIcon = document.createElement("img");
  menuIcon.src = "/images/icons-symbols/hamburger-menu.png";
  menuIcon.className = "menu-icon";
  menuIcon.alt = "menu icon";
  menuIcon.id = "menuIcon";

  menuIcon.addEventListener("click", () => {
    menuList.classList.toggle("active");
    togglemenu();
  });

  navBar.appendChild(nav);
  navBar.appendChild(menuIcon);

  if (topContent) {
    topContent.prepend(navBar);
  }
}
