// ===================================
// MAIN APPLICATION LOGIC
// Initialize all components
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 GlobalMart initialized!');

    // Smooth reveal on load
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Initialize AOS (Animate On Scroll) manually
    initializeScrollAnimations();

    // Add ripple effect to buttons
    setupRippleEffect();

    // Initialize scroll indicator
    setupScrollIndicator();

    // Cart functionality
    setupCart();
});

// Manual scroll animation trigger
function initializeScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

// Ripple effect on buttons
function setupRippleEffect() {
    document.addEventListener('click', (e) => {
        const button = e.target.closest('.ripple, .btn-primary, .btn-secondary');
        if (!button) return;

        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
}

// Scroll indicator
function setupScrollIndicator() {
    const indicator = document.getElementById('scroll-indicator');
    if (!indicator) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            indicator.style.opacity = '0';
        } else {
            indicator.style.opacity = '1';
        }
    });
}

// Simple cart system
function setupCart() {
    let cartCount = 0;
    const cartBtn = document.getElementById('cart-btn');

    document.addEventListener('click', (e) => {
        if (e.target.closest('.product-card .btn-primary')) {
            cartCount++;
            updateCartDisplay();
            showNotification('Product added to cart!');
        }
    });

    function updateCartDisplay() {
        if (cartBtn) {
            cartBtn.querySelector('span').textContent = `Cart (${cartCount})`;

            // Animate cart button
            cartBtn.style.transform = 'scale(1.1)';
            setTimeout(() => {
                cartBtn.style.transform = 'scale(1)';
            }, 200);
        }
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
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
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
    
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Log performance metrics
window.addEventListener('load', () => {
    setTimeout(() => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`✅ Page loaded in ${pageLoadTime}ms`);
    }, 0);
});
