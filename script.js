let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
const visibleItems = 6; // Number of visible items at a time
const carousel = document.querySelector('.carousel');

// Clone the first few items to make the infinite scrolling smooth
for (let i = 0; i < visibleItems; i++) {
    const clone = items[i].cloneNode(true);
    carousel.appendChild(clone);
}

function moveCarousel() {
    currentIndex++;
    carousel.style.transition = 'transform 2s ease-in-out';
    carousel.style.transform = `translateX(-${currentIndex * (100 / visibleItems)}%)`;

    // Reset carousel position after the last visible item
    if (currentIndex === totalItems) {
        setTimeout(() => {
            carousel.style.transition = 'none';
            carousel.style.transform = 'translateX(0)';
            currentIndex = 0;
        }, 500); // Timeout must match the transition time
    }
}

let interval = setInterval(moveCarousel, 4000); // Move every 4 seconds

// Manual Left Navigation
document.querySelector('.arrow.left').addEventListener('click', function() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = totalItems - 1;
        carousel.style.transition = 'none';
        carousel.style.transform = `translateX(-${currentIndex * (100 / visibleItems)}%)`;
    } else {
        carousel.style.transition = 'transform 0.5s ease-in-out';
        carousel.style.transform = `translateX(-${currentIndex * (100 / visibleItems)}%)`;
    }
    clearInterval(interval);
    interval = setInterval(moveCarousel, 4000); // Reset interval on manual control
});

// Manual Right Navigation
document.querySelector('.arrow.right').addEventListener('click', function() {
    moveCarousel();
    clearInterval(interval);
    interval = setInterval(moveCarousel, 4000); // Reset interval on manual control
});
