// Define the API key placeholder as per instructions, though it's not used in this app
const apiKey = "";
const apiUrl = ""; // Placeholder

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Mobile Navigation Toggle
    // ----------------------------------------------------------------------
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Close menu when a link is clicked (important for single-page apps)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    });

    // ----------------------------------------------------------------------
    // 2. Hero Slideshow Logic
    // ----------------------------------------------------------------------
    const images = document.querySelectorAll('.slideshow-image');
    let currentImageIndex = 0;

    const cycleImages = () => {
        // Hide current image
        images[currentImageIndex].classList.remove('active');

        // Move to next index (loop back to 0 if at the end)
        currentImageIndex = (currentImageIndex + 1) % images.length;

        // Show next image
        images[currentImageIndex].classList.add('active');
    };

    // Set the first image as active initially
    if (images.length > 0) {
        images[0].classList.add('active');
        // Start cycling every 5 seconds
        setInterval(cycleImages, 5000);
    }

    // ----------------------------------------------------------------------
    // 3. Scroll Reveal (Intersection Observer)
    // ----------------------------------------------------------------------
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the item is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove 'visible' class when it leaves the viewport
                // entry.target.classList.remove('visible'); // Commented out to keep animation visible once triggered
            }
        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Apply reveal to all existing targets
    document.querySelectorAll('.reveal-on-scroll').forEach(element => {
        scrollObserver.observe(element);
    });

    // New: Apply specific slide animations to contact cards
    document.querySelectorAll('.contact-card').forEach(element => {
        // Ensure contact cards are hidden initially for the animation to work
        element.classList.add('reveal-on-scroll');
        scrollObserver.observe(element);
    });


    // ----------------------------------------------------------------------
    // 5. Lucide Icons Re-Render (Best Practice)
    // ----------------------------------------------------------------------
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

/* ---------------------------------------------------------------------- */
/* PROJECTS SECTION – CLEAN EXTRACTED JS                                 */
/* ---------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById("carousel");
    const navLeft = document.getElementById("nav-left");
    const navRight = document.getElementById("nav-right");
    const dotsContainer = document.getElementById("dots-container");
    const projectCards = document.querySelectorAll(".project-card");

    if (!carousel || !navLeft || !navRight) return;

    /* ------------------------------------------- */
    /* Create Pagination Dots                      */
    /* ------------------------------------------- */
    const createDots = () => {
        dotsContainer.innerHTML = "";
        projectCards.forEach((_, index) => {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            if (index === 0) dot.classList.add("active");
            dot.dataset.index = index;

            dot.onclick = () => {
                const cardWidth = getCardWidth();
                carousel.scrollLeft = index * cardWidth;
            };
            dotsContainer.appendChild(dot);
        });
    };

    /* ------------------------------------------- */
    /* Get Card Width                              */
    /* ------------------------------------------- */
    const getCardWidth = () => {
        const card = projectCards[0];
        const gap = 32; // 2rem gap
        return card.offsetWidth + gap;
    };

    /* ------------------------------------------- */
    /* Update Button State & Dots                  */
    /* ------------------------------------------- */
    const updateCarouselState = () => {
        navLeft.disabled = carousel.scrollLeft <= 1;
        navRight.disabled =
            carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1;

        const cardWidth = getCardWidth();
        const activeIndex = Math.round(carousel.scrollLeft / cardWidth);

        document.querySelectorAll(".dot").forEach((dot, index) => {
            dot.classList.toggle("active", index === activeIndex);
        });
    };

    /* ------------------------------------------- */
    /* Scroll on Arrow Click                       */
    /* ------------------------------------------- */
    const scrollCard = (dir) => {
        const cardWidth = getCardWidth();
        const currentIndex = Math.round(carousel.scrollLeft / cardWidth);

        const targetIndex =
            dir === "left"
                ? Math.max(0, currentIndex - 1)
                : Math.min(projectCards.length - 1, currentIndex + 1);

        carousel.scrollLeft = targetIndex * cardWidth;
    };

    navLeft.onclick = () => scrollCard("left");
    navRight.onclick = () => scrollCard("right");
    carousel.onscroll = updateCarouselState;

    /* Initialize */
    createDots();
    updateCarouselState();

    window.onresize = () => {
        createDots();
        updateCarouselState();
    };
});


