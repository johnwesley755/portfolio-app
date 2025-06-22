import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import profileImg from "../../assets/profile.jpeg";
import resumeDoc from "../../assets/resume.pdf";
// Enhanced 3D Components
const FloatingGeometry = ({
  position,
  color,
  geometry,
  scale = 1,
  speed = 1,
}) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.015 * speed;
      meshRef.current.rotation.z += 0.005 * speed;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
      meshRef.current.position.x =
        position[0] + Math.cos(state.clock.elapsedTime * speed * 0.5) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry}
      <meshStandardMaterial
        color={color}
        metalness={0.9}
        roughness={0.1}
        emissive={color}
        emissiveIntensity={0.15}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

const ParticleField = () => {
  const pointsRef = useRef();
  const particleCount = 200;

  const positions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
      pointsRef.current.rotation.x += 0.0005;
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
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#60A5FA" transparent opacity={0.4} />
    </points>
  );
};

const WaveGeometry = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} scale={[15, 15, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <meshStandardMaterial
        color="#1e1b4b"
        transparent
        opacity={0.1}
        wireframe
      />
    </mesh>
  );
};

const Scene3D = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#60A5FA" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#EC4899" />
      <pointLight position={[0, 10, -10]} intensity={0.8} color="#8B5CF6" />

      <ParticleField />
      <WaveGeometry />

      {/* Multiple Floating Geometries */}
      <FloatingGeometry
        position={[6, 3, -3]}
        color="#60A5FA"
        geometry={<icosahedronGeometry args={[1.2, 1]} />}
        scale={1.5}
        speed={0.8}
      />
      <FloatingGeometry
        position={[-6, -2, -2]}
        color="#EC4899"
        geometry={<octahedronGeometry args={[1.5, 0]} />}
        scale={1.2}
        speed={1.2}
      />
      <FloatingGeometry
        position={[4, -4, 1]}
        color="#10B981"
        geometry={<tetrahedronGeometry args={[1.3, 0]} />}
        scale={1}
        speed={1.5}
      />
      <FloatingGeometry
        position={[-5, 4, 3]}
        color="#F59E0B"
        geometry={<dodecahedronGeometry args={[1, 1]} />}
        scale={1.3}
        speed={0.9}
      />
      <FloatingGeometry
        position={[2, 5, -4]}
        color="#8B5CF6"
        geometry={<torusGeometry args={[1.2, 0.4, 16, 100]} />}
        scale={0.8}
        speed={1.1}
      />
      <FloatingGeometry
        position={[-3, -5, 2]}
        color="#EF4444"
        geometry={<coneGeometry args={[1, 2, 8]} />}
        scale={1.1}
        speed={1.3}
      />
    </>
  );
};

