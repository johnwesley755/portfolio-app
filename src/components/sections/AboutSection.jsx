import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skills = {
    Frontend: {
      items: [
        { name: "React", icon: "⚛️", color: "#61DAFB" },
        { name: "JavaScript", icon: "🟨", color: "#F7DF1E" },
        { name: "TypeScript", icon: "🔷", color: "#3178C6" },
        { name: "HTML5", icon: "🔶", color: "#E34F26" },
        { name: "CSS3", icon: "🎨", color: "#1572B6" },
        { name: "Tailwind", icon: "💨", color: "#06B6D4" },
      ],
      gradient: "from-blue-500 via-purple-500 to-pink-500",
    },
    Backend: {
      items: [
        { name: "Node.js", icon: "🟢", color: "#339933" },
        { name: "Express", icon: "⚡", color: "#000000" },
        { name: "Python", icon: "🐍", color: "#3776AB" },
        { name: "API Design", icon: "🔗", color: "#FF6B6B" },
        { name: "REST", icon: "📡", color: "#4ECDC4" },
      ],
      gradient: "from-green-500 via-emerald-500 to-teal-500",
    },
    Database: {
      items: [
        { name: "MongoDB", icon: "🍃", color: "#47A248" },
        { name: "MySQL", icon: "🐬", color: "#4479A1" },
        { name: "Firebase", icon: "🔥", color: "#FFCA28" },
      ],
      gradient: "from-purple-500 via-violet-500 to-indigo-500",
    },
    Tools: {
      items: [
        { name: "Git", icon: "📁", color: "#F05032" },
        { name: "GitHub", icon: "🐙", color: "#181717" },
        { name: "VS Code", icon: "💻", color: "#007ACC" },
        { name: "Figma", icon: "🎯", color: "#F24E1E" },
        { name: "Postman", icon: "📮", color: "#FF6C37" },
      ],
      gradient: "from-orange-500 via-red-500 to-pink-500",
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 100, opacity: 0, rotateX: -90 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 200,
        duration: 0.8,
      },
    },
  };

  const floatingAnimation = {
    y: [-20, 20, -20],
    rotate: [-5, 5, -5],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen bg-black relative overflow-hidden py-20"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Moving Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full blur-3xl"
          animate={floatingAnimation}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-pink-600/30 to-red-600/30 rounded-full blur-3xl"
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: -2 },
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-green-600/30 to-teal-600/30 rounded-full blur-3xl"
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: -4 },
          }}
        />

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse" />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-50, 50],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Hero Section */}
        <motion.div className="text-center mb-24" variants={itemVariants}>
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl opacity-50 rounded-full"
              animate={pulseAnimation}
            />
            <h1 className="text-7xl md:text-9xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent relative z-10 mb-8 tracking-tight">
              About Me
            </h1>
          </motion.div>

          <motion.div className="max-w-4xl mx-auto" variants={itemVariants}>
            <p className="text-2xl md:text-3xl text-gray-300 mb-8 leading-relaxed font-light">
              A passionate{" "}
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold">
                fresher developer
              </span>{" "}
              ready to create amazing digital experiences
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "💡 Creative",
                "🚀 Ambitious",
                "📚 Quick Learner",
                "🎯 Detail-Oriented",
              ].map((trait, i) => (
                <motion.span
                  key={trait}
                  className="px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full text-white font-medium border border-white/20"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(255,255,255,0.2)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.5 }}
                >
                  {trait}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left Column - Story */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <motion.div
              className="group relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-xl rounded-3xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative backdrop-blur-2xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl">
                <motion.div
                  className="flex items-center gap-4 mb-6"
                  whileHover={{ x: 10 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl shadow-xl">
                    🎓
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">
                      My Journey
                    </h3>
                    <p className="text-purple-300 text-sm">
                      From Student to Developer
                    </p>
                  </div>
                </motion.div>

                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  As a fresh graduate with a burning passion for technology,
                  I've dedicated countless hours to mastering modern web
                  development. From building my first "Hello World" to creating
                  responsive web applications, every line of code has been a
                  step forward in my journey.
                </p>

                <p className="text-gray-300 text-lg leading-relaxed">
                  I believe in learning by doing, staying curious, and never
                  settling for "good enough." My goal is to contribute to
                  meaningful projects while continuously growing as a developer.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="group relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-teal-600/20 blur-xl rounded-3xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative backdrop-blur-2xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl">
                <motion.div
                  className="flex items-center gap-4 mb-6"
                  whileHover={{ x: 10 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center text-3xl shadow-xl">
                    💭
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">
                      Philosophy
                    </h3>
                    <p className="text-blue-300 text-sm">Code with Purpose</p>
                  </div>
                </motion.div>

                <p className="text-gray-300 text-lg leading-relaxed">
                  I believe great software starts with understanding people's
                  needs. Clean code, intuitive design, and seamless user
                  experiences are not just goals—they're necessities. When I'm
                  not coding, I explore new technologies and contribute to
                  open-source projects.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Animated Stats */}
          <motion.div className="relative" variants={itemVariants}>
            <motion.div
              className="relative backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-12 border border-white/20 shadow-2xl"
              whileHover={{
                rotateY: 10,
                rotateX: 10,
                scale: 1.05,
              }}
              transition={{ type: "spring", stiffness: 200 }}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              <div className="grid grid-cols-2 gap-8">
                {[
                  {
                    number: "10+",
                    label: "Projects Built",
                    icon: "🚀",
                    color: "from-blue-400 to-purple-400",
                  },
                  {
                    number: "Fresh",
                    label: "& Motivated",
                    icon: "⭐",
                    color: "from-green-400 to-teal-400",
                  },
                  {
                    number: "10+",
                    label: "Technologies",
                    icon: "⚡",
                    color: "from-pink-400 to-red-400",
                  },
                  {
                    number: "24/7",
                    label: "Learning Mode",
                    icon: "🧠",
                    color: "from-orange-400 to-yellow-400",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center group"
                    whileHover={{
                      scale: 1.2,
                      z: 30,
                      rotateY: 15,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <motion.div
                      className="text-6xl mb-2 group-hover:animate-bounce"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: index * 0.1 + 0.5,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      {stat.icon}
                    </motion.div>
                    <div
                      className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
                    >
                      {stat.number}
                    </div>
                    <div className="text-gray-300 text-sm font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Floating Elements Around Stats */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  x: [-10, 10, -10],
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <motion.div
            className="text-center mb-16"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
              Tech Stack
            </h2>
            <p className="text-xl text-gray-400">Technologies I work with</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(
              ([category, { items, gradient }], categoryIndex) => (
                <motion.div
                  key={category}
                  className="group relative"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 15,
                    z: 50,
                  }}
                  transition={{ type: "spring", stiffness: 200 }}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-20 blur-xl rounded-3xl group-hover:opacity-30 group-hover:blur-2xl transition-all duration-500`}
                  />

                  <div className="relative backdrop-blur-2xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-300">
                    <motion.div
                      className="flex items-center gap-4 mb-8"
                      whileHover={{ x: 10 }}
                    >
                      <motion.div
                        className={`w-14 h-14 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-xl`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        {category.charAt(0)}
                      </motion.div>
                      <div>
                        <h4 className="text-2xl font-bold text-white">
                          {category}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {items.length} technologies
                        </p>
                      </div>
                    </motion.div>

                    <div className="space-y-4">
                      {items.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          className={`group/skill flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer ${
                            hoveredSkill === `${category}-${skill.name}`
                              ? `bg-gradient-to-r ${gradient} shadow-lg`
                              : "bg-white/5 hover:bg-white/10 border border-white/10"
                          }`}
                          onMouseEnter={() =>
                            setHoveredSkill(`${category}-${skill.name}`)
                          }
                          onMouseLeave={() => setHoveredSkill(null)}
                          whileHover={{
                            scale: 1.05,
                            x: 10,
                          }}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            transition: {
                              delay: categoryIndex * 0.1 + index * 0.05,
                              type: "spring",
                              stiffness: 300,
                            },
                          }}
                        >
                          <motion.span
                            className="text-2xl"
                            whileHover={{ scale: 1.3, rotate: 360 }}
                            transition={{ duration: 0.3 }}
                          >
                            {skill.icon}
                          </motion.span>
                          <span
                            className={`font-semibold ${
                              hoveredSkill === `${category}-${skill.name}`
                                ? "text-white"
                                : "text-gray-300"
                            }`}
                          >
                            {skill.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div className="text-center" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center gap-6 backdrop-blur-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-12 py-6 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 group cursor-pointer"
            whileHover={{
              scale: 1.1,
              rotateY: 10,
              boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-white font-bold text-xl">
              Let's Build Something Amazing Together!
            </span>
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl"
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-2xl">🚀</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
