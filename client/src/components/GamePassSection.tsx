import { useState, useEffect, useRef } from 'react';
import xboxGamePassBg from '@/assets/anime/xbox-gamepass.png';

export default function GamePassSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [animateCharacters, setAnimateCharacters] = useState(false);
  const [playParticles, setPlayParticles] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Intersection Observer for animation triggers
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stagger character animations after section becomes visible
          setTimeout(() => setAnimateCharacters(true), 500);
          setTimeout(() => setPlayParticles(true), 1200);
        } else {
          // Reset animations when section is out of view for better re-entry experience
          setIsVisible(false);
          setAnimateCharacters(false);
          setPlayParticles(false);
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
  
  // Generate random particles for background effect
  const particles = Array.from({ length: 12 }).map((_, i) => {
    const size = Math.floor(Math.random() * 6) + 2;
    const posX = Math.floor(Math.random() * 100);
    const posY = Math.floor(Math.random() * 100);
    const duration = Math.floor(Math.random() * 8) + 4;
    const delay = Math.random() * 5;
    
    return { id: i, size, posX, posY, duration, delay };
  });
  
  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[650px] overflow-hidden"
    >
      {/* Background image with parallax effect */}
      <div 
        className="absolute inset-0 w-full h-full transition-transform duration-1000 ease-out"
        style={{
          transform: isVisible ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 8s cubic-bezier(0.25, 0.1, 0.25, 1)'
        }}
      >
        <img 
          src={xboxGamePassBg} 
          alt="Xbox Game Pass" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Animated particles */}
      {playParticles && particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white/30 animate-float pointer-events-none"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.posX}%`,
            top: `${particle.posY}%`,
            opacity: 0,
            animation: `float ${particle.duration}s ease-in-out infinite, appear 0.8s forwards`,
            animationDelay: `${particle.delay}s`,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)',
            filter: 'blur(1px)'
          }}
        />
      ))}
      
      {/* Advanced gradient overlay with animated transition */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.1) 100%)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1s ease-out'
        }}
      ></div>
      
      {/* Subtle animated light rays */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {Array.from({ length: 3 }).map((_, i) => (
          <div 
            key={i}
            className="absolute animate-pulse-light"
            style={{
              width: '150%',
              height: '5px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
              top: `${30 + i * 20}%`,
              left: '-25%',
              transform: `rotate(${-20 + i * 15}deg)`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>
      
      <div className="relative container mx-auto px-4 py-16 z-10">
        <div className="max-w-lg">
          {/* 3D-like animated heading with staggered letter reveal */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 overflow-hidden"
              style={{ 
                fontFamily: "Arial, sans-serif",
                textShadow: isVisible ? "0 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(0,120,215,0.3)" : "none",
                transition: "text-shadow 1s ease-out"
              }}>
            {/* Animated individual letters with 3D transform */}
            {"Xbox Game Pass Ultimate".split('').map((char, index) => (
              <span 
                key={index}
                className="inline-block hover-3d"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0) rotateX(0)' : 'translateY(50px) rotateX(90deg)',
                  transition: `opacity 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)`,
                  transitionDelay: `${index * 0.03}s`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>
          
          {/* Animated description paragraph with character reveal animation */}
          <p 
            className="text-lg text-white/90 mb-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
              transitionDelay: '0.5s',
              fontFamily: "Arial, sans-serif",
              textShadow: "0 1px 2px rgba(0,0,0,0.5)"
            }}
          >
            Discover hundreds of high-quality games, from blockbusters to indie gems. 
            Play on console, PC, or cloud with one subscription.
          </p>
          
          {/* Enhanced Call-to-action button with professional hover effects */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
              transitionDelay: '0.7s',
            }}
            className="relative"
          >
            <button className="relative overflow-hidden px-8 py-3 bg-[#107C10] text-white rounded-md font-bold hover:bg-[#0B5D0B] transition-colors duration-300 group hover-glow">
              <span className="relative z-10 tracking-wide" style={{ fontFamily: "Arial, sans-serif" }}>
                Join Xbox Game Pass
              </span>
              
              {/* Professional shine effect on hover */}
              <span className="absolute inset-0 w-full transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>
              
              {/* Advanced scale effect */}
              <span className="absolute inset-0 scale-0 group-hover:scale-100 rounded bg-white/10 transition-transform duration-500 ease-out origin-center"></span>
            </button>
            
            {/* Professional button shadow and glow effect */}
            <div className="absolute -inset-1 rounded-lg blur-sm bg-gradient-to-r from-[#0B5D0B]/20 to-[#107C10]/40 -z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
          </div>
          
          {/* Enhanced floating game icons with 3D animations */}
          <div className="absolute bottom-10 right-10 md:right-20 lg:right-40 flex items-center space-x-8">
            {/* Game character silhouettes with enhanced animations */}
            <div 
              className="w-24 h-24 relative hover-3d"
              style={{
                opacity: animateCharacters ? 1 : 0,
                transform: animateCharacters ? 'translateY(0) rotate(0deg)' : 'translateY(20px) rotate(-5deg)',
                transition: 'opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transitionDelay: '0.8s',
              }}
            >
              {/* Multiple layered animated outlines */}
              <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-pulse-border"></div>
              <div className="absolute inset-2 rounded-full border-1 border-blue-300 animate-pulse-border delay-150"></div>
              
              {/* Game icon with inner glow */}
              <div className="w-full h-full rounded-full bg-blue-600/50 flex items-center justify-center shadow-lg hover:shadow-blue-500/50 transition-shadow duration-300">
                <span className="text-2xl font-bold text-white animate-pulse-light">1</span>
              </div>
            </div>
            
            <div 
              className="w-24 h-24 relative hover-3d"
              style={{
                opacity: animateCharacters ? 1 : 0,
                transform: animateCharacters ? 'translateY(0) rotate(0deg)' : 'translateY(20px) rotate(5deg)',
                transition: 'opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transitionDelay: '1s',
              }}
            >
              {/* Multiple layered animated outlines */}
              <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-pulse-border delay-150"></div>
              <div className="absolute inset-2 rounded-full border-1 border-green-300 animate-pulse-border delay-300"></div>
              
              {/* Game icon with inner glow */}
              <div className="w-full h-full rounded-full bg-green-600/50 flex items-center justify-center shadow-lg hover:shadow-green-500/50 transition-shadow duration-300">
                <span className="text-2xl font-bold text-white animate-pulse-light delay-150">2</span>
              </div>
            </div>
            
            <div 
              className="w-24 h-24 relative hover-3d"
              style={{
                opacity: animateCharacters ? 1 : 0,
                transform: animateCharacters ? 'translateY(0) rotate(0deg)' : 'translateY(20px) rotate(-5deg)',
                transition: 'opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transitionDelay: '1.2s',
              }}
            >
              {/* Multiple layered animated outlines */}
              <div className="absolute inset-0 rounded-full border-2 border-yellow-400 animate-pulse-border delay-300"></div>
              <div className="absolute inset-2 rounded-full border-1 border-yellow-300 animate-pulse-border delay-150"></div>
              
              {/* Game icon with inner glow */}
              <div className="w-full h-full rounded-full bg-yellow-600/50 flex items-center justify-center shadow-lg hover:shadow-yellow-500/50 transition-shadow duration-300">
                <span className="text-2xl font-bold text-white animate-pulse-light delay-300">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Play console animation - subtle floating effect */}
      <div 
        className="absolute bottom-6 left-6 md:bottom-8 md:left-8 opacity-0"
        style={{
          opacity: animateCharacters ? 0.8 : 0,
          transform: animateCharacters ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 1s ease, transform 1s ease',
          transitionDelay: '1.5s',
          animation: animateCharacters ? 'float 3s ease-in-out infinite' : 'none',
          animationDelay: '1.5s'
        }}
      >
        <div className="w-32 h-10 md:w-40 md:h-12 bg-black/50 rounded-lg backdrop-blur-sm flex items-center justify-center px-3 border border-white/20">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
          <span className="text-white text-xs md:text-sm font-medium">Console Ready</span>
        </div>
      </div>
    </section>
  );
}