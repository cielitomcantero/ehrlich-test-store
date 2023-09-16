// Test data for list of categories
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

// Test data for list of products
const products = [
    {
        'id': 1,
        'title': 'Festive Looks Rust Red Ribbed Velvet Long Sleeve Bodysuit',
        'image': 'images/product/product-1.jpg',
        'link': '#',
        'price': '$38',
        'price_final': 38
    },
    {
        'id': 2,
        'title': 'Chevron Flap Crossbody Bag',
        'image': 'images/product/product-2.jpg',
        'link': '#',
        'price': '$7.34',
        'sale_price': '$5.77',
        'price_final': 5.77
    },
    {
        'id': 3,
        'title': 'Manilla Tan Multi Plaid Oversized Fringe Scarf',
        'image': 'images/product/product-3.jpg',
        'link': '#',
        'price': '$39',
        'sale_price': '$29',
        'price_final': 29
    },
    {
        'id': 4,
        'title': 'Diamante Puff Sleeve Dress - Black',
        'image': 'images/product/product-4.jpg',
        'link': '#',
        'price': '$45.99',
        'price_final': 45.99
    },
    {
        'id': 5,
        'title': 'Banneth Open Front Formal Dress in Black',
        'image': 'images/product/product-5.jpg',
        'link': '#',
        'price': '$99.95',
        'sale_price': '$69',
        'price_final': 69
    }
];

// Test data for list of posts
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

