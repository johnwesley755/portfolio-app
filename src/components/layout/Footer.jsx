import { Github, Linkedin, Twitter, Mail, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-white text-lg font-semibold">John Wesley</h2>
          <p className="text-sm mt-1">
            Creating meaningful digital experiences 💡
          </p>
          <p className="text-xs mt-2 text-gray-500">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Right Section - Social Links */}
        <div className="flex space-x-5">
          <a
            href="https://github.com/johnwesley755"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition transform hover:scale-110"
          >
            <Github size={22} />
          </a>
          <a
            href="https://www.linkedin.com/in/john-wesley-6707ab258/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition transform hover:scale-110"
          >
            <Linkedin size={22} />
          </a>
          <a
            href="https://x.com/JohnWesley97513"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition transform hover:scale-110"
          >
            <Twitter size={22} />
          </a>
          <a
            href="mailto:johnwesley8113@gmail.com"
            className="text-gray-400 hover:text-white transition transform hover:scale-110"
          >
            <Mail size={22} />
          </a>
       
        </div>
      </div>
    </footer>
  );
};

export default Footer;
