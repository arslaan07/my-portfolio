
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent body scrolling when menu is open
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
      document.body.style.overflow = 'auto';
    }
  };
  
  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? 'py-3 glass' : 'py-6 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a 
            href="#hero" 
            className="text-2xl font-bold text-purple hover:animate-glow transition-all duration-300"
          >
            theLazyProgramR<span className="text-white">.</span>
          </a>
          
          <nav className="hidden md:flex space-x-8">
            {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-muted-foreground hover:text-purple transition-colors duration-300 interactive relative group px-2 py-1"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-purple transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>
          
          <button 
            className="md:hidden text-purple interactive z-50"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={24} className="animate-fade-in" />
            ) : (
              <Menu size={24} className="animate-fade-in" />
            )}
          </button>
        </div>
      </header>
      
      {/* Mobile menu */}
      <div 
        className={`fixed inset-0 bg-dark z-40 flex flex-col items-center justify-center transition-transform duration-500 ease-out-soft ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col space-y-8 items-center">
          {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-2xl text-muted-foreground hover:text-purple transition-colors duration-300 interactive"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
