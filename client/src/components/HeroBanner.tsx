import animeBackgroundSrc from "@/assets/anime/anime-bg.png";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden min-h-[600px] flex flex-col">
      {/* Anime-styled background image */}
      <div className="absolute inset-0 w-full h-full">
        <img src={animeBackgroundSrc} alt="Anime Background" className="w-full h-full object-cover" />
      </div>
      
      {/* Top heading with black outline styling */}
      <div className="relative z-10 pt-10 px-4">
        <h1 className="text-center text-5xl md:text-6xl font-bold text-white mx-auto" 
          style={{
            fontFamily: "Arial, sans-serif",
            textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0px 2px 0 #000, 2px 0px 0 #000, 0px -2px 0 #000, -2px 0px 0 #000"
          }}>
          Cheers to 50 years
        </h1>
      </div>
      
      {/* Top paragraph */}
      <div className="relative z-10 px-4 mt-4">
        <p className="text-center text-black text-lg mx-auto max-w-2xl"
          style={{
            fontFamily: "Arial, sans-serif",
            textShadow: "1px 1px 2px rgba(255, 255, 255, 0.8)"
          }}>
          Join us as we celebrate all the bold, curious, exhilarating, 
          groundbreaking, unpredictable and unforgettable things we've 
          achieved together since since 1975.
        </p>
      </div>
      
      {/* Second heading - positioned absolute to match screenshot */}
      <div className="absolute bottom-[35%] left-0 right-0 z-10 px-4">
        <h1 className="text-center text-5xl md:text-6xl font-bold text-white mx-auto" 
          style={{
            fontFamily: "Arial, sans-serif",
            textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0px 2px 0 #000, 2px 0px 0 #000, 0px -2px 0 #000, -2px 0px 0 #000"
          }}>
          Cheers to 50 years
        </h1>
      </div>
      
      {/* Second paragraph */}
      <div className="absolute bottom-[22%] left-0 right-0 z-10 px-4">
        <p className="text-center text-black text-lg mx-auto max-w-2xl"
          style={{
            fontFamily: "Arial, sans-serif",
            textShadow: "1px 1px 2px rgba(255, 255, 255, 0.8)"
          }}>
          Join us as we celebrate all the bold, curious, exhilarating, 
          groundbreaking, unpredictable and unforgettable things we've 
          achieved together since since 1975.
        </p>
      </div>
      
      {/* Learn more button */}
      <div className="absolute bottom-[10%] left-0 right-0 z-10 flex justify-center px-4">
        <button 
          className="px-8 py-3 rounded-md text-white font-bold bg-red-600 hover:bg-red-700 transition-colors duration-300"
          style={{
            fontFamily: "Arial, sans-serif"
          }}
        >
          Learn more
        </button>
      </div>
    </section>
  );
}
