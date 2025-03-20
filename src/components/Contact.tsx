
import { useState, useRef, useEffect } from 'react';
import { Mail, MessageSquare, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Thanks for your message! I\'ll get back to you soon.');
      setFormState({ name: '', email: '', message: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitMessage('');
      }, 5000);
    }, 1500);
  };
  
  return (
    <section id="contact" ref={containerRef} className="section bg-dark-100">
      <div className="container mx-auto">
        <h2 className="section-title text-gradient">Get In Touch</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <div 
            className={`transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h3 className="text-2xl font-bold mb-6">Let's Chat</h3>
            <p className="text-muted-foreground mb-8">
              Whether you have a project in mind, a question about my work, or just want to say hello, I'd love to hear from you. Fill out the form or reach out through any of the platforms below.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-dark-200 flex items-center justify-center">
                  <Mail className="text-electric" size={20} />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <a href="mailto:arslaanbanday5@gmail.com" className="hover:text-electric transition-colors duration-300">
                    hello@thelazyprogramr.xyz
                  </a>
                </div>
              </div>
              
              {/* <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-dark-200 flex items-center justify-center">
                  <MessageSquare className="text-electric" size={20} />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Discord</div>
                  <div>@thelazyprogramr</div>
                </div>
              </div> */}
              
              <div className="pt-8">
                <div className="text-sm text-muted-foreground mb-3">Follow me on</div>
                <div className="flex space-x-4">
                  <a 
                    href="https://github.com/arslaan07" 
                    className="w-10 h-10 rounded-full bg-dark-200 flex items-center justify-center hover:bg-electric/20 transition-colors duration-300 interactive"
                    aria-label="GitHub"
                  >
                    <Github size={18} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/arslaan-shakeel-aa5885209/" 
                    className="w-10 h-10 rounded-full bg-dark-200 flex items-center justify-center hover:bg-electric/20 transition-colors duration-300 interactive"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                  {/* <a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-dark-200 flex items-center justify-center hover:bg-electric/20 transition-colors duration-300 interactive"
                    aria-label="Twitter"
                  >
                    <Twitter size={18} />
                  </a> */}
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className={`transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <form onSubmit={handleSubmit} className="bg-dark-200 p-8 rounded-lg border border-dark-300">
              {submitMessage ? (
                <div className="text-center py-8">
                  <div className="text-electric text-xl mb-2">Message Sent!</div>
                  <p className="text-muted-foreground">{submitMessage}</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-sm text-muted-foreground mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-dark-300 border border-dark-300 rounded-md px-4 py-3 text-white focus:border-electric focus:outline-none transition-colors duration-300"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-dark-300 border border-dark-300 rounded-md px-4 py-3 text-white focus:border-electric focus:outline-none transition-colors duration-300"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm text-muted-foreground mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full bg-dark-300 border border-dark-300 rounded-md px-4 py-3 text-white focus:border-electric focus:outline-none transition-colors duration-300"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-3 text-center interactive flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <span className="inline-block w-5 h-5 border-2 border-electric border-t-transparent rounded-full animate-spin mr-2"></span>
                    ) : null}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
