const categories = [
    {
        'name': 'Winter Fashion',
        'image': 'images/category/winter-fashion.jpg',
        'link': '#'
    },
    {
        'name': 'Boots',
        'image': 'images/category/boots.jpg',
        'link': '#'
    },
    {
        'name': 'Night Out',
        'image': 'images/category/night-out.jpg',
        'link': '#'
    },
    {
        'name': 'Holidays',
        'image': 'images/category/holidays.jpg',
        'link': '#'
    },
    {
        'name': 'Outerwear',
        'image': 'images/category/outerwear.jpg',
        'link': '#'
    },
    {
        'name': 'White Dresses',
        'image': 'images/category/white-dresses.jpg',
        'link': '#'
    },
    {
        'name': 'Sweaters',
        'image': 'images/category/sweaters.jpg',
        'link': '#'
    },
    {
        'name': 'Party',
        'image': 'images/category/party.jpg',
        'link': '#'
    }
];

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

    // Categories
    const categoriesEl = document.querySelector('.container-trending .list-category');
    if (categories?.length && categoriesEl) {
        let categoriesHtml = '';
        categories.forEach((category) => {
            categoriesHtml += `
                <div class="category">
                    <div class="category-image">
                        <img src="${category.image}">
                    </div>
                    <a class="category-title" href="${category.link}">${category.name}</a>
                </div>
            `;
        });

        categoriesEl.innerHTML = categoriesHtml;
    }
}

// Init app on load
document.addEventListener('DOMContentLoaded', initApp);