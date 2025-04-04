import { useState, useEffect, useRef } from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import { products } from "@/data/products";

export default function ProductSection() {
  const [visibleProducts, setVisibleProducts] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Intersection observer to trigger animations when products come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When section is visible, start showing products
          if (entry.isIntersecting) {
            // Initially show first batch of products
            startProductReveal();
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Function to reveal products one by one with a delay
  const startProductReveal = () => {
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < products.length) {
        setVisibleProducts(prev => [...prev, currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 150); // Delay between each product reveal

    return () => clearInterval(interval);
  };

  // Card hover effect handler with 3D tilt effect
  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, entering: boolean) => {
    const card = e.currentTarget;
    const cardRect = card.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calculate the angle for 3D rotation effect - subtle tilt based on mouse position
    const angleX = (mouseY - cardCenterY) / 25;
    const angleY = (cardCenterX - mouseX) / 25;
    
    if (entering) {
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.03, 1.03, 1.03)`;
      card.style.transition = 'transform 0.2s ease-out';
      card.style.zIndex = '10';
    } else {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s ease-out';
      card.style.zIndex = '1';
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-10 bg-gradient-to-b from-white via-purple-50 to-white relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-200 rounded-full opacity-20 animate-float-slow"></div>
        <div className="absolute top-1/4 -right-20 w-60 h-60 bg-pink-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute -bottom-20 left-1/4 w-80 h-80 bg-blue-200 rounded-full opacity-20 animate-float-reverse"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-500 animate-glow">
          Find your next favorite
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className={`bg-white bg-opacity-80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-all duration-500 group relative anime-border ${
                visibleProducts.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                transformStyle: 'preserve-3d',
                transitionDelay: `${index * 80}ms`
              }}
              onMouseMove={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              <div className="h-48 overflow-hidden relative group">
                {/* Image with hover effect */}
                <img 
                  src={product.image} 
                  alt={`${product.title} illustration`} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                />
                
                {/* Animated overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Badge with animation */}
                {product.badge && (
                  <div className="absolute top-2 right-2 animate-float-fast" style={{ animationDelay: `${index * 0.1}s` }}>
                    <span className={`inline-block ${product.badge.color} text-white text-xs px-2 py-1 rounded-full shadow-lg`}>
                      <span className="flex items-center">
                        <Sparkles className="w-3 h-3 mr-1 animate-pulse" />
                        {product.badge.text}
                      </span>
                    </span>
                  </div>
                )}
                
                {/* Animated sparkles that appear on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-3 h-3 animate-sparkle">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill="white" />
                    </svg>
                  </div>
                  <div className="absolute bottom-1/3 right-1/4 w-2 h-2 animate-sparkle" style={{ animationDelay: '0.3s' }}>
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill="white" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="p-4 relative z-10">
                {/* Title with animation */}
                <h3 className="text-xl font-['Comic_Neue',cursive] bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-pink-600 mb-2 transition-all duration-300 group-hover:scale-[1.02] origin-left transform-gpu">
                  {product.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 mb-4 transition-all duration-300 group-hover:text-gray-800">
                  {product.description}
                </p>
                
                {/* Links with enhanced animations */}
                <div className="flex flex-wrap space-x-4">
                  {product.links.map((link, linkIndex) => (
                    <a 
                      key={linkIndex}
                      href={link.url} 
                      className="relative overflow-hidden text-blue-600 hover:text-pink-500 font-semibold transition-all duration-300 flex items-center mb-2 hover-bounce"
                    >
                      <span className="relative z-10">{link.text}</span>
                      <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                      
                      {/* Animated underline effect */}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Corner decoration - anime style */}
              <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden opacity-80 pointer-events-none">
                <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rotate-45 transform-gpu"></div>
              </div>
              
              {/* Glowing border effect that activates on hover */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                   style={{ 
                     boxShadow: '0 0 15px rgba(138, 43, 226, 0.3), 0 0 30px rgba(255, 107, 158, 0.2)',
                   }}>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
