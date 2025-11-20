// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: false,
        mirror: true,
        offset: 100
    });
    
    // Initialize all modules
    initCursor();
    initNavigation();
    initParticles();
    initParallax();
    initScrollEffects();
    initNewsletterForm();
    initProductInteractions();
    initMagneticButtons();
});

// ==================== CUSTOM CURSOR ====================
function initCursor() {
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    
    if (!cursorDot || !cursorOutline) return;
    
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });
    
    // Smooth follow for outline
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
        requestAnimationFrame(animateOutline);
    }
    animateOutline();
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .product-card-3d, .category-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(2)`;
            cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) scale(1.5)`;
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1)`;
            cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) scale(1)`;
        });
    });
}

// ==================== NAVIGATION ====================
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// ==================== PARTICLES ====================
function initParticles() {
    const particlesContainer = document.getElementById('particles-container');
    if (!particlesContainer) return;
    
    // Create floating particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.5)`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `particleFloat ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
}

// ==================== PARALLAX EFFECTS ====================
function initParallax() {
    // Parallax for hero floating products
    const hero3DScene = document.getElementById('hero-3d-scene');
    if (hero3DScene) {
        const floatingProducts = hero3DScene.querySelectorAll('.floating-product');
        
        document.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth) - 0.5;
            const mouseY = (e.clientY / window.innerHeight) - 0.5;
            
            floatingProducts.forEach((product) => {
                const depth = product.dataset.depth || 0.5;
                const moveX = mouseX * 100 * depth;
                const moveY = mouseY * 100 * depth;
                
                product.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }
    
    // Parallax scrolling
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Parallax backgrounds
        const parallaxLayers = document.querySelectorAll('.parallax-layer');
        parallaxLayers.forEach(layer => {
            const speed = layer.dataset.speed || 0.5;
            layer.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ==================== SCROLL EFFECTS ====================
function initScrollEffects() {
    // GSAP ScrollTrigger animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate sections on scroll
        gsap.utils.toArray('section').forEach(section => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'top 50%',
                    scrub: 1
                }
            });
        });
        
        // Animate category cards
        gsap.utils.toArray('.category-card').forEach((card, index) => {
            gsap.from(card, {
                opacity: 0,
                y: 100,
                rotation: 10,
                duration: 1,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    end: 'top 60%',
                    scrub: 1
                }
            });
        });
        
        // Parallax text effect
        gsap.to('.hero-title', {
            y: 100,
            opacity: 0.5,
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }
    
    // Smooth scroll for anchor links
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
}

// ==================== NEWSLETTER FORM ====================
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        const email = input.value;
        
        // Simulate subscription
        if (email) {
            // Show success message
            const button = form.querySelector('button');
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
            button.style.background = 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)';
            
            // Reset after 3 seconds
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
                input.value = '';
            }, 3000);
        }
    });
}

// ==================== PRODUCT INTERACTIONS ====================
function initProductInteractions() {
    // Product card hover effects
    const productCards = document.querySelectorAll('.product-card-3d');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // Product overlay buttons
    const btnIcons = document.querySelectorAll('.btn-icon');
    btnIcons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = this.querySelector('i');
            
            // Animate button
            gsap.to(this, {
                scale: 1.2,
                duration: 0.2,
                yoyo: true,
                repeat: 1
            });
            
            // Show notification based on button type
            if (icon.classList.contains('fa-heart')) {
                showNotification('Added to favorites!', 'success');
            } else if (icon.classList.contains('fa-shopping-cart')) {
                showNotification('Added to cart!', 'success');
            } else if (icon.classList.contains('fa-eye')) {
                showNotification('Quick view coming soon!', 'info');
            }
        });
    });
}

// ==================== MAGNETIC BUTTONS ====================
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.btn, .logo, .social-links a');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
}

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'linear-gradient(135deg, #f093fb, #f5576c)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease, slideOutRight 0.5s ease 2.5s;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ==================== CATEGORY CARD 3D TILT ====================
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ==================== LAZY LOADING IMAGES ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttle to scroll and resize events
window.addEventListener('scroll', throttle(() => {
    // Scroll-dependent code here
}, 100));

window.addEventListener('resize', debounce(() => {
    // Resize-dependent code here
    AOS.refresh();
}, 250));

// ==================== ANIMATION ON KEYFRAMES ====================
// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== PAGE LOAD ANIMATION ====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Fade in page content
    gsap.from('body', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
    });
});

console.log('🚀 Global Products - Website Initialized Successfully!');
