
import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Make cursor visible once component has mounted
    // This prevents cursor from showing during SSR
    setIsVisible(true);
    
    const cursor = cursorRef.current;
    const cursorOuter = cursorOuterRef.current;
    
    if (!cursor || !cursorOuter) return;
    
    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Move inner cursor with no delay (position at center of cursor)
      cursor.style.left = `${clientX}px`;
      cursor.style.top = `${clientY}px`;
      
      // Move outer cursor with slight delay for trailing effect
      cursorOuter.style.left = `${clientX}px`;
      cursorOuter.style.top = `${clientY}px`;
      
      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || 
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.classList.contains('interactive')) {
        cursor.classList.add('scale-150');
        cursorOuter.classList.add('scale-0');
      } else {
        cursor.classList.remove('scale-150');
        cursorOuter.classList.remove('scale-0');
      }
    };
    
    const hideCursor = () => {
      cursor.classList.add('opacity-0');
      cursorOuter.classList.add('opacity-0');
    };
    
    const showCursor = () => {
      cursor.classList.remove('opacity-0');
      cursorOuter.classList.remove('opacity-0');
    };
    
    // Event listeners
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', showCursor);
    document.addEventListener('mouseleave', hideCursor);
    
    // Mobile check - hide custom cursor on touch devices
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      cursor.style.display = 'none';
      cursorOuter.style.display = 'none';
    }
    
    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', showCursor);
      document.removeEventListener('mouseleave', hideCursor);
    };
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed w-5 h-5 rounded-full bg-purple pointer-events-none z-50 mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div 
        ref={cursorOuterRef}
        className="fixed w-10 h-10 rounded-full border border-purple/30 pointer-events-none z-40"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
};

export default CustomCursor;
