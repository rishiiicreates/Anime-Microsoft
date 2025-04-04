import devBackgroundSrc from "@/assets/anime/dev-background.png";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden min-h-[600px] flex flex-col">
      {/* Anime-styled developer background image */}
      <div className="absolute inset-0 w-full h-full">
        <img src={devBackgroundSrc} alt="Anime Developer Background" className="w-full h-full object-cover" />
      </div>
      
      {/* Semi-transparent overlay to help with text readability - using Microsoft blue colors */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-blue-700/20"></div>
      
      {/* Main heading positioned at the top left - where there's clear space in the image */}
      <div className="absolute top-10 left-10 md:left-20 z-10 px-4 text-left">
        <h1 className="text-4xl md:text-6xl font-bold text-white" 
          style={{
            fontFamily: "Arial, sans-serif",
            textShadow: "2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000"
          }}>
          Cheers to 50 years
        </h1>
        
        {/* Description paragraph positioned below the heading */}
        <p className="mt-4 text-white text-lg max-w-md"
          style={{
            fontFamily: "Arial, sans-serif",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.9)"
          }}>
          Join us as we celebrate all the bold, curious, exhilarating achievements
          since 1975.
        </p>
        
        {/* Learn more button positioned below paragraph */}
        <button 
          className="mt-6 px-8 py-3 rounded-md text-white font-bold bg-red-600 hover:bg-red-700 transition-colors duration-300"
          style={{
            fontFamily: "Arial, sans-serif"
          }}
        >
          Learn more
        </button>
      </div>
      
      {/* Right side text positioning - celebrating development context */}
      <div className="absolute bottom-10 right-10 md:right-20 z-10 px-4 text-right">
        <h2 className="text-3xl md:text-4xl font-bold text-white" 
          style={{
            fontFamily: "Arial, sans-serif",
            textShadow: "2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000"
          }}>
          Building the future
        </h2>
        
        <p className="mt-2 text-white text-base max-w-md ml-auto"
          style={{
            fontFamily: "Arial, sans-serif",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.9)"
          }}>
          From coding innovations to gaming breakthroughs,
          we continue to push boundaries together.
        </p>
      </div>
    </section>
  );
}
