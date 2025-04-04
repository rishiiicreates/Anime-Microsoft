import { useEffect, useState, useRef } from "react";

// Import anime-themed assets
import animeBackgroundSrc from "../assets/anime/anime-bg.png";
import animeCharacterSrc from "../assets/anime/anime-character.svg";

export default function HeroBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const bannerRef = useRef<HTMLElement>(null);
  const sparkleInterval = useRef<NodeJS.Timeout | null>(null);
  const [sparkles, setSparkles] = useState<Array<{id: number, x: number, y: number, size: number, color: string}>>([]);
  const nextSparkleId = useRef(0);
  const [typedText, setTypedText] = useState("");
  const fullText = "Join us as we celebrate our journey since 1975";
  const [textIndex, setTextIndex] = useState(0);

  // Handle initial visibility animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle typewriter text effect
  useEffect(() => {
    if (isVisible && textIndex < fullText.length) {
      const typingTimer = setTimeout(() => {
        setTypedText(prev => prev + fullText.charAt(textIndex));
        setTextIndex(textIndex + 1);
      }, 100);
      
      return () => clearTimeout(typingTimer);
    }
  }, [isVisible, textIndex, fullText]);

  // Handle parallax effect with mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (bannerRef.current) {
        const rect = bannerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({
          x: (x / rect.width) - 0.5,
          y: (y / rect.height) - 0.5
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Create random sparkle effect throughout the banner - anime style
  useEffect(() => {
    const createSparkle = () => {
      const id = nextSparkleId.current;
      nextSparkleId.current++;
      
      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Random size between 5-20px
      const size = 5 + Math.random() * 15;
      
      // Random color - anime themed colors
      const colors = ["#ff6b9e", "#9370DB", "#8a2be2", "#50e3c2", "#4a90e2", "#ffde59"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      setSparkles(current => [...current, { id, x, y, size, color }]);
      
      // Remove sparkle after animation duration
      setTimeout(() => {
        setSparkles(current => current.filter(sparkle => sparkle.id !== id));
      }, 2000);
    };
    
    // Create new sparkles at random intervals - more anime-like effect
    sparkleInterval.current = setInterval(() => {
      if (Math.random() > 0.3) { // Increased frequency for more anime feel
        createSparkle();
      }
    }, 200);
    
    return () => {
      if (sparkleInterval.current) {
        clearInterval(sparkleInterval.current);
      }
    };
  }, []);

  return (
    <section 
      ref={bannerRef}
      className="relative overflow-hidden min-h-[700px] flex items-center"
      style={{ 
        background: "linear-gradient(135deg, #9370DB, #8a2be2, #ff6b9e)",
        backgroundSize: "200% 200%",
        animation: "gradient-shift 10s ease infinite"
      }}
    >
      {/* Anime-styled background */}
      <div className="absolute inset-0 w-full h-full" style={{ opacity: 0.6 }}>
        <img src={animeBackgroundSrc} alt="Anime Background" className="w-full h-full object-cover" />
      </div>
      
      {/* Random sparkles - anime style stars */}
      {sparkles.map(sparkle => (
        <div 
          key={sparkle.id}
          className="absolute animate-sparkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            zIndex: 2
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill={sparkle.color} />
          </svg>
        </div>
      ))}
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text content section */}
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            {/* Main heading with anime styling */}
            <h1 
              className={`text-4xl md:text-6xl font-bold text-white mb-6 font-['Comic_Neue',cursive] transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
              style={{ 
                textShadow: "0 0 10px #ff6b9e, 0 0 20px #8a2be2, 0 0 30px #4a90e2",
                transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`
              }}
            >
              <div className="inline-block relative">
                <span className="relative z-10 block">
                  <span className="inline-block animate-float-slow">C</span>
                  <span className="inline-block animate-float-reverse" style={{ animationDelay: "0.1s" }}>h</span>
                  <span className="inline-block animate-float-fast" style={{ animationDelay: "0.2s" }}>e</span>
                  <span className="inline-block animate-float" style={{ animationDelay: "0.3s" }}>e</span>
                  <span className="inline-block animate-float-slow" style={{ animationDelay: "0.4s" }}>r</span>
                  <span className="inline-block animate-float-reverse" style={{ animationDelay: "0.5s" }}>s</span>
                </span>
                {/* Anime-style duplicated text for glow effect */}
                <span className="absolute top-0 left-0 z-0 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500" style={{ filter: 'blur(8px)', opacity: 0.8 }}>
                  Cheers
                </span>
              </div>
              
              <div className="inline-block mx-3">to</div>
              
              <div className="inline-block relative">
                <span className="relative z-10 inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 animate-pulse" style={{ animationDuration: '3s' }}>
                  50 years
                </span>
                {/* Anime-style duplicated text for glow effect */}
                <span className="absolute top-0 left-0 z-0 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500" style={{ filter: 'blur(12px)', opacity: 0.8 }}>
                  50 years
                </span>
              </div>
            </h1>
            
            {/* Typewriter effect text - common in anime */}
            <div className="relative mb-8">
              <p 
                className="text-white text-lg md:text-xl inline-block border-r-4 border-white pr-1 animate-blink"
                style={{
                  fontFamily: "'Comic Neue', cursive",
                  transform: `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)`
                }}
              >
                {typedText}
              </p>
            </div>
            
            {/* Anime-styled button */}
            <div 
              className={`transition-all ${isVisible ? 'opacity-100 animate-appear' : 'opacity-0'}`}
              style={{ animationDelay: "1.2s" }}
            >
              <button 
                className="relative overflow-hidden px-8 py-3 rounded-full text-white font-bold bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300 hover:scale-105 group"
                style={{
                  boxShadow: "0 0 15px rgba(255, 107, 158, 0.7)",
                  transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`
                }}
              >
                <span className="relative z-10 font-['Comic_Neue',cursive]">Explore Our Journey</span>
                
                {/* Anime-style button animation */}
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                
                {/* Light streak animation */}
                <span className="absolute top-0 -left-[100%] w-[60%] h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 group-hover:-left-20 transition-all duration-1000 ease-in-out transform skew-x-[-20deg] group-hover:translate-x-[500%]"></span>
              </button>
            </div>
          </div>
          
          {/* Anime character illustration */}
          <div 
            className={`md:w-1/2 flex justify-center items-center transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}
            style={{ 
              transformStyle: 'preserve-3d',
              transform: `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * -5}deg)`
            }}
          >
            <div className="relative w-full max-w-md">
              {/* Character */}
              <img 
                src={animeCharacterSrc} 
                alt="Anime Character" 
                className="w-full h-auto drop-shadow-[0_0_15px_rgba(138,43,226,0.6)]"
                style={{ 
                  filter: "drop-shadow(0 0 20px rgba(255, 107, 158, 0.4))",
                  animation: "float 6s ease-in-out infinite"
                }}
              />
              
              {/* Anime-style circle behind character */}
              <div className="absolute -inset-4 -z-10 rounded-full bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-blue-500/20 blur-xl animate-pulse" style={{ animationDuration: '4s' }}></div>
              
              {/* Manga-style speed lines */}
              <div className="absolute -inset-10 -z-20">
                {[...Array(10)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute bg-white/30 animate-pulse" 
                    style={{
                      height: '2px',
                      width: `${100 + Math.random() * 200}px`,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 50}%`,
                      transform: `rotate(${Math.random() * 180}deg)`,
                      animationDuration: `${2 + Math.random() * 4}s`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  ></div>
                ))}
              </div>
              
              {/* 3D animated "50" */}
              <div 
                className="absolute -top-10 -right-10 w-40 h-40 animate-float-slow"
                style={{ 
                  animationDelay: "0.5s",
                  filter: "drop-shadow(0 0 10px rgba(255, 107, 158, 0.6))"
                }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <linearGradient id="numberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#FFD700" />
                      <stop offset="100%" stop-color="#FF6B9E" />
                    </linearGradient>
                  </defs>
                  
                  {/* Outer glow - with inline filter definition */}
                  <filter id="anime-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feFlood floodColor="#ff6b9e" floodOpacity="0.7" result="color"/>
                    <feComposite in="color" in2="blur" operator="in" result="shadowBlur"/>
                    <feComposite in="SourceGraphic" in2="shadowBlur" operator="over"/>
                  </filter>
                  
                  <text x="10" y="70" font-size="70" fill="url(#numberGrad)" filter="url(#anime-glow)" font-family="'Comic Neue', cursive" font-weight="bold">
                    50
                  </text>
                  
                  {/* Main number */}
                  <text x="10" y="70" font-size="70" font-family="'Comic Neue', cursive" font-weight="bold" fill="url(#numberGrad)">
                    50
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Anime-style particle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Anime-style cherry blossom petals */}
        {[...Array(8)].map((_, index) => (
          <div 
            key={index}
            className="absolute animate-float-slow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${10 + Math.random() * 15}px`,
              height: `${10 + Math.random() * 15}px`,
              background: 'rgba(255, 107, 158, 0.7)',
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              animationDuration: `${5 + Math.random() * 10}s`,
              animationDelay: `${index * 0.5}s`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          ></div>
        ))}
      </div>
    </section>
  );
}
