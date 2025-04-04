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

  // Handle scroll effect with sophisticated transition
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

  // Animate nav items with professional staggered reveal
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
        }, 80); // Faster animation for more professional feel
      };
      
      animateItems();
    }
    
    return () => clearInterval(timer);
  }, [navItems.length]);

  // Create professional hover effect with light particles
  const handleNavHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    
    // Add Microsoft blue glow effect
    target.style.textShadow = "0 0 8px rgba(0, 120, 215, 0.7)";
    
    // Reset after animation
    setTimeout(() => {
      target.style.textShadow = "none";
    }, 500);
  };

  return (
    <nav 
      ref={navRef}
      className="sticky top-0 z-50 transition-all duration-500 ease-out bg-white/90 backdrop-blur-md shadow-sm"
      style={{
        transform: scrolled ? 'translateY(0)' : 'translateY(0)',
        boxShadow: scrolled ? '0 4px 12px rgba(0, 120, 215, 0.1)' : 'none'
      }}
    >
      {/* Professional style decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top highlight line - Microsoft blue style */}
        <div 
          className={`h-0.5 w-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 transition-all duration-500 ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>
        
        {/* Subtle particle effects in blue tones */}
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full animate-pulse opacity-20"
            style={{
              width: `${3 + Math.random() * 5}px`,
              height: `${3 + Math.random() * 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? '#0078D7' : '#00ADEF',
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
            {/* Professional logo with subtle animations */}
            <a 
              href="#" 
              className="group flex items-center animate-appear"
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
            >
              <div className="relative h-10 w-10 overflow-visible hover-3d">
                {/* Logo with particle effects on hover */}
                <img 
                  src={animeMsLogoSrc}
                  alt="Anime Microsoft Logo" 
                  className={`h-10 w-10 transition-all duration-500 ${logoHovered ? 'scale-110 rotate-[5deg]' : 'scale-100 rotate-0'}`}
                  style={{
                    filter: logoHovered ? 'drop-shadow(0 0 5px rgba(0, 120, 215, 0.6))' : 'none',
                    transformOrigin: 'center'
                  }}
                />
                
                {/* Professional sparkle effect when hovering */}
                <div className={`absolute -inset-2 transition-opacity duration-300 ${logoHovered ? 'opacity-100' : 'opacity-0'}`}>
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute"
                      style={{
                        width: `${4 + Math.random() * 4}px`,
                        height: `${4 + Math.random() * 4}px`,
                        borderRadius: '50%',
                        backgroundColor: ['#0078D7', '#00ADEF', '#4CC2FF', '#0057B8'][i % 4],
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: 0.7,
                        animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
                        animationDuration: `${1 + Math.random()}s`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              
              {/* Microsoft text with professional styling */}
              <span 
                className={`ml-2 font-bold text-lg transition-all duration-300 text-gray-800 ${
                  logoHovered ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-400' : ''
                }`}
                style={{
                  fontFamily: "Arial, sans-serif",
                  textShadow: logoHovered ? '0 0 8px rgba(0, 120, 215, 0.5)' : 'none',
                  transform: logoHovered ? 'translateY(-1px)' : 'translateY(0)',
                  letterSpacing: logoHovered ? '0.02em' : 'normal'
                }}
              >
                Microsoft
              </span>
              
              {/* Professional sparkle icon that appears on hover */}
              <div 
                className={`ml-1 transition-all duration-500 smooth-scale ${logoHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                style={{ transformOrigin: 'left center' }}
              >
                <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
              </div>
            </a>
            
            {/* Main navigation with professional styling and animations */}
            <div className="hidden md:flex md:items-center md:ml-8 space-x-1">
              {navItems.map((item, index) => (
                <a 
                  key={index}
                  href="#" 
                  className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 relative overflow-hidden group ${
                    animatedItems.includes(index) ? "animate-appear" : "opacity-0"
                  } text-gray-800 hover:text-blue-600`}
                  style={{ 
                    animationDelay: `${index * 80}ms`,
                    fontFamily: "Arial, sans-serif",
                    transform: animatedItems.includes(index) ? 'translateY(0)' : 'translateY(10px)'
                  }}
                  onMouseEnter={handleNavHover}
                >
                  {/* Professional background effect on hover */}
                  <span className={`absolute inset-0 bg-gradient-to-r ${
                    scrolled ? 'from-white/20 to-white/10' : 'from-blue-50 to-blue-100/70'
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full`}></span>
                  
                  {/* Text with relative positioning to stay above effects */}
                  <span className="relative z-10">{item}</span>
                  
                  {/* Professional underline effect */}
                  <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-4/5 group-hover:left-[10%] ${
                    scrolled ? 'bg-white' : 'bg-gradient-to-r from-blue-600 to-blue-400'
                  }`}></span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Right side navigation with professional styling */}
          <div className="flex items-center">
            {/* Dropdown for All Microsoft */}
            <div className="hidden md:flex items-center mr-4 animate-appear" style={{ animationDelay: "600ms" }}>
              <button className="group flex items-center px-3 py-1.5 rounded-full text-sm transition-all duration-300 relative overflow-hidden text-gray-800 hover:text-blue-600 pro-transition"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                {/* Professional background on hover */}
                <span className={`absolute inset-0 bg-gradient-to-r ${
                  scrolled ? 'from-white/20 to-white/10' : 'from-blue-50 to-blue-100/70'
                } opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full`}></span>
                
                <span className="relative z-10">All Microsoft</span>
                <svg 
                  className={`w-4 h-4 ml-1 transition-transform duration-500 group-hover:rotate-180 relative z-10 ${
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
            
            {/* Professional icon buttons with advanced hover effects */}
            {[
              { icon: <Search className="w-5 h-5 relative z-10" />, delay: "700ms" },
              { icon: <ShoppingCart className="w-5 h-5 relative z-10" />, delay: "800ms" },
              { icon: <User className="w-5 h-5 relative z-10" />, delay: "900ms" }
            ].map((item, index) => (
              <div key={index} className="flex items-center mr-4 animate-appear" style={{ animationDelay: item.delay }}>
                <button 
                  className="p-2 transition-all duration-300 hover:scale-110 relative overflow-hidden rounded-full group text-gray-800 hover:bg-blue-50 hover-glow"
                >
                  {/* Icon */}
                  {item.icon}
                  
                  {/* Professional ring effect on hover */}
                  <span 
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 border border-blue-200"
                  ></span>
                  
                  {/* Advanced glow effect */}
                  <span 
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 transition-transform duration-500 transform scale-0 group-hover:scale-100"
                    style={{
                      background: 'radial-gradient(circle, rgba(0, 120, 215, 0.15) 0%, rgba(0, 0, 0, 0) 70%)'
                    }}
                  ></span>
                </button>
              </div>
            ))}
            
            {/* Mobile menu button with professional styling */}
            <div className="md:hidden flex items-center animate-appear" style={{ animationDelay: "1000ms" }}>
              <button 
                className={`p-2 transition-all duration-500 hover:scale-110 relative overflow-hidden rounded-full ${
                  scrolled ? 'text-white hover:bg-white/20' : 'text-gray-800 hover:bg-blue-50'
                } hover-glow`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu 
                  className="w-6 h-6 relative z-10 transition-transform duration-500" 
                  style={{ transform: mobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
                />
                
                {/* Professional ring effect */}
                <span 
                  className={`absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-all duration-300 ${
                    scrolled ? 'border border-white/40' : 'border border-blue-300'
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu with professional animation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className={`pt-2 pb-4 px-2 space-y-1 rounded-b-lg ${
            scrolled ? 'bg-gradient-to-b from-blue-600/90 to-blue-700/90' : 'bg-white'
          }`}>
            {navItems.map((item, index) => (
              <a 
                key={index}
                href="#" 
                className={`block px-4 py-2 text-base rounded-lg transition-all duration-300 staggered-item revealed staggered-delay-${index + 1} ${
                  scrolled ? 
                    'text-white hover:bg-white/20' : 
                    'text-gray-800 hover:text-blue-600 hover:bg-blue-50'
                }`}
                style={{ 
                  fontFamily: "Arial, sans-serif", 
                  animationDelay: `${index * 50}ms` 
                }}
              >
                {item}
              </a>
            ))}
            <a 
              href="#" 
              className={`block px-4 py-2 text-base rounded-lg transition-all duration-300 staggered-item revealed staggered-delay-${navItems.length + 1} ${
                scrolled ? 
                  'text-white hover:bg-white/20' : 
                  'text-gray-800 hover:text-blue-600 hover:bg-blue-50'
              }`}
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              All Microsoft
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
