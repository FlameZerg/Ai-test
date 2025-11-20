
const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Events = Matter.Events,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Body = Matter.Body,
      Vector = Matter.Vector;

let engine, runner;
let items = []; // { body: MatterBody, element: DOMElement }
let walls = [];
let isGravityOn = false; // Start with no gravity (floating grid)

function initPhysics() {
    // Create engine
    engine = Engine.create();
    engine.world.gravity.y = 0; // Start with zero gravity

    // Create runner
    runner = Runner.create();
    Runner.run(runner, engine);

    // Walls
    createWalls();

    // Mouse Control
    // We attach mouse to the document.body to catch all events anywhere
    const mouse = Mouse.create(document.body);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.1,
            damping: 0.1,
            render: { visible: false }
        }
    });
    
    Composite.add(engine.world, mouseConstraint);

    // Allow scrolling/interactions on non-body elements if needed, 
    // but we set overflow hidden.
    // Also we need to ensure mouse interaction doesn't block clicks on buttons inside cards.
    // Matter.js MouseConstraint might prevent default if it catches a body.
    // But we want both.
    
    // Sync Loop
    Events.on(engine, 'afterUpdate', () => {
        items.forEach(item => {
            const { body, element } = item;
            // Sync DOM to Body
            // Body position is center-based
            // We use translate3d to position the element
            
            // Check if body is sleeping
            // if (body.isSleeping) return;

            const x = body.position.x - element.offsetWidth / 2;
            const y = body.position.y - element.offsetHeight / 2;
            const angle = body.angle;

            // Use translate3d for GPU acceleration
            element.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}rad)`;
        });
    });

    window.addEventListener('resize', () => {
        createWalls(); // Recreate walls on resize
    });
}

function createWalls() {
    Composite.remove(engine.world, walls);
    walls = [];
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    const wallOptions = { 
        isStatic: true, 
        render: { visible: false },
        friction: 0.5,
        restitution: 0.5 
    };
    const wallThickness = 200;

    walls = [
        Bodies.rectangle(width / 2, -wallThickness/2 - 1000, width * 4, wallThickness, wallOptions), // Top (way up so they can fly high)
        Bodies.rectangle(width / 2, height + wallThickness/2, width * 4, wallThickness, wallOptions), // Bottom
        Bodies.rectangle(width + wallThickness/2, height / 2, wallThickness, height * 4, wallOptions), // Right
        Bodies.rectangle(-wallThickness/2, height / 2, wallThickness, height * 4, wallOptions) // Left
    ];

    Composite.add(engine.world, walls);
}

$(document).on('itemsReady', function() {
    initPhysics();

    $('.product-card').each(function() {
        const el = this;
        const $el = $(el);
        const width = $el.outerWidth();
        const height = $el.outerHeight();
        
        // Initial position from DOM (set by app.js)
        const top = parseFloat($el.css('top'));
        const left = parseFloat($el.css('left'));
        
        // Matter.js bodies are positioned at their center
        const x = left + width / 2;
        const y = top + height / 2;

        const body = Bodies.rectangle(x, y, width, height, {
            restitution: 0.6, // Bounciness
            friction: 0.1,
            frictionAir: 0.01, // Air resistance
            density: 0.001,
            chamfer: { radius: 10 } // Rounded corners physics
        });

        // Reset DOM position to 0,0 so transform works globally
        // IMPORTANT: We must do this AFTER reading top/left
        $el.css({ top: 0, left: 0, position: 'absolute' });
        
        // Force initial transform update
        el.style.transform = `translate3d(${left}px, ${top}px, 0)`;

        items.push({ body: body, element: el });
        Composite.add(engine.world, body);
    });
    
    console.log("Physics initialized with " + items.length + " bodies.");
});

// Interaction Logic

// Toggle Gravity
$(document).on('click', '#toggle-gravity', function() {
    isGravityOn = !isGravityOn;
    
    if (isGravityOn) {
         engine.world.gravity.y = 1;
         $(this).addClass('bg-pink-500/40 text-white').removeClass('bg-white/10');
         $(this).find('span').text("Disable Gravity");
    } else {
         engine.world.gravity.y = 0;
         $(this).addClass('bg-white/10').removeClass('bg-pink-500/40 text-white');
         $(this).find('span').text("Enable Gravity");
         
         // Give a little float impulse
         items.forEach(({body}) => {
            Body.setVelocity(body, { 
                x: (Math.random() - 0.5) * 2, 
                y: (Math.random() - 0.5) * 2 
            });
            Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.02);
        });
    }
});

// Explode
$(document).on('click', '#explode-btn', function() {
    const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    items.forEach(({body}) => {
        const forceMagnitude = 0.05 * body.mass;
        // Direction from center
        const dx = body.position.x - center.x;
        const dy = body.position.y - center.y;
        
        // Normalize
        const len = Math.sqrt(dx*dx + dy*dy) || 1;
        
        Body.applyForce(body, body.position, {
            x: (dx/len) * forceMagnitude + (Math.random()-0.5) * 0.01,
            y: (dy/len) * forceMagnitude + (Math.random()-0.5) * 0.01 - 0.02 // slightly up
        });
    });
});

// Mouse tilt effect via JS (optional, physics handles movement, but we can add 3D tilt on top)
// Since physics controls transform, adding CSS perspective tilt might be tricky if we overwrite transform.
// We can apply perspective to the INNER container of the card.
// .product-card -> transform (Physics)
// .product-card > div (inner) -> transform (Tilt)
// Let's add that to ui.js
