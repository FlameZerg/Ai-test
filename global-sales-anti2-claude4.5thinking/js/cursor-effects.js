/**
 * CURSOR EFFECTS
 * Custom cursor with smooth following trail effect
 * Inspired by antigravity.google
 */

class CursorEffects {
    constructor() {
        this.cursorDot = document.querySelector('.cursor-dot');
        this.cursorOutline = document.querySelector('.cursor-outline');
        
        this.cursorPos = { x: 0, y: 0 };
        this.dotPos = { x: 0, y: 0 };
        this.outlinePos = { x: 0, y: 0 };
        
        this.init();
    }
    
    init() {
        if (!this.cursorDot || !this.cursorOutline) return;
        
        // Hide default cursor on body
        document.body.style.cursor = 'none';
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.cursorPos.x = e.clientX;
            this.cursorPos.y = e.clientY;
        });
        
        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            this.cursorDot.classList.add('hidden');
            this.cursorOutline.classList.add('hidden');
        });
        
        // Show cursor when entering window
        document.addEventListener('mouseenter', () => {
            this.cursorDot.classList.remove('hidden');
            this.cursorOutline.classList.remove('hidden');
        });
        
        // Add hover effect for interactive elements
        this.addHoverEffects();
        
        // Start animation loop
        this.animate();
    }
    
    addHoverEffects() {
        const hoverElements = document.querySelectorAll(
            'a, button, .product-card, .category-card, input, textarea'
        );
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursorOutline.classList.add('hover');
                el.style.cursor = 'none';
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursorOutline.classList.remove('hover');
            });
        });
    }
    
    animate() {
        // Smooth easing for cursor dot (faster)
        this.dotPos.x += (this.cursorPos.x - this.dotPos.x) * 0.25;
        this.dotPos.y += (this.cursorPos.y - this.dotPos.y) * 0.25;
        
        // Smooth easing for cursor outline (slower)
        this.outlinePos.x += (this.cursorPos.x - this.outlinePos.x) * 0.15;
        this.outlinePos.y += (this.cursorPos.y - this.outlinePos.y) * 0.15;
        
        // Apply positions
        this.cursorDot.style.left = `${this.dotPos.x}px`;
        this.cursorDot.style.top = `${this.dotPos.y}px`;
        this.cursorOutline.style.left = `${this.outlinePos.x}px`;
        this.cursorOutline.style.top = `${this.outlinePos.y}px`;
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize cursor effects when DOM is ready
if (window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('DOMContentLoaded', () => {
        new CursorEffects();
    });
}