// Init app
const initApp = () => {
    // Initialize swiper slider
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

    // Populate categories list
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

    // Populate products list
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
                    <div class="product-info">
                        <a class="product-title" href="${product.link}">${product.title}</a>
                        <div class="product-price">
                            ${priceHtml}
                        </div>
                    </div>
                    <div class="product-action">
                        <button class="btn btn-primary">Buy</button>
                    </div>
                </div>
            `;
        });

        productsEl.innerHTML = productsHtml;

        // Click event listener for product "buy" button
        const buyButtons = document.querySelectorAll('.container-recent-products button');
        if (buyButtons?.length) {
            buyButtons.forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    const productEl = e.target.closest('.product');

                    if (!productEl) {
                        alert('Invalid product!');
                    } else {
                        const productId = productEl.dataset.id;
                        Cart.addToCart(productId);

                        alert('Added to cart!');
                    }
                });
            });
        }
    }

    // Populate posts list
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

    // Open cart popup when clicking icon in header
    const cartPopupButton = document.querySelector('.cart-popup-container a');
    const cartPopupEl = document.querySelector('.cart-popup');
    if (cartPopupButton) {
        cartPopupButton.addEventListener('click', (e) => {
            e.preventDefault();

            cartPopupEl.innerHTML = '';

            if (cartPopupEl.classList.contains('show')) {
                cartPopupEl.classList.remove('show');
                return;
            }

            const _products = Cart.getCartProducts();
            let cartPopupHtml = '';

            if (_products?.length) {
                let quantityTotal = 0;
                let cartTotal = 0;
                let cartItemsHtml = '';

                _products.forEach(product => {
                    const subTotal = product.price_final * product.quantity;
                    quantityTotal += product.quantity;
                    cartTotal += subTotal;
                    cartItemsHtml += `
                        <div class="product">
                            <div class="product-image">
                                <img src="${product.image}">
                            </div>
                            <div class="product-info">
                                <div class="product-title">${product.title}</div>
                                <div class="product-price">Price: <strong>$${product.price_final}</strong></div>
                                <div class="product-price">Qty: <strong>${product.quantity}</strong></div>
                                <div class="product-subtotal">Subtotal: <strong>$${subTotal}</strong></div>
                            </div>
                        </div>
                    `;
                });

                cartTotal = parseFloat(cartTotal).toFixed(2);

                cartPopupHtml = `
                    <div class="list-products">${cartItemsHtml}</div>
                    <div class="totals">
                        <span>Total:</span>
                        <span>$${cartTotal}</span>
                    </div>
                    <a href="cart.html" class="btn btn-secondary">Go to Cart</a>
                `;
            } else {
                cartPopupHtml = `<p>Cart is empty.</p>`;
            }

            cartPopupEl.innerHTML = cartPopupHtml;
            cartPopupEl.classList.add('show');
        });
    }

    // Close cart popup when clicking outside of popup
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.cart-popup-container')) {
            const cartPopupEl = document.querySelector('.cart-popup');
            if (cartPopupEl) {
                cartPopupEl.classList.remove('show');
            }
        }
    }, false);

    // Populate items in cart
    const cartPageEl = document.querySelector('.page-cart');
    const cartListEl = document.querySelector('.page-cart .list-cart');
    if (cartPageEl) {
        const _populateCart = () => {
            cartListEl.innerHTML = '';
        
            const _products = Cart.getCartProducts();
            let cartListHtml = '';

            if (_products?.length) {
                let quantityTotal = 0;
                let cartTotal = 0;
                let cartItemsHtml = '';

                _products.forEach(product => {
                    const subTotal = product.price_final * product.quantity;
                    quantityTotal += product.quantity;
                    cartTotal += subTotal;
                    cartItemsHtml += `
                        <div class="product" data-id="${product.id}">
                            <div class="col-image">
                                <img src="${product.image}">
                            </div>
                            <div class="col-item">
                                <div class="product-title">${product.title}</div>
                                <button class="btn btn-sm btn-secondary btn-remove">Remove</button>
                            </div>
                            <div class="col-quantity">
                                <span class="product-quantity">${product.quantity}</span>
                            </div>
                            <div class="col-price">
                                <span class="product-price">$${product.price_final}</span>
                            </div>
                            <div class="col-subtotal">
                                <span class="product-subtotal">$${subTotal}</span>
                            </div>
                        </div>
                    `;
                });

                cartTotal = parseFloat(cartTotal).toFixed(2);

                cartListHtml = `
                    <div class="list-products--label">
                        <div class="col-image"></div>
                        <div class="col-item">Description</div>
                        <div class="col-quantity">Quantity</div>
                        <div class="col-price">Price</div>
                        <div class="col-subtotal">Subtotal</div>
                    </div>
                    <div class="list-products">${cartItemsHtml}</div>
                    <div class="totals">
                        <div class="label">Total:</div>
                        <div class="amount">$${cartTotal}</div>
                    </div>
                `;
            } else {
                cartListHtml = `<p>Cart is empty.</p>`;
            }

            cartListEl.innerHTML = cartListHtml;

            // Click event listener for "remove" button in cart
            const removeButtons = document.querySelectorAll('.container-cart .btn-remove');
            if (removeButtons?.length) {
                removeButtons.forEach((btn) => {
                    btn.addEventListener('click', (e) => {
                        const productEl = e.target.closest('.product');

                        if (!productEl) {
                            alert('Invalid product!');
                        } else {
                            const productId = productEl.dataset.id;
                            Cart.removeFromCart(productId);

                            _populateCart();
                            alert('Removed from cart!');
                        }
                    });
                });
            }
        };

        _populateCart();
    }
}

// Cart actions
const Cart = {

    // Add product to cart
    addToCart: (productId) => {
        if (!productId) return;
        
        const cartData = LocalData.getCartData();
        if (!cartData[productId]) {
            cartData[productId] = 0;
        }

        cartData[productId] += 1;

        LocalData.setCartData(cartData);
    },
    
    // Remove product from cart
    removeFromCart: (productId) => {
        if (!productId) return;

        const cartData = LocalData.getCartData();
        if (!cartData[productId]) {
            cartData[productId] = 0;
        }

        cartData[productId] -= 1;

        if (cartData[productId] < 0) {
            cartData[productId] = 0;
        }

        if (!cartData[productId]) {
            delete cartData[productId];
        }

        LocalData.setCartData(cartData);
    },

    // Generate list of products in cart with details
    getCartProducts: () => {
        const cartData = LocalData.getCartData();
        let _products = [];
        
        if (cartData) {
            for (const d in cartData) {
                const id = parseInt(d);
                const quantity = cartData[d];
                const product = products.find((p) => p.id == id);
                product.quantity = quantity;

                _products.push(product);
            }
        }

        return _products;
    }
};

// Manage data using localStorage
const LocalData = {

    // Get data from localStorage
    getCartData: () => {
        const data = localStorage.getItem('ehrlich-cart');

        if (data) {
            return JSON.parse(data);
        }

        return {};
    },

    // Save data to localStorage
    setCartData: (data) => {
        localStorage.setItem('ehrlich-cart', JSON.stringify(data));
    }
};

// Init app on load
document.addEventListener('DOMContentLoaded', initApp);