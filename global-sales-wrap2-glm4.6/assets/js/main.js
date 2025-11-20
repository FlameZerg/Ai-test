(function(){'use strict';

const productTitles = [
  "Smart Alpha", "Ultra X", "Neo Pro", "Flexi 8", "Echo Hub", "Nova 2", "Orbit Pro", "Vertex 5", "Apex X", "Aura One", 
  "Cortex Q", "Synth 9", "Prism 7", "Helix 3", "Fusion Max", "Flux 4", "Ion R", "Nova 360", "Axon 5", "Mega 12", 
  "Cyber Max", "Hyper Elite", "Phantom Z", "Nexus V", "Atom B", "Triton X", "Omega 2", "Delta 7", "Quantum 9", "Titan 8",
  "Lumin 3", "Strive Pro", "Zeta One", "Vex 9", "Nebula X", "Arc 4", "Quasar Q", "Nova 4", "Falcon Elite", "Vertex Plus"
];

// Product grid population (108 items)
function renderProducts() {
  const grid = document.getElementById('productGrid');
  for (let i = 0; i < 108; i++) {
    const seed = String(Math.floor(Math.random() * 100000));
    const title = productTitles[Math.floor(Math.random() * productTitles.length)];
    const price = Math.floor(Math.random() * 5000) + 80;
    const imgSizes = [[240,180],[210,140],[240,160],[240,240],[200,200]];
    const [w,h] = imgSizes[Math.floor(Math.random() * imgSizes.length)];
    grid.innerHTML += `
      <div class="card aspect-[${w}/${h}]">
        <img loading="lazy" src="https://picsum.photos/seed/${seed}/${w}/${h}" alt="${title}" />
        <div class="overlay"></div>
        <div class="meta">
          <span class="title">${title}</span>
          <span class="price">$${price}</span>
        </div>
      </div>
    `;
  }
}

// Mouse tracker (antigravity-like cursor)
function initCursor() {
  const cursor = document.getElementById('cursor');
  let ticking = false;
  document.addEventListener('mousemove', ({ clientX, clientY }) => {
    cursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        document.querySelectorAll('.card').forEach(card => {
          const rect = card.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = clientX - cx;
          const dy = clientY - cy;
          card.style.setProperty('--mx', Math.abs(dx) + 'px');
          card.style.setProperty('--my', Math.abs(dy) + 'px');
        });
        ticking = false;
      });
      ticking = true;
    }
  });
  document.addEventListener('mouseenter', () => cursor.style.opacity = 1, true);
  document.addEventListener('mouseleave', () => cursor.style.opacity = 0, true);
}

// Three.js animated particles for hero background
function initThreeBg() {
  const canvas = document.getElementById('bg-canvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, .01, 10);
  camera.position.z = 3.5;
  
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(new THREE.Color('#000000'), 0);

  // Particle geometry and texture
  const particles = new Float32Array(2100 * 3);
  for (let i = 0; i < particles.length; i += 3) {
    particles[i] = (Math.random() - .5) * 10;
    particles[i+1] = (Math.random() - .5) * 10;
    particles[i+2] = (Math.random() - .5) * 10;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));

  const material = new THREE.PointsMaterial({
    color: 0xffffff, size: 0.02, sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.6
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // Mouse-driven motion
  let cursorX = 0, cursorY = 0;
  const lerp = 0.04;
  document.addEventListener('mousemove', e => {
    cursorX = (e.clientX / window.innerWidth) * 2 - 1;
    cursorY = (e.clientY / window.innerHeight) * 2 - 1;
  });

  // Animate
  const animate = () => {
    requestAnimationFrame(animate);
    points.rotation.x += 0.0013;
    points.rotation.y += 0.002;
    camera.position.x += lerp * (cursorX * 0.02 - camera.position.x);
    camera.position.y += lerp * (cursorY * 0.02 - camera.position.y);
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  };
  animate();

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}

// 3D tilt for solution cards (mouse-based)
function initTiltCards() {
  [...document.querySelectorAll('.solution-card')].forEach(card => {
    card.addEventListener('mousemove', ({ clientX, clientY }) => {
      const rect = card.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      const rx = (y - .5) * 3;
      const ry = (x - .5) * -3;
      card.style.transform = `perspective(350px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
    }, { passive: true });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// Marquee pause on hover
function initMarqueeHover() {
  const marquee = document.querySelector('.marquee');
  if (marquee) {
    marquee.addEventListener('mouseenter', () => marquee.querySelector('.marquee-inner').style.animationPlayState = 'paused');
    marquee.addEventListener('mouseleave', () => marquee.querySelector('.marquee-inner').style.animationPlayState = 'running');
  }
}

// Mobile menu interaction
function initMobileMenu() {
  const btn = document.getElementById('menuBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    menu.classList.toggle('opacity-0');
    menu.classList.toggle('pointer-events-none');
  });
  menu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.toggle('hidden');
      menu.classList.toggle('opacity-0');
      menu.classList.toggle('pointer-events-none');
    });
  });
}

// Smooth scroll (header offset)
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  initCursor();
  initThreeBg();
  initTiltCards();
  initMarqueeHover();
  initMobileMenu();
  document.getElementById('year').textContent = new Date().getFullYear();

  // Smooth scroll for anchor links with offset for header
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#' || !document.querySelector(href)) return;
      const target = document.querySelector(href);
      const offset = window.innerHeight * 0.1;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest', offset });
    });
  });
});

})();