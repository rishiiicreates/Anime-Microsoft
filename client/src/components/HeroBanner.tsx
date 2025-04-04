import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function HeroBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #9370DB, #8a2be2, #ff6b9e)" }}>
      <div className="absolute inset-0 opacity-20">
        {/* Anime-style technology background pattern */}
        <div className="absolute top-10 left-10 w-12 h-12 animate-[float_4s_ease-in-out_infinite]" style={{ animationDelay: "0.5s" }}>
          <div className="w-full h-full object-contain opacity-70 rounded-full bg-white"></div>
        </div>
        <div className="absolute bottom-20 right-20 w-16 h-16 animate-[float_4s_ease-in-out_infinite]" style={{ animationDelay: "0.8s" }}>
          <div className="w-full h-full object-contain rounded-lg bg-blue-300 opacity-70"></div>
        </div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 animate-[float_4s_ease-in-out_infinite]" style={{ animationDelay: "1.2s" }}>
          <div className="w-full h-full object-contain rounded-full bg-pink-300 opacity-70"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col items-center text-center">
          <h1 
            className={`text-4xl md:text-6xl font-bold text-white mb-6 font-['Comic_Neue',cursive] transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
            style={{ textShadow: "0 0 10px #ff6b9e, 0 0 20px #8a2be2" }}
          >
            Cheers to 50 years
          </h1>
          
          <p className="text-white text-lg md:text-xl max-w-3xl mb-8">
            Join us as we celebrate all the bold, curious, exhilarating, groundbreaking, unpredictable
            and unforgettable things we've achieved together since 1975.
          </p>
          
          <Button 
            className="bg-black text-white px-6 py-2 rounded-md font-semibold transition-all duration-300 hover:bg-purple-700 hover:scale-105 hover:shadow-[0_0_15px_rgba(138,43,226,0.6)]"
          >
            Learn more
          </Button>
          
          {/* Anime-styled 50 years logo */}
          <div className="mt-8 animate-[float_4s_ease-in-out_infinite] max-w-xs md:max-w-md">
            <div className="relative">
              {/* 3D pixelated number 50 in Microsoft colors but anime style */}
              <div 
                className="text-9xl font-bold relative inline-block" 
                style={{ textShadow: "4px 4px 0 #333, 8px 8px 0 #555" }}
              >
                <span className="text-blue-500">5</span><span className="text-red-500">0</span>
              </div>
              {/* Sparkle effects */}
              <div className="absolute -top-4 -right-4 text-yellow-300 text-2xl animate-pulse">✦</div>
              <div className="absolute -bottom-2 -left-4 text-pink-400 text-2xl animate-pulse" style={{ animationDelay: "0.5s" }}>✦</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Anime-style decorative elements */}
      <div className="absolute left-10 top-1/3 w-16 h-16 animate-[float_4s_ease-in-out_infinite]" style={{ animationDelay: "0.3s" }}>
        {/* Music note emoji */}
        <span className="text-4xl">🎵</span>
      </div>
      <div className="absolute right-16 bottom-16 w-20 h-20 animate-[float_4s_ease-in-out_infinite]" style={{ animationDelay: "0.6s" }}>
        {/* Game controller emoji */}
        <span className="text-4xl">🎮</span>
      </div>
      <div className="absolute left-1/4 bottom-10 w-14 h-14 animate-[float_4s_ease-in-out_infinite]" style={{ animationDelay: "1s" }}>
        {/* Magnifying glass emoji */}
        <span className="text-4xl">🔍</span>
      </div>
      <div className="absolute right-1/3 top-1/4 w-16 h-16 animate-[float_4s_ease-in-out_infinite]" style={{ animationDelay: "1.5s" }}>
        {/* Heart emoji */}
        <span className="text-4xl">❤️</span>
      </div>
    </section>
  );
}
