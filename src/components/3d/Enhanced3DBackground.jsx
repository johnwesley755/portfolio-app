import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Octahedron, Torus, Float, MeshDistortMaterial, Environment, EffectComposer, Bloom, ChromaticAberration } from '@react-three/drei';
import { EffectComposer as PostProcessing, RenderPass, UnrealBloomPass } from 'three/examples/jsm/postprocessing/EffectComposer';
import * as THREE from 'three';

// Enhanced Floating Geometry with better materials
const FloatingGeometry = ({ position, color, geometry, scale = 1, speed = 1, type = 'box' }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.015 * speed;
      meshRef.current.rotation.z += 0.005 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * speed * 0.5) * 0.3;
      
      // Scale animation on hover
      const targetScale = hovered ? scale * 1.2 : scale;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  const GeometryComponent = () => {
    switch (type) {
      case 'sphere':
        return <sphereGeometry args={[1, 32, 32]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />;
      case 'torus':
        return <torusGeometry args={[1, 0.4, 16, 100]} />;
      case 'cone':
        return <coneGeometry args={[1, 2, 8]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <Float speed={speed * 0.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh 
        ref={meshRef} 
        position={position} 
        scale={scale}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <GeometryComponent />
        <MeshDistortMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          distort={hovered ? 0.3 : 0.1}
          speed={2}
          emissive={color}
          emissiveIntensity={hovered ? 0.3 : 0.1}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

// Enhanced Particle Field with better performance
const EnhancedParticleField = () => {
  const pointsRef = useRef();
  const particleCount = 1000;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const size = new Float32Array(particleCount);
    
    const colorPalette = [
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#06b6d4'),
      new THREE.Color('#f59e0b'),
      new THREE.Color('#ec4899'),
      new THREE.Color('#10b981'),
    ];

    for (let i = 0; i < particleCount; i++) {
      // Position
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
      
      // Color
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
      
      // Size
      size[i] = Math.random() * 0.05 + 0.01;
    }
    
    return { positions: pos, colors: col, sizes: size };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
      pointsRef.current.rotation.x += 0.0005;
      
      // Mouse interaction
      const positions = pointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] += Math.sin(state.clock.elapsedTime + i) * 0.001;
        positions[i3 + 1] += Math.cos(state.clock.elapsedTime + i) * 0.001;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.02} 
        vertexColors 
        transparent 
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Animated Wave Geometry
const AnimatedWave = () => {
  const meshRef = useRef();
  const { viewport } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array;
      const time = state.clock.elapsedTime;
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        positions[i + 2] = Math.sin(x * 0.5 + time) * Math.cos(y * 0.5 + time) * 0.5;
      }
      
      meshRef.current.geometry.attributes.position.needsUpdate = true;
      meshRef.current.rotation.z = Math.sin(time * 0.3) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -8]} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <meshStandardMaterial
        color="#1e1b4b"
        transparent
        opacity={0.1}
        wireframe
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Main 3D Scene
const Enhanced3DScene = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
      <spotLight position={[0, 20, 0]} intensity={0.8} color="#f59e0b" />
      
      {/* Environment */}
      <Environment preset="night" />
      
      {/* Floating Geometries */}
      <FloatingGeometry position={[-8, 2, -5]} color="#8b5cf6" type="sphere" scale={0.8} speed={1.2} />
      <FloatingGeometry position={[8, -2, -3]} color="#06b6d4" type="octahedron" scale={1.2} speed={0.8} />
      <FloatingGeometry position={[-5, -3, -7]} color="#f59e0b" type="torus" scale={0.6} speed={1.5} />
      <FloatingGeometry position={[6, 4, -4]} color="#ec4899" type="cone" scale={1.0} speed={1.0} />
      <FloatingGeometry position={[0, -5, -6]} color="#10b981" type="box" scale={0.9} speed={1.3} />
      <FloatingGeometry position={[-3, 5, -2]} color="#f97316" type="sphere" scale={0.7} speed={0.9} />
      
      {/* Particle Field */}
      <EnhancedParticleField />
      
      {/* Animated Wave */}
      <AnimatedWave />
    </>
  );
};

// Main Component
const Enhanced3DBackground = ({ className = "" }) => {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Enhanced3DScene />
      </Canvas>
    </div>
  );
};

export default Enhanced3DBackground;