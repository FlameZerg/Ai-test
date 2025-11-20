// DOM Elements
const productGrid = document.getElementById('product-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initial Render
function renderProducts(filter = 'all') {
    productGrid.innerHTML = '';

    const filteredProducts = filter === 'all'
        ? products
        : products.filter(p => p.category === filter);

    // Animate items in (staggered)
    filteredProducts.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'glass-card rounded-xl overflow-hidden group relative opacity-0 translate-y-10';
        productCard.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.05}s`;

        productCard.innerHTML = `
            <div class="product-image-container h-64 w-full bg-gray-900 relative">
                <img src="${product.image}" alt="${product.name}" class="product-img w-full h-full object-cover">
                <div class="absolute top-2 right-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-xs text-neon-blue border border-neon-blue/30">
                    ${product.category.toUpperCase()}
                </div>
            </div>
            <div class="p-6 relative z-10">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-lg font-bold text-white group-hover:text-neon-blue transition-colors truncate pr-2">${product.name}</h3>
                    <span class="text-neon-purple font-mono font-bold">$${product.price}</span>
                </div>
                <div class="flex justify-between items-center mt-4">
                    <div class="flex text-yellow-400 text-xs">
                        ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                        <span class="text-gray-500 ml-1">(${product.rating})</span>
                    </div>
                    <button class="text-sm border border-white/20 hover:bg-neon-blue hover:text-black hover:border-neon-blue px-3 py-1 rounded-full transition-all duration-300">
                        Add to Cart
                    </button>
                </div>
            </div>
            <!-- Hover Glow Effect -->
            <div class="absolute -inset-1 bg-gradient-to-r from-neon-blue to-neon-purple opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"></div>
        `;

        productGrid.appendChild(productCard);
    });
}

// Filter Logic
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => {
            b.classList.remove('active', 'bg-white', 'text-black');
            b.classList.add('text-white');
        });

        // Add active class to clicked
        btn.classList.add('active', 'bg-white', 'text-black');
        btn.classList.remove('text-white');

        const filter = btn.getAttribute('data-filter');
        renderProducts(filter);
    });
});

// Add keyframes for fade in
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
