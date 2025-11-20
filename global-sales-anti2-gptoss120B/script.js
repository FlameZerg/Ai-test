// script.js – Handles product grid generation, mouse‑follow gradient, and Three.js hero effect

function init() {
    // Mouse‑follow gradient
    const $body = $("body");
    $(document).on("mousemove", function (e) {
        const mouseX = e.clientX / window.innerWidth * 100;
        const mouseY = e.clientY / window.innerHeight * 100;
        $body.attr("data-mouse-x", `${mouseX}%`);
        $body.attr("data-mouse-y", `${mouseY}%`);
        $("#mouse-gradient").css({
            "--mouse-x": `${mouseX}%`,
            "--mouse-y": `${mouseY}%`
        });
    });

    // Populate product cards
    const $grid = $("section#products .grid");
    const placeholderCount = 12;
    for (let i = 1; i <= placeholderCount; i++) {
        const imgUrl = `https://picsum.photos/seed/${i}/400/300`;
        const card = `
      <div class="product-card">
        <img src="${imgUrl}" alt="Product ${i}" />
        <div class="info">
          <h3>Product ${i}</h3>
          <p>Premium item description goes here.</p>
        </div>
      </div>
    `;
        $grid.append(card);
    }

    // Three.js hero effect
    const canvas = document.getElementById('hero-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
    directional.position.set(5, 5, 5);
    scene.add(directional);

    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0x0ea5e9, metalness: 0.5, roughness: 0.2 });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    function animate() {
        requestAnimationFrame(animate);
        torus.rotation.x += 0.005;
        torus.rotation.y += 0.007;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    });
}

$(document).ready(function () {
    if (typeof THREE === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r158/three.min.js';
        script.onload = init;
        document.head.appendChild(script);
    } else {
        init();
    }
});

function init() {
    // Mouse‑follow gradient
    const $body = $("body");
    $(document).on("mousemove", function (e) {
        const mouseX = e.clientX / window.innerWidth * 100;
        const mouseY = e.clientY / window.innerHeight * 100;
        $body.attr("data-mouse-x", `${mouseX}%`);
        $body.attr("data-mouse-y", `${mouseY}%`);
        $("#mouse-gradient").css({
            "--mouse-x": `${mouseX}%`,
            "--mouse-y": `${mouseY}%`
        });
    });

    // Populate product cards
    const $grid = $("section#products .grid");
    const placeholderCount = 12;
    for (let i = 1; i <= placeholderCount; i++) {
        const imgUrl = `https://picsum.photos/seed/${i}/400/300`;
        const card = `
      <div class="product-card">
        <img src="${imgUrl}" alt="Product ${i}" />
        <div class="info">
          <h3>Product ${i}</h3>
          <p>Premium item description goes here.</p>
        </div>
      </div>
    `;
        $grid.append(card);
    }

    // Three.js hero effect
    const canvas = document.getElementById('hero-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
    directional.position.set(5, 5, 5);
    scene.add(directional);

    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0x0ea5e9, metalness: 0.5, roughness: 0.2 });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    function animate() {
        requestAnimationFrame(animate);
        torus.rotation.x += 0.005;
        torus.rotation.y += 0.007;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    });
}

$(document).ready(function () {
    if (typeof THREE === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r158/three.min.js';
        script.onload = init;
        document.head.appendChild(script);
    } else {
        init();
    }
});

function init() {
    // Mouse‑follow gradient
    const $body = $("body");
    $(document).on("mousemove", function (e) {
        const mouseX = e.clientX / window.innerWidth * 100;
        const mouseY = e.clientY / window.innerHeight * 100;
        $body.attr("data-mouse-x", `${mouseX}%`);
        $body.attr("data-mouse-y", `${mouseY}%`);
        $("#mouse-gradient").css({
            "--mouse-x": `${mouseX}%`,
            "--mouse-y": `${mouseY}%`
        });
    });

    // Populate product cards
    const $grid = $("section#products .grid");
    const placeholderCount = 12;
    for (let i = 1; i <= placeholderCount; i++) {
        const imgUrl = `https://picsum.photos/seed/${i}/400/300`;
        const card = `
      <div class="product-card">
        <img src="${imgUrl}" alt="Product ${i}" />
        <div class="info">
          <h3>Product ${i}</h3>
          <p>Premium item description goes here.</p>
        </div>
      </div>
    `;
        $grid.append(card);
    }

    // Three.js hero effect
    const canvas = document.getElementById('hero-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
    directional.position.set(5, 5, 5);
    scene.add(directional);

    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0x0ea5e9, metalness: 0.5, roughness: 0.2 });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    function animate() {
        requestAnimationFrame(animate);
        torus.rotation.x += 0.005;
        torus.rotation.y += 0.007;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    });
}

