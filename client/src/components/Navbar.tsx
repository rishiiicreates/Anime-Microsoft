import { useState, useEffect } from "react";
import { Search, ShoppingCart, User, Menu } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);

  const navItems = [
    "Microsoft 365",
    "Teams",
    "Copilot",
    "Windows",
    "Surface",
    "Xbox",
    "Support"
  ];

  // Handle scroll effect
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

  // Animate nav items sequentially
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

  // Handle nav item hover effect
  const handleNavHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    target.classList.add("animate-pulse");
    setTimeout(() => {
      target.classList.remove("animate-pulse");
    }, 300);
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-white shadow-md"
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo and main nav */}
          <div className="flex items-center">
            <a href="#" className="group flex items-center animate-appear">
              <div className="relative overflow-hidden rounded h-8 w-8 hover-bounce">
                <img 
                  src="https://img.icons8.com/color/48/000000/microsoft.png" 
                  alt="Microsoft Logo" 
                  className="h-8 w-8 group-hover:animate-float" 
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-500/20 to-pink-500/20 transition-opacity duration-300"></div>
              </div>
              <span className="ml-2 text-gray-800 font-bold text-lg font-['Segoe_UI',system-ui,sans-serif] group-hover:text-purple-600 transition-colors duration-300">
                Microsoft
              </span>
            </a>
            
            {/* Main navigation */}
            <div className="hidden md:flex md:items-center md:ml-8 space-x-4">
              {navItems.map((item, index) => (
                <a 
                  key={index}
                  href="#" 
                  className={`nav-item text-gray-800 hover:text-pink-500 px-2 py-1 text-sm transition-all duration-300 font-['Segoe_UI',system-ui,sans-serif] relative ${
                    animatedItems.includes(index) ? "animate-appear" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onMouseEnter={handleNavHover}
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Right side navigation */}
          <div className="flex items-center">
            {/* Dropdown for All Microsoft */}
            <div className="hidden md:flex items-center mr-4 animate-appear" style={{ animationDelay: "600ms" }}>
              <button className="group flex items-center text-gray-800 hover:text-pink-500 text-sm font-['Segoe_UI',system-ui,sans-serif] transition-all duration-300 relative">
                All Microsoft
                <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </div>
            
            {/* Search icon */}
            <div className="flex items-center mr-4 animate-appear" style={{ animationDelay: "700ms" }}>
              <button className="text-gray-800 hover:text-pink-500 p-1 transition-all duration-300 hover:animate-wiggle relative overflow-hidden group">
                <Search className="w-5 h-5 relative z-10" />
                <span className="absolute inset-0 bg-purple-100 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              </button>
            </div>
            
            {/* Cart icon */}
            <div className="flex items-center mr-4 animate-appear" style={{ animationDelay: "800ms" }}>
              <button className="text-gray-800 hover:text-pink-500 p-1 transition-all duration-300 hover:animate-wiggle relative overflow-hidden group">
                <ShoppingCart className="w-5 h-5 relative z-10" />
                <span className="absolute inset-0 bg-purple-100 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              </button>
            </div>
            
            {/* Account icon */}
            <div className="flex items-center animate-appear" style={{ animationDelay: "900ms" }}>
              <button className="text-gray-800 hover:text-pink-500 p-1 transition-all duration-300 hover:animate-wiggle relative overflow-hidden group">
                <User className="w-5 h-5 relative z-10" />
                <span className="absolute inset-0 bg-purple-100 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              </button>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center ml-4 animate-appear" style={{ animationDelay: "1000ms" }}>
              <button 
                className="text-gray-800 hover:text-pink-500 p-1 relative overflow-hidden group"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="w-6 h-6 relative z-10 transition-transform duration-300" 
                  style={{ 
                    transform: mobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)'
                  }} 
                />
                <span className="absolute inset-0 bg-purple-100 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu with animation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-2 pb-4 px-2 space-y-1">
            {navItems.map((item, index) => (
              <a 
                key={index}
                href="#" 
                className="block px-3 py-2 text-base text-gray-800 hover:text-pink-500 hover:bg-purple-50 rounded-md transition-all duration-300 animate-approach"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item}
              </a>
            ))}
            <a 
              href="#" 
              className="block px-3 py-2 text-base text-gray-800 hover:text-pink-500 hover:bg-purple-50 rounded-md transition-all duration-300 animate-approach"
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
