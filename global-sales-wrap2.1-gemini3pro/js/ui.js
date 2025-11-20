
$(document).ready(function() {
    // Custom Cursor
    const cursorDot = $('#cursor-dot');
    const cursorRing = $('#cursor-ring');
    
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    $(document).on('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Dot follows instantly
        cursorDot.css('transform', `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`);
    });

    // Smooth ring follow
    function updateCursor() {
        // Linear interpolation for smooth follow
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        
        cursorRing.css('transform', `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`);
        
        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Hover effects for cursor
    $(document).on('mouseenter', 'a, button, .product-card, .social-dock a', function() {
        cursorRing.addClass('!w-16 !h-16 bg-white/10 border-pink-500/50 mix-blend-screen');
        cursorDot.addClass('scale-0');
    }).on('mouseleave', 'a, button, .product-card, .social-dock a', function() {
        cursorRing.removeClass('!w-16 !h-16 bg-white/10 border-pink-500/50 mix-blend-screen');
        cursorDot.removeClass('scale-0');
    });

    // 3D Tilt Effect for Cards
    // Using delegate to handle dynamic elements
    $(document).on('mousemove', '.product-card', function(e) {
        const card = $(this);
        const content = card.find('.card-content');
        
        if(content.length === 0) return;

        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top;  // y position within the element.
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation based on mouse position
        const rotateX = ((y - centerY) / centerY) * -15; // Max 15deg
        const rotateY = ((x - centerX) / centerX) * 15; // Max 15deg
        
        content.css({
            'transform': `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
            'box-shadow': `${-rotateY}px ${rotateX}px 20px rgba(0,0,0,0.2)` // Dynamic shadow
        });
    });

    $(document).on('mouseleave', '.product-card', function() {
        const content = $(this).find('.card-content');
        content.css({
            'transform': 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
            'box-shadow': 'none'
        });
    });

    // Button ripple effect
    $(document).on('click', 'button', function(e) {
        const btn = $(this);
        const circle = $('<span class="absolute w-4 h-4 bg-white/50 rounded-full animate-ping pointer-events-none"></span>');
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        circle.css({
            top: y - 8,
            left: x - 8
        });
        
        btn.append(circle);
        setTimeout(() => circle.remove(), 1000);
    });
});
