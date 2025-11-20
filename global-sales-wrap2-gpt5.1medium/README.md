# GlobalFlow Commerce – Static Sales Website

**A fully static, high-fidelity global product sales website with stunning visual effects and antigravity-inspired interactions.**

---

## 🌟 Features

### Visual & Interaction Design
- **Custom cursor** with smooth follow & hover states  
- **Magnetic buttons** that respond to pointer movement  
- **3D starfield background** using Three.js with mouse-driven camera movement  
- **Hero tilt & parallax effects** inspired by Google Antigravity  
- **Floating layers** that respond dynamically to cursor position  
- **Scroll-triggered animations** powered by GSAP ScrollTrigger  
- **Image gallery** with 120+ high-quality placeholder images and hover parallax  
- **Responsive design** optimized for desktop, tablet, and mobile  

### Sections
1. **Hero** – Immersive product introduction with animated stats and floating cards  
2. **Categories** – Three product categories with scroll-triggered fade-ins  
3. **Featured Products** – Product showcase with radial gradient media placeholders  
4. **Visual Gallery** – Massive grid of 120+ images with mouse-following effects  
5. **Trust / Stats** – Company metrics and operational highlights  
6. **Contact** – Multi-channel contact options (Sales, Support, Partnerships, Careers) with social media links and a demo request form  
7. **Footer** – Copyright and legal links  

---

## 📁 Project Structure

```
global-sales-wrap2-gpt5.1medium/
├── index.html         # Main HTML structure
├── styles.css         # Core CSS with custom cursor, cards, animations
├── script.js          # JavaScript for interactions (cursor, tilt, 3D, gallery)
├── test-console.html  # Automated console error & structure checker
└── README.md          # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Modern web browser** (Chrome, Firefox, Edge, Safari)
- **No backend / npm required** – all dependencies loaded via CDN

### Usage
1. Open **`index.html`** in any browser:
   ```bash
   # On Windows (PowerShell or CMD)
   start index.html

   # On macOS
   open index.html

   # On Linux
   xdg-open index.html
   ```

2. **Optional:** Run the automated test suite by opening `test-console.html` in a browser. This will:
   - Load `index.html` in an iframe  
   - Hook into the console to detect errors  
   - Verify that all critical elements (cursor, canvas, gallery) are present  
   - Display a summary report after ~4 seconds  

---

## 🎨 Libraries & Dependencies

All libraries are loaded via CDN (no build step required):

- **[Tailwind CSS](https://tailwindcss.com/)** (v3) – Utility-first CSS framework  
- **[jQuery](https://jquery.com/)** (v3.7.1) – DOM utilities  
- **[GSAP](https://greensock.com/gsap/)** (v3.12.2) – Animation library  
- **[ScrollTrigger](https://greensock.com/scrolltrigger/)** (GSAP plugin) – Scroll-based animations  
- **[Three.js](https://threejs.org/)** (v0.162.0) – 3D graphics library  
- **[Google Fonts](https://fonts.google.com/)** – Inter & Space Grotesk  

Image placeholders provided by **[picsum.photos](https://picsum.photos/)** with seeded URLs for consistency.

---

## ✅ Quality Checks

### Manual Validation
- [x] HTML syntax verified (valid HTML5 structure)  
- [x] CSS syntax verified (no parse errors)  
- [x] JavaScript syntax verified (ES6+ compatible)  
- [x] All external CDN resources load correctly  
- [x] 120 images dynamically injected into gallery (>= 100 requirement met)  

### Automated Testing
Run `test-console.html` to validate:
- ✓ Custom cursor elements present  
- ✓ Three.js canvas element present  
- ✓ Image gallery has 120+ items  
- ✓ GSAP, jQuery, Three.js libraries loaded  
- ✓ No console errors during page load  

---

## 🎯 Design Goals & Inspirations

This website is inspired by **[Google Antigravity](https://antigravity.google)** and implements:
- Physics-bending visual metaphors (floating, orbiting elements)  
- Mouse-following 3D transforms and parallax  
- Smooth, hardware-accelerated animations using `translate3d` and `will-change`  
- Radial gradients, soft shadows, and glassmorphism (backdrop blur)  
- High-quality image assets and dynamic content generation  

---

## 📱 Browser Compatibility

| Browser         | Support |
|-----------------|---------|
| Chrome / Edge   | ✅ Full  |
| Firefox         | ✅ Full  |
| Safari          | ✅ Full  |
| Mobile Safari   | ✅ Full (cursor hidden on touch devices) |
| Opera           | ✅ Full  |

**Note:** Custom cursor effects automatically disable on touch devices for optimal mobile UX.

---

## 🛠️ Customization

### Changing colors
Edit CSS variables in `styles.css`:
```css
:root {
  --accent-primary: #38bdf8;   /* Cyan/sky blue */
  --accent-secondary: #a855f7; /* Purple */
  --bg-dark: #050816;          /* Dark blue-black */
}
```

### Adding more images to the gallery
In `script.js`, change the `totalImages` constant:
```js
const totalImages = 200; // Increase from 120
```

### Adjusting animation speed
In `script.js`, modify GSAP durations or Three.js rotation increments:
```js
stars.rotation.y += 0.001; // Increase for faster rotation
```

---

## 📄 License

This project is provided **as-is** for demonstration and educational purposes.  
Feel free to modify, adapt, or extend it for your own use.

---

## 🙋 Support & Contact

For questions, feedback, or contributions:
- Open an issue in the repository (if hosted on GitHub)  
- Email: **support@globalflow.com** (placeholder)  

---

**Built with ❤️ and inspired by the antigravity web design movement.**
