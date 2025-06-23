import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useInView } from "framer-motion";
import * as THREE from "three";
import ibmPdf from "../../assets/ibm.png";
import boardImg from "../../assets/board.png";
import uiImg from "../../assets/uiux.jpg";
import resumePdf from "../../assets/resume.pdf";
import {
  Calendar,
  MapPin,
  Award,
  Code,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Download,
  Eye,
  Star,
} from "lucide-react";

const experiences = [
  {
    id: 1,
    title: "IBM Full Stack Developer Certification",
    organization: "IBM",
    period: "2025",
    type: "certification",
    description:
      "Mastered comprehensive full-stack development including microservices architecture, cloud deployment, and modern DevOps practices. Built scalable applications with advanced security implementations.",
    skills: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Docker",
      "Kubernetes",
      "Django",
    ],
    icon: Award,
    color: "from-blue-400 to-cyan-400",
    bgPattern: "dots",
    rating: 5,
    certificateImage: ibmPdf,
    achievements: [
      "Completed 12 hands-on labs",
      "Built 3 full-stack projects",
      "Scored 95% on final assessment",
    ],
  },
  {
    id: 2,
    title: "Frontend for Java Full Stack Development",
    organization: "Coursera",
    period: "2025",
    type: "certification",
    description:
      "Gained hands-on experience in building responsive web applications using HTML, CSS, JavaScript, and Angular by mastering core concepts and best practices.",
    skills: ["HTML", "CSS", "Javascript", "Angular"],
    icon: Code,
    color: "from-purple-400 to-pink-400",
    bgPattern: "none",
    rating: 4,
    certificateImage: boardImg,
    achievements: [
      "Built responsive web pages using HTML and CSS.",
      "Implemented dynamic features using JavaScript.",
      "Created scalable SPAs with Angular components and services.",
    ],
  },
  {
    id: 3,
    title: "Google UX Design Certification",
    organization: "Google",
    period: "2025",
    type: "education",
    description:
      "Comprehensive training in user-centered design methodology, advanced prototyping techniques, and design systems. Specialized in mobile-first responsive design and accessibility standards.",
    skills: [
      "Figma",
      "UI Design",
      "User Research",
      "Prototyping",
      "Accessibility",
      "Wireframing",
    ],
    icon: Sparkles,
    color: "from-emerald-400 to-teal-400",
    bgPattern: "circles",
    rating: 5,
    certificateImage: uiImg,
    achievements: [
      "Completed hands-on projects including wireframes, prototypes, and user research for mobile and web apps.",
      "Developed a professional UX portfolio showcasing end-to-end design process and problem-solving skills.",
      "Gained proficiency in UX tool like Figma and applied design thinking methodologies.",
    ],
  },
];

// Three.js Background Component
const ThreeJSBackground = () => {
  const mountRef = useRef(null);
  const frameRef = useRef();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 150;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x888888,
      transparent: true,
      opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Create floating geometric shapes
    const shapes = [];
    for (let i = 0; i < 20; i++) {
      const geometries = [
        new THREE.BoxGeometry(0.1, 0.1, 0.1),
        new THREE.SphereGeometry(0.05, 8, 6),
        new THREE.ConeGeometry(0.05, 0.1, 6),
      ];

      const geometry =
        geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5),
        transparent: true,
        opacity: 0.3,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      shapes.push(mesh);
      scene.add(mesh);
    }

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Rotate particles
      particlesMesh.rotation.x += 0.001;
      particlesMesh.rotation.y += 0.002;

      // Animate shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.01;
        shape.rotation.y += 0.01;
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

