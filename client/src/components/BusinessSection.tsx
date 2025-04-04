import { useState, useEffect, useRef } from "react";
import { ChevronRight, Briefcase, Sparkles } from "lucide-react";
import { businessProducts } from "@/data/business";

export default function BusinessSection() {
  const [visibleProducts, setVisibleProducts] = useState<number[]>([]);
  const [animatedTitle, setAnimatedTitle] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Intersection observer to trigger animations when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatedTitle(true);
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
      if (currentIndex < businessProducts.length) {
        setVisibleProducts(prev => [...prev, currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 150); // Delay between each product reveal

    return () => clearInterval(interval);
  };

  // Card hover effect handler with advanced interactions
  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, entering: boolean) => {
    const card = e.currentTarget;
    const cardRect = card.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calculate the angle for 3D rotation effect - subtle tilt based on mouse position
    const angleX = (mouseY - cardCenterY) / 20;
    const angleY = (cardCenterX - mouseX) / 20;
    const distance = Math.sqrt(Math.pow(mouseX - cardCenterX, 2) + Math.pow(mouseY - cardCenterY, 2));
    const brightness = 1 + (1 - Math.min(distance / (cardRect.width/2), 1)) * 0.1;
    
    if (entering) {
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.filter = `brightness(${brightness})`;
      card.style.transition = 'transform 0.2s ease-out, filter 0.3s ease-out';
      card.style.zIndex = '10';
    } else {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.filter = 'brightness(1)';
      card.style.transition = 'transform 0.5s ease-out, filter 0.5s ease-out';
      card.style.zIndex = '1';
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-16 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Decorative animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full animate-float-slow"
            style={{
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: `rgba(${100 + Math.random() * 155}, ${100 + Math.random() * 100}, ${200 + Math.random() * 55}, 0.1)`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 7}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative">
        {/* Animated heading with special effects */}
        <div className={`flex items-center justify-center mb-10 transition-all duration-1000 ${animatedTitle ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <Briefcase className="w-8 h-8 mr-3 text-purple-600 animate-float-slow" />
          <h2 className="text-3xl md:text-4xl font-['Comic_Neue',cursive] text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-600 animate-glow relative">
            <span className="inline-block animate-float-slow">F</span>
            <span className="inline-block animate-float" style={{ animationDelay: "0.1s" }}>o</span>
            <span className="inline-block animate-float-fast" style={{ animationDelay: "0.2s" }}>r</span>
            <span className="mx-2"></span>
            <span className="inline-block animate-float-reverse" style={{ animationDelay: "0.3s" }}>b</span>
            <span className="inline-block animate-float-slow" style={{ animationDelay: "0.4s" }}>u</span>
            <span className="inline-block animate-float" style={{ animationDelay: "0.5s" }}>s</span>
            <span className="inline-block animate-float-fast" style={{ animationDelay: "0.6s" }}>i</span>
            <span className="inline-block animate-float-reverse" style={{ animationDelay: "0.7s" }}>n</span>
            <span className="inline-block animate-float-slow" style={{ animationDelay: "0.8s" }}>e</span>
            <span className="inline-block animate-float" style={{ animationDelay: "0.9s" }}>s</span>
            <span className="inline-block animate-float-fast" style={{ animationDelay: "1.0s" }}>s</span>
            
            {/* Decorative sparkles around heading */}
            <span className="absolute -top-4 -right-8 animate-sparkle">
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </span>
            <span className="absolute -bottom-2 -left-6 animate-sparkle" style={{ animationDelay: "0.7s" }}>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {businessProducts.map((product, index) => (
            <div 
              key={product.id} 
              className={`bg-white bg-opacity-90 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-all duration-500 group anime-border ${
                visibleProducts.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transformStyle: 'preserve-3d',
                transitionDelay: `${index * 150}ms`
              }}
              onMouseMove={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              {/* Image container with advanced hover effects */}
              <div className="h-48 overflow-hidden relative">
                {/* Main image with hover transforms */}
                <img 
                  src={product.image} 
                  alt={`${product.title} illustration`} 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" 
                />
                
                {/* Anime-style overlay with gradient and pulse */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* Radial pulse effect on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-16 h-16 bg-white/20 rounded-full transform-gpu animate-ping"></div>
                  </div>
                </div>
                
                {/* Animated sparkles on hover */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i}
                      className="absolute animate-sparkle opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        left: `${30 + Math.random() * 40}%`,
                        top: `${30 + Math.random() * 40}%`,
                        width: `${4 + Math.random() * 8}px`,
                        height: `${4 + Math.random() * 8}px`,
                        animationDelay: `${i * 0.3}s`
                      }}
                    >
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill="white" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Content with anime-styled effects */}
              <div className="p-5 relative">
                {/* Title with animation and gradient */}
                <h3 className="text-xl font-['Comic_Neue',cursive] text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-600 mb-2 transition-all duration-300 group-hover:scale-[1.02] origin-left">
                  {product.title}
                </h3>
                
                {/* Description with subtle animations */}
                <p className="text-gray-600 mb-4 transition-all duration-300 group-hover:text-gray-800 relative">
                  {product.description}
                  
                  {/* Subtle decorative element */}
                  <span className="absolute -left-1 top-0 w-0.5 h-0 group-hover:h-full bg-gradient-to-b from-purple-500 to-blue-500 transition-all duration-500 delay-100"></span>
                </p>
                
                {/* Link with animated effects */}
                <a 
                  href={product.link.url} 
                  className="relative ms-anime-button py-1.5 px-4 text-sm inline-flex items-center"
                >
                  <span className="relative z-10">{product.link.text}</span>
                  <ChevronRight className="w-4 h-4 ml-1 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
              
              {/* Corner decorations */}
              <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-bl from-purple-400/40 to-blue-400/40 rotate-45 transform-gpu"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
