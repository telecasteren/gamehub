import { fetchGameDetails } from "../api/gameApi.js";
import { updateCartCounter } from "../script.js";

const cartWindow = document.getElementById("cartWindow-box");

// Fetching the specific product by id, calling the function for creating the html for each product
// and calling the addToCartEvent for it to add product to cart by id
async function specificGame() {
  try {
    const details = await fetchGameDetails();

    const cartButton = document.querySelector(".addToCartBTN").outerHTML;

    cartWindow.innerHTML = "";

    const gameId = new URLSearchParams(window.location.search).get("gameId");
    const specificProd = details.find((product) => product.id === gameId);

    gameDetails(specificProd);

    cartWindow.insertAdjacentHTML("beforeend", cartButton);
    addToCartEvent(specificProd);
  } catch (error) {
    console.log("Error occurred: ", error);
    cartWindow.innerHTML = `<div class="error">An error occurred when loading the product..</div>`;
  }
}
specificGame();

// Creating the HTML for the specific product page
function gameDetails(product) {
  if (product) {
    const price = product.price;
    const discountPrice = product.discountedPrice;
    const genre = product.genre;
    const gameTitle = product.title;
    const ageRate = product.ageRating;
    const releaseDate = product.released;
    const gameText = product.description;
    const textContainer = document.querySelector(".productText");

    textContainer.innerHTML = "";

    const titleHead = document.createElement("div");
    titleHead.classList.add("title");
    titleHead.innerHTML = `<p>${gameTitle}</p>`;

    const gameTag = document.createElement("div");
    gameTag.classList.add("tagline");
    gameTag.innerHTML = `<p>
          Ages: ${ageRate}</br>
          Genre: ${genre}</br>
          Price: $${price}</p>`;

    if (product.onSale) {
      gameTag.innerHTML = `<p>
          Ages: ${ageRate}</br>
          Genre: ${genre}</br>
          Price: $${price}</br><b>Now only: <span class="discount-price">${discountPrice}</span></b></p>`;
    }

    textContainer.innerHTML = `<p>About:</br>${gameText}</br></br>Release year: ${releaseDate}</p>`;

    cartWindow.appendChild(titleHead);
    cartWindow.appendChild(gameTag);

    specificGameImg(product);
  } else {
    cartWindow.innerHTML = `<div class="error">Couldn't find the product.</div>`;
  }

  function specificGameImg(product) {
    const gameImg = product.image.url;
    const gameAlt = product.image.alt;

    const imgDiv = document.querySelector(".productIMG");
    const imgEl = document.createElement("img");

    imgEl.classList.add("productIMG");
    imgEl.src = gameImg;
    imgEl.alt = gameAlt;

    imgDiv.appendChild(imgEl);

    if (!gameAlt.length) {
      imgEl.alt = `Game cover for ${product.title}`;
    }
  }
}

function addToCartEvent(product) {
  const cartButton = document.querySelector(".addToCartBTN");

  function goToCart() {
    addToCart(product);

    // Setting a small timeout to make sure
    // the actions in addToCartEvent happens before going to cart:
    setTimeout(() => {
      window.location.href = `./cart.html`;
    }, 100);
  }
  cartButton.addEventListener("click", goToCart);
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProducts = cart.findIndex((item) => item.id === product.id);

  if (existingProducts !== -1) {
    cart[existingProducts].quantity++;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCounter();
}
