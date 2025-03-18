
/**
 * Animation utilities for the portfolio website
 */

// Split text into characters for animation
export const splitText = (text: string, selector: string) => {
  const element = document.querySelector(selector);
  if (!element) return;

  const chars = text.split('');
  const fragment = document.createDocumentFragment();

  chars.forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.classList.add('char');
    span.style.transitionDelay = `${index * 0.03}s`;
    fragment.appendChild(span);
  });

  element.innerHTML = '';
  element.appendChild(fragment);

  setTimeout(() => {
    document.querySelectorAll(`${selector} .char`).forEach(char => {
      (char as HTMLElement).style.opacity = '1';
      (char as HTMLElement).style.transform = 'translateY(0)';
    });
  }, 100);
};

// Reveal elements when they enter the viewport
export const setupIntersectionObserver = () => {
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

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });

  return observer;
};

// Create parallax effect based on mouse movement
export const parallaxEffect = (e: MouseEvent, elements: HTMLElement[], strength: number = 20) => {
  const { clientX, clientY } = e;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  
  const moveX = (clientX - centerX) / strength;
  const moveY = (clientY - centerY) / strength;
  
  elements.forEach(element => {
    const depth = parseFloat(element.getAttribute('data-depth') || '1');
    element.style.transform = `translate(${moveX * depth}px, ${moveY * depth}px)`;
  });
};

// Generate random particles in a container
export const generateParticles = (container: HTMLElement, count: number = 50) => {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    
    // Random positioning
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.className = 'absolute rounded-full bg-electric/30';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    
    container.appendChild(particle);
  }
};

// Custom cursor tracking
export const updateCustomCursor = (e: MouseEvent, cursor: HTMLElement) => {
  const { clientX, clientY } = e;
  
  // Apply smooth transition
  cursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
  
  // Check if hovering over interactive elements
  const target = e.target as HTMLElement;
  if (target.classList.contains('interactive') || 
      target.tagName === 'BUTTON' || 
      target.tagName === 'A' ||
      target.closest('button') ||
      target.closest('a')) {
    cursor.classList.add('cursor-expanded');
  } else {
    cursor.classList.remove('cursor-expanded');
  }
};
