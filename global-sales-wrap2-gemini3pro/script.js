// Configuration
const CONFIG = {
    productCount: 100,
    wallThickness: 100,
    gravity: 1,
    colors: [
        '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', 
        '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', 
        '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', 
        '#ec4899', '#f43f5e', '#fb7185'
    ]
};

// State
let engine, world, runner;
let bodies = []; // { body: Matter.Body, element: HTMLElement }
let isZeroGravity = false;

// --- THREE.JS BACKGROUND ---
function initThreeJS() {
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Particles
    const geometry = new THREE.BufferGeometry();
    const count = 200;
    const positions = new Float32Array(count * 3);
    
    for(let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 20;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x4facfe,
        transparent: true,
        opacity: 0.8
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    camera.position.z = 5;

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.x += 0.001;
        particles.rotation.y += 0.001;
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

// --- CONTENT GENERATION ---
function generateContent() {
    const container = document.getElementById('physics-container');
    
    // 1. Channels (Social/Nav)
    const channels = [
        { name: 'FACEBOOK', icon: 'fa-facebook', url: '#' },
        { name: 'TWITTER', icon: 'fa-twitter', url: '#' },
        { name: 'INSTAGRAM', icon: 'fa-instagram', url: '#' },
        { name: 'LINKEDIN', icon: 'fa-linkedin', url: '#' },
        { name: 'SUPPORT', icon: 'fa-headset', url: '#' },
        { name: 'CAREERS', icon: 'fa-briefcase', url: '#' }
    ];

    channels.forEach((channel, index) => {
        const el = document.createElement('div');
        el.className = 'physics-item channel-item text-white hover:bg-white/20 cursor-pointer';
        el.style.width = '180px';
        el.style.height = '60px';
        el.innerHTML = `<i class="fab ${channel.icon} mr-2"></i> ${channel.name}`;
        el.dataset.type = 'channel';
        
        // Random position initially
        const x = Math.random() * (window.innerWidth - 200) + 100;
        const y = Math.random() * (window.innerHeight - 200) - 500; // Start above
        
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        
        container.appendChild(el);
    });

    // 2. Products
    for (let i = 0; i < CONFIG.productCount; i++) {
        const el = document.createElement('div');
        el.className = 'physics-item bg-gray-800/50 group';
        el.style.width = '150px';
        el.style.height = '180px';
        
        // Random realistic images from Unsplash Source (using ID to keep them static per session if possible, or just random)
        const imgId = 10 + i; 
        const imgUrl = `https://picsum.photos/id/${imgId}/300/300`;
        
        el.innerHTML = `
            <div class="h-24 overflow-hidden">
                <img src="${imgUrl}" class="product-image group-hover:scale-110 transition-transform duration-500" loading="lazy" alt="Product">
            </div>
            <div class="p-3">
                <div class="h-2 w-12 rounded-full bg-white/20 mb-2"></div>
                <div class="h-2 w-20 rounded-full bg-white/10"></div>
                <div class="mt-3 flex justify-between items-center">
                    <span class="text-xs font-mono text-blue-300">$${(Math.random() * 99 + 1).toFixed(2)}</span>
                    <div class="w-4 h-4 rounded-full" style="background-color: ${CONFIG.colors[i % CONFIG.colors.length]}"></div>
                </div>
            </div>
        `;
        el.dataset.type = 'product';

        const x = Math.random() * (window.innerWidth - 150);
        const y = (Math.random() * -2000) - 200; // Staggered start height

        el.style.left = `${x}px`;
        el.style.top = `${y}px`;

        container.appendChild(el);
    }
}

// --- MATTER.JS PHYSICS ---
function initPhysics() {
    // Aliases
    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite,
          MouseConstraint = Matter.MouseConstraint,
          Mouse = Matter.Mouse,
          Events = Matter.Events;

    // Create engine
    engine = Engine.create();
    world = engine.world;

    // Create runner
    runner = Runner.create();
    Runner.run(runner, engine);

    // Container dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create Walls
    const ground = Bodies.rectangle(width / 2, height + CONFIG.wallThickness / 2, width, CONFIG.wallThickness, { isStatic: true, render: { visible: false } });
    const leftWall = Bodies.rectangle(0 - CONFIG.wallThickness / 2, height / 2, CONFIG.wallThickness, height * 5, { isStatic: true, render: { visible: false } }); // Taller to catch falling items
    const rightWall = Bodies.rectangle(width + CONFIG.wallThickness / 2, height / 2, CONFIG.wallThickness, height * 5, { isStatic: true, render: { visible: false } });
    
    // Top wall (optional, usually open sky, but prevents flying out indefinitely)
    // We'll leave top open for falling, but maybe add a "ceiling" way up high if zero G is used.
    
    Composite.add(world, [ground, leftWall, rightWall]);

    // Bind DOM elements to Bodies
    const elements = document.querySelectorAll('.physics-item');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const x = parseFloat(el.style.left) + rect.width / 2;
        const y = parseFloat(el.style.top) + rect.height / 2;
        
        const body = Bodies.rectangle(x, y, rect.width, rect.height, {
            restitution: 0.4, // Bounciness
            friction: 0.3,
            density: 0.04,
            chamfer: { radius: 10 }
        });

        // Initial random rotation
        Matter.Body.setAngle(body, (Math.random() - 0.5) * 0.5);
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

        bodies.push({ body, element: el });
        Composite.add(world, body);
        
        // Interactions
        el.addEventListener('click', () => {
            // Simple impulse on click
            Matter.Body.applyForce(body, body.position, {
                x: (Math.random() - 0.5) * 0.2,
                y: -0.2
            });
        });
    });

    // Mouse Control
    const mouseElement = document.getElementById('physics-container');
    const mouse = Mouse.create(mouseElement); 
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.1,
            render: { visible: false }
        }
    });

    // Important: allow scrolling/interactions if not clicking a body (though full screen canvas covers it)
    mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

    Composite.add(world, mouseConstraint);

    // Render Loop (Sync Physics -> DOM)
    (function renderLoop() {
        window.requestAnimationFrame(renderLoop);

        bodies.forEach(item => {
            const { body, element } = item;
            const { x, y } = body.position;
            const angle = body.angle;

            // Hardware acceleration optimization
            element.style.transform = `translate3d(${x - element.offsetWidth/2}px, ${y - element.offsetHeight/2}px, 0) rotate(${angle}rad)`;
            
            // Optional: clean up bodies that fall way out of bounds
            if (y > window.innerHeight + 200) {
                Matter.Body.setPosition(body, {
                    x: Math.random() * window.innerWidth,
                    y: -200
                });
                Matter.Body.setVelocity(body, { x: 0, y: 0 });
            }
        });
    })();

    // Resize Handler
    window.addEventListener('resize', () => {
        // Update ground and walls
        Matter.Body.setPosition(ground, { x: window.innerWidth / 2, y: window.innerHeight + CONFIG.wallThickness / 2 });
        Matter.Body.setVertices(ground, Matter.Bodies.rectangle(window.innerWidth / 2, window.innerHeight + CONFIG.wallThickness / 2, window.innerWidth, CONFIG.wallThickness).vertices);
        
        Matter.Body.setPosition(rightWall, { x: window.innerWidth + CONFIG.wallThickness / 2, y: window.innerHeight / 2 });
    });
}

