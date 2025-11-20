// ===================================
// INTERACTIONS - Mouse effects, 3D cards, magnetic elements
// ===================================

class InteractionManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupCustomCursor();
        this.setup3DCards();
        this.setupMagneticButtons();
        this.setupProductFilters();
        this.setupSmoothScroll();
        this.setupNavigation();
        this.setupForms();
    }

    // Custom cursor with particle trail
    setupCustomCursor() {
        const cursor = document.getElementById('cursor');
        const cursorFollower = document.getElementById('cursor-follower');

        if (!cursor || !cursorFollower) return;

        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';

            // Create particle trail
            if (Math.random() > 0.8) {
                this.createCursorParticle(mouseX, mouseY);
            }
        });

        // Smooth follower
        const animateFollower = () => {
            const dx = mouseX - followerX;
            const dy = mouseY - followerY;

            followerX += dx * 0.1;
            followerY += dy * 0.1;

            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';

            requestAnimationFrame(animateFollower);
        };
        animateFollower();

        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .product-card, .feature-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorFollower.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorFollower.classList.remove('cursor-hover');
            });
        });
    }

    createCursorParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 800);
    }

    // 3D card tilt effect
    setup3DCards() {
        const cards = document.querySelectorAll('.product-card, .feature-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;

                card.style.setProperty('--rotate-x', rotateX + 'deg');
                card.style.setProperty('--rotate-y', rotateY + 'deg');
            });

            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--rotate-x', '0deg');
                card.style.setProperty('--rotate-y', '0deg');
            });
        });
    }

    // Magnetic button effect
    setupMagneticButtons() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                const moveX = x * 0.3;
                const moveY = y * 0.3;

                btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    // Product filtering
    setupProductFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const productsGrid = document.getElementById('products-grid');

        if (!productsGrid) return;

        // Load initial products
        this.loadProducts('all');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter products
                const filter = btn.getAttribute('data-filter');
                this.loadProducts(filter);
            });
        });

        // Load more button
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                const currentFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
                this.loadProducts(currentFilter, true);
            });
        }
    }

    loadProducts(category, append = false) {
        const grid = document.getElementById('products-grid');
        if (!grid || !window.allProducts) return;

        const filtered = category === 'all'
            ? window.allProducts.slice(0, 12)
            : window.allProducts.filter(p => p.category === category).slice(0, 12);

        const productsHTML = filtered.map(product => this.createProductCard(product)).join('');

        if (append) {
            grid.innerHTML += productsHTML;
        } else {
            grid.innerHTML = productsHTML;
        }

        // Re-setup 3D effects for new cards
        this.setup3DCards();
    }

    createProductCard(product) {
        return `
            <div class="product-card glass-effect">
                <div class="product-image" style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2)); display: flex; align-items: center; justify-content: center; font-size: 3rem;">
                    ${this.getCategoryEmoji(product.category)}
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-rating">
                        ${'⭐'.repeat(Math.floor(product.rating))} ${product.rating}
                    </div>
                    <span class="product-category">${product.category}</span>
                    <button class="btn-primary btn-full" style="margin-top: 1rem;">Add to Cart</button>
                </div>
            </div>
        `;
    }

    getCategoryEmoji(category) {
        const emojis = {
            electronics: '🎧',
            fashion: '👔',
            home: '🏠',
            beauty: '💄',
            sports: '⚽'
        };
        return emojis[category] || '🛍️';
    }

    // Smooth scroll
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Navigation
    setupNavigation() {
        const nav = document.getElementById('nav-main');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        // Sticky navigation
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(10, 10, 15, 0.95)';
            } else {
                nav.style.background = 'rgba(10, 10, 15, 0.8)';
            }
        });

        // Mobile menu toggle
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu on link click
            navMenu.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    // Forms
    setupForms() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            });
        }

        const newsletterForm = document.getElementById('newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Successfully subscribed to our newsletter!');
                newsletterForm.reset();
            });
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new InteractionManager();
});