const TypewriterEffect = ({ text, delay = 100 }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  return (
    <section
      className="relative min-h-screen w-full flex items-center overflow-hidden mt-20 bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/5 via-purple-900/10 to-pink-900/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>
      </div>

      {/* 3D Scene Background */}
      <div className="absolute inset-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 12], fov: 75 }}>
          <Scene3D />
        </Canvas>
      </div>

      {/* Dynamic Floating Elements */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-${8 + i * 4} h-${
            8 + i * 4
          } rounded-full opacity-10 blur-xl animate-pulse`}
          style={{
            background: `linear-gradient(45deg, 
              ${
                [
                  "#60A5FA",
                  "#EC4899",
                  "#10B981",
                  "#F59E0B",
                  "#8B5CF6",
                  "#EF4444",
                ][i]
              }, 
              ${
                [
                  "#3B82F6",
                  "#F472B6",
                  "#34D399",
                  "#FBBF24",
                  "#A78BFA",
                  "#F87171",
                ][i]
              })`,
            left: `${10 + i * 15}%`,
            top: `${20 + i * 10}%`,
            transform: `translate(${mousePosition.x * (10 + i * 2)}px, ${
              mousePosition.y * (10 + i * 2)
            }px)`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}

      {/* Main Content Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen py-20">
          {/* Left Column - Text Content */}
          <div className="space-y-8 lg:space-y-12 text-center lg:text-left">
            {/* Greeting */}
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-gray-300">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Available for new opportunities
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
                <span className="block text-white mb-2">Hi, I'm</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                  John Wesley
                </span>
                <span className="inline-block text-4xl animate-wave ml-4">
                  👋
                </span>
              </h1>
            </div>

            {/* Dynamic Role */}
            <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-300 h-16">
              <TypewriterEffect
                text="Full Stack Developer & UI/UX Designer"
                delay={80}
              />
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl lg:text-2xl text-gray-400 leading-relaxed max-w-2xl lg:max-w-none">
              I create{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold">
                innovative digital experiences
              </span>{" "}
              that blend cutting-edge technology with stunning design.
              Specializing in React ecosystems, 3D web experiences, and scalable
              full-stack applications.
            </p>

            {/* Tech Stack */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Technologies & Tools
              </h3>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {[
                  { name: "React", color: "from-blue-400 to-blue-600" },
                  { name: "TypeScript", color: "from-blue-500 to-blue-700" },
                  { name: "Next.js", color: "from-gray-400 to-gray-600" },
                  { name: "Three.js", color: "from-green-400 to-green-600" },
                  { name: "Tailwind", color: "from-cyan-400 to-cyan-600" },
                  { name: "Node.js", color: "from-green-500 to-green-700" },
                  { name: "Firebase", color: "from-yellow-400 to-orange-500" },
                  { name: "MongoDB", color: "from-green-600 to-green-800" },
                ].map((tech, index) => (
                  <div
                    key={tech.name}
                    className={`px-4 py-2 bg-gradient-to-r ${tech.color} rounded-lg text-white text-sm font-medium shadow-lg hover:scale-105 transition-all duration-300 cursor-default`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {tech.name}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4">
              <a
                href="#projects"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl font-bold text-white text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                <span className="relative flex items-center justify-center gap-3">
                  <span>Explore My Work</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </a>

              <a
                href={resumeDoc} // Replace this with your actual resume path
                download="John_Wesley_Resume.pdf"
                className="group relative inline-block px-8 py-4 bg-transparent border-2 border-gray-600 rounded-2xl font-bold text-white text-lg overflow-hidden transition-all duration-500 hover:border-white hover:scale-105 hover:shadow-2xl hover:shadow-white/10"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center gap-3">
                  <span>Download Resume</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          {/* Right Column - Image/Visual */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 animate-spin-slow p-1">
                  <div className="w-full h-full rounded-full bg-black"></div>
                </div>

                {/* Image */}
                <div className="absolute inset-4 rounded-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <img
                    src={profileImg}
                    alt="John Wesley - Full Stack Developer"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Floating Elements Around Image */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-bounce"></div>
                <div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-500 rounded-full animate-bounce"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute -top-4 -left-4 w-4 h-4 bg-purple-500 rounded-full animate-bounce"
                  style={{ animationDelay: "2s" }}
                ></div>
                <div
                  className="absolute -bottom-4 -right-4 w-10 h-10 bg-green-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                ></div>

                {/* Orbiting Elements */}
                <div className="absolute inset-0 animate-spin-slow">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full"></div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 w-3 h-3 bg-indigo-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400 animate-bounce">
        <span className="mb-3 text-sm font-medium">Discover More</span>
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center overflow-hidden">
          <div className="w-1 h-3 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
      {/* Social Links */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 hidden xl:flex flex-col gap-4">
        {[
          {
            name: "GitHub",
            url: "https://github.com/johnwesley755",
            icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
          },
          {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/john-wesley-6707ab258/",
            icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
          },
          {
            name: "Twitter",
            url: "https://twitter.com/JohnWesley97513",
            icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
          },
        ].map((social, index) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-300 group"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d={social.icon} />
            </svg>
          </a>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
