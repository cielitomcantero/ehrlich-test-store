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

const products = [
    {
        'id': 1,
        'title': 'Festive Looks Rust Red Ribbed Velvet Long Sleeve Bodysuit',
        'image': 'images/product/product-1.jpg',
        'link': '#',
        'price': '$38'
    },
    {
        'id': 2,
        'title': 'Chevron Flap Crossbody Bag',
        'image': 'images/product/product-2.jpg',
        'link': '#',
        'price': '$7.34',
        'sale_price': '$5.77'
    },
    {
        'id': 3,
        'title': 'Manilla Tan Multi Plaid Oversized Fringe Scarf',
        'image': 'images/product/product-3.jpg',
        'link': '#',
        'price': '$39',
        'sale_price': '$29'
    },
    {
        'id': 4,
        'title': 'Diamante Puff Sleeve Dress - Black',
        'image': 'images/product/product-4.jpg',
        'link': '#',
        'price': '$45.99'
    },
    {
        'id': 5,
        'title': 'Banneth Open Front Formal Dress in Black',
        'image': 'images/product/product-5.jpg',
        'link': '#',
        'price': '$99.95',
        'sale_price': '$69'
    }
];

const posts = [
    {
        'image': 'images/post/post-1.jpg',
        'link': '#'
    },
    {
        'image': 'images/post/post-2.jpg',
        'link': '#'
    },
    {
        'image': 'images/post/post-3.jpg',
        'link': '#'
    },
    {
        'image': 'images/post/post-4.jpg',
        'link': '#'
    },
    {
        'image': 'images/post/post-5.jpg',
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

    // Products
    const productsEl = document.querySelector('.container-recent-products .list-products');
    if (products?.length && productsEl) {
        let productsHtml = '';
        products.forEach((product) => {
            let priceHtml = '';
            if (product.sale_price) {
                priceHtml = `
                    <span class="sale-price">${product.sale_price}</span>
                    <span class="price"><s>${product.price}</s></span>
                `;
            } else {
                priceHtml = `<span class="price">${product.price}</span>`;
            }
            productsHtml += `
                <div class="product" data-id="${product.id}">
                    <div class="product-image">
                        <img src="${product.image}">
                    </div>
                    <a class="product-title" href="${product.link}">${product.title}</a>
                    <div class="product-price">
                        ${priceHtml}
                    </div>
                </div>
            `;
        });

        productsEl.innerHTML = productsHtml;
    }

    // Posts
    const postsEl = document.querySelector('.container-posts .list-posts');
    if (posts?.length && postsEl) {
        let postsHtml = '';
        posts.forEach((post) => {
            postsHtml += `
                <div class="post">
                    <a class="post-image" href="${post.link}">
                        <img src="${post.image}">
                    </a>
                </div>
            `;
        });

        postsEl.innerHTML = postsHtml;
    }
}

// Init app on load
document.addEventListener('DOMContentLoaded', initApp);