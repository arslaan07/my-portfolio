
import { useState, useRef, useEffect } from 'react';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
}

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const projects: Project[] = [
    {
      id: 1,
      title: 'Spark-app',
      description: "Help your followers discover everything you're sharing all over the internet, in one simple place. They'll thank you for it!",
      image: './dashborad-analytics.png',
      tags: ['React', 'Node.js', 'MongoDB', 'Express.js, Redux'],
      demoUrl: 'https://myspark.netlify.app/',
      githubUrl: 'https://github.com/arslaan07/spark-app',
      featured: true,
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A productivity application for managing tasks and projects. Built with React and Firebase, featuring real-time updates, drag-and-drop functionality, and team collaboration.',
      image: './pro.png',
      tags: ['React', 'Node.js', 'MongoDB', 'Express.js, Redux'],
      demoUrl: 'https://mykitly.netlify.app/',
      githubUrl: 'https://github.com/arslaan07/mini-link-mgmt',
      featured: true,
    },
    // {
    //   id: 3,
    //   title: 'Weather Dashboard',
    //   description: 'An interactive weather application that provides real-time weather data and forecasts. Utilizes the OpenWeatherMap API and features geolocation, search functionality, and detailed weather metrics.',
    //   image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
    //   tags: ['React', 'API Integration', 'Chart.js'],
    //   demoUrl: '#',
    //   githubUrl: '#',
    //   featured: false,
    // },
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
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, projectId: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  };
  
  return (
    <section id="projects" ref={containerRef} className="section bg-dark-100">
      <div className="container mx-auto">
        <h2 className="section-title text-gradient">Featured Projects</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {projects.filter(p => p.featured).map((project, index) => (
            <div
              key={project.id}
              className={`project-card relative overflow-hidden rounded-lg bg-dark-200 h-[30rem] preserve-3d transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseMove={(e) => handleMouseMove(e, project.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-90"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 z-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs bg-dark/70 backdrop-blur-sm rounded text-electric">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
                <p className="text-muted-foreground mb-6">{project.description}</p>
                
                <div className="flex space-x-4">
                  <a 
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary py-2 px-4 inline-flex items-center space-x-2 interactive"
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={16} />
                  </a>
                  
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-4 border border-white/10 text-muted-foreground hover:text-white hover:border-white/30 rounded-sm transition-all duration-300 inline-flex items-center space-x-2 interactive"
                  >
                    <span>Code</span>
                    <Github size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16">
          {/* <h3 className="text-xl mb-8">Other Projects</h3> */}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.filter(p => !p.featured).map((project, index) => (
              <div
                key={project.id}
                className={`bg-dark-200 rounded-lg p-6 border border-dark-300 transition-all duration-500 hover:-translate-y-2 hover:border-electric/30 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <h3 className="text-lg font-medium mb-3">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs bg-dark-300 rounded text-electric/80">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <a 
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-electric hover:underline flex items-center space-x-1 interactive"
                  >
                    <span>View Project</span>
                    <ArrowRight size={14} />
                  </a>
                  
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-white transition-colors duration-300 interactive"
                  >
                    <Github size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
