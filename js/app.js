const initApp = () => {
    // Slider
    const sliderEl = document.getElementById('home-slider');
    if (sliderEl) {
        const homeSlider = new Swiper(sliderEl, {
            autoplay: {
                delay: 5000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true
            },
            loop: true,
            navigation: {
                nextEl: '.home-slider-next',
                prevEl: '.home-slider-prev',
            }
        });
    }
}

// Init app on load
document.addEventListener('DOMContentLoaded', initApp);