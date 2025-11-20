// ===================================
// GSAP ANIMATIONS
// Timeline animations, scroll triggers
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero section animations
        animateHero();

        // Stats counter
        animateCounters();

        // Scroll-triggered animations
        setupScrollAnimations();

        // Product cards stagger
        animateProductCards();
    }
});

function animateHero() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-title .line', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2
    })
        .from('.hero-subtitle', {
            y: 50,
            opacity: 0,
            duration: 0.8
        }, '-=0.5')
        .from('.hero-cta .btn-hero', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15
        }, '-=0.4')
        .from('.hero-stats .stat-item', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1
        }, '-=0.3')
        .from('.floating-card', {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(1.7)'
        }, '-=0.5');
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2;

        gsap.to(counter, {
            innerText: target,
            duration: duration,
            delay: 0.5,
            snap: { innerText: 1 },
            onUpdate: function () {
                const value = parseInt(this.targets()[0].innerText);
                counter.innerText = value.toLocaleString();
            }
        });
    });
}

function setupScrollAnimations() {
    // Feature cards
    gsap.utils.toArray('.feature-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1
        });
    });

    // Section titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%'
            },
            y: 50,
            opacity: 0,
            duration: 0.8
        });
    });

    // About section
    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%'
        },
        x: -100,
        opacity: 0,
        duration: 1
    });

    gsap.from('.about-visual', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%'
        },
        x: 100,
        opacity: 0,
        duration: 1
    });

    // Contact form
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%'
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.8
    });
}

function animateProductCards() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.from(entry.target, {
                    y: 50,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.out'
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all product cards
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach(card => {
            observer.observe(card);
        });
    }, 500);
}
