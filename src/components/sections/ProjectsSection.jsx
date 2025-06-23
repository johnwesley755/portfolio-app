import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import {
  ExternalLink,
  Github,
  Play,
  Code,
  Eye,
  Star,
  Award,
  Zap,
} from "lucide-react";

// Enhanced projects array with more projects
const projects = [
  {
    id: 1,
    title: "Namma Isai",
    year: "2024",
    description:
      "A custom-built music player with playlists, local storage, and responsive UI. Features include audio visualization, custom themes, and seamless playback controls.",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop",
    role: "Frontend Development",
    techStack: ["HTML", "CSS", "JavaScript", "Firebase"],
    demoLink: "https://namma-isai-music.vercel.app/",
    githubLink: "https://github.com/johnwesley755/namma-isai-music",
    category: "Web App",
    status: "Live",
    featured: true,
    stars: 128,
  },
  {
    id: 2,
    title: "AI Text-to-Video Generation",
    year: "2024",
    description:
      "Developed application converting text prompts into AI-generated videos using advanced diffusion models",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop",
    role: "Full Stack and AI/ML",
    techStack: ["Python", "Flask", "React", "Diffusion models"],
    demoLink: "https://github.com/johnwesley755/shorts-video",
    githubLink: "https://github.com/johnwesley755/shorts-video",
    category: "AI/ML",
    status: "Beta",
    featured: false,
    stars: 174,
  },
  {
    id: 3,
    title: "Chat Application",
    year: "2025",
    description:
      "Architected secure real-time messaging platform with authentication and stores user's data in MongoDB with instant messaging capabilities",
    image:
      "https://files.ably.io/ghost/prod/2023/01/build-a-realtime-chat-app-from-scratch--1-.png",
    role: "Full Stack Web Development",
    techStack: ["React", "Node.js", "Express", "Socket.io"],
    demoLink: "https://chat-app-beta-six-31.vercel.app/",
    githubLink: "https://github.com/johnwesley755/chat-application",
    category: "Web App",
    status: "Live",
    featured: true,
    stars: 156,
  },
  {
    id: 4,
    title: "E-Commerce Platform",
    year: "2024",
    description:
      "Modern e-commerce solution with AI-powered recommendations, real-time inventory management, and seamless payment integration.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
    role: "Full Stack Web Development",
    techStack: ["React", "Tailwind CSS", "Firebase", "Shadcn UI"],
    demoLink: "https://vutoria-bb1e7.web.app/",
    githubLink: "https://github.com/johnwesley755/vutoria-demo-store",
    category: "E-Commerce",
    status: "Live",
    featured: true,
    stars: 203,
  },
  {
    id: 5,
    title: "AI Image to Text Generator",
    year: "2024",
    description:
      "A web app that extracts text from images and generates context-aware responses using advanced natural language processing",
    image:
      "https://www.aiseesoft.com/images/tutorial/jpg-to-text/jpg-to-text.jpg",
    role: "AI Developer",
    techStack: ["Python", "FastAPI", "React", "WebSocket"],
    demoLink: "https://example.com/project5",
    githubLink: "https://github.com/johnwesley755/image-to-text",
    category: "AI/ML",
    status: "Beta",
    featured: false,
    stars: 174,
  },
  {
    id: 6,
    title: "Video Conferencing Application",
    year: "2025",
    description:
      "Built browser-based video conferencing solution enabling seamless peer-to-peer communication",
    image:
      "https://kumospace.mo.cloudinary.net/https://content.kumospace.com/hubfs/Blog/Why%20Businesses%20Need%20Secure%20Video%20Conferencing%20and%20How%20to%20Get%20Started/Secure-Video-Conferencing.jpg?tx=w_responsive:fallback-max-width_1212;fallback-max-width-mobile_720",
    role: "Full Stack Web Development",
    techStack: ["React", "Node.js", "Firebase", "WebRTC"],
    demoLink: "https://video-conferencing-app-eoid.vercel.app/",
    githubLink: "https://github.com/johnwesley755/video-conferencing-app",
    category: "Web App",
    status: "Live",
    featured: true,
    stars: 267,
  },
  {
    id: 7,
    title: "Car Dealership Application",
    year: "2025",
    description:
      "A full-stack web application that allows users to explore car dealerships, view dealer details, and submit reviews with sentiment analysis.",
    image:
      "https://img.freepik.com/free-vector/isometric-devops-illustration_52683-84175.jpg?ga=GA1.1.1436923625.1750582702&semt=ais_hybrid&w=740",
    role: "Full Stack Web Development",
    techStack: ["React", "MongoDB", "Django", "Express"],
    demoLink: "https://car-dealership-application.onrender.com",
    githubLink: "https://github.com/johnwesley755/car-dealership-application",
    category: "Web App",
    status: "Live",
    featured: true,
    stars: 167,
  },

  {
    id: 8,
    title: "Product Pricing Application",
    year: "2025",
    description:
      "Built browser-based video conferencing solution enabling seamless peer-to-peer communication",
    image:
      "https://img.freepik.com/free-vector/gradient-api-illustration_23-2149368725.jpg?ga=GA1.1.1436923625.1750582702&semt=ais_hybrid&w=740",
    role: "Full Stack Web Development",
    techStack: ["React", "Node.js", "Django", "Express", "Docker"],
    demoLink: "https://github.com/johnwesley755/dealer-evaluation-application",
    githubLink:
      "https://github.com/johnwesley755/dealer-evaluation-application",
    category: "Web App",
    status: "Beta",
    featured: true,
    stars: 137,
  },
  {
    id: 9,
    title: "BPO Automation Application",
    year: "2025",
    description:
      "A modern web application for automating Business Process Outsourcing (BPO) calls using AI-powered voice agents.",
    image:
      "https://img.freepik.com/free-vector/man-robot-with-computers-sitting-together-workplace-artificial-intelligence-workforce-future-flat-illustration_74855-20635.jpg?ga=GA1.1.1436923625.1750582702&semt=ais_hybrid&w=740",
    role: "Full Stack Web Development",
    techStack: ["React", "Node.js", "Express", "Gemini API"],
    demoLink: "https://github.com/johnwesley755/bpo-automation",
    githubLink: "https://github.com/johnwesley755/bpo-automation",
    category: "Web App",
    status: "Beta",
    featured: true,
    stars: 267,
  },
];

