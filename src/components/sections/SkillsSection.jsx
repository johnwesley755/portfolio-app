import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "HTML", level: 90 },
      { name: "CSS", level: 85 },
      { name: "JavaScript", level: 85 },
      { name: "React", level: 80 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Framer Motion", level: 75 },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 75 },
      { name: "Express", level: 70 },
      { name: "Firebase", level: 80 },
      { name: "MongoDB", level: 65 },
      { name: "REST API", level: 80 },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", level: 85 },
      { name: "Figma", level: 75 },
      { name: "VS Code", level: 90 },
      { name: "Postman", level: 80 },
    ],
  },
  {
    name: "Languages",
    skills: [
      { name: "JavaScript", level: 85 },
      { name: "Python", level: 70 },
      { name: "C", level: 60 },
    ],
  },
];

const SkillBar = ({ skill, index, isInView }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span>{skill.name}</span>
        <span>{skill.level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: 0.1 * index }}
        />
      </div>
    </div>
  );
};

const SkillCategory = ({ category, index, isInView }) => {
  return (
    <motion.div
      className="bg-card p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
      {category.skills.map((skill, skillIndex) => (
        <SkillBar 
          key={skill.name} 
          skill={skill} 
          index={skillIndex} 
          isInView={isInView} 
        />
      ))}
    </motion.div>
  );
};

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          ref={sectionRef}
        >
          Skills & Technologies
        </motion.h2>
        
        <motion.p 
          className="text-center text-muted-foreground max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Here's an overview of my technical skills and the technologies I work with.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCategory 
              key={category.name} 
              category={category} 
              index={index} 
              isInView={isInView} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;