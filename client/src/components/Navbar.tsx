import { useState } from "react";
import { Search, ShoppingCart, User, Menu } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    "Microsoft 365",
    "Teams",
    "Copilot",
    "Windows",
    "Surface",
    "Xbox",
    "Support"
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo and main nav */}
          <div className="flex items-center">
            <a href="#" className="flex items-center">
              <img 
                src="https://img.icons8.com/color/48/000000/microsoft.png" 
                alt="Microsoft Logo" 
                className="h-8 w-8" 
              />
              <span className="ml-2 text-gray-800 font-bold text-lg font-['Segoe_UI',system-ui,sans-serif]">
                Microsoft
              </span>
            </a>
            
            {/* Main navigation */}
            <div className="hidden md:flex md:items-center md:ml-8 space-x-4">
              {navItems.map((item, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="nav-item text-gray-800 hover:text-pink-500 px-2 py-1 text-sm transition-all duration-300 font-['Segoe_UI',system-ui,sans-serif]"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          
          {/* Right side navigation */}
          <div className="flex items-center">
            {/* Dropdown for All Microsoft */}
            <div className="hidden md:flex items-center mr-4">
              <button className="flex items-center text-gray-800 hover:text-pink-500 text-sm font-['Segoe_UI',system-ui,sans-serif] transition-all duration-300">
                All Microsoft
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </div>
            
            {/* Search icon */}
            <div className="flex items-center mr-4">
              <button className="text-gray-800 hover:text-pink-500 p-1 transition-all duration-300">
                <Search className="w-5 h-5" />
              </button>
            </div>
            
            {/* Cart icon */}
            <div className="flex items-center mr-4">
              <button className="text-gray-800 hover:text-pink-500 p-1 transition-all duration-300">
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
            
            {/* Account icon */}
            <div className="flex items-center">
              <button className="text-gray-800 hover:text-pink-500 p-1 transition-all duration-300">
                <User className="w-5 h-5" />
              </button>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center ml-4">
              <button 
                className="text-gray-800 hover:text-pink-500 p-1"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-2 pb-4 px-2 space-y-1">
            {navItems.map((item, index) => (
              <a 
                key={index}
                href="#" 
                className="block px-3 py-2 text-base text-gray-800 hover:text-pink-500 hover:bg-gray-100 rounded-md"
              >
                {item}
              </a>
            ))}
            <a 
              href="#" 
              className="block px-3 py-2 text-base text-gray-800 hover:text-pink-500 hover:bg-gray-100 rounded-md"
            >
              All Microsoft
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
