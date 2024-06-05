const loader = document.querySelector(".loader");

setTimeout(function () {
  loader.innerHTML += `<div class="${className}"></div>`;
}, 2000);
