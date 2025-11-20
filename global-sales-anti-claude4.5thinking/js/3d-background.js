// ===================================
// 3D BACKGROUND with Three.js
// ===================================

class Background3D {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });

        this.mouse = { x: 0, y: 0 };
        this.geometries = [];

        this.init();
        this.setupEventListeners();
        this.animate();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.camera.position.z = 5;

        this.createGeometries();
        this.addLights();
    }

    createGeometries() {
        // Create multiple rotating geometric shapes
        const geometryTypes = [
            new THREE.TorusGeometry(0.7, 0.2, 16, 100),
            new THREE.IcosahedronGeometry(0.8, 0),
            new THREE.OctahedronGeometry(0.9),
            new THREE.TetrahedronGeometry(0.8)
        ];

        const colors = [0x667eea, 0x764ba2, 0x4facfe, 0xf093fb];

        for (let i = 0; i < 4; i++) {
            const material = new THREE.MeshPhongMaterial({
                color: colors[i],
                transparent: true,
                opacity: 0.4,
                wireframe: Math.random() > 0.5
            });

            const mesh = new THREE.Mesh(geometryTypes[i], material);

            // Random positioning
            mesh.position.x = (Math.random() - 0.5) * 8;
            mesh.position.y = (Math.random() - 0.5) * 6;
            mesh.position.z = (Math.random() - 0.5) * 5 - 2;

            // Random rotation speeds
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;
            mesh.userData.rotationSpeed = {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            };

            this.scene.add(mesh);
            this.geometries.push(mesh);
        }
    }

    addLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0x667eea, 1);
        pointLight1.position.set(2, 3, 4);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x764ba2, 1);
        pointLight2.position.set(-2, -3, -1);
        this.scene.add(pointLight2);
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.onResize());
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Rotate geometries
        this.geometries.forEach(mesh => {
            mesh.rotation.x += mesh.userData.rotationSpeed.x;
            mesh.rotation.y += mesh.userData.rotationSpeed.y;
            mesh.rotation.z += mesh.userData.rotationSpeed.z;
        });

        // Camera follows mouse
        this.camera.position.x += (this.mouse.x * 0.5 - this.camera.position.x) * 0.05;
        this.camera.position.y += (this.mouse.y * 0.5 - this.camera.position.y) * 0.05;
        this.camera.lookAt(this.scene.position);

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Check if Three.js is loaded
    if (typeof THREE !== 'undefined') {
        new Background3D('bg-canvas');
    }
});
