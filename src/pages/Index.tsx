
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import CustomCursor from '../components/CustomCursor';
import ParticleBackground from '../components/ParticleBackground';

const Index = () => {
  useEffect(() => {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId || '');
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Optional: Add scroll animation for elements
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <main className="relative w-full min-h-screen">
      {/* Background particle effect */}
      <ParticleBackground />
      
      {/* Custom cursor */}
      <CustomCursor />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content sections */}
      <Hero />
      <About />
      <Skills />
      <Projects />
      {/* <Experience /> */}
      <Contact />
      
      {/* Footer */}
      <footer className="bg-dark py-8 border-t border-dark-300">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} theLazyProgramR. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Designed and built with passion and precision.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
