// Module aliases
const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Events = Matter.Events,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Common = Matter.Common;

// Configuration
const ITEM_COUNT = 100; // At least 100 items
const WALL_THICKNESS = 60;

// State
let engine;
let render;
let runner;
let width = window.innerWidth;
let height = window.innerHeight;
let entities = []; // { element: DOMElement, body: MatterBody }
let walls = [];
let gravityEnabled = true; // Start with gravity or let them float? Google Antigravity usually starts "normal" then falls.
// Let's start with a "Grid" layout that is static, then on click or after delay, we enable physics.
// Actually, for the "Antigravity" effect, usually the site loads, and if you move your mouse, it might trigger, or it just falls immediately.
// Let's make them fall immediately for impact, but arranged initially.

function init() {
    // 1. Setup Matter JS
    engine = Engine.create();
    engine.world.gravity.y = 1; // Normal gravity

    // WebGL Renderer (optional, for debugging, but we use DOM)
    // We won't use the built-in renderer for visual output, but we need the engine running.
    
    runner = Runner.create();
    
    // 2. Setup Walls
    createWalls();
    
    // 3. Generate Content (DOM + Physics)
    generateContent();

    // 4. Setup Mouse Interaction
    setupMouse();

    // 5. Run
    Runner.run(runner, engine);
    
    // 6. Render Loop (Sync DOM with Physics)
    requestAnimationFrame(renderLoop);

    // 7. Events
    window.addEventListener('resize', onResize);
    
    // Gravity Toggle
    document.getElementById('gravity-btn').addEventListener('click', toggleGravity);
    
    // Custom Cursor
    setupCursor();
}

function createWalls() {
    Composite.remove(engine.world, walls);
    walls = [];

    const options = { 
        isStatic: true, 
        render: { visible: false },
        friction: 0.5,
        restitution: 0.5 
    };

    // Top, Bottom, Left, Right
    // We place them just outside the view or acting as a container
    walls.push(Bodies.rectangle(width / 2, -WALL_THICKNESS/2, width, WALL_THICKNESS, options)); // Top
    walls.push(Bodies.rectangle(width / 2, height + WALL_THICKNESS/2, width, WALL_THICKNESS, options)); // Bottom
    walls.push(Bodies.rectangle(width + WALL_THICKNESS/2, height / 2, WALL_THICKNESS, height, options)); // Right
    walls.push(Bodies.rectangle(-WALL_THICKNESS/2, height / 2, WALL_THICKNESS, height, options)); // Left

    Composite.add(engine.world, walls);
}

function generateContent() {
    const container = document.getElementById('scene-container');
    container.innerHTML = '';
    entities = [];
    Composite.clear(engine.world, false, true); // Clear bodies but keep walls? No, we cleared walls manually. 
    // Re-add walls if we cleared everything
    Composite.add(engine.world, walls);

    // Grid parameters
    const itemSize = 100;
    const gap = 10;
    const colWidth = itemSize + gap;
    // Ensure at least 1 column to avoid division by zero
    const cols = Math.max(1, Math.floor((width - 60) / colWidth)); 
    const startX = 60;
    const startY = 100;
    
    for (let i = 0; i < ITEM_COUNT; i++) {
        // Create DOM
        const el = document.createElement('div');
        el.classList.add('physics-item', 'product-card');
        el.style.width = `${itemSize}px`;
        el.style.height = `${itemSize}px`;
        
        // Add Content (Image)
        const img = document.createElement('img');
        img.src = `https://picsum.photos/${itemSize}/${itemSize}?random=${i}`;
        img.classList.add('product-image');
        img.loading = "lazy";
        el.appendChild(img);

        container.appendChild(el);

        // Calculate initial position (Grid Layout)
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = startX + col * colWidth;
        // Start above the screen for a "falling in" effect or just arranged?
        // Let's arrange them neatly first.
        const y = startY + row * colWidth;
        
        // Create Body
        const body = Bodies.rectangle(x + itemSize/2, y + itemSize/2, itemSize, itemSize, {
            frictionAir: 0.01,
            restitution: 0.6,
            friction: 0.1,
            render: { visible: false }
        });

        Composite.add(engine.world, body);
        entities.push({ element: el, body: body });
        
        // Fade in
        setTimeout(() => el.classList.add('loaded'), i * 20);
    }
}

function setupMouse() {
    // Matter.js Mouse
    // We need a mouse constraint that works with the DOM coordinate system
    const mouse = Mouse.create(document.body);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: { visible: false }
        }
    });

    Composite.add(engine.world, mouseConstraint);

    // Keep the mouse in sync with rendering
    // Check if this interferes with clicking links
    // mouseConstraint.collisionFilter.mask = ... ? 
    
    // Allow scrolling (if we had scroll, but we are overflowing hidden)
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
}

function renderLoop() {
    entities.forEach(entity => {
        const { element, body } = entity;
        if (!body || !element) return;

        const x = body.position.x - 50; // center offset (width/2)
        const y = body.position.y - 50; // center offset (height/2)
        const angle = body.angle; // radians

        // Advanced 3D effect: Tilt based on velocity
        const velocity = body.velocity;
        // Limit tilt to avoid flipping over completely visually
        const tiltX = Math.max(-45, Math.min(45, velocity.y * 5)); 
        const tiltY = Math.max(-45, Math.min(45, velocity.x * 5));

        element.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
    
    requestAnimationFrame(renderLoop);
}

function onResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    
    // Update walls
    createWalls(); // Re-creates walls at new boundaries
}

function toggleGravity() {
    gravityEnabled = !gravityEnabled;
    engine.world.gravity.y = gravityEnabled ? 1 : 0;
    
    if (!gravityEnabled) {
        // Add a little explosion/force to float them up
        entities.forEach(ent => {
            Matter.Body.applyForce(ent.body, ent.body.position, {
                x: (Math.random() - 0.5) * 0.005,
                y: -0.005 - Math.random() * 0.005
            });
        });
    }
}

function setupCursor() {
    const cursor = document.getElementById('cursor-dot');
    const follower = document.getElementById('cursor-follower');
    
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    // Smooth follower
    function animateCursor() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

// Start
window.onload = init;
