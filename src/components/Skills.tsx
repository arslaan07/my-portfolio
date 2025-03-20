
import { useEffect, useRef, useState } from 'react';

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  icon: string;
}

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isVisible, setIsVisible] = useState(false);
  
  const skills: Skill[] = [
    { name: 'React', level: 90, category: 'frontend', icon: '⚛️' },
    { name: 'JavaScript', level: 85, category: 'frontend', icon: '🟨' },
    { name: 'HTML/CSS', level: 95, category: 'frontend', icon: '🌐' },
    { name: 'Node.js', level: 85, category: 'backend', icon: '🟢' },
    { name: 'Express', level: 80, category: 'backend', icon: '🚂' },
    { name: 'MongoDB', level: 75, category: 'backend', icon: '🍃' },
    { name: 'Git', level: 85, category: 'tools', icon: '🔄' },
    { name: 'Docker', level: 60, category: 'tools', icon: '🐳' },
    { name: 'AWS', level: 55, category: 'tools', icon: '☁️' },
    { name: 'UI/UX', level: 80, category: 'other', icon: '🎨' },
    // { name: 'TypeScript', level: 80, category: 'frontend', icon: '🔷' },
    // { name: 'SQL', level: 70, category: 'backend', icon: '📊' },
    
  ];
  
  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  const categories = [
    { id: 'all', name: 'All Skills' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'tools', name: 'Tools' },
    { id: 'other', name: 'Other' },
  ];
  
  return (
    <section id="skills" ref={containerRef} className="section bg-dark">
      <div className="container mx-auto">
        <h2 className="section-title text-gradient">Skills & Technologies</h2>
        
        <div className="flex flex-wrap gap-3 mb-12 justify-center md:justify-start">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 interactive ${
                activeCategory === category.id 
                  ? 'bg-electric text-dark font-medium' 
                  : 'bg-dark-200 text-muted-foreground hover:bg-dark-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <div 
              key={skill.name}
              className={`bg-dark-200 rounded-lg p-6 border border-dark-300 transition-all duration-500 hover:-translate-y-2 hover:border-electric/30 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${Math.min(index * 100, 1000)}ms` }}
            >
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{skill.icon}</span>
                <h3 className="text-lg font-medium">{skill.name}</h3>
              </div>
              
              <div className="w-full bg-dark-300 rounded-full h-2.5 mb-2">
                <div 
                  className="bg-electric h-2.5 rounded-full transition-all duration-1000 ease-out-soft"
                  style={{ 
                    width: isVisible ? `${skill.level}%` : '0%',
                    transitionDelay: `${100 + index * 100}ms`
                  }}
                ></div>
              </div>
              
              <div className="text-right text-sm text-muted-foreground">
                {skill.level}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
