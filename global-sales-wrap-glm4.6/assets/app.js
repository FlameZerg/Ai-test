/* ============================================
   INIT: Document Ready
   ============================================ */
$(document).ready(function() {
  init3DBackground();
  initLenisScroll();
  initGSAPAnimations();
  initAntiGravity();
  initProductCatalog();
  initMobileMenu();
  initCursorTrail();
  initParallax();
  initCollectionTilt();
  setYear();
});

/* ============================================
   THREE.JS: Animated 3D Background
   ============================================ */
function init3DBackground() {
  if (typeof THREE === 'undefined') return;
  
  const canvas = document.getElementById('bg3d');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  camera.position.z = 30;
  
  // Particle system
  const particleCount = 800;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    
    // Bluish colors
    colors[i * 3] = 0.1 + Math.random() * 0.3;      // R
    colors[i * 3 + 1] = 0.5 + Math.random() * 0.3;  // G
    colors[i * 3 + 2] = 0.9 + Math.random() * 0.1;  // B
  }
  
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const material = new THREE.PointsMaterial({
    size: 0.8,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending
  });
  
  const particles = new THREE.Points(geometry, material);
  scene.add(particles);
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    particles.rotation.x += 0.0003;
    particles.rotation.y += 0.0005;
    renderer.render(scene, camera);
  }
  animate();
  
  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/* ============================================
   LENIS: Smooth Scroll
   ============================================ */
function initLenisScroll() {
  if (typeof Lenis === 'undefined') return;
  
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
  });
  
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

/* ============================================
   GSAP: Scroll-Triggered Animations
   ============================================ */
function initGSAPAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  
  gsap.registerPlugin(ScrollTrigger);
  
  // Fade in sections
  gsap.utils.toArray('section').forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });
  
  // Collection cards stagger
  gsap.from('.collection-card', {
    opacity: 0,
    y: 40,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#collections',
      start: 'top 70%'
    }
  });
  
  // Partner tiles
  gsap.from('.partner', {
    opacity: 0,
    scale: 0.8,
    stagger: 0.05,
    duration: 0.6,
    ease: 'back.out(1.4)',
    scrollTrigger: {
      trigger: '#partners',
      start: 'top 75%'
    }
  });
}

/* ============================================
   ANTI-GRAVITY: Mouse Repel Effect
   Inspired by Google Antigravity
   ============================================ */
function initAntiGravity() {
  const container = document.getElementById('ag-items');
  if (!container) return;
  
  const itemCount = 30;
  const items = [];
  const containerRect = container.getBoundingClientRect();
  
  // Create floating items
  for (let i = 0; i < itemCount; i++) {
    const item = document.createElement('div');
    item.className = 'ag-item';
    const size = 20 + Math.random() * 60;
    item.style.width = size + 'px';
    item.style.height = size + 'px';
    item.style.left = Math.random() * 90 + '%';
    item.style.top = Math.random() * 90 + '%';
    
    container.appendChild(item);
    
    items.push({
      element: item,
      x: parseFloat(item.style.left),
      y: parseFloat(item.style.top),
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: size
    });
  }
  
  let mouseX = 50;
  let mouseY = 50;
  
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    mouseY = ((e.clientY - rect.top) / rect.height) * 100;
  });
  
  // Animation loop
  function animateItems() {
    items.forEach(item => {
      // Repel from mouse
      const dx = item.x - mouseX;
      const dy = item.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 25) {
        const force = (25 - distance) / 25;
        item.vx += (dx / distance) * force * 0.5;
        item.vy += (dy / distance) * force * 0.5;
      }
      
      // Update position
      item.x += item.vx;
      item.y += item.vy;
      
      // Friction
      item.vx *= 0.95;
      item.vy *= 0.95;
      
      // Boundary bounce
      if (item.x < 0 || item.x > 100) {
        item.vx *= -0.8;
        item.x = Math.max(0, Math.min(100, item.x));
      }
      if (item.y < 0 || item.y > 100) {
        item.vy *= -0.8;
        item.y = Math.max(0, Math.min(100, item.y));
      }
      
      // Apply transform
      item.element.style.transform = `translate(${item.x - 50}%, ${item.y - 50}%)`;
    });
    
    requestAnimationFrame(animateItems);
  }
  animateItems();
}

