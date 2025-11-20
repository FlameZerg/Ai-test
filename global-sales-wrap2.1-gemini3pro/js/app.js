
$(document).ready(function() {
    const container = $('#items-container');
    // 100 items
    const itemCount = 100;
    const keywords = ['watch', 'shoe', 'headphone', 'camera', 'glasses', 'phone', 'laptop', 'bag', 'perfume', 'sneaker', 'chair', 'lamp', 'drone', 'keyboard'];
    const adjectives = ['Premium', 'Luxury', 'Smart', 'Wireless', 'Vintage', 'Modern', 'Sleek', 'Pro', 'Ultra', 'Limited', 'Neon', 'Cyber'];

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Grid Layout Calculation
    // We want to spread them out initially so they don't explode immediately (unless we want them to)
    // A grid is good.
    const cols = 10;
    const cardWidth = 140;
    const cardHeight = 200;
    const gap = 30;
    const startX = 50;
    const startY = 150;

    for (let i = 0; i < itemCount; i++) {
        const keyword = keywords[getRandomInt(0, keywords.length - 1)];
        const adjective = adjectives[getRandomInt(0, adjectives.length - 1)];
        const price = getRandomInt(50, 2000);
        
        // Grid position
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = startX + col * (cardWidth + gap);
        const y = startY + row * (cardHeight + gap);

        // Image URL - using loremflickr with lock to ensure consistency and variety
        const imgUrl = `https://loremflickr.com/300/300/${keyword}?lock=${i}`;

        const card = $(`
            <div class="product-card rounded-xl bg-transparent text-center group" 
                 id="card-${i}"
                 data-id="${i}"
                 style="width: ${cardWidth}px; height: ${cardHeight}px; top: ${y}px; left: ${x}px;">
                
                <div class="card-content glass-card w-full h-full rounded-xl p-3 flex flex-col items-center justify-between transition-transform duration-100 ease-out">
                    <div class="w-full h-28 overflow-hidden rounded-lg mb-2 relative bg-gray-800">
                         <!-- Loading placeholder -->
                         <div class="absolute inset-0 flex items-center justify-center text-gray-600">
                            <i class="fa-solid fa-image animate-pulse"></i>
                         </div>
                         <img src="${imgUrl}" 
                              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 relative z-10" 
                              alt="${keyword}" 
                              onload="this.parentElement.querySelector('div').style.display='none'"
                              loading="lazy">
                         
                         <div class="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                            <span class="text-[10px] font-bold uppercase tracking-wider text-white">Quick View</span>
                         </div>
                    </div>
                    
                    <div class="w-full">
                        <h3 class="text-xs font-bold truncate w-full text-gray-200 group-hover:text-white transition-colors">${adjective} ${keyword}</h3>
                        <p class="text-xs text-pink-400 font-mono mt-1">$${price}</p>
                    </div>

                    <button class="mt-2 w-full py-1.5 bg-white/5 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 rounded-lg text-[10px] font-bold transition-all duration-300 border border-white/10 hover:border-transparent shadow-lg hover:shadow-pink-500/25 flex items-center justify-center space-x-1 relative z-30">
                        <i class="fa-solid fa-cart-plus"></i>
                        <span>Add</span>
                    </button>
                </div>
            </div>
        `);

        container.append(card);
    }

    console.log(`Generated ${itemCount} products`);

    // Small delay to ensure DOM is ready for physics
    setTimeout(() => {
        $(document).trigger('itemsReady');
    }, 100);
});
