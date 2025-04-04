import devBackgroundSrc from "@/assets/anime/dev-background.png";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden min-h-[600px] flex flex-col">
      {/* Anime-styled developer background image */}
      <div className="absolute inset-0 w-full h-full">
        <img src={devBackgroundSrc} alt="Anime Developer Background" className="w-full h-full object-cover" />
      </div>
      
      {/* Very subtle overlay for text readability - minimal approach */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30"></div>
      
      {/* Clean, minimal heading at the top */}
      <div className="absolute top-14 left-14 md:left-24 z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white" 
          style={{
            fontFamily: "Arial, sans-serif",
            letterSpacing: "-0.5px",
            textShadow: "0 2px 4px rgba(0,0,0,0.5)"
          }}>
          Cheers to 50 years
        </h1>
        
        {/* Clean, concise description */}
        <p className="mt-3 text-white text-lg max-w-sm"
          style={{
            fontFamily: "Arial, sans-serif",
            fontWeight: "400",
            textShadow: "0 1px 2px rgba(0,0,0,0.6)"
          }}>
          Join us in celebrating five decades of innovation since 1975.
        </p>
        
        {/* Microsoft-style button */}
        <button 
          className="mt-5 px-5 py-2 rounded text-white font-medium bg-blue-600 hover:bg-blue-700 transition-all"
          style={{
            fontFamily: "Arial, sans-serif"
          }}
        >
          Learn more
        </button>
      </div>
      
      {/* Simple label at bottom right - minimal approach */}
      <div className="absolute bottom-10 right-10 z-10">
        <p className="text-white text-sm font-semibold"
          style={{
            fontFamily: "Arial, sans-serif",
            textShadow: "0 1px 2px rgba(0,0,0,0.6)"
          }}>
          Microsoft • 1975-2025
        </p>
      </div>
    </section>
  );
}
