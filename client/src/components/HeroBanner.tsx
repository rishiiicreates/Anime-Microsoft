import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";

export default function HeroBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const bannerRef = useRef<HTMLElement>(null);
  const sparkleInterval = useRef<NodeJS.Timeout | null>(null);
  const [sparkles, setSparkles] = useState<Array<{id: number, x: number, y: number, size: number, color: string}>>([]);
  const nextSparkleId = useRef(0);

  // Handle initial visibility animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle parallax effect with mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (bannerRef.current) {
        const rect = bannerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top;  // y position within the element
        setMousePosition({
          x: (x / rect.width) - 0.5,
          y: (y / rect.height) - 0.5
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Create random sparkle effect throughout the banner
  useEffect(() => {
    const createSparkle = () => {
      const id = nextSparkleId.current;
      nextSparkleId.current++;
      
      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Random size between 5-20px
      const size = 5 + Math.random() * 15;
      
      // Random color - anime themed pastel colors
      const colors = ["#ff6b9e", "#9370DB", "#8a2be2", "#50e3c2", "#4a90e2", "#ffde59"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      setSparkles(current => [...current, { id, x, y, size, color }]);
      
      // Remove sparkle after animation duration
      setTimeout(() => {
        setSparkles(current => current.filter(sparkle => sparkle.id !== id));
      }, 2000);
    };
    
    // Create new sparkles at random intervals
    sparkleInterval.current = setInterval(() => {
      if (Math.random() > 0.5) { // Only create sparkle 50% of the time for more natural look
        createSparkle();
      }
    }, 300);
    
    return () => {
      if (sparkleInterval.current) {
        clearInterval(sparkleInterval.current);
      }
    };
  }, []);

  // Create decorative elements with emojis and anime-style assets
  const decorativeElements = [
    { emoji: "🎵", class: "left-10 top-1/3 animate-float-reverse" },
    { emoji: "🎮", class: "right-16 bottom-16 animate-float" },
    { emoji: "🔍", class: "left-1/4 bottom-10 animate-float-slow" },
    { emoji: "❤️", class: "right-1/3 top-1/4 animate-float-fast" },
    { emoji: "✨", class: "left-1/3 top-10 animate-float" },
    { emoji: "💻", class: "right-1/4 top-1/2 animate-float-slow" },
    { emoji: "📱", class: "left-20 bottom-1/4 animate-float-reverse" }
  ];

  return (
    <section 
      ref={bannerRef}
      className="relative overflow-hidden min-h-[600px] flex items-center"
      style={{ 
        background: "linear-gradient(135deg, #9370DB, #8a2be2, #ff6b9e)",
        backgroundSize: "400% 400%",
        animation: "gradient-shift 15s ease infinite"
      }}
    >
      {/* Animated background particles & shapes */}
      <div className="absolute inset-0 opacity-20">
        {/* Geometric anime-style shapes with different floats */}
        <div className="absolute top-10 left-10 w-12 h-12 animate-float-fast">
          <div className="w-full h-full opacity-70 rounded-full bg-white animate-pulse"></div>
        </div>
        <div className="absolute bottom-20 right-20 w-16 h-16 animate-float-slow">
          <div className="w-full h-full opacity-70 rounded-lg bg-blue-300"></div>
        </div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 animate-float">
          <div className="w-full h-full opacity-70 rounded-full bg-pink-300"></div>
        </div>
        <div className="absolute bottom-1/3 left-1/5 w-24 h-10 animate-float-reverse">
          <div className="w-full h-full opacity-70 rounded-lg bg-purple-300 rotate-45"></div>
        </div>
        <div className="absolute top-1/4 left-1/3 w-16 h-16 animate-float-slow">
          <div className="w-full h-full opacity-70 rounded-full bg-yellow-300"></div>
        </div>
      </div>
      
      {/* Random sparkles */}
      {sparkles.map(sparkle => (
        <div 
          key={sparkle.id}
          className="absolute animate-sparkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill={sparkle.color} />
          </svg>
        </div>
      ))}
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Main heading with glow effect */}
          <h1 
            className={`text-4xl md:text-6xl font-bold text-white mb-6 font-['Comic_Neue',cursive] transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'} animate-glow`}
            style={{ 
              textShadow: "0 0 10px #ff6b9e, 0 0 20px #8a2be2",
              transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`
            }}
          >
            <span className="inline-block animate-float-slow">C</span>
            <span className="inline-block animate-float-reverse" style={{ animationDelay: "0.1s" }}>h</span>
            <span className="inline-block animate-float-fast" style={{ animationDelay: "0.2s" }}>e</span>
            <span className="inline-block animate-float" style={{ animationDelay: "0.3s" }}>e</span>
            <span className="inline-block animate-float-slow" style={{ animationDelay: "0.4s" }}>r</span>
            <span className="inline-block animate-float-reverse" style={{ animationDelay: "0.5s" }}>s</span>
            <span className="inline-block mx-4">to</span>
            <span className="inline-block text-anime-shadow">50</span>
            <span className="inline-block ml-4 animate-float" style={{ animationDelay: "0.6s" }}>y</span>
            <span className="inline-block animate-float-fast" style={{ animationDelay: "0.7s" }}>e</span>
            <span className="inline-block animate-float-reverse" style={{ animationDelay: "0.8s" }}>a</span>
            <span className="inline-block animate-float-slow" style={{ animationDelay: "0.9s" }}>r</span>
            <span className="inline-block animate-float" style={{ animationDelay: "1s" }}>s</span>
          </h1>
          
          {/* Description with staggered animation */}
          <p 
            className={`text-white text-lg md:text-xl max-w-3xl mb-8 transition-all ${
              isVisible ? 'opacity-100 animate-appear' : 'opacity-0'
            }`}
            style={{ 
              animationDelay: "0.5s",
              transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)` 
            }}
          >
            Join us as we celebrate all the bold, curious, exhilarating, groundbreaking, unpredictable
            and unforgettable things we've achieved together since 1975.
          </p>
          
          {/* Anime-styled button with glow and hover effects */}
          <div 
            className={`transition-all ${isVisible ? 'opacity-100 animate-appear' : 'opacity-0'}`}
            style={{ animationDelay: "0.8s" }}
          >
            <button 
              className="ms-anime-button group relative"
            >
              <span className="relative z-10">Learn more</span>
              <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="btnGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff6b9e" />
                      <stop offset="100%" stopColor="#8a2be2" />
                    </linearGradient>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#btnGlow)" mask="url(#btnMask)" />
                  <mask id="btnMask">
                    <rect width="100%" height="100%" fill="white" />
                    <circle className="animate-ping" cx="30" cy="70" r="20" fill="black" />
                    <circle className="animate-ping" cx="70" cy="30" r="20" fill="black" style={{ animationDelay: "0.5s" }} />
                  </mask>
                </svg>
              </span>
            </button>
          </div>
          
          {/* 3D animated "50" */}
          <div 
            className={`mt-12 perspective-[800px] transition-all ${isVisible ? 'opacity-100 animate-appear' : 'opacity-0'}`}
            style={{ 
              animationDelay: "1s",
              transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)` // Opposite direction for 3D effect
            }}
          >
            <div className="relative animate-float">
              {/* Main 3D stylized 50 */}
              <div 
                className="animate-rotate-y transform-gpu relative inline-block overflow-visible" 
                style={{ transformOrigin: 'center center' }}
              >
                <div className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500 transform-gpu" 
                     style={{ 
                       textShadow: "0 4px 0 rgba(0,0,0,0.2), 4px 8px 0 rgba(0,0,0,0.1), 0 0 20px rgba(255,255,255,0.4)", 
                       transform: `rotateY(${mousePosition.x * 20}deg) rotateX(${mousePosition.y * -20}deg)`
                     }}>
                  50
                </div>
                
                {/* Colorful light reflections */}
                <div className="absolute inset-0 opacity-50 mix-blend-overlay text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"
                     style={{ filter: 'blur(8px)' }}>
                  50
                </div>
              </div>
              
              {/* Dynamic sparkle effects around the 50 */}
              <div className="absolute -top-4 -right-4 text-yellow-300 text-2xl animate-sparkle">✦</div>
              <div className="absolute -bottom-2 -left-4 text-pink-400 text-2xl animate-sparkle" style={{ animationDelay: "0.5s" }}>✦</div>
              <div className="absolute top-1/2 -right-6 text-cyan-300 text-2xl animate-sparkle" style={{ animationDelay: "1s" }}>✦</div>
              <div className="absolute -top-8 left-1/2 text-purple-300 text-3xl animate-sparkle" style={{ animationDelay: "1.5s" }}>✦</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated decorative elements */}
      {decorativeElements.map((element, index) => (
        <div 
          key={index}
          className={`absolute w-16 h-16 ${element.class} transition-all duration-500`}
          style={{ 
            animationDelay: `${index * 0.2}s`,
            transform: `translate(${mousePosition.x * (index % 2 === 0 ? 20 : -20)}px, ${mousePosition.y * (index % 2 === 0 ? 20 : -20)}px)`
          }}
        >
          <span className="text-4xl filter drop-shadow-lg">{element.emoji}</span>
        </div>
      ))}
    </section>
  );
}
