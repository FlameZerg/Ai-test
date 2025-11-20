// ==================== ADVANCED ANIMATIONS ====================

// Text Animation - Typewriter Effect
function typewriterEffect(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Stagger Animation for Elements
function staggerAnimation(selector, delay = 100) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate-in');
        }, index * delay);
    });
}

// Reveal Animation on Scroll
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Number Counter Animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.ceil(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(current);
        }
    }, 16);
}

// Morphing Background Gradient
function morphingGradient(element) {
    const colors = [
        ['#667eea', '#764ba2'],
        ['#f093fb', '#f5576c'],
        ['#4facfe', '#00f2fe'],
        ['#43e97b', '#38f9d7'],
        ['#fa709a', '#fee140']
    ];
    
    let currentIndex = 0;
    
    setInterval(() => {
        currentIndex = (currentIndex + 1) % colors.length;
        const [color1, color2] = colors[currentIndex];
        element.style.background = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
    }, 3000);
}

// Ripple Effect on Click
function addRippleEffect(element) {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            left: ${x}px;
            top: ${y}px;
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
}

// Apply ripple effect to buttons
document.querySelectorAll('.btn, button').forEach(btn => {
    addRippleEffect(btn);
});

// Particle Explosion Effect
function createParticleExplosion(x, y, count = 20) {
    const container = document.body;
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        const angle = (Math.PI * 2 * i) / count;
        const velocity = 2 + Math.random() * 3;
        
        particle.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 10000;
        `;
        
        container.appendChild(particle);
        
        let posX = x;
        let posY = y;
        let vx = Math.cos(angle) * velocity;
        let vy = Math.sin(angle) * velocity;
        let life = 100;
        
        function animate() {
            posX += vx;
            posY += vy;
            vy += 0.1; // gravity
            life--;
            
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = life / 100;
            
            if (life > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }
        
        animate();
    }
}

// Text Glitch Effect
function glitchText(element) {
    const text = element.textContent;
    const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
    
    setInterval(() => {
        const glitched = text.split('').map(char => {
            if (Math.random() < 0.1) {
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            }
            return char;
        }).join('');
        
        element.textContent = glitched;
        
        setTimeout(() => {
            element.textContent = text;
        }, 50);
    }, 3000);
}

// Magnetic Cursor Trail
let trailElements = [];
const maxTrail = 10;

document.addEventListener('mousemove', (e) => {
    if (trailElements.length >= maxTrail) {
        const oldest = trailElements.shift();
        oldest.remove();
    }
    
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 50%;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        pointer-events: none;
        z-index: 9998;
        animation: trailFade 0.5s ease-out forwards;
    `;
    
    document.body.appendChild(trail);
    trailElements.push(trail);
});

// Add trail fade animation
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        to {
            transform: scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(trailStyle);

// Shake Animation
function shakeElement(element, intensity = 10, duration = 500) {
    const originalTransform = element.style.transform;
    const start = Date.now();
    
    function shake() {
        const elapsed = Date.now() - start;
        if (elapsed < duration) {
            const x = (Math.random() - 0.5) * intensity;
            const y = (Math.random() - 0.5) * intensity;
            element.style.transform = `translate(${x}px, ${y}px)`;
            requestAnimationFrame(shake);
        } else {
            element.style.transform = originalTransform;
        }
    }
    
    shake();
}

// Smooth Color Transition
function smoothColorTransition(element, colors, duration = 3000) {
    let index = 0;
    
    setInterval(() => {
        const nextIndex = (index + 1) % colors.length;
        element.style.transition = `background-color ${duration}ms ease`;
        element.style.backgroundColor = colors[nextIndex];
        index = nextIndex;
    }, duration);
}

// Wave Text Animation
function waveText(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.display = 'inline-block';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        span.style.animation = `wave 1s ease-in-out infinite`;
        span.style.animationDelay = `${index * 0.1}s`;
        element.appendChild(span);
    });
}

// Add wave animation keyframes
const waveStyle = document.createElement('style');
waveStyle.textContent = `
    @keyframes wave {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(waveStyle);

// Scroll Progress Bar
function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

createScrollProgressBar();

// Floating Elements
function floatingElements(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
        const duration = 3 + Math.random() * 2;
        const delay = index * 0.2;
        el.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });
}

// Initialize floating animations
floatingElements('.feature-icon');

console.log('✨ Advanced Animations Loaded!');
