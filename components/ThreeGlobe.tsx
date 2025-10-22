
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeGlobe: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;
        
        const currentMount = mountRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        currentMount.appendChild(renderer.domElement);

        const geometry = new THREE.SphereGeometry(2, 64, 64);
        const loader = new THREE.TextureLoader();
        const material = new THREE.MeshPhongMaterial({
            map: loader.load('https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/earthmap1k.jpg'),
            bumpMap: loader.load('https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/earthbump1k.jpg'),
            bumpScale: 0.05,
            specularMap: loader.load('https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/earthspec1k.jpg'),
            specular: new THREE.Color('grey')
        });
        const earth = new THREE.Mesh(geometry, material);
        scene.add(earth);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 3, 5);
        scene.add(pointLight);

        // Marker for Vietnam
        const lat = 16, lon = 108;
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        const x = -(2.05 * Math.sin(phi) * Math.cos(theta));
        const z = (2.05 * Math.sin(phi) * Math.sin(theta));
        const y = (2.05 * Math.cos(phi));

        const markerGeo = new THREE.SphereGeometry(0.05, 16, 16);
        const markerMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const marker = new THREE.Mesh(markerGeo, markerMat);
        marker.position.set(x, y, z);
        earth.add(marker);

        camera.position.z = 5;

        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        const onMouseDown = () => { isDragging = true; };
        const onMouseUp = () => { isDragging = false; };
        const onMouseMove = (e: MouseEvent) => {
            const deltaMove = { x: e.offsetX - previousMousePosition.x, y: e.offsetY - previousMousePosition.y };
            if (isDragging) {
                const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler((deltaMove.y * Math.PI) / 180, (deltaMove.x * Math.PI) / 180, 0, 'XYZ'));
                earth.quaternion.multiplyQuaternions(deltaRotationQuaternion, earth.quaternion);
            }
            previousMousePosition = { x: e.offsetX, y: e.offsetY };
        };

        renderer.domElement.addEventListener('mousedown', onMouseDown);
        renderer.domElement.addEventListener('mouseup', onMouseUp);
        renderer.domElement.addEventListener('mousemove', onMouseMove);

        const animate = () => {
            requestAnimationFrame(animate);
            if (!isDragging) {
                earth.rotation.y += 0.0005;
            }
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.domElement.removeEventListener('mousedown', onMouseDown);
            renderer.domElement.removeEventListener('mouseup', onMouseUp);
            renderer.domElement.removeEventListener('mousemove', onMouseMove);
            currentMount.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-0 opacity-70" />;
};

export default ThreeGlobe;
