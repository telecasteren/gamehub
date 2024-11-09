import { fetchGames } from "/js/utils/api/products/productsApi.js";
import { carousel, carouselImages } from "/js/utils/general/constants.js";
import { goToCarouselProduct } from "/js/app/components/carousel/goToCarouselProduct.js";

export async function initCarouselSlider() {
  const carouselWrapper = document.createElement("div");
  carouselWrapper.className = "carousel-wrapper";

  const apiInfo = await fetchGames();

  const response = apiInfo;
  const prodTitle = response[0].name;

  carouselImages.forEach((image) => {
    const slide = document.createElement("div");
    slide.classList.add("carousel-slide");

    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt;

    const overlayDiv = document.createElement("div");
    overlayDiv.classList.add("carouselOverlayDiv");

    const overlayText = document.createElement("p");
    overlayText.classList.add("carouselOverlayTitle");
    overlayText.innerHTML = `NEW RELEASE<br><span>${prodTitle}</span>`;

    setTimeout(function () {
      overlayDiv.appendChild(overlayText);
      slide.appendChild(overlayDiv);
    }, 50);

    slide.appendChild(img);
    carouselWrapper.appendChild(slide);

    goToCarouselProduct(prodTitle, overlayDiv);
  });
  carousel.appendChild(carouselWrapper);

  // Handle the slideshow here
  const slides = document.querySelectorAll(".carousel-slide");
  const totalSlides = slides.length;
  let currentIndex = 0;

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    const offset = -currentIndex * 100;
    carouselWrapper.style.transform = `translateX(${offset}%)`;
  }

  slides.forEach((slide) => (slide.style.flex = "0 0 100%"));
  carouselWrapper.style.transform = `translateX(0%)`;

  setInterval(nextSlide, 5000);
}
