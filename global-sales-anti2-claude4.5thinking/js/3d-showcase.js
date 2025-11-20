/**
 * 3D PRODUCT SHOWCASE
 * Three.js 3D rendering for hero section
 */

class ThreeDShowcase {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.geometry = null;
        this.material = null;
        this.mesh = null;
        this.time = 0;

        this.init();
    }

    init() {
        // Create scene
        this.scene = new THREE.Scene();

        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.container.offsetWidth / this.container.offsetHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        // Create geometry - abstract shapes
        this.createShapes();

        // Add lights
        this.addLights();

        // Handle resize
        window.addEventListener('resize', () => this.onResize());

        // Add mouse interaction
        this.addMouseInteraction();

        // Start animation
        this.animate();
    }

    createShapes() {
        // Create multiple geometric shapes
        const group = new THREE.Group();

        // Torus Knot
        const torusGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
        const torusMaterial = new THREE.MeshStandardMaterial({
            color: 0x667eea,
            metalness: 0.7,
            roughness: 0.2,
            wireframe: false
        });
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        group.add(torus);

        // Icosahedron
        const icoGeometry = new THREE.IcosahedronGeometry(0.8, 0);
        const icoMaterial = new THREE.MeshStandardMaterial({
            color: 0x764ba2,
            metalness: 0.5,
            roughness: 0.3,
            wireframe: true
        });
        const ico = new THREE.Mesh(icoGeometry, icoMaterial);
        ico.position.set(2, 1, -1);
        group.add(ico);

        // Sphere with shader
        const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const sphereMaterial = new THREE.MeshStandardMaterial({
            color: 0xf093fb,
            metalness: 0.9,
            roughness: 0.1
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(-2, -1, 0);
        group.add(sphere);

        this.mesh = group;
        this.scene.add(this.mesh);
    }

    addLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);

        // Point lights for color
        const pointLight1 = new THREE.PointLight(0x667eea, 2, 10);
        pointLight1.position.set(-3, 2, 3);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xf093fb, 2, 10);
        pointLight2.position.set(3, -2, 3);
        this.scene.add(pointLight2);
    }

    addMouseInteraction() {
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        this.updateMouse = () => {
            if (this.mesh) {
                this.mesh.rotation.y += (mouse * 0.5 - this.mesh.rotation.y) * 0.05;
                this.mesh.rotation.x += (mouseY * 0.3 - this.mesh.rotation.x) * 0.05;
            }
        };
    }

    onResize() {
        this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.time += 0.01;

        // Rotate the group
        if (this.mesh) {
            this.mesh.rotation.x += 0.003;
            this.mesh.rotation.y += 0.005;

            // Animate individual children
            this.mesh.children.forEach((child, index) => {
                child.rotation.x += 0.01 * (index + 1);
                child.rotation.y += 0.01 * (index + 1);
                child.position.y += Math.sin(this.time + index) * 0.002;
            });
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize 3D showcase when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE !== 'undefined') {
        new ThreeDShowcase('3d-showcase');
    }
});
