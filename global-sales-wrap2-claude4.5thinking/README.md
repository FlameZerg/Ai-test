# GlobalSales - Premium Product Marketplace

A stunning, fully-featured static website for global product sales with advanced visual effects, 3D animations, and modern design.

## 🌟 Features

### Design & Visual Effects
- **Custom Cursor**: Animated cursor with smooth following effect and hover interactions
- **3D Background**: Three.js powered 3D particle system with interactive torus knot
- **Particle Effects**: Dynamic particle animations using Particles.js
- **Glassmorphism**: Modern frosted glass effect throughout the UI
- **Gradient Animations**: Smooth, flowing gradient text and backgrounds
- **Advanced Animations**: GSAP-powered scroll-triggered animations
- **Mouse-Following Effects**: Parallax effects that respond to mouse movement
- **Floating Elements**: Smooth floating animations inspired by Google Antigravity
- **Responsive Design**: Fully responsive across all devices

### Pages & Content
1. **Home Page (index.html)**
   - Hero section with animated text
   - Featured categories (6 categories)
   - Trending products preview
   - Features section
   - Newsletter subscription
   - Social media links

2. **Products Page (products.html)**
   - **105+ High-Quality Products** across 4 categories:
     - Electronics (26 products)
     - Fashion (25 products)
     - Home & Living (26 products)
     - Sports & Fitness (28 products)
   - Live search functionality
   - Category filtering
   - Product count display
   - Beautiful product cards with hover effects

3. **About Page (about.html)**
   - Company mission and vision
   - Core values
   - Statistics section
   - Team member profiles
   - Social media links

4. **Contact Page (contact.html)**
   - Interactive contact form
   - Multiple contact methods
   - Business hours
   - Location map placeholder
   - Direct email/phone links

### Technical Features
- **No Backend Required**: Pure HTML, CSS, and JavaScript
- **No Build Process**: No npm, no Node.js, no compilation needed
- **CDN Libraries**: All libraries loaded via CDN for easy deployment
- **Modern CSS**: Custom properties, backdrop-filter, grid, flexbox
- **Vanilla JavaScript**: No framework dependencies
- **High Performance**: Optimized animations and lazy loading

## 📦 Technologies Used

### Core Technologies
- HTML5
- CSS3
- JavaScript (ES6+)

### External Libraries (CDN)
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [jQuery](https://jquery.com/) - DOM manipulation
- [Three.js](https://threejs.org/) - 3D graphics library
- [GSAP](https://greensock.com/gsap/) - Animation library
- [Particles.js](https://vincentgarreau.com/particles.js/) - Particle effects
- [Font Awesome](https://fontawesome.com/) - Icon library
- [Google Fonts](https://fonts.google.com/) - Typography (Poppins, Playfair Display)

### Image Sources
- [Unsplash](https://unsplash.com/) - High-quality product images

## 🚀 Getting Started

### Installation
No installation required! Simply download or clone the repository:

```bash
git clone https://github.com/yourusername/globalsales.git
cd globalsales
```

### Running the Website
1. **Option 1: Double-click** `index.html` to open in your default browser
2. **Option 2: Use a local server** (recommended for best performance)
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (if you have it)
   npx http-server
   ```
   Then visit `http://localhost:8000`

## 📁 File Structure

```
globalsales/
├── index.html          # Home page
├── products.html       # Products catalog
├── about.html          # About us page
├── contact.html        # Contact page
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🎨 Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
    --dark-bg: #0f172a;
    --light-text: #f1f5f9;
}
```

### Products
Modify the `productsData` array in `script.js` to add/edit products:
```javascript
const productsData = [
    {
        id: 1,
        name: "Product Name",
        category: "Category",
        price: 99.99,
        rating: 4.5,
        image: "https://example.com/image.jpg"
    },
    // Add more products...
];
```

### Animations
Adjust animation speeds and effects in `styles.css` and `script.js`:
- CSS animations: Search for `@keyframes` in styles.css
- GSAP animations: Look for `gsap.from()` and `gsap.to()` in script.js
- Three.js settings: Modify the `init3DBackground()` function

## 🌐 Browser Compatibility

- ✅ Chrome (90+)
- ✅ Firefox (88+)
- ✅ Safari (14+)
- ✅ Edge (90+)
- ⚠️ IE11 (not supported - requires modern browser features)

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎯 Performance Optimization

- Lazy loading for product images
- CSS-based animations (hardware accelerated)
- Optimized Three.js particle count
- Debounced scroll and mouse events
- Minimal DOM manipulation

## 🔧 Troubleshooting

### Custom Cursor Not Working
- Make sure JavaScript is enabled
- Check browser console for errors
- Some browsers may have cursor restrictions

### 3D Effects Not Showing
- Ensure WebGL is supported and enabled
- Check browser compatibility
- Graphics drivers may need updating

### Products Not Loading
- Check browser console for errors
- Verify `script.js` is loaded correctly
- Ensure internet connection for CDN libraries

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email support@globalsales.com or visit our contact page.

## 🙏 Acknowledgments

- Design inspiration from Google Antigravity
- Images from Unsplash photographers
- Icon library from Font Awesome
- All open-source library contributors

## 🎉 Features Highlights

### Advanced Visual Effects
- ✨ Custom animated cursor with smooth following
- 🌌 3D particle background with 1500+ animated particles
- 🎨 Dynamic gradient animations
- 💎 Glassmorphism UI elements
- 🌊 Smooth scroll-triggered animations
- 🎭 Parallax mouse-following effects
- 📱 Fully responsive design

### Product Catalog
- 🛍️ 105+ premium products
- 🔍 Real-time search functionality
- 🏷️ Category filtering
- ⭐ Product ratings
- 💳 Add to cart functionality
- 📦 4 major categories

### User Experience
- 🎯 Intuitive navigation
- 📧 Working contact form
- 📱 Mobile-friendly interface
- ⚡ Fast loading times
- 🎪 Smooth transitions
- 🎨 Consistent design language

---

**Built with ❤️ for the modern web**

*Last Updated: 2024*
