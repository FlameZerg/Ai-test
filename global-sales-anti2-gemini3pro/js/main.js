// Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    init3DBackground();
    initProducts();
    initScrollAnimations();
});

// --- Custom Cursor with GSAP ---
function initCursor() {
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursor-dot');

    if (!cursor || !cursorDot) return;

    // Initial position
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Instant update for dot
        gsap.to(cursorDot, { duration: 0, x: mouseX, y: mouseY });

        // Smooth update for circle
        gsap.to(cursor, { duration: 0.5, x: mouseX, y: mouseY, ease: "power2.out" });
    });

    // Magnetic Hover Effect
    const magnets = document.querySelectorAll('a, button, .product-card');

    magnets.forEach(magnet => {
        magnet.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 1.5, duration: 0.3, mixBlendMode: 'difference' });
            gsap.to(cursorDot, { scale: 0, duration: 0.3 }); // Hide dot on hover
        });

        magnet.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.3, mixBlendMode: 'difference' });
            gsap.to(cursorDot, { scale: 1, duration: 0.3 });
        });
    });
}

// --- Advanced 3D Background (Three.js) ---
function init3DBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create a Globe of Particles
    const geometry = new THREE.BufferGeometry();
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color(0x0ea5e9); // Brand Blue
    const color2 = new THREE.Color(0xa855f7); // Purple

    for (let i = 0; i < count; i++) {
        // Spherical distribution
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const radius = 4 + (Math.random() * 0.5); // Radius around 4

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        // Mix colors
        const mixedColor = color1.clone().lerp(color2, Math.random());
        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.03,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const globe = new THREE.Points(geometry, material);
    scene.add(globe);

    // Add some floating particles around
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 1000;
    const starsPos = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i++) {
        starsPos[i] = (Math.random() - 0.5) * 30;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPos, 3));
    const starsMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0xffffff,
        transparent: true,
        opacity: 0.3
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    camera.position.z = 10;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        const elapsedTime = clock.getElapsedTime();

        // Rotate globe
        globe.rotation.y += 0.002;

        // Mouse influence with easing
        targetRotationX = mouseY * 0.5;
        targetRotationY = mouseX * 0.5;

        globe.rotation.x += 0.05 * (targetRotationX - globe.rotation.x);
        globe.rotation.y += 0.05 * (targetRotationY - globe.rotation.y);

        // Pulse effect
        const scale = 1 + Math.sin(elapsedTime * 0.5) * 0.02;
        globe.scale.set(scale, scale, scale);

        // Stars movement
        stars.rotation.y -= 0.0005;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// --- Products Logic ---
let currentCategory = 'All';
let itemsToShow = 8;

function initProducts() {
    const grid = document.getElementById('product-grid');
    const loadMoreBtn = document.getElementById('load-more');
    const filterButtons = {
        'All': document.getElementById('filter-all'),
        'Tech': document.getElementById('filter-tech'),
        'Lifestyle': document.getElementById('filter-lifestyle')
    };

    if (!grid) return;

    function renderProducts() {
        grid.innerHTML = '';

        const filtered = currentCategory === 'All'
            ? products
            : products.filter(p => p.category === currentCategory);

        const toShow = filtered.slice(0, itemsToShow);

        toShow.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card bg-white/5 border border-white/10 rounded-2xl overflow-hidden group';
            card.innerHTML = `
                <div class="image-container h-64 overflow-hidden relative">
                    <img src="${product.image}" alt="${product.name}" class="product-image w-full h-full object-cover transition-transform duration-500">
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button class="bg-white text-dark-bg px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                            View Details
                        </button>
                    </div>
                </div>
                <div class="p-6">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <p class="text-brand-400 text-xs font-bold uppercase tracking-wider mb-1">${product.category}</p>
                            <h3 class="text-xl font-bold text-white">${product.name}</h3>
                        </div>
                        <span class="text-lg font-medium text-gray-300">$${product.price}</span>
                    </div>
                    <p class="text-gray-400 text-sm line-clamp-2">${product.description}</p>
                </div>
            `;
            grid.appendChild(card);
        });

        // Hide load more if no more products
        if (itemsToShow >= filtered.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }

    // Filter Click Handlers
    Object.keys(filterButtons).forEach(cat => {
        const btn = filterButtons[cat];
        if (!btn) return;

        btn.addEventListener('click', () => {
            // Update active state
            Object.values(filterButtons).forEach(b => {
                if (b) {
                    b.classList.remove('text-brand-400', 'font-medium');
                    b.classList.add('text-gray-400');
                }
            });
            btn.classList.remove('text-gray-400');
            btn.classList.add('text-brand-400', 'font-medium');

            currentCategory = cat;
            itemsToShow = 8; // Reset count
            renderProducts();
        });
    });

    // Load More Handler
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            itemsToShow += 8;
            renderProducts();
        });
    }

    // Initial Render
    renderProducts();
}

// --- Scroll Animations (GSAP) ---
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Navbar blur effect
    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: { className: 'bg-dark-bg/90', targets: '#navbar' }
    });

    // Sections fade in
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section.children, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });
    });
}