// 3D Background Component
const FloatingElements = () => {
  return (
    <Canvas className="absolute inset-0 -z-10">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 32, 32]} position={[-4, 2, -5]}>
          <MeshDistortMaterial
            color="#8b5cf6"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.4}
            transparent
            opacity={0.1}
          />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <Sphere args={[0.8, 32, 32]} position={[4, -2, -3]}>
          <MeshDistortMaterial
            color="#06b6d4"
            attach="material"
            distort={0.4}
            speed={1.5}
            roughness={0.3}
            transparent
            opacity={0.15}
          />
        </Sphere>
      </Float>

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={2.5}>
        <Sphere args={[0.6, 32, 32]} position={[0, 3, -4]}>
          <MeshDistortMaterial
            color="#3b82f6"
            attach="material"
            distort={0.5}
            speed={3}
            roughness={0.2}
            transparent
            opacity={0.12}
          />
        </Sphere>
      </Float>
    </Canvas>
  );
};

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const getTransformStyle = () => {
    if (!isHovered || !cardRef.current) return {};
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (mousePosition.y - centerY) / 15;
    const rotateY = (centerX - mousePosition.x) / 15;

    return {
      transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${
        isHovered ? 30 : 0
      }px) scale(${isHovered ? 1.02 : 1})`,
      transition: isHovered
        ? "none"
        : "transform 0.6s cubic-bezier(0.23, 1, 0.320, 1)",
    };
  };

  return (
    <div
      ref={cardRef}
      className={`group relative ${
        project.featured ? "md:col-span-2 lg:col-span-1" : ""
      }`}
      style={{
        animationDelay: `${index * 0.15}s`,
        animation: "fadeInUp 0.8s cubic-bezier(0.23, 1, 0.320, 1) forwards",
        opacity: 0,
        transform: "translateY(80px)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced 3D Card Container */}
      <div
        className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-700/30 shadow-2xl"
        style={getTransformStyle()}
      >
        {/* Dynamic Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Holographic Border Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl -z-10" />

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 z-20">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 rounded-full text-xs font-bold flex items-center gap-1">
              <Star size={12} fill="currentColor" />
              Featured
            </div>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-20">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${
              project.status === "Live"
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                : "bg-amber-500/20 text-amber-400 border-amber-500/40"
            }`}
          >
            {project.status}
          </span>
        </div>

        {/* Enhanced Image Section */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-115 group-hover:rotate-1"
          />

          {/* Multi-layer Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Enhanced Floating Action Buttons */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-6 group-hover:translate-y-0">
            <div className="flex space-x-4">
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md border border-white/20 text-white p-4 rounded-2xl hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg"
              >
                <Play size={20} />
              </a>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-slate-500/20 to-slate-600/20 backdrop-blur-md border border-white/20 text-white p-4 rounded-2xl hover:from-slate-500/30 hover:to-slate-600/30 transition-all duration-300 hover:scale-110 hover:-rotate-12 shadow-lg"
              >
                <Github size={20} />
              </a>
              <button className="bg-gradient-to-r from-cyan-500/20 to-teal-500/20 backdrop-blur-md border border-white/20 text-white p-4 rounded-2xl hover:from-cyan-500/30 hover:to-teal-500/30 transition-all duration-300 hover:scale-110 shadow-lg">
                <Eye size={20} />
              </button>
            </div>
          </div>

          {/* Category Tag */}
          <div className="absolute bottom-4 left-4">
            <span className="bg-black/40 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-medium border border-white/20">
              {project.category}
            </span>
          </div>

          {/* Stars Count */}
          <div className="absolute bottom-4 right-4">
            <div className="bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20 flex items-center gap-1">
              <Star size={12} fill="currentColor" className="text-yellow-400" />
              {project.stars}
            </div>
          </div>
        </div>

        {/* Enhanced Content Section */}
        <div className="p-6 relative z-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                {project.title}
              </h3>
              <div className="flex items-center gap-2">
                <Award size={14} className="text-slate-400" />
                <p className="text-slate-400 text-sm">{project.role}</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-cyan-400/20 to-purple-400/20 backdrop-blur-sm px-3 py-1 rounded-xl border border-cyan-400/30">
              <span className="text-cyan-400 font-mono text-sm font-medium">
                {project.year}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-300 text-sm leading-relaxed mb-5 group-hover:text-slate-200 transition-colors duration-300">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, techIndex) => (
                <span
                  key={tech}
                  className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm text-slate-300 px-3 py-1.5 rounded-full text-xs border border-slate-600/50 hover:border-cyan-400/50 hover:text-cyan-400 hover:from-cyan-400/10 hover:to-purple-400/10 transition-all duration-300 cursor-default"
                  style={{
                    animationDelay: `${index * 0.1 + techIndex * 0.05}s`,
                    animation: "fadeIn 0.6s ease-out forwards",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex space-x-3 pt-2">
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2.5 px-4 rounded-xl text-sm font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                <ExternalLink size={14} />
                <span>Live Demo</span>
              </a>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-slate-700/60 to-slate-600/60 backdrop-blur-sm text-slate-300 py-2.5 px-4 rounded-xl text-sm font-medium hover:from-slate-600/60 hover:to-slate-500/60 transition-all duration-300 flex items-center justify-center hover:scale-105 border border-slate-600/50 hover:border-slate-500/50"
              >
                <Code size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Enhanced 3D Depth Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 -z-20" />
      </div>

      {/* Enhanced Shadow Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/30 via-blue-500/30 to-cyan-500/30 blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 -z-10 transform translate-y-12 scale-95" />
    </div>
  );
};

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
// Removed unused sectionRef

  const categories = ["All", "Web App", "E-Commerce", "AI/ML"];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeInUp {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes fadeIn {
        to {
          opacity: 1;
        }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-15px) rotate(1deg); }
        66% { transform: translateY(-5px) rotate(-1deg); }
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 0.8; }
      }
      
      .animate-float {
        animation: float 8s ease-in-out infinite;
      }
      
      .animate-pulse-slow {
        animation: pulse 4s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);

    return () => document.head.removeChild(style);
  }, []);

  return (
    <section
      id="projects"
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pb-20 relative overflow-hidden"
    >
      {/* 3D Background Elements */}
      <FloatingElements />

      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-blue-500/15 rounded-full blur-3xl animate-float animate-pulse-slow" />
        <div
          className="absolute top-3/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-3/4 w-48 h-48 bg-gradient-to-r from-cyan-500/15 to-purple-500/15 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/2 w-56 h-56 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "6s" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-500/30 mb-6">
            <Zap size={16} className="text-purple-400" />
            <span className="text-purple-400 text-sm font-medium">
              Portfolio Showcase
            </span>
          </div>

          <h2 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-white via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6 leading-tight">
            Featured Projects
          </h2>

          <p className="text-slate-400 text-xl max-w-4xl mx-auto leading-relaxed">
            Discover my latest creations where innovation meets functionality.
            Each project represents a unique challenge solved with cutting-edge
            technologies and creative problem-solving.
          </p>
        </div>

        {/* Enhanced Filter Buttons */}
        <div className="flex justify-center mb-16">
          <div className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-xl rounded-3xl p-2 border border-slate-600/30 shadow-2xl">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                    activeFilter === category
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25 scale-105"
                      : "text-slate-400 hover:text-white hover:bg-slate-700/50 hover:scale-105"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-xl rounded-3xl p-10 border border-slate-600/30 max-w-3xl mx-auto shadow-2xl">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-500/30 mb-6">
              <Star size={16} className="text-purple-400" fill="currentColor" />
              <span className="text-purple-400 text-sm font-medium">
                Let's Collaborate
              </span>
            </div>

            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Build Something Amazing?
            </h3>

            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              I'm always excited to work on new projects and bring innovative
              ideas to life. Let's create something extraordinary together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.linkedin.com/in/john-wesley-6707ab258/"
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2"
              >
                <Zap size={18} />
                View my profile
              </a>

              <a
                href="https://github.com/johnwesley755"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-slate-700/60 to-slate-600/60 backdrop-blur-sm text-slate-300 px-8 py-4 rounded-2xl font-medium hover:from-slate-600/60 hover:to-slate-500/60 transition-all duration-300 hover:scale-105 border border-slate-600/50 hover:border-slate-500/50 flex items-center justify-center gap-2"
              >
                <Github size={18} />
                View All Projects
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
