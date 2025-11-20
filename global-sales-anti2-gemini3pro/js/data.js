const products = [];

const categories = ['Tech', 'Lifestyle', 'Home', 'Fashion'];
const adjectives = ['Premium', 'Smart', 'Ultra', 'Pro', 'Sleek', 'Modern', 'Future', 'Eco'];
const nouns = ['Watch', 'Headphones', 'Speaker', 'Lamp', 'Backpack', 'Glasses', 'Phone', 'Camera', 'Drone', 'Console'];

function generateProducts() {
    for (let i = 1; i <= 120; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];

        // Using Unsplash source for high quality random images
        // Adding a random sig to ensure different images
        const image = `https://images.unsplash.com/photo-${getRandomPhotoId(category)}?auto=format&fit=crop&w=500&q=80`;

        products.push({
            id: i,
            name: `${adj} ${noun} ${i}`,
            category: category,
            price: Math.floor(Math.random() * 900) + 50,
            image: image,
            description: `Experience the ${adj.toLowerCase()} design of our new ${noun.toLowerCase()}.`
        });
    }
}

function getRandomPhotoId(category) {
    // A small set of high quality Unsplash photo IDs to rotate through to ensure they load
    const ids = {
        'Tech': ['1519389950476-29596e7a2a9e', '1550009158-9ebf6d56b31c', '1525547719571-a2d4ac8945e2', '1505740420928-5e560c06d30e'],
        'Lifestyle': ['1523275335684-37898b6baf30', '1526170375885-4d8ecf77b99f', '1542291026-7eeced64731e', '1503341455253-b2e72333dbdb'],
        'Home': ['1513694203232-719a280e022f', '1583847661451-8c7104772976', '1540932205-588039d0091e', '1505693516391-32a4166c6377'],
        'Fashion': ['1515886657613-9f3515b0c78f', '1529139574466-a30230d33f47', '1483985988355-763728e1935b', '1539109136881-3be0616acf4b']
    };

    const categoryIds = ids[category] || ids['Tech'];
    return categoryIds[Math.floor(Math.random() * categoryIds.length)];
}

generateProducts();