/* ============================================
   PRODUCT CATALOG: 100+ Images
   ============================================ */
function initProductCatalog() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  
  const categories = [
    'laptop', 'phone', 'camera', 'headphones', 'watch', 'keyboard', 'mouse', 'monitor',
    'tablet', 'speaker', 'microphone', 'printer', 'router', 'drone', 'gaming', 'vr',
    'smartwatch', 'fitness', 'audio', 'video', 'accessories', 'office', 'desk', 'chair',
    'bag', 'backpack', 'case', 'charger', 'cable', 'adapter', 'stand', 'mount',
    'light', 'lamp', 'led', 'projector', 'tv', 'soundbar', 'turntable', 'vinyl',
    'coffee', 'kitchen', 'appliance', 'blender', 'mixer', 'toaster', 'kettle', 'pot',
    'shoe', 'sneaker', 'boot', 'sandal', 'fashion', 'clothing', 'shirt', 'jacket',
    'glasses', 'sunglasses', 'hat', 'cap', 'scarf', 'glove', 'jewelry', 'ring',
    'book', 'notebook', 'pen', 'pencil', 'art', 'paint', 'brush', 'canvas',
    'toy', 'game', 'puzzle', 'lego', 'robot', 'car', 'bike', 'scooter',
    'plant', 'flower', 'pot', 'garden', 'tool', 'hardware', 'drill', 'saw',
    'cosmetics', 'skincare', 'perfume', 'makeup', 'brush', 'mirror', 'bottle', 'jar',
    'food', 'snack', 'drink', 'beer', 'wine', 'bottle', 'can', 'package'
  ];
  
  // Generate 100+ product cards
  for (let i = 0; i < 108; i++) {
    const category = categories[i % categories.length];
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Using high-quality images from Unsplash with better query parameters
    const imageUrl = `https://images.unsplash.com/photo-${1500000000000 + i * 1000000}?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3`;
    
    card.innerHTML = `
      <img src="${imageUrl}" alt="${category}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop'" />
      <div class="info">
        <h3>${capitalize(category)} ${i + 1}</h3>
        <p>Premium quality · $${(Math.random() * 500 + 50).toFixed(0)}</p>
      </div>
    `;
    
    grid.appendChild(card);
  }
  
  // Stagger animation on scroll
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.from('.product-card', {
      opacity: 0,
      y: 30,
      stagger: 0.02,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#productGrid',
        start: 'top 80%'
      }
    });
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/* ============================================
   MOBILE MENU
   ============================================ */
function initMobileMenu() {
  const btn = document.getElementById('menuBtn');
  const nav = document.getElementById('mobileNav');
  
  if (btn && nav) {
    btn.addEventListener('click', () => {
      nav.classList.toggle('hidden');
    });
  }
}

/* ============================================
   CURSOR TRAIL EFFECT
   ============================================ */
function initCursorTrail() {
  let lastTime = 0;
  const throttle = 50; // ms
  
  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTime < throttle) return;
    lastTime = now;
    
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    document.body.appendChild(trail);
    
    setTimeout(() => trail.remove(), 600);
  });
}

/* ============================================
   PARALLAX SCROLL
   ============================================ */
function initParallax() {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    parallaxElements.forEach(el => {
      const depth = el.dataset.depth || 0.5;
      const movement = -(scrolled * depth);
      el.style.transform = `translateY(${movement}px)`;
    });
  });
}

/* ============================================
   3D TILT on Collection Cards
   ============================================ */
function initCollectionTilt() {
  const cards = document.querySelectorAll('.collection-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ============================================
   FOOTER: Current Year
   ============================================ */
function setYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
