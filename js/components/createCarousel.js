export default function createCarousel(key) {
  const right = document.querySelector(".product-carousel__icon");
  const cardContainer = document.querySelector(".product-carousel__container");
  let cardWidth = 224;
  const max = localStorage.getItem(key);
  let margin = 16;
  let transitionTime = "0.5s";

  let currentCard = 0;

  right.addEventListener("click", () => {
    currentCard++;
    let widthValue = currentCard * (cardWidth + margin);

    if (currentCard < max) {
      cardContainer.style.transform = `translate(-${widthValue}px)`;
      cardContainer.style.transitionDuration = transitionTime;
    } else {
      cardContainer.style.transform = `translate(0px)`;
      currentCard = 0;
    }
  });
}
