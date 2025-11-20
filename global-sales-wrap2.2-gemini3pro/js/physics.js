const Physics = (() => {
    // Matter.js module aliases
    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint,
          Events = Matter.Events,
          Body = Matter.Body;

    let engine, world;
    let entities = []; // Array of { body, element }
    let isGravityOn = true;
    let canvas;
    let runner;

    let walls = [];

    function init(containerId) {
        // Create engine
        engine = Engine.create();
        world = engine.world;
        
        // Set gravity
        engine.gravity.y = 1; 

        // Create runner
        runner = Runner.create();
        Runner.run(runner, engine);

        // Add walls
        addWalls();
        
        // Add mouse control
        addMouseControl();

        // Start sync loop
        window.requestAnimationFrame(updateLoop);

        // Resize handler
        window.addEventListener('resize', () => {
            addWalls();
        });
    }

    function addWalls() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const wallThickness = 100;
        
        // Remove existing walls
        if (walls.length > 0) {
            Composite.remove(world, walls);
            walls = [];
        }
        
        // Floor
        const floor = Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { isStatic: true, friction: 0.5 });
        // Ceiling
        const ceiling = Bodies.rectangle(width / 2, -wallThickness * 2, width, wallThickness, { isStatic: true }); // Higher ceiling so things fall in
        // Left
        const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 5, { isStatic: true });
        // Right
        const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 5, { isStatic: true });

        walls = [floor, ceiling, leftWall, rightWall];
        Composite.add(world, walls);
    }

    function addMouseControl() {
        const mouse = Mouse.create(document.body);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.1, // Softer grab
                render: { visible: false }
            }
        });

        Composite.add(world, mouseConstraint);
        
        // Allow scrolling if not grabbing (Matter.js captures scroll events by default sometimes)
        // But here we want dragging.
        
        // Keep the mouse in sync with rendering
        // render.mouse = mouse; // No render object here
    }

    function createBodyForElement(element) {
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        const body = Bodies.rectangle(x, y, rect.width, rect.height, {
            restitution: 0.4, // Bouncy
            friction: 0.005,  // Slippery
            frictionAir: 0.001, // Air resistance
            density: 0.001
        });

        Composite.add(world, body);
        entities.push({ 
            body, 
            element, 
            width: rect.width, 
            height: rect.height 
        });
        
        // Apply random initial rotation or velocity to make it interesting
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);
    }

    function updateLoop() {
        // Sync DOM to Physics
        for (let i = 0; i < entities.length; i++) {
            const { body, element, width, height } = entities[i];
            if (!body || !element) continue;

            // Get position and angle
            const x = body.position.x - width / 2;
            const y = body.position.y - height / 2;
            const angle = body.angle; // Radians

            // Apply transform
            // We use translate3d for GPU acceleration
            element.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}rad)`;
        }

        window.requestAnimationFrame(updateLoop);
    }

    function toggleGravity() {
        isGravityOn = !isGravityOn;
        if (isGravityOn) {
            engine.gravity.y = 1;
            engine.gravity.x = 0;
        } else {
            engine.gravity.y = 0;
            engine.gravity.x = 0;
            
            // Apply a small explosion/force to float things up if they are settled
            entities.forEach(entity => {
                 Body.applyForce(entity.body, entity.body.position, {
                     x: (Math.random() - 0.5) * 0.02,
                     y: (Math.random() - 0.5) * 0.02
                 });
            });
        }
        return isGravityOn;
    }
    
    function explode() {
         entities.forEach(entity => {
             Body.applyForce(entity.body, entity.body.position, {
                 x: (Math.random() - 0.5) * 0.05,
                 y: (Math.random() - 0.5) * 0.05
             });
        });
    }

    return {
        init,
        createBodyForElement,
        toggleGravity,
        explode
    };
})();
