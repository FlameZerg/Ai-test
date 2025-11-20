const categories = ['Tech', 'Fashion', 'Home', 'Automotive', 'Beauty', 'Sports'];
const techNames = ['Quantum Headset', 'Holo-Watch', 'Neural Interface', 'Levitating Speaker', 'Smart Lens', 'Drone Scout', 'Cyber Deck', 'Nano Bot', 'Fusion Core', 'Plasma Display'];
const fashionNames = ['Neon Jacket', 'Gravity Boots', 'Smart Fabric Tee', 'LED Sneakers', 'Haptic Gloves', 'Chameleon Scarf', 'Solar Backpack', 'Bio-Synth Dress', 'AR Glasses', 'Thermal Suit'];
const homeNames = ['Smart Mirror', 'Levitating Lamp', 'Atmosphere Generator', 'Robot Chef', 'Holo-Projector', 'Smart Garden', 'Energy Pod', 'Voice Assistant Orb', 'Security Drone', 'Sleep Pod'];

const products = [];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProducts() {
    for (let i = 1; i <= 120; i++) {
        const category = categories[getRandomInt(0, categories.length - 1)];
        let name = '';

        if (category === 'Tech') {
            name = techNames[getRandomInt(0, techNames.length - 1)];
        } else if (category === 'Fashion') {
            name = fashionNames[getRandomInt(0, fashionNames.length - 1)];
        } else if (category === 'Home') {
            name = homeNames[getRandomInt(0, homeNames.length - 1)];
        } else {
            name = `${category} Item ${getRandomInt(100, 999)}`;
        }

        // Add a variant suffix to make names unique
        name += ` ${String.fromCharCode(65 + getRandomInt(0, 25))}-${getRandomInt(10, 99)}`;

        // Generate a colorful placeholder image using a service or canvas (using a reliable placeholder service here for simplicity)
        // Using a dark theme placeholder to match the site
        const hue = getRandomInt(0, 360);
        const image = `https://placehold.co/400x400/${getRandomInt(10, 30)}${getRandomInt(10, 30)}${getRandomInt(10, 30)}/${hue < 180 ? '00f3ff' : 'bc13fe'}?text=${encodeURIComponent(name)}`;

        products.push({
            id: i,
            name: name,
            category: category.toLowerCase(),
            price: getRandomInt(50, 5000),
            image: image,
            rating: (Math.random() * 2 + 3).toFixed(1) // 3.0 to 5.0
        });
    }
}

generateProducts();
console.log(`Generated ${products.length} products.`);
