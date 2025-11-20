$(document).ready(function() {
    const container = $('#physics-container');
    const productCount = 100; // Large number of items
    
    // Categories for random generation
    const adjectives = ['Smart', 'Luxury', 'Eco', 'Future', 'Vintage', 'Neon', 'Cyber', 'Retro'];
    const nouns = ['Watch', 'Phone', 'Chair', 'Shoes', 'Camera', 'Lamp', 'Drone', 'Bag', 'Glasses', 'Headset'];

    function getRandomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    
    console.log("Generating products...");

    // Generate products
    for(let i=0; i<productCount; i++) {
        const title = `${getRandomItem(adjectives)} ${getRandomItem(nouns)}`;
        const price = `$${(Math.random() * 900 + 50).toFixed(2)}`;
        // Use picsum with seed for stability and variety
        const imgUrl = `https://picsum.photos/seed/${i + 100}/200/200`;
        
        const el = $(`
            <div class="product-card w-32 h-40 flex flex-col items-center" id="prod-${i}">
                <div class="w-full h-24 overflow-hidden rounded-t-lg relative">
                    <div class="absolute inset-0 bg-gray-800 animate-pulse loading-placeholder"></div>
                    <img src="${imgUrl}" alt="${title}" class="w-full h-full object-cover opacity-0 transition-opacity duration-500" onload="this.classList.remove('opacity-0'); this.previousElementSibling.remove()">
                </div>
                <div class="product-info text-center w-full p-2">
                    <div class="product-title text-white">${title}</div>
                    <div class="product-price">${price}</div>
                </div>
            </div>
        `);
        
        container.append(el);
    }
    
    // Initial Grid Layout
    function layoutGrid() {
        const cardWidth = 128; // w-32
        const cardHeight = 160; // h-40
        const gap = 20;
        const cols = Math.floor((window.innerWidth - 100) / (cardWidth + gap));
        const startX = 50;
        const startY = 120; // Below header
        
        $('.product-card').each(function(index) {
            const col = index % cols;
            const row = Math.floor(index / cols);
            
            let left = startX + col * (cardWidth + gap);
            let top = startY + row * (cardHeight + gap);
            
            // If product exceeds viewport height, place it above the viewport to rain down later
            if (top + cardHeight > window.innerHeight) {
                const rowInExcess = row - Math.floor((window.innerHeight - startY) / (cardHeight + gap));
                top = -200 - (rowInExcess * (cardHeight + gap)); 
                // Scramble X slightly for natural rain
                left += (Math.random() - 0.5) * 50;
            }
            
            $(this).css({
                left: left,
                top: top
            });
        });
    }
    
    layoutGrid();
    
    // Resize handler for grid (only if physics not started)
    let physicsStarted = false;
    $(window).on('resize', function() {
        if(!physicsStarted) layoutGrid();
    });

    // Start Physics function
    function startChaos() {
        if(physicsStarted) return;
        physicsStarted = true;
        $('body').addClass('physics-active');
        
        console.log("Starting Antigravity...");
        
        Physics.init();
        
        // Create bodies for each card
        $('.product-card').each(function() {
            Physics.createBodyForElement(this);
        });
        
        // Also create bodies for UI elements (Header, Footer) so they interact!
        // Just the logo and nav maybe?
        // Physics.createBodyForElement($('#brand-logo')[0]); 
        // Actually, keeping UI fixed is better for usability, but "Antigravity" usually drops everything.
        // Let's keep UI fixed for usability as per prompt "include all necessary link channels".
    }

    // Trigger on button click
    $('#gravity-toggle').on('click', function() {
        if(!physicsStarted) {
            startChaos();
            $(this).html('<i class="fa-solid fa-magnet"></i> Toggle Zero-G');
        } else {
            const isOn = Physics.toggleGravity();
            $(this).html(isOn ? '<i class="fa-solid fa-magnet"></i> Zero-G' : '<i class="fa-solid fa-magnet"></i> Gravity On');
        }
    });
    
    // Trigger on Spacebar
    $(document).on('keydown', function(e) {
        if(e.code === 'Space') {
            if(!physicsStarted) startChaos();
            else Physics.toggleGravity();
        }
    });

    // Auto-start after 1 second for effect, or wait? 
    // Prompt says "emulate antigravity.google". That site usually waits for interaction.
    // But let's auto-start to show off the effect if the user doesn't click.
    // Actually, let's wait for click to preserve the "clean design" initially.
    
    console.log("Ready. Click Toggle Gravity to start.");
});
