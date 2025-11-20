/**
 * MAIN APPLICATION LOGIC
 * Core functionality for the e-commerce website
 */

// Sample product data
const products = [
    { id: 1, name: 'Premium Wireless Headphones', category: 'electronics', price: 299.99, image: 'images/products/product-1.png', badge: 'Trending', filter: ['all', 'trending'] },
    { id: 2, name: 'Smart Fitness Watch', category: 'electronics', price: 249.99, image: 'images/products/product-2.png', badge: 'New', filter: ['all', 'new'] },
    { id: 3, name: 'Designer Sunglasses', category: 'fashion', price: 159.99, image: 'images/products/product-3.png', badge: '', filter: ['all'] },
    { id: 4, name: 'Leather Backpack', category: 'fashion', price: 189.99, image: 'images/products/product-4.png', badge: 'Sale', filter: ['all', 'sale'] },
    { id: 5, name: 'Coffee Maker Pro', category: 'home', price: 129.99, image: 'images/products/product-5.png', badge: '', filter: ['all'] },
    { id: 6, name: 'Yoga Mat Premium', category: 'sports', price: 49.99, image: 'images/products/product-6.png', badge: 'Sale', filter: ['all', 'sale'] },
    { id: 7, name: 'Wireless Earbuds', category: 'electronics', price: 149.99, image: 'images/products/product-7.png', badge: 'Trending', filter: ['all', 'trending'] },
    { id: 8, name: 'Running Shoes', category: 'sports', price: 119.99, image: 'images/products/product-8.png', badge: 'New', filter: ['all', 'new'] },
    { id: 9, name: 'Skincare Set', category: 'beauty', price: 89.99, image: 'images/products/product-9.png', badge: '', filter: ['all'] },
    { id: 10, name: 'Gaming Mouse', category: 'electronics', price: 79.99, image: 'images/products/product-10.png', badge: 'Trending', filter: ['all', 'trending'] },
    { id: 11, name: 'Winter Jacket', category: 'fashion', price: 219.99, image: 'images/products/product-11.png', badge: '', filter: ['all'] },
    { id: 12, name: 'Air Purifier', category: 'home', price: 199.99, image: 'images/products/product-12.png', badge: 'New', filter: ['all', 'new'] },
];

// Global state
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'all';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSearch();
    renderProducts();
    initProductFilters();
    initCart();
    initModals();
    initForms();
    updateCartCount();
});

// Navigation
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }

        lastScroll = currentScroll;
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-input');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            filterProductsBySearch(searchTerm);
        });
    }
}

function filterProductsBySearch(term) {
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    );
    renderProducts(filteredProducts);
}

// Product rendering
function renderProducts(productList = products) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    const filtered = productList.filter(p =>
        currentFilter === 'all' || p.filter.includes(currentFilter)
    );

    grid.innerHTML = filtered.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Add click handlers
    grid.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(parseInt(btn.dataset.id));
        });
    });

    grid.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            showProductModal(parseInt(card.dataset.id));
        });
    });
}

// Product filtering
function initProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderProducts();
        });
    });
}

// Cart functionality
function initCart() {
    const cartBtn = document.querySelector('.cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartClose = document.querySelector('.cart-close');

    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            cartSidebar.classList.add('active');
            renderCart();
        });
    }

    if (cartClose) {
        cartClose.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
        });
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartCount();
    showNotification('Product added to cart!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCart();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = count;
    }
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.querySelector('.total-amount');

    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #a0aec0; padding: 40px;">Your cart is empty</p>';
        totalAmount.textContent = '$0.00';
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" style="display: flex; gap: 16px; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0;">
            <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
            <div style="flex: 1;">
                <h4 style="margin: 0 0 8px 0; font-size: 14px;">${item.name}</h4>
                <p style="margin: 0; color: #a0aec0; font-size: 12px;">$${item.price.toFixed(2)} x ${item.quantity}</p>
                <button onclick="removeFromCart(${item.id})" style="margin-top: 8px; background: none; border: none; color: #f5576c; cursor: pointer; font-size: 12px;">Remove</button>
            </div>
        </div>
    `).join('');

    totalAmount.textContent = `$${total.toFixed(2)}`;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Modal functionality
function initModals() {
    const modal = document.getElementById('product-modal');
    const modalClose = document.querySelector('.modal-close');

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
}

function showProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('product-modal');
    const modalBody = modal.querySelector('.modal-body');

    modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding: 20px;">
            <div>
                <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 16px;">
            </div>
            <div>
                <h2 style="margin-bottom: 16px;">${product.name}</h2>
                <p style="color: #a0aec0; margin-bottom: 24px;">${product.category}</p>
                <div style="font-size: 36px; font-weight: 700; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 32px;">
                    $${product.price.toFixed(2)}
                </div>
                <p style="color: #4a5568; line-height: 1.8; margin-bottom: 32px;">
                    High-quality ${product.name.toLowerCase()} with premium features and exceptional durability. Perfect for everyday use with a modern design that fits any lifestyle.
                </p>
                <button onclick="addToCart(${product.id}); document.getElementById('product-modal').classList.remove('active');" class="btn-primary" style="width: 100%;">
                    Add to Cart
                </button>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

// Form handling
function initForms() {
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            showNotification(`Thank you for subscribing with ${email}!`);
            newsletterForm.reset();
        });
    }
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
