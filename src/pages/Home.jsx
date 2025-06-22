import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import SkillsSection from "../components/sections/SkillsSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import ContactSection from "../components/sections/ContactSection";

const Home = () => {
  return (
    <div className="container mx-auto">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />

      <ExperienceSection />

      <ContactSection />
    </div>
  );
};

export default Home;
