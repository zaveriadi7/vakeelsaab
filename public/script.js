const carousel = document.getElementById("reviewsCarousel");


function duplicateContent() {
  const carouselContent = Array.from(carousel.children);
  carouselContent.forEach((item) => {
    const clonedItem = item.cloneNode(true);
    clonedItem.setAttribute("aria-hidden", true); 
    carousel.appendChild(clonedItem);
  });
}

duplicateContent(); 

function autoScroll() {
  const scrollSpeed = 3000;
  carousel.scrollLeft += scrollSpeed;

 
  if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
    carousel.scrollLeft = 0; 

  requestAnimationFrame(autoScroll); 
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  autoScroll();
}



