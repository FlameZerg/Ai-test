const UI = (() => {
    const canvas = document.getElementById('trail-canvas');
    const ctx = canvas.getContext('2d');
    let mouse = { x: 0, y: 0 };
    let points = [];
    
    const cursor = document.getElementById('custom-cursor');
    
    function init() {
        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', e => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            points.push({ x: mouse.x, y: mouse.y, age: 0 });
            
            // Move custom cursor
            if(cursor) {
                cursor.style.left = `${e.clientX - 8}px`; // Center 8px
                cursor.style.top = `${e.clientY - 8}px`;
            }
        });
        
        animate();
        initTilt();
    }
    
    function initTilt() {
        document.addEventListener('mousemove', e => {
            if (document.body.classList.contains('physics-active')) return;
            
            // Tilt effect for hovered card
            const card = e.target.closest('.product-card');
            if (card) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg
                const rotateY = ((x - centerX) / centerX) * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
                
                // Glare effect
                // We can adjust background gradient
                card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2), rgba(255,255,255,0.05))`;
            }
            
            // Reset others? 
            // We need to reset when mouse leaves.
            // The 'mouseout' event on cards helps, but let's handle it via a global reset or CSS transition.
            // CSS transition is set on .product-card for transform? No, I removed it for Physics.
            // Physics needs `will-change: transform`.
            // If I set transition on transform, Physics will lag.
            // So I should ONLY apply transition when NOT physics-active.
        });
        
        document.addEventListener('mouseout', e => {
             if (document.body.classList.contains('physics-active')) return;
             const card = e.target.closest('.product-card');
             if(card) {
                 card.style.transform = '';
                 card.style.background = '';
             }
        });
    }
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        for (let i = 0; i < points.length; i++) {
            const p = points[i];
            
            // Draw
            if (i > 0) {
                const prev = points[i - 1];
                ctx.beginPath();
                ctx.moveTo(prev.x, prev.y);
                ctx.lineTo(p.x, p.y);
                
                const alpha = 1 - (p.age / 50);
                ctx.strokeStyle = `rgba(64, 196, 255, ${alpha})`;
                ctx.lineWidth = (1 - (p.age / 50)) * 10;
                ctx.stroke();
            }
            
            p.age++;
        }
        
        // Remove old points
        points = points.filter(p => p.age < 50);
        
        requestAnimationFrame(animate);
    }
    
    return { init };
})();

// Start UI effects
UI.init();
