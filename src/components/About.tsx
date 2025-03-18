
import { useEffect, useRef } from 'react';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
        
    // Reduce threshold to make it easier to trigger
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.05, // Reduced from 0.1
    };
        
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('About section is intersecting!'); // Add this for debugging
          container.querySelectorAll('.reveal').forEach((el, index) => {
            setTimeout(() => {
              el.classList.remove('opacity-0'); // Make sure to remove opacity-0
              el.classList.add('animate-fade-in-up');
            }, index * 100);
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
        
    observer.observe(container);
        
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <section id="about" ref={containerRef} className="section bg-dark-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="reveal opacity-0">
            <h2 className="section-title text-gradient">About Me</h2>
            
            <p className="text-lg mb-6 text-muted-foreground">
              I'm a passionate full-stack developer with a knack for crafting clean, efficient, and user-centric solutions. My journey in tech started with a simple "Hello World" and has evolved into building complex, scalable applications.
            </p>
            
            <p className="text-lg mb-8 text-muted-foreground">
              When I'm not immersed in code, you can find me exploring the latest tech trends, contributing to open-source, or solving complex problems. I believe in writing code that not only works but is also maintainable and elegant.
            </p>
            
            <div className="flex flex-wrap gap-3 mt-6">
              {['Problem Solver', 'Clean Code Advocate', 'Performance Optimizer', 'UI/UX Enthusiast'].map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-dark-200 text-sm rounded-full border border-dark-300 text-electric/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="relative perspective reveal opacity-0">
            <div className="bg-dark-200 rounded-lg border border-dark-300 p-6 shadow-lg preserve-3d rotate-y-3 rotate-x-3 transition-transform duration-300 hover:rotate-y-6 hover:rotate-x-6">
              <h3 className="text-xl font-bold mb-4 text-electric">My Tech Journey</h3>
              
              <div className="space-y-4">
                {[
                  { year: '2020', event: 'Started learning web development' },
                  { year: '2021', event: 'Built first full-stack application' },
                  { year: '2022', event: 'Joined tech startup as developer' },
                  { year: '2023', event: 'Led team to build innovative product' },
                  { year: 'Now', event: 'Working on cutting-edge projects' }
                ].map((item, index) => (
                  <div key={index} className="flex">
                    <div className="w-20 font-mono text-electric/70">{item.year}</div>
                    <div className="flex-1">{item.event}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-32 h-32 border border-electric/20 rounded-lg opacity-50 -z-10"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-electric/20 rounded-lg opacity-50 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
