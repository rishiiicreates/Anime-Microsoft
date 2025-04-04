import { useEffect, useState, useRef } from "react";

// Import anime-themed assets
import animeBackgroundSrc from "../assets/anime/anime-bg.png";

export default function HeroBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef<HTMLElement>(null);

  // Handle initial visibility animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      ref={bannerRef}
      className="relative overflow-hidden min-h-[600px] flex items-center"
    >
      {/* Anime-styled background image */}
      <div className="absolute inset-0 w-full h-full">
        <img src={animeBackgroundSrc} alt="Anime Background" className="w-full h-full object-cover" />
      </div>
      
      {/* Main content container - exactly matching the image shown */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Top heading with black outline styling */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white" 
            style={{
              fontFamily: "Arial, sans-serif",
              textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0px 2px 0 #000, 2px 0px 0 #000, 0px -2px 0 #000, -2px 0px 0 #000"
            }}>
            Cheers to 50 years
          </h1>
        </div>
        
        {/* Description text with proper readability */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-center text-black text-lg mx-auto" 
            style={{
              maxWidth: "570px",
              fontFamily: "Arial, sans-serif",
              textShadow: "1px 1px 2px rgba(255, 255, 255, 0.8)"
            }}>
            Join us as we celebrate all the bold, curious, exhilarating, 
            groundbreaking, unpredictable and unforgettable things we've 
            achieved together since since 1975.
          </p>
        </div>
        
        {/* Red button centered */}
        <div className="flex justify-center">
          <button 
            className="px-8 py-3 rounded-md text-white font-bold bg-red-600 hover:bg-red-700 transition-colors duration-300"
            style={{
              fontFamily: "Arial, sans-serif"
            }}
          >
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
}
