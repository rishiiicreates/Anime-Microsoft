import { useState, useEffect, useRef } from "react";
import { Search, ShoppingCart, User, Menu, Sparkles } from "lucide-react";

// Import anime-styled logo
import animeMsLogoSrc from "../assets/anime/anime-ms-logo.svg";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);
  const [logoHovered, setLogoHovered] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const navItems = [
    "Microsoft 365",
    "Teams",
    "Copilot",
    "Windows",
    "Surface",
    "Xbox",
    "Support"
  ];

  // Handle scroll effect with anime-style transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate nav items with staggered anime-style reveal
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (navItems.length > 0) {
      const animateItems = () => {
        let index = 0;
        timer = setInterval(() => {
          if (index < navItems.length) {
            setAnimatedItems(prev => [...prev, index]);
            index++;
          } else {
            clearInterval(timer);
          }
        }, 100);
      };
      
      animateItems();
    }
    
    return () => clearInterval(timer);
  }, [navItems.length]);

  // Create anime-style hover effect with light particles
  const handleNavHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    
    // Add anime-style glow effect
    target.style.textShadow = "0 0 8px rgba(255, 107, 158, 0.7)";
    
    // Reset after animation
    setTimeout(() => {
      target.style.textShadow = "none";
    }, 500);
  };

  return (
    <nav 
      ref={navRef}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-md shadow-lg text-white" 
          : "bg-white/95 backdrop-blur-sm shadow-md text-gray-800"
      }`}
    >
      {/* Anime style decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top highlight line - anime style */}
        <div 
          className={`h-0.5 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-opacity duration-300 ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>
        
        {/* Random particle effects */}
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full animate-pulse opacity-20"
            style={{
              width: `${3 + Math.random() * 5}px`,
              height: `${3 + Math.random() * 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? '#ff6b9e' : '#8a2be2',
              animationDuration: `${2 + Math.random() * 3}s`,
              animationDelay: `${i * 0.3}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="flex justify-between items-center h-16">
          {/* Logo and main nav */}
          <div className="flex items-center">
            {/* Anime-styled logo with effects */}
            <a 
              href="#" 
              className="group flex items-center animate-appear"
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
            >
              <div className="relative h-10 w-10 hover-bounce overflow-visible">
                {/* Logo with particle effects on hover */}
                <img 
                  src={animeMsLogoSrc}
                  alt="Anime Microsoft Logo" 
                  className={`h-10 w-10 transition-transform duration-300 ${logoHovered ? 'scale-110' : 'scale-100'}`}
                />
                
                {/* Sparkle effect when hovering */}
                <div className={`absolute -inset-2 transition-opacity duration-300 ${logoHovered ? 'opacity-100' : 'opacity-0'}`}>
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute animate-ping"
                      style={{
                        width: `${6 + Math.random() * 6}px`,
                        height: `${6 + Math.random() * 6}px`,
                        borderRadius: '50%',
                        backgroundColor: ['#ff6b9e', '#8a2be2', '#50e3c2'][i % 3],
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: 0.6,
                        animationDuration: `${1 + Math.random()}s`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              
              {/* Microsoft text with anime styling */}
              <span 
                className={`ml-2 font-bold text-lg font-['Comic_Neue',cursive] transition-all duration-300 ${
                  scrolled ? 'text-white' : 'text-gray-800'
                } ${logoHovered ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500' : ''}`}
                style={{
                  textShadow: logoHovered ? '0 0 8px rgba(138, 43, 226, 0.5)' : 'none'
                }}
              >
                Microsoft
              </span>
              
              {/* Anime sparkle icon that appears on hover */}
              <div 
                className={`ml-1 transition-all duration-300 ${logoHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                style={{ transformOrigin: 'left center' }}
              >
                <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              </div>
            </a>
            
            {/* Main navigation with anime styling */}
            <div className="hidden md:flex md:items-center md:ml-8 space-x-2">
              {navItems.map((item, index) => (
                <a 
                  key={index}
                  href="#" 
                  className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 font-['Comic_Neue',cursive] relative overflow-hidden group ${
                    animatedItems.includes(index) ? "animate-appear" : "opacity-0"
                  } ${
                    scrolled ? 'text-white hover:text-white' : 'text-gray-800 hover:text-pink-500'
                  }`}
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                  }}
                  onMouseEnter={handleNavHover}
                >
                  {/* Anime-style background effect on hover */}
                  <span className={`absolute inset-0 bg-gradient-to-r ${
                    scrolled ? 'from-white/20 to-white/10' : 'from-purple-100 to-pink-100'
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full`}></span>
                  
                  {/* Text with relative positioning to stay above effects */}
                  <span className="relative z-10">{item}</span>
                  
                  {/* Anime underline effect */}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    scrolled ? 'bg-white' : 'bg-gradient-to-r from-purple-500 to-pink-500'
                  }`}></span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Right side navigation with anime styling */}
          <div className="flex items-center">
            {/* Dropdown for All Microsoft */}
            <div className="hidden md:flex items-center mr-4 animate-appear" style={{ animationDelay: "600ms" }}>
              <button className={`group flex items-center px-3 py-1.5 rounded-full text-sm transition-all duration-300 font-['Comic_Neue',cursive] relative overflow-hidden ${
                scrolled ? 'text-white hover:text-white' : 'text-gray-800 hover:text-pink-500'
              }`}>
                {/* Anime-style background on hover */}
                <span className={`absolute inset-0 bg-gradient-to-r ${
                  scrolled ? 'from-white/20 to-white/10' : 'from-purple-100 to-pink-100'
                } opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full`}></span>
                
                <span className="relative z-10">All Microsoft</span>
                <svg 
                  className={`w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180 relative z-10 ${
                    scrolled ? 'stroke-white' : 'stroke-current'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </div>
            
            {/* Anime-styled icon buttons */}
            {[
              { icon: <Search className="w-5 h-5 relative z-10" />, delay: "700ms" },
              { icon: <ShoppingCart className="w-5 h-5 relative z-10" />, delay: "800ms" },
              { icon: <User className="w-5 h-5 relative z-10" />, delay: "900ms" }
            ].map((item, index) => (
              <div key={index} className="flex items-center mr-4 animate-appear" style={{ animationDelay: item.delay }}>
                <button 
                  className={`p-2 transition-all duration-300 hover:scale-110 relative overflow-hidden rounded-full group ${
                    scrolled ? 'text-white hover:bg-white/20' : 'text-gray-800 hover:bg-purple-100'
                  }`}
                >
                  {/* Icon */}
                  {item.icon}
                  
                  {/* Anime-style ring effect on hover */}
                  <span 
                    className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                      scrolled ? 'border border-white/40' : 'border border-purple-300'
                    }`}
                  ></span>
                  
                  {/* Subtle glow effect */}
                  <span 
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-60 transition-transform duration-300 transform scale-0 group-hover:scale-100"
                    style={{
                      background: scrolled ? 
                        'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)' : 
                        'radial-gradient(circle, rgba(186,104,200,0.2) 0%, rgba(186,104,200,0) 70%)'
                    }}
                  ></span>
                </button>
              </div>
            ))}
            
            {/* Mobile menu button with anime styling */}
            <div className="md:hidden flex items-center animate-appear" style={{ animationDelay: "1000ms" }}>
              <button 
                className={`p-2 transition-all duration-300 hover:scale-110 relative overflow-hidden rounded-full ${
                  scrolled ? 'text-white hover:bg-white/20' : 'text-gray-800 hover:bg-purple-100'
                }`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu 
                  className="w-6 h-6 relative z-10 transition-transform duration-500" 
                  style={{ transform: mobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
                />
                
                {/* Anime-style ring effect */}
                <span 
                  className={`absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-all duration-300 ${
                    scrolled ? 'border border-white/40' : 'border border-purple-300'
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu with anime-styled animation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className={`pt-2 pb-4 px-2 space-y-1 rounded-b-lg ${
            scrolled ? 'bg-gradient-to-b from-pink-600/90 to-purple-700/90' : 'bg-white'
          }`}>
            {navItems.map((item, index) => (
              <a 
                key={index}
                href="#" 
                className={`block px-4 py-2 text-base rounded-lg transition-all duration-300 animate-approach font-['Comic_Neue',cursive] ${
                  scrolled ? 
                    'text-white hover:bg-white/20' : 
                    'text-gray-800 hover:text-pink-500 hover:bg-purple-50'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item}
              </a>
            ))}
            <a 
              href="#" 
              className={`block px-4 py-2 text-base rounded-lg transition-all duration-300 animate-approach font-['Comic_Neue',cursive] ${
                scrolled ? 
                  'text-white hover:bg-white/20' : 
                  'text-gray-800 hover:text-pink-500 hover:bg-purple-50'
              }`}
              style={{ animationDelay: `${navItems.length * 50}ms` }}
            >
              All Microsoft
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
