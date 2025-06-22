import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import {
  Send,
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  Sparkles,
  Globe,
  ArrowRight,
  Zap,
  Star,
  Hexagon,
} from "lucide-react";

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const containerRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  // Initialize EmailJS with environment variables
  // Updated useEffect for EmailJS initialization
  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    console.log("Environment check:", {
      publicKey: publicKey ? "Found" : "Missing",
      allEnvVars: Object.keys(import.meta.env).filter((key) =>
        key.startsWith("VITE_")
      ),
    });

    if (publicKey) {
      emailjs.init(publicKey);
    } else {
      console.error("EmailJS public key not found in environment variables");
      setSubmitError(
        "Email service configuration error. Please contact me directly."
      );
    }
  }, []);

  // Mouse tracking for 3D effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  // Updated onSubmit function
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Check if EmailJS is properly configured
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    console.log("EmailJS config check:", {
      serviceId: serviceId ? "Found" : "Missing",
      templateId: templateId ? "Found" : "Missing",
      publicKey: publicKey ? "Found" : "Missing",
    });

    if (!serviceId || !templateId || !publicKey) {
      setSubmitError(
        "Email service is not properly configured. Please contact me directly at johnwesley8113@gmail.com"
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: "John Wesley",
        reply_to: formData.email,
      };

      const result = await emailjs.send(serviceId, templateId, templateParams);

      console.log("Email sent successfully:", result);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitError(
        "Failed to send message. Please try again or contact me directly at johnwesley8113@gmail.com"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const FloatingOrb = ({ size, color, delay, duration }) => (
    <div
      className="absolute rounded-full opacity-20 animate-pulse"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}, transparent)`,
        animationDelay: delay,
        animationDuration: duration,
        transform: `translate(${mousePosition.x * 30}px, ${
          mousePosition.y * 30
        }px)`,
      }}
    />
  );

  const Floating3DShape = ({
    shape,
    size,

    delay,
    duration,
    x,
    y,
    rotation,
  }) => {
    const transform = `translate(${mousePosition.x * 25}px, ${
      mousePosition.y * 25
    }px) rotate(${rotation}deg)`;

    const shapeElements = {
      cube: (
        <div
          className="relative"
          style={{
            width: size,
            height: size,
            transformStyle: "preserve-3d",
            animation: `spin ${duration} linear infinite`,
            animationDelay: delay,
            transform: `${transform} rotateX(45deg) rotateY(45deg)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-transparent border border-purple-500 opacity-30" />
          <div
            className="absolute inset-0 bg-gradient-to-br from-purple-500 to-transparent border border-purple-500 opacity-20"
            style={{ transform: "translateZ(20px)" }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-purple-500 to-transparent border border-purple-500 opacity-15"
            style={{ transform: "rotateY(90deg) translateZ(20px)" }}
          />
        </div>
      ),
      pyramid: (
        <div
          className="relative"
          style={{
            width: size,
            height: size,
            animation: `bounce ${duration} ease-in-out infinite`,
            animationDelay: delay,
            transform: transform,
          }}
        >
          <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[30px] border-l-transparent border-r-transparent border-b-cyan-400" />
        </div>
      ),
      sphere: (
        <div
          className="rounded-full bg-gradient-to-br opacity-30 animate-pulse border border-cyan-400"
          style={{
            width: size,
            height: size,
            background: `radial-gradient(circle, rgba(6, 182, 212, 0.4), transparent)`,
            animation: `pulse ${duration} ease-in-out infinite`,
            animationDelay: delay,
            transform: transform,
            boxShadow: `0 0 20px rgba(6, 182, 212, 0.2)`,
          }}
        />
      ),
    };

    return (
      <div
        className="absolute pointer-events-none"
        style={{
          left: x,
          top: y,
          zIndex: 1,
        }}
      >
        {shapeElements[shape]}
      </div>
    );
  };

  const GeometricPattern = ({ pattern, size, color, x, y, rotation }) => {
    const patterns = {
      hexagon: (
        <Hexagon
          size={size}
          className="opacity-20 animate-spin"
          style={{
            animationDuration: "20s",
            color: color,
            transform: `rotate(${rotation}deg) translate(${
              mousePosition.x * 15
            }px, ${mousePosition.y * 15}px)`,
          }}
        />
      ),
      star: (
        <Star
          size={size}
          className="opacity-25 animate-pulse"
          style={{
            color: color,
            transform: `rotate(${rotation}deg) translate(${
              mousePosition.x * 10
            }px, ${mousePosition.y * 10}px)`,
          }}
          fill="currentColor"
        />
      ),
      lightning: (
        <Zap
          size={size}
          className="opacity-30 animate-ping"
          style={{
            color: color,
            transform: `rotate(${rotation}deg) translate(${
              mousePosition.x * 12
            }px, ${mousePosition.y * 12}px)`,
          }}
          fill="currentColor"
        />
      ),
    };

    return (
      <div
        className="absolute pointer-events-none"
        style={{
          left: x,
          top: y,
          zIndex: 1,
        }}
      >
        {patterns[pattern]}
      </div>
    );
  };

  const socialLinks = [
    {
      icon: "💼",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/john-wesley-6707ab258/",
      color: "from-blue-500 to-blue-700",
      hoverColor: "hover:shadow-blue-500/50",
    },
    {
      icon: "🐱",
      label: "GitHub",
      url: "https://github.com/johnwesley755",
      color: "from-gray-600 to-gray-800",
      hoverColor: "hover:shadow-gray-500/50",
    },
    {
      icon: "🐦",
      label: "Twitter",
      url: "https://x.com/JohnWesley97513",
      color: "from-sky-400 to-sky-600",
      hoverColor: "hover:shadow-sky-500/50",
    },
    {
      icon: "📧",
      label: "Email",
      url: "mailto:johnwesley8113@gmail.com",
      color: "from-red-500 to-red-700",
      hoverColor: "hover:shadow-red-500/50",
    },
  ];

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden"
    >
      {/* Enhanced 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Floating Orbs */}
        <FloatingOrb
          size="500px"
          color="rgba(139, 92, 246, 0.15)"
          delay="0s"
          duration="8s"
        />
        <FloatingOrb
          size="350px"
          color="rgba(6, 182, 212, 0.12)"
          delay="2s"
          duration="12s"
        />
        <FloatingOrb
          size="280px"
          color="rgba(245, 158, 11, 0.1)"
          delay="4s"
          duration="10s"
        />
        <FloatingOrb
          size="200px"
          color="rgba(236, 72, 153, 0.08)"
          delay="6s"
          duration="15s"
        />

        {/* 3D Floating Shapes */}
        <Floating3DShape
          shape="cube"
          size="40px"
          color="#8b5cf6"
          delay="0s"
          duration="20s"
          x="10%"
          y="20%"
          rotation={0}
        />
        <Floating3DShape
          shape="sphere"
          size="60px"
          color="#06b6d4"
          delay="3s"
          duration="25s"
          x="80%"
          y="15%"
          rotation={45}
        />
        <Floating3DShape
          shape="pyramid"
          size="35px"
          color="#f59e0b"
          delay="6s"
          duration="18s"
          x="15%"
          y="70%"
          rotation={90}
        />
        <Floating3DShape
          shape="cube"
          size="30px"
          color="#ec4899"
          delay="9s"
          duration="22s"
          x="85%"
          y="75%"
          rotation={135}
        />
        <Floating3DShape
          shape="sphere"
          size="45px"
          color="#10b981"
          delay="12s"
          duration="16s"
          x="60%"
          y="10%"
          rotation={180}
        />
        <Floating3DShape
          shape="pyramid"
          size="25px"
          color="#f97316"
          delay="15s"
          duration="24s"
          x="25%"
          y="45%"
          rotation={270}
        />

        {/* Geometric Patterns */}
        <GeometricPattern
          pattern="hexagon"
          size={60}
          color="#8b5cf6"
          x="5%"
          y="60%"
          rotation={0}
        />
        <GeometricPattern
          pattern="star"
          size={40}
          color="#06b6d4"
          x="90%"
          y="40%"
          rotation={45}
        />
        <GeometricPattern
          pattern="lightning"
          size={35}
          color="#f59e0b"
          x="20%"
          y="80%"
          rotation={90}
        />
        <GeometricPattern
          pattern="hexagon"
          size={45}
          color="#ec4899"
          x="75%"
          y="25%"
          rotation={135}
        />
        <GeometricPattern
          pattern="star"
          size={50}
          color="#10b981"
          x="40%"
          y="5%"
          rotation={180}
        />
        <GeometricPattern
          pattern="lightning"
          size={30}
          color="#f97316"
          x="65%"
          y="90%"
          rotation={225}
        />

        {/* Animated Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: `translate(${mousePosition.x * 5}px, ${
              mousePosition.y * 5
            }px)`,
          }}
        />

        {/* Enhanced Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-20 animate-ping"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
              transform: `translate(${
                mousePosition.x * (Math.random() * 20 - 10)
              }px, ${mousePosition.y * (Math.random() * 20 - 10)}px)`,
            }}
          />
        ))}

        {/* Gradient Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gray-900/80 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-gray-700/50">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-300 text-sm">Let's Connect</span>
          </div>

          <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-6">
            Get In Touch
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? Let's create something amazing
            together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="relative">
            <div
              className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl relative overflow-hidden group"
              style={{
                transform: `perspective(1000px) rotateY(${
                  (mousePosition.x - 0.5) * 5
                }deg) rotateX(${(mousePosition.y - 0.5) * -5}deg)`,
              }}
            >
              {/* Form Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

              <div className="relative z-10">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 mb-6 animate-bounce">
                      <svg
                        className="h-10 w-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Message Sent! 🚀
                    </h3>
                    <p className="text-white/70">
                      Thanks for reaching out. I'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {submitError && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
                        <p className="text-red-400 text-sm">{submitError}</p>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-gray-300 font-medium text-sm">
                          Name
                        </label>
                        <div className="relative">
                          <input
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-4 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                            placeholder="Your name"
                            required
                          />
                          {errors.name && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.name}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-gray-300 font-medium text-sm">
                          Email
                        </label>
                        <div className="relative">
                          <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-4 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                            placeholder="your.email@example.com"
                            required
                          />
                          {errors.email && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-gray-300 font-medium text-sm">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-4 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm resize-none"
                        placeholder="Tell me about your project or just say hello..."
                        required
                      />
                      {errors.message && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={onSubmit}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full group relative bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white py-4 px-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50"
                    >
                      <span className="flex items-center justify-center gap-3">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            Send Message
                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0" />
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Info & Social Links */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid gap-6">
              {[
                {
                  icon: <Mail className="w-6 h-6" />,
                  label: "Email",
                  value: "johnwesley8113@gmail.com",
                  color: "from-red-500 to-pink-500",
                },
                {
                  icon: <MapPin className="w-6 h-6" />,
                  label: "Location",
                  value: "Chennai, Tamil Nadu, India",
                  color: "from-green-500 to-emerald-500",
                },
              ].map((contact, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${contact.color} shadow-lg group-hover:shadow-xl transition-all`}
                    >
                      {contact.icon}
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{contact.label}</p>
                      <p className="text-white font-semibold">
                        {contact.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Connect With Me
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredSocial(index)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    className={`group relative bg-gradient-to-r ${social.color} p-4 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-110 ${social.hoverColor} hover:shadow-2xl flex items-center gap-3`}
                  >
                    <span className="text-2xl">{social.icon}</span>
                    <span className="text-sm">{social.label}</span>

                    {hoveredSocial === index && (
                      <div className="absolute inset-0 bg-white/10 rounded-xl animate-pulse" />
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-300 font-semibold">
                  Available for Projects
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Currently accepting new clients and exciting collaborations.
                Let's build something incredible together!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
