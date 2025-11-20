// ==================== 3D EFFECTS CONTROLLER ====================

// 3D Card Tilt Effect on Mouse Move
function init3DCardTilt() {
    const cards = document.querySelectorAll('.card-3d, .product-card-3d');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            this.style.transition = 'transform 0.1s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            this.style.transition = 'transform 0.5s ease';
        });
    });
}

// Initialize 3D tilt on page load
document.addEventListener('DOMContentLoaded', init3DCardTilt);

// 3D Parallax Scrolling
function init3DParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax-speed]');
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.parallaxSpeed || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
}

init3DParallax();

// 3D Floating Animation
function create3DFloatingElement(selector, options = {}) {
    const elements = document.querySelectorAll(selector);
    const defaults = {
        distance: 20,
        duration: 3000,
        direction: 'vertical'
    };
    
    const settings = { ...defaults, ...options };
    
    elements.forEach((el, index) => {
        el.style.animation = `float-3d ${settings.duration + (index * 200)}ms ease-in-out infinite`;
        el.style.animationDelay = `${index * 100}ms`;
    });
}

// Apply 3D floating to specific elements
create3DFloatingElement('.floating-product', { duration: 5000 });

// 3D Hover Lift Effect
function init3DHoverLift() {
    const liftElements = document.querySelectorAll('.hover-lift-3d, .btn-3d');
    
    liftElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transform = 'translateZ(50px) scale(1.05)';
            this.style.boxShadow = '0 40px 80px rgba(0, 0, 0, 0.5)';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = 'translateZ(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
}

init3DHoverLift();

// 3D Rotation on Scroll
function init3DScrollRotation() {
    const rotateElements = document.querySelectorAll('[data-3d-rotate]');
    
    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        rotateElements.forEach(el => {
            const rotationAxis = el.dataset['3dRotate'] || 'y';
            const rotationAmount = (scrollPercentage * 3.6); // 360 degrees per 100% scroll
            
            if (rotationAxis === 'x') {
                el.style.transform = `perspective(1000px) rotateX(${rotationAmount}deg)`;
            } else if (rotationAxis === 'y') {
                el.style.transform = `perspective(1000px) rotateY(${rotationAmount}deg)`;
            } else if (rotationAxis === 'z') {
                el.style.transform = `perspective(1000px) rotateZ(${rotationAmount}deg)`;
            }
        });
    });
}

init3DScrollRotation();

// 3D Magnetic Effect (elements follow cursor)
function init3DMagnetic() {
    const magneticElements = document.querySelectorAll('.magnetic-3d');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 200;
            
            if (distance < maxDistance) {
                const force = (maxDistance - distance) / maxDistance;
                const translateX = x * force * 0.5;
                const translateY = y * force * 0.5;
                
                this.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
            }
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = 'translate3d(0, 0, 0)';
        });
    });
}

init3DMagnetic();

// 3D Depth Layers Effect
function create3DDepthLayers(container) {
    const layers = container.querySelectorAll('.layer');
    
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
        const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
        
        layers.forEach((layer, index) => {
            const depth = (index + 1) * 20;
            const moveX = mouseX * depth;
            const moveY = mouseY * depth;
            
            layer.style.transform = `translate3d(${moveX}px, ${moveY}px, ${depth}px)`;
        });
    });
    
    container.addEventListener('mouseleave', () => {
        layers.forEach(layer => {
            layer.style.transform = 'translate3d(0, 0, 0)';
        });
    });
}

// Apply to all parallax 3D containers
document.querySelectorAll('.parallax-3d').forEach(create3DDepthLayers);

// 3D Perspective Zoom
function init3DPerspectiveZoom() {
    const zoomElements = document.querySelectorAll('[data-3d-zoom]');
    
    zoomElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) translateZ(100px) scale(1.2)';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) translateZ(0) scale(1)';
        });
    });
}

init3DPerspectiveZoom();

// 3D Ripple Effect (3D version)
function create3DRipple(element, e) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%);
        left: ${x}px;
        top: ${y}px;
        transform: translate3d(0, 0, 0) scale(0);
        animation: ripple3D 1s ease-out;
        pointer-events: none;
        z-index: 100;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 1000);
}

// Add 3D ripple animation style
const ripple3DStyle = document.createElement('style');
ripple3DStyle.textContent = `
    @keyframes ripple3D {
        0% {
            transform: translate3d(0, 0, 0) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate3d(0, 0, 50px) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(ripple3DStyle);

// Apply 3D ripple to buttons
document.querySelectorAll('.btn, button').forEach(btn => {
    btn.addEventListener('click', function(e) {
        create3DRipple(this, e);
    });
});

// 3D Cube Rotation
function create3DCube(container) {
    const cube = container.querySelector('.cube-3d');
    if (!cube) return;
    
    let rotationX = 0;
    let rotationY = 0;
    
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
        const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
        
        rotationX = mouseY * 90;
        rotationY = mouseX * 90;
        
        cube.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    });
    
    container.addEventListener('mouseleave', () => {
        cube.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
}

// 3D Sphere/Globe Effect
function create3DSphere(element) {
    const particles = [];
    const particleCount = 100;
    const radius = 150;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const phi = Math.acos(-1 + (2 * i) / particleCount);
        const theta = Math.sqrt(particleCount * Math.PI) * phi;
        
        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);
        
        particle.style.cssText = `
            position: absolute;
            width: 5px;
            height: 5px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            transform: translate3d(${x}px, ${y}px, ${z}px);
            transition: transform 0.3s ease;
        `;
        
        element.appendChild(particle);
        particles.push({ element: particle, x, y, z });
    }
    
    // Rotate sphere on mouse move
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
        const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
        
        particles.forEach(({ element, x, y, z }) => {
            const rotatedX = x * Math.cos(mouseX) - z * Math.sin(mouseX);
            const rotatedZ = z * Math.cos(mouseX) + x * Math.sin(mouseX);
            const rotatedY = y * Math.cos(mouseY) - rotatedZ * Math.sin(mouseY);
            
            element.style.transform = `translate3d(${rotatedX}px, ${rotatedY}px, ${rotatedZ}px)`;
        });
    });
}

// 3D Wave Effect on Elements
function init3DWaveEffect() {
    const waveElements = document.querySelectorAll('.wave-3d');
    
    waveElements.forEach((el, index) => {
        setInterval(() => {
            const time = Date.now() / 1000;
            const wave = Math.sin(time + index * 0.5) * 20;
            el.style.transform = `translate3d(0, ${wave}px, 0) rotateZ(${wave / 4}deg)`;
        }, 50);
    });
}

init3DWaveEffect();

// 3D Page Transition Effect
function init3DPageTransition() {
    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([target="_blank"])');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hostname === window.location.hostname) {
                e.preventDefault();
                const href = this.href;
                
                // Create 3D transition overlay
                const overlay = document.createElement('div');
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    z-index: 100000;
                    transform: translate3d(0, 100%, 0);
                    transition: transform 0.8s cubic-bezier(0.65, 0, 0.35, 1);
                `;
                
                document.body.appendChild(overlay);
                
                setTimeout(() => {
                    overlay.style.transform = 'translate3d(0, 0, 0)';
                }, 10);
                
                setTimeout(() => {
                    window.location.href = href;
                }, 800);
            }
        });
    });
}

// Uncomment to enable 3D page transitions
// init3DPageTransition();

console.log('🎨 3D Effects Loaded Successfully!');
