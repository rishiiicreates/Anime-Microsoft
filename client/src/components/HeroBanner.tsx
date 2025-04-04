import { useEffect, useState, useRef } from "react";

// Import anime-themed assets
import animeBackgroundSrc from "../assets/anime/anime-bg.png";

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
      
      // Random color - anime themed colors (softer palette)
      const colors = ["#ff9eb5", "#b695de", "#9faee6", "#a8e6cf", "#ffd3b6"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      setSparkles(current => [...current, { id, x, y, size, color }]);
      
      // Remove sparkle after animation duration
      setTimeout(() => {
        setSparkles(current => current.filter(sparkle => sparkle.id !== id));
      }, 2000);
    };
    
    // Create new sparkles at random intervals - more anime-like effect
    sparkleInterval.current = setInterval(() => {
      if (Math.random() > 0.6) { // Reduced frequency for more professional look
        createSparkle();
      }
    }, 300);
    
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
    >
      {/* Anime-styled background image */}
      <div className="absolute inset-0 w-full h-full">
        <img src={animeBackgroundSrc} alt="Anime Background" className="w-full h-full object-cover" />
      </div>
      
      {/* Subtle overlay to make text more readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10"></div>
      
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
      
      {/* Main content container */}
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        {/* Central text area with professional positioning, matching the screenshot */}
        <div className="w-full max-w-4xl mx-auto text-center">
          {/* Main heading - "Cheers to 50 years" */}
          <h1 
            className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
            style={{
              fontFamily: "'Comic Neue', cursive",
              color: '#333',
              textShadow: "3px 3px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff",
              transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`
            }}
          >
            Cheers to 50 years
          </h1>
          
          {/* Description paragraph */}
          <p 
            className={`text-black text-lg md:text-xl max-w-3xl mx-auto mb-8 transition-opacity duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              fontFamily: "'Comic Neue', cursive",
              transform: `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)`,
              textShadow: "1px 1px 1px #fff" 
            }}
          >
            Join us as we celebrate all the bold, curious, exhilarating, 
            groundbreaking, unpredictable and unforgettable things we've 
            achieved together since since 1975.
          </p>
          
          {/* Button centered below text */}
          <div 
            className={`transition-all ${isVisible ? 'opacity-100 animate-appear' : 'opacity-0'}`}
            style={{ animationDelay: "1s" }}
          >
            <button 
              className="relative overflow-hidden px-8 py-3 rounded-md text-white font-bold bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300 hover:scale-105 group"
              style={{
                boxShadow: "0 4px 12px rgba(220, 38, 38, 0.5)",
                fontFamily: "'Comic Neue', cursive",
                transform: `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)`
              }}
            >
              <span className="relative z-10">Learn more</span>
              
              {/* Light streak animation */}
              <span className="absolute top-0 -left-[100%] w-[60%] h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 group-hover:-left-20 transition-all duration-1000 ease-in-out transform skew-x-[-20deg] group-hover:translate-x-[500%]"></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
