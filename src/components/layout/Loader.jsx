import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";

const PortfolioLoader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    mountRef.current.appendChild(renderer.domElement);
    sceneRef.current = { scene, camera, renderer };

    // Create main geometric shape (icosahedron)
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const mainShape = new THREE.Mesh(geometry, material);
    scene.add(mainShape);

    // Create inner solid shape
    const innerGeometry = new THREE.IcosahedronGeometry(1.5, 0);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.3,
    });
    const innerShape = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerShape);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x4f46e5,
      size: 0.02,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x6366f1, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x8b5cf6, 1, 100);
    pointLight.position.set(-5, -5, 5);
    scene.add(pointLight);

    camera.position.z = 8;

    // Animation
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      mainShape.rotation.x += 0.01;
      mainShape.rotation.y += 0.01;

      innerShape.rotation.x -= 0.015;
      innerShape.rotation.y -= 0.01;

      particles.rotation.y += 0.002;

      // Pulsing effect
      const time = Date.now() * 0.001;
      mainShape.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
      innerShape.scale.setScalar(1 + Math.cos(time * 1.5) * 0.05);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  if (!loading) {

  return (
    <div className="fixed inset-0 bg-black text-white flex items-center justify-center z-50">
      {/* 3D Scene */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* Loading UI */}
      <div className="relative z-10 text-center space-y-8">
        {/* Main title with glow effect */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
            Loading Experience
          </h1>
          <div className="text-gray-400 text-lg tracking-widest uppercase">
            Crafting Digital Magic
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-80 mx-auto space-y-4">
          <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer"></div>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Initializing...</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
        </div>

        {/* Loading text animation */}
        <div className="text-gray-400 text-sm">
          {progress < 30 && "Loading assets..."}
          {progress >= 30 && progress < 60 && "Preparing interface..."}
          {progress >= 60 && progress < 90 && "Optimizing experience..."}
          {progress >= 90 && "Almost ready..."}
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-indigo-500 opacity-50"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-purple-500 opacity-50"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-blue-500 opacity-50"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-indigo-500 opacity-50"></div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(400%);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </div>
  );
};
}
export default PortfolioLoader;
