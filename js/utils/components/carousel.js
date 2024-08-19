import { carousel, carouselImages } from "/js/utils/general/constants.js";

export function initCarouselSlider() {
  const carouselWrapper = document.createElement("div");
  carouselWrapper.className = "carousel-wrapper";

  carouselImages.forEach((image) => {
    const slide = document.createElement("div");
    slide.classList.add("carousel-slide");

    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt;

    slide.appendChild(img);
    carouselWrapper.appendChild(slide);
    carousel.appendChild(carouselWrapper);
  });

  const slides = document.querySelectorAll(".carousel-slide");
  const totalSlides = slides.length;
  let currentIndex = 0;

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    const offset = -currentIndex * 100;
    carouselWrapper.style.transform = `translateX(${offset}%)`;
  }

  carouselWrapper.style.width = `${totalSlides * 100}%`;
  carouselWrapper.style.transition = "transform 1s ease-in-out";
  slides.forEach((slide) => (slide.style.flex = "0 0 100%"));

  carouselWrapper.style.transform = `translateX(0%)`;

  setInterval(nextSlide, 5000);
}