const FloatingElement = ({ children, delay = 0 }) => {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
        rotate: [0, 2, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

const BackgroundPattern = ({ type, className }) => {
  const patterns = {
    dots: (
      <div className={`absolute inset-0 opacity-20 ${className}`}>
        <div
          className="absolute inset-0 blur-sm"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 2px, transparent 2px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>
    ),
    circles: (
      <div className={`absolute inset-0 opacity-20 ${className}`}>
        <div className="absolute top-6 left-6 w-12 h-12 rounded-full border-2 border-current animate-pulse" />
        <div
          className="absolute top-12 right-12 w-8 h-8 rounded-full border-2 border-current animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-8 left-16 w-6 h-6 rounded-full border-2 border-current animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>
    ),
  };
  return patterns[type] || null;
};

const CertificateModal = ({ isOpen, onClose, experience }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-extrabold text-white">
            {experience.title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          <img
            src={experience.certificateImage}
            alt={`${experience.title} Certificate`}
            className="w-full h-64 object-cover rounded-lg border border-gray-700"
          />
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">
              Key Achievements
            </h4>
            <ul className="space-y-2">
              {experience.achievements.map((achievement, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <Star className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0" />
                  {achievement}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between pt-4 border-t border-gray-700">
            <motion.a
              href={experience.certificateImage}
              download // this triggers download of the image
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4 inline mr-2" />
              Download Certificate
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ExperienceCard = ({ experience, index, isInView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-100, 100], [8, -8]);
  const rotateY = useTransform(mouseX, [-100, 100], [-8, 8]);

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const IconComponent = experience.icon;

  return (
    <>
      <motion.div
        ref={cardRef}
        className="relative mb-12 last:mb-0"
        initial={{ opacity: 0, y: 60, rotateX: -20 }}
        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          mouseX.set(0);
          mouseY.set(0);
        }}
      >
        <motion.div
          className="relative bg-black/40 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl overflow-hidden group cursor-pointer"
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            transformStyle: "preserve-3d",
          }}
          whileHover={{
            scale: 1.02,
            y: -8,
            transition: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.98 }}
        >
          <BackgroundPattern
            type={experience.bgPattern}
            className="text-white"
          />

          <div
            className={`absolute inset-0 bg-gradient-to-br ${experience.color} opacity-10 group-hover:opacity-20 transition-all duration-500`}
          />

          <div className="absolute inset-0 overflow-hidden">
            <FloatingElement delay={index * 0.5}>
              <div
                className={`absolute top-6 right-6 w-24 h-24 bg-gradient-to-br ${experience.color} rounded-full opacity-20 blur-2xl`}
              />
            </FloatingElement>
            <FloatingElement delay={index * 0.5 + 2}>
              <div
                className={`absolute bottom-12 left-12 w-20 h-20 bg-gradient-to-br ${experience.color} rounded-full opacity-10 blur-xl`}
              />
            </FloatingElement>
          </div>

          <div className="relative p-8 z-10">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-start space-x-6">
                <motion.div
                  className={`p-4 rounded-2xl bg-gradient-to-br ${experience.color} shadow-xl`}
                  whileHover={{
                    scale: 1.1,
                    rotate: 360,
                    transition: { duration: 0.8 },
                  }}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-3xl font-extrabold text-white mb-2 leading-tight">
                    {experience.title}
                  </h3>

                  <div className="flex items-center space-x-6 text-gray-400 mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5" />
                      <span className="text-base">
                        {experience.organization}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5" />
                      <span className="text-base">{experience.period}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < experience.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                    <span className="text-gray-400 ml-2">
                      ({experience.rating}/5)
                    </span>
                  </div>
                </div>
              </div>

              <motion.button
                className="opacity-0 group-hover:opacity-100 transition-all duration-300 p-2 rounded-lg bg-white/10 hover:bg-white/20"
                whileHover={{ scale: 1.1 }}
                onClick={() => setModalOpen(true)}
              >
                <Eye className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {experience.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {experience.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-xl text-sm text-gray-200 border border-gray-700 hover:border-gray-600 transition-colors"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.2 + skillIndex * 0.05 + 0.6,
                      }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(55, 65, 81, 0.8)",
                        transition: { duration: 0.2 },
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="relative">
                <motion.div
                  className="relative overflow-hidden rounded-2xl border border-gray-700 group/img"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={experience.certificateImage}
                    alt={`${experience.title} preview`}
                    className="w-full h-32 object-cover group-hover/img:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 group-hover/img:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white opacity-80 group-hover/img:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="flex items-center justify-between pt-6 border-t border-gray-800"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.2 + 1 }}
            >
              <span
                className={`text-base font-semibold bg-gradient-to-r ${experience.color} bg-clip-text text-transparent`}
              >
                {experience.type.charAt(0).toUpperCase() +
                  experience.type.slice(1)}
              </span>

              <div className="flex space-x-4">
                <motion.button
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
                  whileHover={{ x: 5 }}
                  onClick={() => setModalOpen(true)}
                >
                  <span className="text-sm">View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${experience.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
            style={{
              filter: "blur(30px)",
              transform: "scale(1.2)",
            }}
          />
        </motion.div>
      </motion.div>

      <CertificateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        experience={experience}
      />
    </>
  );
};

const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      className="py-24 relative overflow-hidden min-h-screen"
    >
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-80" />
        <ThreeJSBackground />
      </div>

      <div className="absolute inset-0 opacity-30">
        <FloatingElement>
          <div className="absolute top-32 left-16 w-40 h-40 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl" />
        </FloatingElement>
        <FloatingElement delay={3}>
          <div className="absolute top-60 right-24 w-48 h-48 bg-gradient-to-br from-pink-500/20 to-cyan-500/20 rounded-full blur-3xl" />
        </FloatingElement>
        <FloatingElement delay={6}>
          <div className="absolute bottom-32 left-1/3 w-44 h-44 bg-gradient-to-br from-emerald-500/25 to-teal-500/25 rounded-full blur-3xl" />
        </FloatingElement>
      </div>

      <div className="container mx-auto px-6 relative z-20" ref={sectionRef}>
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center space-x-3 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-8 h-8 text-yellow-400" />
            <span className="text-yellow-400 font-bold text-lg tracking-wider uppercase">
              Professional Journey
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent mb-8 leading-tight">
            Experience & Certifications
          </h2>

          <motion.p
            className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            A comprehensive showcase of my professional achievements,
            certifications, and the transformative experiences that have shaped
            my expertise in modern web development and design.
          </motion.p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            onClick={() => window.open(resumePdf, "_blank")}
            className="px-10 py-5 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 relative overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(168, 85, 247, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center">
              <Download className="w-6 h-6 mr-3" />
              Download Complete Resume
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-500" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