// --- UTILS ---

// Custom Cursor
function initCursor() {
    const cursor = document.getElementById('cursor');
    const dot = document.getElementById('cursor-dot');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        dot.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        dot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

// Controls
function initControls() {
    document.getElementById('toggle-gravity').addEventListener('click', () => {
        isZeroGravity = !isZeroGravity;
        world.gravity.y = isZeroGravity ? 0 : 1;
        
        // Apply small random force to everything to make them float
        if(isZeroGravity) {
            bodies.forEach(({body}) => {
                Matter.Body.applyForce(body, body.position, {
                    x: (Math.random() - 0.5) * 0.05,
                    y: (Math.random() - 0.5) * 0.05
                });
            });
        }
    });

    document.getElementById('reset-gravity').addEventListener('click', () => {
        bodies.forEach(({body}) => {
             Matter.Body.setPosition(body, {
                x: Math.random() * window.innerWidth,
                y: (Math.random() * -2000) - 200
            });
            Matter.Body.setVelocity(body, { x: 0, y: 0 });
            Matter.Body.setAngularVelocity(body, 0);
        });
    });
}

// --- BOOTSTRAP ---
window.onload = () => {
    initThreeJS();
    generateContent();
    initCursor();
    // Delay physics slightly to allow DOM to settle? Not needed really.
    initPhysics();
    initControls();
};
