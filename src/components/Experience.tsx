
import { useState, useRef, useEffect } from 'react';

interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeExperience, setActiveExperience] = useState<number>(1);
  const [isVisible, setIsVisible] = useState(false);
  
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      company: 'TechCorp Inc.',
      role: 'Senior Frontend Developer',
      period: '2022 - Present',
      description: 'Leading frontend development for enterprise applications, focusing on React and TypeScript implementations.',
      technologies: ['React', 'TypeScript', 'GraphQL', 'Tailwind CSS'],
      achievements: [
        'Reduced loading times by 40% through code optimization',
        'Implemented CI/CD pipeline that decreased deployment time by 60%',
        'Led team of 5 developers to successfully deliver major product overhaul'
      ]
    },
    {
      id: 2,
      company: 'Innovate Solutions',
      role: 'Full Stack Developer',
      period: '2020 - 2022',
      description: 'Developed and maintained web applications using MERN stack, focusing on performance and user experience.',
      technologies: ['MongoDB', 'Express', 'React', 'Node.js'],
      achievements: [
        'Built RESTful API serving 1M+ requests daily',
        'Designed and implemented database schema that improved query times by 30%',
        'Created developer documentation that improved onboarding time by 50%'
      ]
    },
    {
      id: 3,
      company: 'StartUp Labs',
      role: 'Junior Web Developer',
      period: '2018 - 2020',
      description: 'Participated in the development of web applications from conception to deployment, focusing on frontend implementations.',
      technologies: ['JavaScript', 'HTML/CSS', 'jQuery', 'PHP'],
      achievements: [
        'Contributed to 10+ client projects in various industries',
        'Built responsive layouts that improved mobile engagement by 25%',
        'Optimized legacy codebase resulting in 35% better performance'
      ]
    }
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  const currentExperience = experiences.find(exp => exp.id === activeExperience) || experiences[0];
  
  return (
    <section id="experience" ref={containerRef} className="section bg-dark">
      <div className="container mx-auto">
        <h2 className="section-title text-gradient">Work Experience</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12">
          {/* Timeline navigation */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="sticky top-24">
              <div className="space-y-2">
                {experiences.map((exp) => (
                  <button
                    key={exp.id}
                    onClick={() => setActiveExperience(exp.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-300 interactive ${
                      activeExperience === exp.id
                        ? 'bg-dark-200 border-l-2 border-electric'
                        : 'text-muted-foreground hover:bg-dark-200/50'
                    }`}
                  >
                    <div className="font-medium">{exp.company}</div>
                    <div className={`text-sm ${activeExperience === exp.id ? 'text-electric' : 'text-muted-foreground'}`}>
                      {exp.period}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Experience details */}
          <div 
            className={`md:col-span-8 lg:col-span-9 transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="bg-dark-200 p-8 rounded-lg border border-dark-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h3 className="text-2xl font-bold">{currentExperience.role}</h3>
                <div className="mt-2 md:mt-0 text-electric">{currentExperience.company}</div>
              </div>
              
              <p className="text-muted-foreground mb-6">
                {currentExperience.description}
              </p>
              
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {currentExperience.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 bg-dark-300 text-sm rounded-full text-electric/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-3">Key Achievements</h4>
                <ul className="space-y-2">
                  {currentExperience.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-electric mr-2">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
