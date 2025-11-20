// ==================== PRODUCT DATA ====================
const productsData = [
    // Electronics Category (25 products)
    { id: 1, name: "Wireless Headphones Pro", category: "Electronics", price: 299.99, rating: 4.8, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop" },
    { id: 2, name: "Smart Watch Ultra", category: "Electronics", price: 499.99, rating: 4.9, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop" },
    { id: 3, name: "4K Drone Camera", category: "Electronics", price: 899.99, rating: 4.7, image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=800&fit=crop" },
    { id: 4, name: "Gaming Laptop", category: "Electronics", price: 1899.99, rating: 4.9, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=800&fit=crop" },
    { id: 5, name: "Bluetooth Speaker", category: "Electronics", price: 149.99, rating: 4.6, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop" },
    { id: 6, name: "DSLR Camera Pro", category: "Electronics", price: 1299.99, rating: 4.8, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop" },
    { id: 7, name: "Wireless Mouse", category: "Electronics", price: 79.99, rating: 4.5, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop" },
    { id: 8, name: "Mechanical Keyboard", category: "Electronics", price: 179.99, rating: 4.7, image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&h=800&fit=crop" },
    { id: 9, name: "USB-C Hub", category: "Electronics", price: 69.99, rating: 4.4, image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&h=800&fit=crop" },
    { id: 10, name: "Portable SSD 1TB", category: "Electronics", price: 189.99, rating: 4.8, image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&h=800&fit=crop" },
    { id: 11, name: "Tablet Pro 12\"", category: "Electronics", price: 999.99, rating: 4.7, image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&h=800&fit=crop" },
    { id: 12, name: "Smart Home Hub", category: "Electronics", price: 129.99, rating: 4.6, image: "https://images.unsplash.com/photo-1558089687-e5e5e7e4e7ea?w=800&h=800&fit=crop" },
    { id: 13, name: "VR Headset", category: "Electronics", price: 599.99, rating: 4.8, image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&h=800&fit=crop" },
    { id: 14, name: "Action Camera 4K", category: "Electronics", price: 349.99, rating: 4.7, image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&h=800&fit=crop" },
    { id: 15, name: "E-Reader Pro", category: "Electronics", price: 249.99, rating: 4.6, image: "https://images.unsplash.com/photo-1592239107295-62a378c715e3?w=800&h=800&fit=crop" },
    { id: 16, name: "Noise Cancelling Buds", category: "Electronics", price: 199.99, rating: 4.8, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=800&fit=crop" },
    { id: 17, name: "Smart Display 10\"", category: "Electronics", price: 229.99, rating: 4.5, image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&h=800&fit=crop" },
    { id: 18, name: "Power Bank 30000mAh", category: "Electronics", price: 89.99, rating: 4.7, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop" },
    { id: 19, name: "USB Microphone", category: "Electronics", price: 159.99, rating: 4.6, image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&h=800&fit=crop" },
    { id: 20, name: "Webcam 4K", category: "Electronics", price: 129.99, rating: 4.5, image: "https://images.unsplash.com/photo-1585125090423-6aeb9fa6687d?w=800&h=800&fit=crop" },
    { id: 21, name: "Gaming Mouse RGB", category: "Electronics", price: 99.99, rating: 4.7, image: "https://images.unsplash.com/photo-1613141411244-0ff0d7f83f17?w=800&h=800&fit=crop" },
    { id: 22, name: "Monitor 27\" 4K", category: "Electronics", price: 549.99, rating: 4.8, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop" },
    { id: 23, name: "Graphics Tablet", category: "Electronics", price: 279.99, rating: 4.6, image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&h=800&fit=crop" },
    { id: 24, name: "Smart Light Bulbs (4pk)", category: "Electronics", price: 59.99, rating: 4.5, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop" },
    { id: 25, name: "Wireless Charger", category: "Electronics", price: 49.99, rating: 4.6, image: "https://images.unsplash.com/photo-1591290619762-5e4a160b2df0?w=800&h=800&fit=crop" },

    // Fashion Category (25 products)
    { id: 26, name: "Designer Sunglasses", category: "Fashion", price: 199.99, rating: 4.8, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=800&fit=crop" },
    { id: 27, name: "Leather Jacket", category: "Fashion", price: 349.99, rating: 4.9, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop" },
    { id: 28, name: "Casual Sneakers", category: "Fashion", price: 129.99, rating: 4.7, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop" },
    { id: 29, name: "Denim Jeans", category: "Fashion", price: 89.99, rating: 4.6, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=800&fit=crop" },
    { id: 30, name: "Designer Backpack", category: "Fashion", price: 179.99, rating: 4.8, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop" },
    { id: 31, name: "Luxury Watch", category: "Fashion", price: 899.99, rating: 4.9, image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&h=800&fit=crop" },
    { id: 32, name: "Winter Coat", category: "Fashion", price: 299.99, rating: 4.7, image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&h=800&fit=crop" },
    { id: 33, name: "Running Shoes", category: "Fashion", price: 149.99, rating: 4.8, image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&h=800&fit=crop" },
    { id: 34, name: "Wool Scarf", category: "Fashion", price: 49.99, rating: 4.5, image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&h=800&fit=crop" },
    { id: 35, name: "Leather Belt", category: "Fashion", price: 69.99, rating: 4.6, image: "https://images.unsplash.com/photo-1624222247344-550fb60583e2?w=800&h=800&fit=crop" },
    { id: 36, name: "Summer Dress", category: "Fashion", price: 119.99, rating: 4.7, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=800&fit=crop" },
    { id: 37, name: "Formal Suit", category: "Fashion", price: 599.99, rating: 4.8, image: "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=800&h=800&fit=crop" },
    { id: 38, name: "Yoga Pants", category: "Fashion", price: 79.99, rating: 4.6, image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=800&fit=crop" },
    { id: 39, name: "Crossbody Bag", category: "Fashion", price: 149.99, rating: 4.7, image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop" },
    { id: 40, name: "Baseball Cap", category: "Fashion", price: 34.99, rating: 4.5, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop" },
    { id: 41, name: "Cardigan Sweater", category: "Fashion", price: 89.99, rating: 4.6, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=800&fit=crop" },
    { id: 42, name: "Chelsea Boots", category: "Fashion", price: 199.99, rating: 4.8, image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&h=800&fit=crop" },
    { id: 43, name: "Tote Bag", category: "Fashion", price: 59.99, rating: 4.5, image: "https://images.unsplash.com/photo-1590739243734-5f39b885fc3d?w=800&h=800&fit=crop" },
    { id: 44, name: "Polo Shirt", category: "Fashion", price: 69.99, rating: 4.6, image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&h=800&fit=crop" },
    { id: 45, name: "Trench Coat", category: "Fashion", price: 349.99, rating: 4.8, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop" },
    { id: 46, name: "Ankle Boots", category: "Fashion", price: 159.99, rating: 4.7, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=800&fit=crop" },
    { id: 47, name: "Beanie Hat", category: "Fashion", price: 29.99, rating: 4.5, image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&h=800&fit=crop" },
    { id: 48, name: "Blazer", category: "Fashion", price: 249.99, rating: 4.7, image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=800&fit=crop" },
    { id: 49, name: "Handbag", category: "Fashion", price: 299.99, rating: 4.8, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=800&fit=crop" },
    { id: 50, name: "Loafers", category: "Fashion", price: 139.99, rating: 4.6, image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&h=800&fit=crop" },

    // Home & Living Category (25 products)
    { id: 51, name: "Modern Sofa", category: "Home", price: 1299.99, rating: 4.8, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop" },
    { id: 52, name: "Coffee Table", category: "Home", price: 349.99, rating: 4.7, image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&h=800&fit=crop" },
    { id: 53, name: "Table Lamp", category: "Home", price: 89.99, rating: 4.6, image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=800&fit=crop" },
    { id: 54, name: "Throw Pillows (4pk)", category: "Home", price: 59.99, rating: 4.5, image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&h=800&fit=crop" },
    { id: 55, name: "Wall Art Canvas", category: "Home", price: 149.99, rating: 4.7, image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=800&fit=crop" },
    { id: 56, name: "Dining Table Set", category: "Home", price: 899.99, rating: 4.8, image: "https://images.unsplash.com/photo-1617098900591-3f90928e8c54?w=800&h=800&fit=crop" },
    { id: 57, name: "Area Rug 8x10", category: "Home", price: 299.99, rating: 4.6, image: "https://images.unsplash.com/photo-1600166898405-da9535204f3d?w=800&h=800&fit=crop" },
    { id: 58, name: "Bed Frame Queen", category: "Home", price: 599.99, rating: 4.7, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=800&fit=crop" },
    { id: 59, name: "Curtains Set", category: "Home", price: 79.99, rating: 4.5, image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&h=800&fit=crop" },
    { id: 60, name: "Floor Mirror", category: "Home", price: 199.99, rating: 4.7, image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&h=800&fit=crop" },
    { id: 61, name: "Bookshelf", category: "Home", price: 249.99, rating: 4.6, image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&h=800&fit=crop" },
    { id: 62, name: "Desk Chair Ergonomic", category: "Home", price: 349.99, rating: 4.8, image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&h=800&fit=crop" },
    { id: 63, name: "Standing Desk", category: "Home", price: 499.99, rating: 4.7, image: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=800&h=800&fit=crop" },
    { id: 64, name: "Pendant Light", category: "Home", price: 129.99, rating: 4.6, image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&h=800&fit=crop" },
    { id: 65, name: "Storage Ottoman", category: "Home", price: 159.99, rating: 4.5, image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&h=800&fit=crop" },
    { id: 66, name: "Decorative Vase", category: "Home", price: 69.99, rating: 4.6, image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&h=800&fit=crop" },
    { id: 67, name: "Bedding Set Queen", category: "Home", price: 149.99, rating: 4.7, image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=800&fit=crop" },
    { id: 68, name: "Wall Clock Modern", category: "Home", price: 79.99, rating: 4.5, image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&h=800&fit=crop" },
    { id: 69, name: "Throw Blanket", category: "Home", price: 89.99, rating: 4.6, image: "https://images.unsplash.com/photo-1621905236439-c014bd4c12c6?w=800&h=800&fit=crop" },
    { id: 70, name: "Plant Pot Set", category: "Home", price: 49.99, rating: 4.5, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=800&fit=crop" },
    { id: 71, name: "Kitchen Knife Set", category: "Home", price: 179.99, rating: 4.8, image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&h=800&fit=crop" },
    { id: 72, name: "Cookware Set 10pc", category: "Home", price: 299.99, rating: 4.7, image: "https://images.unsplash.com/photo-1584990347498-7e37b3a0d92e?w=800&h=800&fit=crop" },
    { id: 73, name: "Towel Set 6pc", category: "Home", price: 69.99, rating: 4.6, image: "https://images.unsplash.com/photo-1616694547935-a9cd1b2f52e9?w=800&h=800&fit=crop" },
    { id: 74, name: "Laundry Basket", category: "Home", price: 39.99, rating: 4.5, image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&h=800&fit=crop" },
    { id: 75, name: "Storage Bins 3pk", category: "Home", price: 44.99, rating: 4.4, image: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=800&h=800&fit=crop" },

    // Sports & Fitness Category (25 products)
    { id: 76, name: "Yoga Mat Premium", category: "Sports", price: 49.99, rating: 4.7, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop" },
    { id: 77, name: "Dumbbell Set 20lb", category: "Sports", price: 99.99, rating: 4.8, image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop" },
    { id: 78, name: "Resistance Bands Set", category: "Sports", price: 29.99, rating: 4.6, image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop" },
    { id: 79, name: "Exercise Bike", category: "Sports", price: 599.99, rating: 4.7, image: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800&h=800&fit=crop" },
    { id: 80, name: "Treadmill Foldable", category: "Sports", price: 899.99, rating: 4.8, image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&h=800&fit=crop" },
    { id: 81, name: "Jump Rope", category: "Sports", price: 19.99, rating: 4.5, image: "https://images.unsplash.com/photo-1601972599720-7fc3c6d1a07f?w=800&h=800&fit=crop" },
    { id: 82, name: "Foam Roller", category: "Sports", price: 34.99, rating: 4.6, image: "https://images.unsplash.com/photo-1611016186353-9af58c69a533?w=800&h=800&fit=crop" },
    { id: 83, name: "Kettlebell 35lb", category: "Sports", price: 79.99, rating: 4.7, image: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=800&h=800&fit=crop" },
    { id: 84, name: "Pull-Up Bar", category: "Sports", price: 39.99, rating: 4.5, image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=800&fit=crop" },
    { id: 85, name: "Ab Roller Wheel", category: "Sports", price: 24.99, rating: 4.6, image: "https://images.unsplash.com/photo-1621611068690-3dfed2c46e5b?w=800&h=800&fit=crop" },
    { id: 86, name: "Gym Bag", category: "Sports", price: 59.99, rating: 4.5, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop" },
    { id: 87, name: "Water Bottle 32oz", category: "Sports", price: 24.99, rating: 4.6, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop" },
    { id: 88, name: "Boxing Gloves", category: "Sports", price: 69.99, rating: 4.7, image: "https://images.unsplash.com/photo-1532059361517-2e28b0ac8c14?w=800&h=800&fit=crop" },
    { id: 89, name: "Tennis Racket", category: "Sports", price: 149.99, rating: 4.8, image: "https://images.unsplash.com/photo-1617083279283-1e98a9debc30?w=800&h=800&fit=crop" },
    { id: 90, name: "Basketball", category: "Sports", price: 39.99, rating: 4.6, image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=800&fit=crop" },
    { id: 91, name: "Soccer Ball", category: "Sports", price: 34.99, rating: 4.5, image: "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=800&h=800&fit=crop" },
    { id: 92, name: "Bike Helmet", category: "Sports", price: 79.99, rating: 4.7, image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800&h=800&fit=crop" },
    { id: 93, name: "Swimming Goggles", category: "Sports", price: 29.99, rating: 4.6, image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=800&h=800&fit=crop" },
    { id: 94, name: "Fitness Tracker", category: "Sports", price: 99.99, rating: 4.7, image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&h=800&fit=crop" },
    { id: 95, name: "Camping Tent 4P", category: "Sports", price: 249.99, rating: 4.8, image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=800&fit=crop" },
    { id: 96, name: "Sleeping Bag", category: "Sports", price: 89.99, rating: 4.6, image: "https://images.unsplash.com/photo-1573160181304-5ea74f09a0e7?w=800&h=800&fit=crop" },
    { id: 97, name: "Hiking Backpack 40L", category: "Sports", price: 129.99, rating: 4.7, image: "https://images.unsplash.com/photo-1622260614153-03223fb72052?w=800&h=800&fit=crop" },
    { id: 98, name: "Fishing Rod", category: "Sports", price: 119.99, rating: 4.5, image: "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=800&h=800&fit=crop" },
    { id: 99, name: "Skateboard Pro", category: "Sports", price: 149.99, rating: 4.8, image: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=800&h=800&fit=crop" },
    { id: 100, name: "Golf Club Set", category: "Sports", price: 799.99, rating: 4.9, image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=800&fit=crop" },

    // Additional Products for 100+ total
    { id: 101, name: "Electric Scooter", category: "Electronics", price: 699.99, rating: 4.7, image: "https://images.unsplash.com/photo-1588519030892-2eecffc9a33a?w=800&h=800&fit=crop" },
    { id: 102, name: "Air Purifier", category: "Home", price: 249.99, rating: 4.6, image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&h=800&fit=crop" },
    { id: 103, name: "Coffee Maker", category: "Home", price: 179.99, rating: 4.7, image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&h=800&fit=crop" },
    { id: 104, name: "Blender", category: "Home", price: 99.99, rating: 4.6, image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&h=800&fit=crop" },
    { id: 105, name: "Vacuum Robot", category: "Home", price: 399.99, rating: 4.8, image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&h=800&fit=crop" }
];

// ==================== CUSTOM CURSOR ====================
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth cursor follow
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        if (cursor) {
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
        }
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .product-card, .category-card, .feature-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '60px';
            cursor.style.height = '60px';
            cursor.style.borderColor = '#ec4899';
            cursor.style.background = 'radial-gradient(circle, rgba(236, 72, 153, 0.2), transparent)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.borderColor = 'rgba(99, 102, 241, 0.8)';
            cursor.style.background = 'radial-gradient(circle, rgba(99, 102, 241, 0.1), transparent)';
        });
    });
});

// ==================== THREE.JS 3D BACKGROUND ====================
function init3DBackground() {
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: true,
        antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
        
        // Color gradient from blue to purple to pink
        const colorIndex = Math.floor(i / 3);
        const t = colorIndex / particlesCount;
        colorsArray[i * 3] = 0.4 + t * 0.6; // R
        colorsArray[i * 3 + 1] = 0.2 + Math.sin(t * Math.PI) * 0.6; // G
        colorsArray[i * 3 + 2] = 0.8 + t * 0.2; // B
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Create torus knot
    const torusGeometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const torusMaterial = new THREE.MeshNormalMaterial({
        transparent: true,
        opacity: 0.3,
        wireframe: true
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);
    
    camera.position.z = 30;
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        const time = Date.now() * 0.00005;
        
        // Rotate particles
        particlesMesh.rotation.y = time * 0.5;
        particlesMesh.rotation.x = time * 0.3;
        
        // Rotate torus
        torus.rotation.x = time * 2;
        torus.rotation.y = time * 3;
        
        // Mouse interaction
        camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        
        // Animate particles
        const positions = particlesGeometry.attributes.position.array;
        for(let i = 0; i < positions.length; i += 3) {
            positions[i + 1] = Math.sin(time * 2 + positions[i]) * 2;
        }
        particlesGeometry.attributes.position.needsUpdate = true;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ==================== PARTICLES.JS ====================
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: ['#6366f1', '#8b5cf6', '#ec4899'] },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#6366f1',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    repulse: { distance: 100, duration: 0.4 },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }
}

// ==================== NAVIGATION ====================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==================== LOAD PRODUCTS ====================
function loadProducts(products = productsData, limit = 12) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    const displayProducts = products.slice(0, limit);
    
    displayProducts.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animationDelay = `${index * 0.1}s`;
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">$${product.price}</div>
                <div class="product-rating">
                    <div class="stars">
                        ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span>(${product.rating})</span>
                </div>
                <button class="product-btn">Add to Cart</button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Add hover effects to new products
    setTimeout(() => {
        const hoverElements = document.querySelectorAll('.product-card');
        const cursor = document.querySelector('.custom-cursor');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (cursor) {
                    cursor.style.width = '60px';
                    cursor.style.height = '60px';
                    cursor.style.borderColor = '#ec4899';
                }
            });
            
            el.addEventListener('mouseleave', () => {
                if (cursor) {
                    cursor.style.width = '40px';
                    cursor.style.height = '40px';
                    cursor.style.borderColor = 'rgba(99, 102, 241, 0.8)';
                }
            });
        });
    }, 100);
}

// ==================== GSAP SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate section titles
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        });
        
        // Animate category cards
        gsap.utils.toArray('.category-card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 100,
                opacity: 0,
                rotation: 10,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'back.out(1.7)'
            });
        });
        
        // Animate feature cards
        gsap.utils.toArray('.feature-card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                scale: 0.5,
                opacity: 0,
                duration: 0.6,
                delay: index * 0.15,
                ease: 'elastic.out(1, 0.5)'
            });
        });
        
        // Parallax effects
        gsap.utils.toArray('.hero-content').forEach(element => {
            gsap.to(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1
                },
                y: 150,
                opacity: 0.5,
                ease: 'none'
            });
        });
    }
}

// ==================== NEWSLETTER FORM ====================
document.querySelector('.newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    alert(`Thank you for subscribing with: ${email}`);
    e.target.reset();
});

// ==================== PARALLAX MOUSE EFFECT ====================
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) / 50;
    const moveY = (e.clientY - window.innerHeight / 2) / 50;
    
    document.querySelectorAll('.category-card').forEach(card => {
        const speed = card.dataset.speed || 1;
        card.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
    });
});

// ==================== INITIALIZE ====================
window.addEventListener('load', () => {
    init3DBackground();
    initParticles();
    loadProducts();
    initScrollAnimations();
    
    // Add fade-in effect to body
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Export for use in other pages
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { productsData, loadProducts };
}
