import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import resumePdf from "../../assets/resume.pdf";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },

    { name: "Contact", href: "#contact" },
    { name: "Resume", href: resumePdf, download: true },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, staggerChildren: 0.05 },
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? theme === "dark"
            ? "bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/50"
            : "bg-white/80 backdrop-blur-lg border-b border-gray-200/50"
          : "bg-transparent"
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="#home"
              className={`text-2xl font-bold bg-gradient-to-r ${
                theme === "dark"
                  ? "from-blue-400 via-purple-500 to-pink-500"
                  : "from-blue-600 via-purple-600 to-pink-600"
              } bg-clip-text text-transparent hover:animate-pulse transition-all duration-300`}
            >
              John Wesley
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden lg:flex items-center space-x-2"
            variants={itemVariants}
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <a
                  href={link.href}
                  download={link.download}
                  onClick={() => setActiveLink(link.name)}
                  className={`relative px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeLink === link.name
                      ? theme === "dark"
                        ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30"
                        : "text-gray-900 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20"
                      : theme === "dark"
                      ? "text-gray-300 hover:text-white hover:bg-gray-800/50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                  } group overflow-hidden`}
                >
                  <span className="relative z-10">{link.name}</span>
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${
                      theme === "dark"
                        ? "from-blue-500/10 to-purple-500/10"
                        : "from-blue-500/5 to-purple-500/5"
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    layoutId={
                      activeLink === link.name ? "activeTab" : undefined
                    }
                  />
                </a>
              </motion.div>
            ))}
          </motion.nav>

          {/* Mobile Menu Button */}
          <motion.div
            className="lg:hidden flex items-center space-x-2"
            variants={itemVariants}
          >
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-full transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {mobileMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </motion.div>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className={`lg:hidden overflow-hidden ${
                theme === "dark"
                  ? "bg-gray-800/95 backdrop-blur-lg border-t border-gray-700/50"
                  : "bg-white/95 backdrop-blur-lg border-t border-gray-200/50"
              } mt-4 rounded-xl`}
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.nav className="py-4 px-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    variants={mobileItemVariants}
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <a
                      href={link.href}
                      download={link.download}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setActiveLink(link.name);
                      }}
                      className={`block px-4 py-3 my-1 rounded-lg font-medium transition-all duration-300 ${
                        activeLink === link.name
                          ? theme === "dark"
                            ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-l-4 border-blue-500"
                            : "text-gray-900 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-l-4 border-blue-500"
                          : theme === "dark"
                          ? "text-gray-300 hover:text-white hover:bg-gray-700/50 hover:border-l-4 hover:border-gray-600"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 hover:border-l-4 hover:border-gray-300"
                      }`}
                    >
                      {link.name}
                    </a>
                  </motion.div>
                ))}
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
