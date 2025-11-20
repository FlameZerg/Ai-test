// GlobalSales Hub front-end interactions
// No build tools or backend required.

(function () {
  const doc = document;

  function onReady(fn) {
    if (doc.readyState === "loading") {
      doc.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  // Smooth nav scrolling
  function initSmoothScrolling() {
    const links = doc.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") return;
        const target = doc.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: "smooth" });
      });
    });
  }

  // Mouse orbit follower (subtle glowing circle)
  function initMouseOrbit() {
    const orbit = doc.getElementById("mouse-orbit");
    if (!orbit) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    window.addEventListener("pointermove", (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    });

    function loop() {
      const speed = 0.12;
      currentX += (targetX - currentX) * speed;
      currentY += (targetY - currentY) * speed;
      orbit.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      requestAnimationFrame(loop);
    }

    loop();
  }

  // Magnetic buttons (inspired by antigravity feel)
  function initMagneticButtons() {
    const buttons = doc.querySelectorAll("[data-magnetic]");
    buttons.forEach((btn) => {
      const strength = 0.35;
      let rect;

      function updateRect() {
        rect = btn.getBoundingClientRect();
      }
      updateRect();
      window.addEventListener("resize", updateRect);

      btn.addEventListener("pointermove", (event) => {
        const relX = event.clientX - rect.left;
        const relY = event.clientY - rect.top;
        const moveX = (relX - rect.width / 2) * strength;
        const moveY = (relY - rect.height / 2) * strength;
        btn.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });

      btn.addEventListener("pointerleave", () => {
        btn.style.transform = "translate3d(0, 0, 0)";
      });
    });
  }

  // Tilt cards (3D hover) for category section
  function initTiltCards() {
    const cards = doc.querySelectorAll(".tilt-card");

    cards.forEach((card) => {
      let rect;

      function updateRect() {
        rect = card.getBoundingClientRect();
      }
      updateRect();
      window.addEventListener("resize", updateRect);

      card.addEventListener("pointermove", (event) => {
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8; // invert for natural tilt
        const rotateY = ((x - centerX) / centerX) * 10;
        card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(0, -4px, 0)`;
      });

      card.addEventListener("pointerleave", () => {
        card.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)";
      });
    });
  }

  // Antigravity-style particle field in hero
  function initAntigravityField() {
    const container = doc.getElementById("antigravity-field");
    if (!container) return;

    const NUM_NODES = 40;
    const nodes = [];
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 320;

    let mouse = { x: width / 2, y: height / 2, active: false };

    container.addEventListener("pointerenter", () => {
      mouse.active = true;
    });
    container.addEventListener("pointerleave", () => {
      mouse.active = false;
    });
    container.addEventListener("pointermove", (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    function createNode(i) {
      const el = doc.createElement("div");
      el.className = "ag-node";
      const size = 10 + Math.random() * 16;
      const depth = 0.4 + Math.random() * 0.8; // for parallax
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.opacity = String(0.35 + depth * 0.6);

      const x = Math.random() * width;
      const y = Math.random() * height;
      const vx = (Math.random() - 0.5) * 0.3;
      const vy = (Math.random() - 0.5) * 0.3;

      container.appendChild(el);
      return { el, x, y, vx, vy, depth };
    }

    for (let i = 0; i < NUM_NODES; i += 1) {
      nodes.push(createNode(i));
    }

    function step() {
      const friction = 0.985;
      const gravityRadius = 140;
      const repelStrength = 0.015;
      const attractStrength = 0.0025;

      nodes.forEach((node) => {
        // Base motion
        node.x += node.vx;
        node.y += node.vy;

        // Soft boundary wrapping
        if (node.x < -40) node.x = width + 40;
        if (node.x > width + 40) node.x = -40;
        if (node.y < -40) node.y = height + 40;
        if (node.y > height + 40) node.y = -40;

        if (mouse.active) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const normX = dx / dist;
          const normY = dy / dist;

          if (dist < gravityRadius) {
            // Repel close nodes for anti-gravity effect
            const force = ((gravityRadius - dist) / gravityRadius) * repelStrength;
            node.vx += normX * force * (1.4 - node.depth);
            node.vy += normY * force * (1.4 - node.depth);
          } else {
            // Gently attract far nodes
            const force = attractStrength * (node.depth * 0.8);
            node.vx -= normX * force;
            node.vy -= normY * force;
          }
        }

        node.vx *= friction;
        node.vy *= friction;

        const translateX = node.x - 10;
        const translateY = node.y - 10;
        const depthZ = (node.depth - 0.4) * 40;
        node.el.style.transform = `translate3d(${translateX}px, ${translateY}px, ${depthZ}px)`;
      });

      requestAnimationFrame(step);
    }

    step();
  }

  // World pings (animated dots on map)
  function initWorldPings() {
    const container = doc.getElementById("world-pings");
    if (!container) return;

    const LOCATIONS = [
      { top: "18%", left: "22%" }, // US
      { top: "26%", left: "28%" }, // LATAM
      { top: "22%", left: "52%" }, // EU
      { top: "40%", left: "65%" }, // India
      { top: "34%", left: "72%" }, // China
      { top: "46%", left: "78%" }, // SE Asia
      { top: "30%", left: "35%" },
      { top: "52%", left: "30%" },
      { top: "60%", left: "50%" },
    ];

    LOCATIONS.forEach((loc, index) => {
      const ping = doc.createElement("div");
      ping.className = "world-ping";
      ping.style.top = loc.top;
      ping.style.left = loc.left;
      ping.style.animationDelay = `${index * 0.4}s`;
      container.appendChild(ping);
    });
  }

  // Build massive gallery with 100+ high-quality Unsplash images
  function initGallery() {
    const grid = doc.getElementById("gallery-grid");
    if (!grid) return;

    const topics = [
      "electronics",
      "laptop",
      "smartphone",
      "headphones",
      "fashion",
      "sneakers",
      "watch",
      "furniture",
      "kitchen",
      "beauty",
      "cosmetics",
      "perfume",
      "toys",
      "camera",
      "shoe",
      "sports",
      "outdoor",
      "office",
      "lighting",
      "jewelry",
      "bag",
    ];

    const totalImages = 120; // > 100

    const fragment = doc.createDocumentFragment();
    for (let i = 0; i < totalImages; i += 1) {
      const topic = topics[i % topics.length];
      const url = `https://source.unsplash.com/featured/400x400/?${encodeURIComponent(
        topic
      )}&sig=${i + 5}`;

      const item = doc.createElement("figure");
      item.className = "gallery-item";

      const img = doc.createElement("img");
      img.src = url;
      img.loading = "lazy";
      img.alt = `${topic} product photography ${i + 1}`;

      item.appendChild(img);
      fragment.appendChild(item);
    }

    grid.appendChild(fragment);
  }

  // Basic intersection-based reveal for sections (fallback if GSAP unavailable)
  function initSectionReveal() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const observed = doc.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    observed.forEach((section) => {
      section.classList.add("section-hidden");
      observer.observe(section);
    });
  }

  // Attach light GSAP scroll animations if library is present
  function initGsapAnimations() {
    if (typeof window.gsap === "undefined") return;

    const { gsap } = window;

    gsap.from("header nav", {
      y: -40,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });

    gsap.from("#hero h1, #hero p, #hero .primary-btn", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.08,
      delay: 0.2,
    });

    if (window.ScrollTrigger) {
      gsap.utils.toArray(".category-card").forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        });
      });
    }
  }

  // World ping styling (added dynamically to avoid cluttering CSS file)
  function injectInlineStyles() {
    const style = doc.createElement("style");
    style.textContent = `
      .world-ping {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 999px;
        background: radial-gradient(circle, #a5b4fc 0, #22d3ee 45%, transparent 70%);
        transform: translate(-50%, -50%);
        animation: wp-pulse 2.8s ease-out infinite;
        box-shadow: 0 0 10px rgba(56, 189, 248, 0.9);
      }
      .world-ping::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        border: 1px solid rgba(56, 189, 248, 0.9);
        animation: wp-ring 2.8s ease-out infinite;
      }
      @keyframes wp-pulse {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.6); }
        20% { opacity: 1; }
        60% { opacity: 1; }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(1.4); }
      }
      @keyframes wp-ring {
        0% { opacity: 0.9; transform: scale(1); }
        100% { opacity: 0; transform: scale(1.9); }
      }
      .section-hidden {
        opacity: 0;
        transform: translate3d(0, 20px, 0);
        transition: opacity 600ms ease-out, transform 600ms ease-out;
      }
      .section-visible {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
      .ag-node {
        position: absolute;
        border-radius: 999px;
        background: radial-gradient(circle at 30% 30%, rgba(248, 250, 252, 0.9), rgba(56, 189, 248, 0.1));
        box-shadow:
          0 0 18px rgba(56, 189, 248, 0.8),
          0 0 40px rgba(8, 47, 73, 0.95);
        will-change: transform;
        mix-blend-mode: screen;
      }
      #antigravity-field {
        position: absolute;
        inset: 0;
        overflow: hidden;
        background: radial-gradient(circle at 50% 0, rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.95));
      }
    `;
    doc.head.appendChild(style);
  }

  // Initialize all behaviors
  onReady(function init() {
    try {
      initSmoothScrolling();
      initMouseOrbit();
      initMagneticButtons();
      initTiltCards();
      initAntigravityField();
      initWorldPings();
      initGallery();
      initSectionReveal();
      initGsapAnimations();
      injectInlineStyles();
    } catch (error) {
      // Fail silently but log to console for developers
      console.error("GlobalSales Hub init error", error);
    }
  });
})();
