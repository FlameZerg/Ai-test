// ===================================
// PERFORMANCE OPTIMIZATIONS
// Lazy loading, debouncing, resource preloading
// ===================================

class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.setupDebouncedHandlers();
        this.checkReducedMotion();
        this.optimizeAnimations();
    }

    // Lazy load images
    setupLazyLoading() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;

                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }

                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                        img.removeAttribute('data-srcset');
                    }

                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        document.querySelectorAll('img[data-src], img[data-srcset]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Debounce scroll and resize handlers
    setupDebouncedHandlers() {
        let resizeTimeout;
        let scrollTimeout;

        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                window.dispatchEvent(new Event('debouncedresize'));
            }, 250);
        });

        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                window.dispatchEvent(new Event('debouncedscroll'));
            }, 100);
        }, { passive: true });
    }

    // Check for reduced motion preference
    checkReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            document.body.classList.add('reduced-motion');

            // Disable particles and 3D background
            const particlesCanvas = document.getElementById('particles-canvas');
            const bgCanvas = document.getElementById('bg-canvas');

            if (particlesCanvas) particlesCanvas.style.display = 'none';
            if (bgCanvas) bgCanvas.style.display = 'none';
        }
    }

    // Optimize animations with will-change
    optimizeAnimations() {
        const animatedElements = document.querySelectorAll('.product-card, .feature-card, .floating-card');

        animatedElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.willChange = 'transform';
            });

            el.addEventListener('mouseleave', () => {
                el.style.willChange = 'auto';
            });
        });
    }

    // Preload critical resources
    preloadResources() {
        const resources = [
            { href: 'css/main.css', as: 'style' },
            { href: 'css/effects.css', as: 'style' },
            { href: 'js/main.js', as: 'script' }
        ];

        resources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = resource.as;
            link.href = resource.href;
            document.head.appendChild(link);
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new PerformanceManager();
});
