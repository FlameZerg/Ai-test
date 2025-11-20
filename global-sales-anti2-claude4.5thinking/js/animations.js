/**
 * ANIMATIONS
 * GSAP-powered scroll animations and transitions
 */

class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        if (typeof gsap === 'undefined') {
            console.warn('GSAP not loaded');
            return;
        }

        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Initialize animations
        this.heroAnimations();
        this.statsAnimations();
        this.categoryAnimations();
        this.productAnimations();
        this.scrollRevealAnimations();
        this.parallaxEffects();
    }

    heroAnimations() {
        // Animate hero text on page load
        const tl = gsap.timeline({ delay: 0.3 });

        tl.from('.hero-title .title-line', {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power4.out'
        })
            .from('.hero-subtitle', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.4')
            .from('.hero-cta .btn-primary, .hero-cta .btn-secondary', {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'back.out(1.7)'
            }, '-=0.4');
    }

    statsAnimations() {
        // Animate stat numbers counting up
        const statNumbers = document.querySelectorAll('.stat-number');

        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            const isDecimal = stat.dataset.target.includes('.');

            gsap.to(stat, {
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 80%',
                    once: true
                },
                innerHTML: target,
                duration: 2,
                ease: 'power2.out',
                snap: isDecimal ? { innerHTML: 0.1 } : { innerHTML: 1 },
                onUpdate: function () {
                    if (isDecimal) {
                        stat.innerHTML = parseFloat(this.targets()[0].innerHTML).toFixed(1);
                    } else {
                        stat.innerHTML = Math.ceil(this.targets()[0].innerHTML).toLocaleString();
                    }
                }
            });
        });

        // Animate stat cards
        gsap.from('.stat-card', {
            scrollTrigger: {
                trigger: '.stats-section',
                start: 'top 70%'
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });
    }

    categoryAnimations() {
        gsap.from('.category-card', {
            scrollTrigger: {
                trigger: '.categories-grid',
                start: 'top 70%'
            },
            y: 80,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        });
    }

    productAnimations() {
        gsap.from('.product-card', {
            scrollTrigger: {
                trigger: '.products-grid',
                start: 'top 70%'
            },
            y: 60,
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            stagger: {
                amount: 0.8,
                grid: [4, 4],
                from: 'start'
            },
            ease: 'back.out(1.2)'
        });
    }

    scrollRevealAnimations() {
        // Generic scroll reveal for sections
        const revealSections = document.querySelectorAll(
            '.about-section, .testimonials-section, .newsletter-section'
        );

        revealSections.forEach(section => {
            gsap.from(section.children, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            });
        });

        // Feature items
        gsap.from('.feature-item', {
            scrollTrigger: {
                trigger: '.about-features',
                start: 'top 75%'
            },
            x: -50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out'
        });

        // Testimonial cards
        gsap.from('.testimonial-card', {
            scrollTrigger: {
                trigger: '.testimonials-slider',
                start: 'top 75%'
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        });
    }

    parallaxEffects() {
        // Parallax background effect
        gsap.to('.hero-visual', {
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: 200,
            ease: 'none'
        });

        // Parallax for category images
        gsap.utils.toArray('.category-image img').forEach(img => {
            gsap.to(img, {
                scrollTrigger: {
                    trigger: img.parentElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                },
                y: -50,
                ease: 'none'
            });
        });
    }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
});