$(document).ready(function () {
    if (typeof THREE === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r158/three.min.js';
        script.onload = init;
        document.head.appendChild(script);
    } else {
        init();
    }
});

function init() {
    // Mouse‑follow gradient
    const $body = $("body");
    $(document).on("mousemove", function (e) {
        const mouseX = e.clientX / window.innerWidth * 100;
        const mouseY = e.clientY / window.innerHeight * 100;
        $body.attr("data-mouse-x", `${mouseX}%`);
        $body.attr("data-mouse-y", `${mouseY}%`);
        $("#mouse-gradient").css({
            "--mouse-x": `${mouseX}%`,
            "--mouse-y": `${mouseY}%`
        });
    });

    // Populate product cards
    const $grid = $("section#products .grid");
    const placeholderCount = 12;
    for (let i = 1; i <= placeholderCount; i++) {
        const imgUrl = `https://picsum.photos/seed/${i}/400/300`;
        const card = `
      <div class="product-card">
        <img src="${imgUrl}" alt="Product ${i}" />
        <div class="info">
          <h3>Product ${i}</h3>
          <p>Premium item description goes here.</p>
        </div>
      </div>
    `;
        $grid.append(card);
    }

    // Three.js hero effect
    const canvas = document.getElementById('hero-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
    directional.position.set(5, 5, 5);
    scene.add(directional);

    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0x0ea5e9, metalness: 0.5, roughness: 0.2 });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    function animate() {
        requestAnimationFrame(animate);
        torus.rotation.x += 0.005;
        torus.rotation.y += 0.007;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    });
}

$(document).ready(function () {
    if (typeof THREE === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r158/three.min.js';
        script.onload = init;
        document.head.appendChild(script);
    } else {
        init();
    }
});

function init() {
    // Mouse‑follow gradient
    const $body = $("body");
    $(document).on("mousemove", function (e) {
        const mouseX = e.clientX / window.innerWidth * 100;
        const mouseY = e.clientY / window.innerHeight * 100;
        $body.attr("data-mouse-x", `${mouseX}%`);
        $body.attr("data-mouse-y", `${mouseY}%`);
        $("#mouse-gradient").css({
            "--mouse-x": `${mouseX}%`,
            "--mouse-y": `${mouseY}%`
        });
    });

    // Populate product cards
    const $grid = $("section#products .grid");
    const placeholderCount = 12;
    for (let i = 1; i <= placeholderCount; i++) {
        const imgUrl = `https://picsum.photos/seed/${i}/400/300`;
        const card = `
      <div class="product-card">
        <img src="${imgUrl}" alt="Product ${i}" />
        <div class="info">
          <h3>Product ${i}</h3>
          <p>Premium item description goes here.</p>
        </div>
      </div>
    `;
        $grid.append(card);
    }

    // Three.js hero effect
    const canvas = document.getElementById('hero-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
    directional.position.set(5, 5, 5);
    scene.add(directional);

    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0x0ea5e9, metalness: 0.5, roughness: 0.2 });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    function animate() {
        requestAnimationFrame(animate);
        torus.rotation.x += 0.005;
        torus.rotation.y += 0.007;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    });
}

$(document).ready(function () {
    if (typeof THREE === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r158/three.min.js';
        script.onload = init;
        document.head.appendChild(script);
    } else {
        init();
    }
});

