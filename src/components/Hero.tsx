
import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { splitText } from '../utils/animation';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    if (loaded) return;
    
    // Initialize text animation after component mount
    setTimeout(() => {
      splitText('I craft exceptional digital experiences', '.hero-title');
      
      // Apply direct animation to subtitle instead of using splitText
      const subtitleElement = document.querySelector('.hero-subtitle');
      if (subtitleElement) {
        const text = "Full-Stack Developer";
        subtitleElement.innerHTML = '';
        
        // Create letter spans with the lightning effect
        for (let i = 0; i < text.length; i++) {
          const charSpan = document.createElement('span');
          charSpan.textContent = text[i] === ' ' ? '\u00A0' : text[i];
          charSpan.classList.add('lightning-char');
          charSpan.style.animationDelay = `${i * 0.1}s`;
          subtitleElement.appendChild(charSpan);
        }
      }
      
      setLoaded(true);
    }, 500);
    
    // Terminal typing effect
    const terminalText = document.querySelector('.terminal-text');
    if (terminalText) {
      const text = "const developer = {\n  name: 'theLazyProgramR',\n  skills: ['react', 'node', 'mongo, express, js, c++'],\n  passion: 'creating clean, efficient code',\n  status: 'available for projects'\n};";
      let index = 0;
      
      const typeText = () => {
        if (index < text.length) {
          if (text.charAt(index) === '\n') {
            terminalText.textContent += '<br>';
            const lineBreak = document.createElement('br');
            terminalText.appendChild(lineBreak);
          } else {
            terminalText.textContent += text.charAt(index);
          }
          index++;
          setTimeout(typeText, Math.random() * 50 + 20);
        } else {
          const cursor = document.querySelector('.cursor');
          if (cursor) cursor.classList.add('animate-glow');
        }
      };
      
      setTimeout(typeText, 1000);
    }
  }, [loaded]);
  
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-dark-100 bg-opacity-50">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark"></div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-16 z-10 flex flex-col items-center">
        <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/2 order-2 md:order-1 mt-10 md:mt-0 text-center md:text-left">
            <div className="mb-4">
              <span className="inline-block py-1 px-3 rounded-full border border-purple/30 text-sm text-purple mb-4 animate-fade-in">
                Hello world!
              </span>
            </div>
            
            {/* <h1 className="hero-title text-3xl md:text-5xl font-bold mb-4 leading-tight">
              I craft exceptional digital experiences
            </h1> */}
            
            <h2 className="hero-subtitle text-xl md:text-2xl text-purple mt-3 mb-6 lightning-text-container">
              Full-Stack Developer
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">
              <button className="btn-primary interactive animate-fade-in" style={{ animationDelay: '1s' }}>
                View Projects
              </button>
              <button 
                className="px-6 py-3 text-muted-foreground hover:text-white transition-colors duration-300 interactive animate-fade-in" 
                style={{ animationDelay: '1.2s' }}
                onClick={scrollToAbout}
              >
                About Me
              </button>
            </div>
          </div>
          
          <div className="md:w-1/2 order-1 md:order-2 flex justify-center">
            <div className="terminal-container bg-dark-200 rounded-lg border border-dark-300 w-full max-w-md p-4 shadow-lg animate-fade-in">
              <div className="terminal-header flex items-center mb-4">
                <div className="w-3 h-3 bg-accent1 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-purple rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-accent2 rounded-full"></div>
                <div className="ml-4 text-xs text-muted-foreground">theLazyProgramR@portfolio:~</div>
              </div>
              <div className="terminal-body font-mono text-sm text-white">
                <div className="terminal-line flex">
                  <span className="text-accent2 mr-2">$</span>
                  <span className="terminal-text"></span>
                  <span className="cursor opacity-0 animate-breathe">|</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button onClick={scrollToAbout} className="interactive text-purple opacity-75 hover:opacity-100 transition-opacity duration-300">
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
