// Three.js Background Effect
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 15; // Spread
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Material
const material = new THREE.PointsMaterial({
    size: 0.005,
    color: 0x00f3ff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, material);
scene.add(particlesMesh);

// Floating Shapes (Geometric "Antigravity" objects)
const geometry = new THREE.IcosahedronGeometry(1, 0);
const materialGeo = new THREE.MeshBasicMaterial({
    color: 0xbc13fe,
    wireframe: true,
    transparent: true,
    opacity: 0.3
});

const shape1 = new THREE.Mesh(geometry, materialGeo);
shape1.position.set(3, 2, -2);
scene.add(shape1);

const shape2 = new THREE.Mesh(geometry, materialGeo);
shape2.position.set(-3, -2, -2);
shape2.scale.set(0.5, 0.5, 0.5);
scene.add(shape2);

camera.position.z = 3;

// Mouse Interaction for Three.js
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    // Rotate particles
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = mouseY * 0.5;
    particlesMesh.rotation.y += mouseX * 0.5;

    // Float shapes
    shape1.rotation.x += 0.002;
    shape1.rotation.y += 0.002;
    shape1.position.y = 2 + Math.sin(elapsedTime * 0.5) * 0.2;

    shape2.rotation.x -= 0.003;
    shape2.rotation.y -= 0.003;
    shape2.position.y = -2 + Math.cos(elapsedTime * 0.4) * 0.2;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Animations
const tl = gsap.timeline();

tl.to('#hero-title', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power4.out'
})
    .to('#hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out'
    }, '-=0.5')
    .to('#hero-btn', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out'
    }, '-=0.5');

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('py-2');
        nav.classList.remove('py-6');
    } else {
        nav.classList.add('py-6');
        nav.classList.remove('py-2');
    }
});

// Custom Cursor Logic
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 16 + 'px';
    cursor.style.top = e.clientY - 16 + 'px';

    cursorDot.style.left = e.clientX - 2 + 'px';
    cursorDot.style.top = e.clientY - 2 + 'px';
});

// Hover effects for cursor
const hoverElements = document.querySelectorAll('a, button, .product-card');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('scale-150', 'bg-white', 'mix-blend-difference');
        cursor.style.borderColor = 'transparent';
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('scale-150', 'bg-white', 'mix-blend-difference');
        cursor.style.borderColor = '#00f3ff';
    });
});