function init() {
    // Mouse‑follow gradient
    const $body = $("body");
    $(document).on("mousemove", function (e) {
        const mouseX = e.clientX / window.innerWidth * 100;
        const mouseY = e.clientY / window.innerHeight * 100;
        $body.attr("data-mouse-x", `${mouseX}%`);
        $body.attr("data-mouse-y", `${mouseY}%`);
        const gradient = $("#mouse-gradient");
        gradient.css({
            "--mouse-x": `${mouseX}%`,
            "--mouse-y": `${mouseY}%`
        });
    });

    // Populate product cards
    const $grid = $("section#products .grid");
    const placeholderCount = 12;
    for (let i = 1; i <= placeholderCount; i++) {
        const imgUrl = `https://picsum.photos/seed/${i}/400/300`;
        const card = `
      <div class="product-card">
        <img src="${imgUrl}" alt="Product ${i}" />
        <div class="info">
          <h3>Product ${i}</h3>
          <p>Premium item description goes here.</p>
        </div>
      </div>
    `;
        $grid.append(card);
    }

    // Three.js hero effect
    const canvas = document.getElementById('hero-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
    directional.position.set(5, 5, 5);
    scene.add(directional);

    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0x0ea5e9, metalness: 0.5, roughness: 0.2 });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    function animate() {
        requestAnimationFrame(animate);
        torus.rotation.x += 0.005;
        torus.rotation.y += 0.007;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    });
}

$(document).ready(function () {
    if (typeof THREE === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r158/three.min.js';
        script.onload = init;
        document.head.appendChild(script);
    } else {
        init();
    }
});

function init() {
    // ---------- Mouse‑follow gradient ----------
    const $body = $("body");
    $(document).on("mousemove", function (e) {
        const mouseX = e.clientX / window.innerWidth * 100;
        const mouseY = e.clientY / window.innerHeight * 100;
        $body.attr("data-mouse-x", `${mouseX}%`);
        $body.attr("data-mouse-y", `${mouseY}%`);
        // Update CSS custom properties for gradient position
        const gradient = $("#mouse-gradient");
        gradient.css({
            "--mouse-x": `${mouseX}%`,
            "--mouse-y": `${mouseY}%`
        });
    });

    // ---------- Populate product cards ----------
    const $grid = $("section#products .grid");
    const placeholderCount = 12; // demo count
    for (let i = 1; i <= placeholderCount; i++) {
        const imgUrl = `https://picsum.photos/seed/${i}/400/300`;
        const card = `
      <div class="product-card">
        <img src="${imgUrl}" alt="Product ${i}" />
        <div class="info">
          <h3>Product ${i}</h3>
          <p>Premium item description goes here.</p>
        </div>
      </div>
    `;
        $grid.append(card);
    }

    // ---------- Three.js hero effect ----------
    const canvas = document.getElementById('hero-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Light
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
    directional.position.set(5, 5, 5);
    scene.add(directional);

    // Geometry – rotating torus knot
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0x0ea5e9, metalness: 0.5, roughness: 0.2 });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        torus.rotation.x += 0.005;
        torus.rotation.y += 0.007;
        renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
}

$(document).ready(function () {
    if (typeof THREE === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r158/three.min.js';
        script.onload = init;
        document.head.appendChild(script);
    } else {
        init();
    }
});



// ---------- Mouse‑follow gradient ----------
const $body = $("body");
$(document).on("mousemove", function (e) {
    const mouseX = e.clientX / window.innerWidth * 100;
    const mouseY = e.clientY / window.innerHeight * 100;
    $body.attr("data-mouse-x", `${mouseX}%`);
    $body.attr("data-mouse-y", `${mouseY}%`);
    // Update CSS custom properties for gradient position
    const gradient = $("#mouse-gradient");
    gradient.css({
        "--mouse-x": `${mouseX}%`,
        "--mouse-y": `${mouseY}%`
    });
});

// ---------- Populate product cards ----------
const $grid = $("section#products .grid");
const placeholderCount = 12; // demo count
for (let i = 1; i <= placeholderCount; i++) {
    const imgUrl = `https://picsum.photos/seed/${i}/400/300`;
    const card = `
      <div class="product-card">
        <img src="${imgUrl}" alt="Product ${i}" />
        <div class="info">
          <h3>Product ${i}</h3>
          <p>Premium item description goes here.</p>
        </div>
      </div>
    `;
    $grid.append(card);
}

// ---------- Three.js hero effect ----------
const canvas = document.getElementById('hero-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Light
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);
const directional = new THREE.DirectionalLight(0xffffff, 0.8);
directional.position.set(5, 5, 5);
scene.add(directional);

// Geometry – rotating torus knot
const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
const material = new THREE.MeshStandardMaterial({ color: 0x0ea5e9, metalness: 0.5, roughness: 0.2 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.005;
    torus.rotation.y += 0.007;
    renderer.render(scene, camera);
}
animate();

// Handle resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
});
