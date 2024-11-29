const carousel = document.getElementById("reviewsCarousel");

// Duplicate content to enable seamless infinite scrolling
function duplicateContent() {
  const carouselContent = Array.from(carousel.children);
  carouselContent.forEach((item) => {
    const clonedItem = item.cloneNode(true);
    clonedItem.setAttribute("aria-hidden", true); // Optional for accessibility
    carousel.appendChild(clonedItem);
  });
}

duplicateContent(); // Duplicate items for infinite scroll effect

// Infinite auto-scroll function
function autoScroll() {
  const scrollSpeed = 3000; // Increase this for faster scrolling

  carousel.scrollLeft += scrollSpeed;

  // Reset the scroll position if it reaches half the duplicated content
  if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
    carousel.scrollLeft = 0; // Seamlessly jump back to start
  }

  requestAnimationFrame(autoScroll); // Continuously call autoScroll
}

// Start scrolling if reduced motion isn't preferred
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  autoScroll();
}



