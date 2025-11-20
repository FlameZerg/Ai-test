/*
  GlobalFlow front-end interactions
  - Custom cursor
  - Magnetic buttons & links
  - Hero tilt & floating layers (antigravity-inspired)
  - 3D starfield using Three.js
  - Scroll-triggered animations with GSAP
  - Dynamic image gallery (100+ high-quality placeholders)
*/

(function () {
  const body = document.body;

  /* ----------------------------- Custom cursor ----------------------------- */
  const cursorCore = document.getElementById('cursor-core');
  const cursorOutline = document.getElementById('cursor-outline');
  let cursorPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let cursorTarget = { ...cursorPos };

  function moveCursor(e) {
    cursorTarget.x = e.clientX;
    cursorTarget.y = e.clientY;
  }

  window.addEventListener('pointermove', moveCursor);

  function lerp(start, end, alpha) {
    return start + (end - start) * alpha;
  }

  function animateCursor() {
    cursorPos.x = lerp(cursorPos.x, cursorTarget.x, 0.25);
    cursorPos.y = lerp(cursorPos.y, cursorTarget.y, 0.25);

    const transform = 'translate3d(' + cursorPos.x + 'px, ' + cursorPos.y + 'px, 0)';
    if (cursorCore) cursorCore.style.transform = transform;
    if (cursorOutline) cursorOutline.style.transform = transform;
    requestAnimationFrame(animateCursor);
  }

  if (cursorCore && cursorOutline) {
    requestAnimationFrame(animateCursor);
  }

  // Hover states
  const hoverTargets = document.querySelectorAll('button, a, .link-pill, .product-card, .image-gallery-item');
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => body.classList.remove('cursor-hover'));
  });

  /* ---------------------------- Magnetic elements ---------------------------- */
  const magneticEls = document.querySelectorAll('[data-magnetic]');

  magneticEls.forEach((el) => {
    const strength = 24;
    let resting = { x: 0, y: 0 };

    el.addEventListener('pointermove', (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      const tx = (relX / rect.width) * strength;
      const ty = (relY / rect.height) * strength;
      el.style.transform = 'translate3d(' + tx.toFixed(1) + 'px, ' + ty.toFixed(1) + 'px, 0)';
    });

    el.addEventListener('pointerleave', () => {
      el.style.transform = 'translate3d(' + resting.x + 'px, ' + resting.y + 'px, 0)';
    });
  });

  /* ------------------------ Hero tilt & floating layers ----------------------- */
  const heroStack = document.querySelector('[data-tilt-container]');

  if (heroStack) {
    const maxTilt = 14;

    heroStack.addEventListener('pointermove', (e) => {
      const rect = heroStack.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateX = py * -maxTilt;
      const rotateY = px * maxTilt;
      heroStack.style.transform =
        'perspective(1400px) rotateX(' +
        rotateX.toFixed(2) +
        'deg) rotateY(' +
        rotateY.toFixed(2) +
        'deg) translateZ(0)';
    });

    heroStack.addEventListener('pointerleave', () => {
      heroStack.style.transform = 'perspective(1400px) rotateX(0deg) rotateY(0deg)';
    });
  }

  // Floating layers influenced by cursor
  const floatEls = document.querySelectorAll('.floating');
  window.addEventListener('pointermove', (e) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const nx = (e.clientX / vw - 0.5) * 2; // -1..1
    const ny = (e.clientY / vh - 0.5) * 2;
    floatEls.forEach((el) => {
      const depth = Number(el.getAttribute('data-float-depth') || '1');
      const translateX = -nx * depth * 8;
      const translateY = -ny * depth * 10;
      el.style.transform = 'translate3d(' + translateX.toFixed(1) + 'px, ' + translateY.toFixed(1) + 'px, 0)';
    });
  });

  /* ------------------------------ Counters --------------------------------- */
  const counters = document.querySelectorAll('.counter[data-target]');
  counters.forEach((el) => {
    const target = Number(el.getAttribute('data-target'));
    if (!Number.isFinite(target)) return;

    let started = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!started && entry.isIntersecting) {
            started = true;
            const duration = 1500;
            const startTime = performance.now();

            function tick(now) {
              const progress = Math.min(1, (now - startTime) / duration);
              const value = Math.floor(target * progress);
              el.textContent = value.toString();
              if (progress < 1) requestAnimationFrame(tick);
            }

            requestAnimationFrame(tick);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
  });

  /* ------------------------------ GSAP Scroll ------------------------------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    const fadeUp = document.querySelectorAll('#categories .category-card, #featured .product-card, #trust .metric-card');
    fadeUp.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        }
      );
    });

    // Subtle float on hero card
    const heroCard = document.querySelector('.hero-card');
    if (heroCard) {
      gsap.to(heroCard, {
        y: -10,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }
  }

  /* ------------------------- Dynamic image gallery -------------------------- */
  const gallery = document.getElementById('image-gallery');

  if (gallery) {
    // Use picsum.photos seeded URLs for high-quality placeholder images.
    const totalImages = 120; // >= 100 as requested
    const baseWidth = 720;
    const baseHeight = 540;

    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= totalImages; i++) {
      const item = document.createElement('figure');
      item.className = 'image-gallery-item floating';
      item.setAttribute('data-float-depth', String((i % 3) + 1));

      const img = document.createElement('img');
      const seed = 'product-orbit-' + i;
      img.src = 'https://picsum.photos/seed/' + seed + '/' + baseWidth + '/' + baseHeight + '.webp';
      img.alt = 'Global product visual ' + i;
      img.loading = 'lazy';

      item.appendChild(img);
      fragment.appendChild(item);
    }

    gallery.appendChild(fragment);
  }

  /* --------------------- Hover parallax within image grid ------------------- */
  function attachGalleryHoverParallax() {
    const items = document.querySelectorAll('.image-gallery-item');
    items.forEach((item) => {
      item.addEventListener('pointermove', (e) => {
        const rect = item.getBoundingClientRect();
        const rx = (e.clientX - rect.left) / rect.width - 0.5;
        const ry = (e.clientY - rect.top) / rect.height - 0.5;
        const rotateX = ry * -8;
        const rotateY = rx * 8;
        item.style.transform =
          'rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) translateZ(10px)';
      });
      item.addEventListener('pointerleave', () => {
        item.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
      });
    });
  }

  window.addEventListener('load', attachGalleryHoverParallax);

  /* --------------------------- Starfield background ------------------------- */
  const canvas = document.getElementById('bg-canvas');
  if (canvas && window.THREE) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 900;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 220;
      positions[i3 + 1] = (Math.random() - 0.5) * 120;
      positions[i3 + 2] = (Math.random() - 0.5) * 200;

      const tint = 0.6 + Math.random() * 0.4;
      colors[i3] = 0.3 * tint;
      colors[i3 + 1] = 0.8 * tint;
      colors[i3 + 2] = 1.0 * tint;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starsMaterial = new THREE.PointsMaterial({
      size: 0.9,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('pointermove', (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      mouseX = nx * 0.3;
      mouseY = ny * 0.2;
    });

    function animate() {
      requestAnimationFrame(animate);
      stars.rotation.y += 0.0007;
      stars.rotation.x += 0.00025;
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX * 50, 0.03);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, -mouseY * 30, 0.03);
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  }

  /* -------------------------- Miscellaneous details ------------------------- */
  // Dynamic year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }

  // Prevent actual submission for the static contact form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thanks for reaching out. A GlobalFlow specialist will respond shortly.');
    });
  }
})();
