import { useState, useEffect, useRef } from 'react';
import xboxGamePassBg from '@/assets/anime/xbox-gamepass.png';

export default function GamePassSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [animateCharacters, setAnimateCharacters] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Intersection Observer for animation triggers
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stagger character animations after section becomes visible
          setTimeout(() => setAnimateCharacters(true), 500);
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[600px] overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={xboxGamePassBg} 
          alt="Xbox Game Pass" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
      
      <div className="relative container mx-auto px-4 py-16 z-10">
        <div className="max-w-lg">
          {/* Animated heading with staggered letter reveal */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 overflow-hidden"
              style={{ fontFamily: "Arial, sans-serif" }}>
            {/* Animated individual letters */}
            {"Xbox Game Pass Ultimate".split('').map((char, index) => (
              <span 
                key={index}
                className="inline-block"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                  transition: `opacity 0.3s ease, transform 0.5s ease`,
                  transitionDelay: `${index * 0.03}s`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>
          
          {/* Animated description paragraph */}
          <p 
            className="text-lg text-white/90 mb-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
              transitionDelay: '0.4s',
              fontFamily: "Arial, sans-serif"
            }}
          >
            Discover hundreds of high-quality games, from blockbusters to indie gems. 
            Play on console, PC, or cloud with one subscription.
          </p>
          
          {/* Animated Call-to-action button with hover effects */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
              transitionDelay: '0.6s',
            }}
          >
            <button className="relative overflow-hidden px-8 py-3 bg-[#107C10] text-white rounded-md font-bold hover:bg-[#0B5D0B] transition-colors group">
              <span className="relative z-10" style={{ fontFamily: "Arial, sans-serif" }}>Join Xbox Game Pass</span>
              
              {/* Animated shine effect on hover */}
              <span className="absolute inset-0 w-full transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
              
              {/* Pulse animation on hover */}
              <span className="absolute inset-0 rounded bg-[#107C10] opacity-0 group-hover:animate-pulse-light"></span>
            </button>
          </div>
          
          {/* Floating game icons with animations */}
          <div className="absolute bottom-10 right-10 md:right-20 lg:right-40 flex items-center space-x-8">
            {/* Game character silhouettes */}
            <div 
              className="w-24 h-24 relative"
              style={{
                opacity: animateCharacters ? 1 : 0,
                transform: animateCharacters ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
                transitionDelay: '0.8s',
              }}
            >
              {/* Animated pulsing outline */}
              <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-pulse-border"></div>
              
              {/* Game icon */}
              <div className="w-full h-full rounded-full bg-blue-600/50 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
            </div>
            
            <div 
              className="w-24 h-24 relative"
              style={{
                opacity: animateCharacters ? 1 : 0,
                transform: animateCharacters ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
                transitionDelay: '1s',
              }}
            >
              {/* Animated pulsing outline */}
              <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-pulse-border delay-150"></div>
              
              {/* Game icon */}
              <div className="w-full h-full rounded-full bg-green-600/50 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
            </div>
            
            <div 
              className="w-24 h-24 relative"
              style={{
                opacity: animateCharacters ? 1 : 0,
                transform: animateCharacters ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
                transitionDelay: '1.2s',
              }}
            >
              {/* Animated pulsing outline */}
              <div className="absolute inset-0 rounded-full border-2 border-yellow-400 animate-pulse-border delay-300"></div>
              
              {/* Game icon */}
              <div className="w-full h-full rounded-full bg-yellow-600/50 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}