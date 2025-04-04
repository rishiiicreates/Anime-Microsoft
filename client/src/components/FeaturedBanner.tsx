import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Code, Wand2 } from "lucide-react";

export default function FeaturedBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [particlesGenerated, setParticlesGenerated] = useState(false);
  const [codeLines, setCodeLines] = useState<Array<{id: number, text: string, x: number, y: number, size: number, delay: number}>>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const particleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Detect when the section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (!particlesGenerated) {
              generateInitialCodeParticles();
              setParticlesGenerated(true);
            }
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [particlesGenerated]);
  
  // Generate initial code particles for animation
  const generateInitialCodeParticles = () => {
    const codeSnippets = [
      "const ai = new Copilot();",
      "await ai.assist(task);",
      "function enhanceCreativity() {",
      "  return inspiration.map(idea => {",
      "    return ai.expand(idea);",
      "  });",
      "}",
      "class AnimeUI extends Component {",
      "  render() {",
      "    return <Sparkles />;",
      "  }",
      "}",
      "export const magic = createMagic();",
      "import { creativity } from 'mind';",
      "<div className='anime-effect'>",
      "</div>",
      "const future = await imagine();",
      "response.json({ success: true });"
    ];
    
    const newCodeLines = codeSnippets.map((text, index) => ({
      id: index,
      text,
      x: Math.random() * 80 + 10, // 10-90%
      y: Math.random() * 80 + 10, // 10-90%
      size: Math.random() * 0.4 + 0.8, // 0.8-1.2 scale factor
      delay: index * 0.2, // Staggered delay
    }));
    
    setCodeLines(newCodeLines);
    
    // Periodically generate new code particles
    particleIntervalRef.current = setInterval(() => {
      if (Math.random() > 0.7) { // Only 30% chance to generate new particles
        const newId = Date.now();
        const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        
        setCodeLines(prev => [
          ...prev.slice(-15), // Keep only the last 15 particles to prevent too many
          {
            id: newId,
            text: randomSnippet,
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
            size: Math.random() * 0.4 + 0.8,
            delay: 0,
          }
        ]);
      }
    }, 2000);
    
    return () => {
      if (particleIntervalRef.current) {
        clearInterval(particleIntervalRef.current);
      }
    };
  };
  
  // Define the neural network animation
  useEffect(() => {
    let canvas: HTMLCanvasElement | null = null;
    let ctx: CanvasRenderingContext2D | null = null;
    
    const nodes: Array<{x: number, y: number, vx: number, vy: number, radius: number}> = [];
    const numNodes = 15;
    const maxDistance = 120;
    
    // Setup canvas
    const setupCanvas = () => {
      canvas = document.getElementById('neural-network') as HTMLCanvasElement;
      if (!canvas) return false;
      
      ctx = canvas.getContext('2d');
      if (!ctx) return false;
      
      // Set canvas dimensions
      const canvasContainer = canvas.parentElement;
      if (canvasContainer) {
        canvas.width = canvasContainer.clientWidth;
        canvas.height = canvasContainer.clientHeight;
      }
      
      // Create nodes
      for (let i = 0; i < numNodes; i++) {
        const radius = Math.random() * 3 + 2;
        
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius,
        });
      }
      
      return true;
    };
    
    // Animation loop
    const animate = (timestamp: number) => {
      if (!canvas || !ctx) return;
      
      // Calculate time delta for smooth animation
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Move nodes
        node.x += node.vx * (delta * 0.1);
        node.y += node.vy * (delta * 0.1);
        
        // Bounce off edges
        if (node.x <= node.radius || node.x >= canvas.width - node.radius) {
          node.vx *= -1;
        }
        if (node.y <= node.radius || node.y >= canvas.height - node.radius) {
          node.vy *= -1;
        }
        
        // Draw node
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 2
        );
        gradient.addColorStop(0, 'rgba(255, 107, 158, 0.8)');
        gradient.addColorStop(1, 'rgba(138, 43, 226, 0)');
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      // Draw connections between nodes
      ctx.strokeStyle = 'rgba(138, 43, 226, 0.2)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            // Connection strength based on distance
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = `rgba(138, 43, 226, ${opacity * 0.5})`;
            ctx.lineWidth = opacity * 1.5;
            
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Initialize and start animation
    if (isVisible) {
      const isSetup = setupCanvas();
      if (isSetup) {
        animationRef.current = requestAnimationFrame(animate);
      }
      
      // Handle resize events
      const handleResize = () => {
        if (canvas && canvas.parentElement) {
          canvas.width = canvas.parentElement.clientWidth;
          canvas.height = canvas.parentElement.clientHeight;
        }
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isVisible]);
  
  // Clean up animation when component unmounts
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (particleIntervalRef.current) {
        clearInterval(particleIntervalRef.current);
      }
    };
  }, []);
  
  // Features with anime-styled animations
  const features = [
    { icon: <Code className="w-5 h-5" />, text: "Write and debug code" },
    { icon: <Sparkles className="w-5 h-5" />, text: "Generate creative content" },
    { icon: <Check className="w-5 h-5" />, text: "Answer questions with AI" },
    { icon: <Wand2 className="w-5 h-5" />, text: "Automate repetitive tasks" }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-gradient-to-b from-gray-100 to-white overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div 
          className={`bg-gradient-to-br from-purple-800 to-purple-600 rounded-xl overflow-hidden shadow-2xl relative transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Background animated pattern */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(138,43,226,0.2)_0%,rgba(255,107,158,0.2)_25%,rgba(255,255,255,0)_50%)]"></div>
            
            {/* Neural network canvas animation */}
            <canvas 
              id="neural-network" 
              className="absolute inset-0 w-full h-full"
            ></canvas>
          </div>
          
          <div className="md:flex relative z-10">
            {/* Content section */}
            <div className="md:w-1/2 p-8 md:p-12 relative">
              {/* Heading with anime effects */}
              <div className="relative mb-6">
                <h2 
                  className={`text-3xl md:text-4xl font-['Comic_Neue',cursive] text-white mb-1 transition-all duration-1000 transform ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  } animate-glow`}
                  style={{ textShadow: "0 0 10px #ff6b9e, 0 0 20px #8a2be2" }}
                >
                  <span className="inline-flex items-center">
                    <Sparkles className="w-7 h-7 mr-2 animate-pulse" />
                    Microsoft Copilot
                  </span>
                </h2>
                
                {/* Animated underline */}
                <div 
                  className={`h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded max-w-[280px] transition-all duration-1000 ease-in-out ${
                    isVisible ? 'w-full' : 'w-0'
                  }`} 
                  style={{ transitionDelay: '0.3s' }}
                ></div>
              </div>
              
              {/* Description with staggered animation */}
              <p 
                className={`text-white text-lg mb-8 leading-relaxed max-w-lg transition-all duration-1000 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: '0.4s' }}
              >
                Your AI companion that helps you write, code, create, and reason—with your permission and your guidance.
              </p>
              
              {/* Feature list with anime-styled animations */}
              <div className="mb-8">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className={`flex items-center mb-3 text-white transition-all duration-700 transform ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}
                    style={{ transitionDelay: `${0.5 + index * 0.15}s` }}
                  >
                    <div className="mr-3 p-1.5 rounded-full bg-white/20 hover-bounce">
                      {feature.icon}
                    </div>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
              
              {/* Button with advanced hover effects */}
              <div 
                className={`transition-all duration-1000 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: '0.9s' }}
              >
                <button 
                  className="ms-anime-button group relative py-2.5 px-6"
                >
                  <span className="relative z-10 flex items-center">
                    Learn more about Copilot
                    <span className="ml-1.5 transition-transform duration-300 transform group-hover:translate-x-1">→</span>
                  </span>
                </button>
              </div>
            </div>
            
            {/* Visualization section */}
            <div className="md:w-1/2 relative min-h-[350px] md:min-h-0">
              {/* Anime-styled Copilot visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className={`relative w-4/5 h-4/5 transition-all duration-1000 transform ${
                    isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                  }`}
                  style={{ transitionDelay: '0.6s' }}
                >
                  {/* Anime-style AI entity with advanced SVG animations */}
                  <div className="w-full h-full animate-float perspective-[1000px]">
                    <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-[0_0_15px_rgba(138,43,226,0.6)]">
                      <defs>
                        <radialGradient id="aiGlowGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                          <stop offset="0%" stopColor="#ff6b9e" stopOpacity="1" />
                          <stop offset="60%" stopColor="#8a2be2" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="#4a0082" stopOpacity="0" />
                        </radialGradient>
                        
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur stdDeviation="5" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>
                      
                      {/* Outer energy field */}
                      <circle cx="100" cy="100" r="80" fill="url(#aiGlowGradient)" opacity="0.7">
                        <animate attributeName="r" values="80;85;80" dur="4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.7;0.9;0.7" dur="4s" repeatCount="indefinite" />
                      </circle>
                      
                      {/* Inner core */}
                      <circle cx="100" cy="100" r="50" fill="#ff6b9e" opacity="0.8">
                        <animate attributeName="r" values="50;55;50" dur="3s" repeatCount="indefinite" />
                      </circle>
                      
                      {/* Energy rings */}
                      <g opacity="0.8" filter="url(#glow)">
                        <circle cx="100" cy="100" r="65" fill="none" stroke="#fff" strokeWidth="1" strokeDasharray="10,5">
                          <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="20s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="100" cy="100" r="75" fill="none" stroke="#fff" strokeWidth="0.5" strokeDasharray="5,10">
                          <animateTransform attributeName="transform" type="rotate" from="360 100 100" to="0 100 100" dur="15s" repeatCount="indefinite" />
                        </circle>
                      </g>
                      
                      {/* Orbiting particles */}
                      {[...Array(5)].map((_, i) => (
                        <g key={i} transform={`rotate(${i * 72} 100 100)`}>
                          <circle cx="100" cy="30" r="5" fill="#fff">
                            <animateMotion 
                              path="M0,0 C40,-40 40,40 0,0 C-40,-40 -40,40 0,0" 
                              dur={`${5 + i}s`} 
                              repeatCount="indefinite" 
                            />
                            <animate attributeName="opacity" values="1;0.5;1" dur={`${3 + i}s`} repeatCount="indefinite" />
                          </circle>
                        </g>
                      ))}
                      
                      {/* Center symbol with pulse */}
                      <g transform="translate(100, 100)">
                        <path d="M0,-25 L10,0 L0,25 L-10,0 Z" fill="#fff" stroke="#8a2be2" strokeWidth="1">
                          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="10s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
                        </path>
                        <circle cx="0" cy="0" r="15" fill="rgba(255,255,255,0.3)" stroke="#fff" strokeWidth="0.5">
                          <animate attributeName="r" values="15;20;15" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
                        </circle>
                      </g>
                    </svg>
                  </div>
                  
                  {/* Floating code particles */}
                  <div className="absolute top-0 left-0 w-full h-full overflow-hidden select-none pointer-events-none">
                    {codeLines.map((line) => (
                      <div 
                        key={line.id}
                        className="absolute font-mono text-white opacity-0 animate-appear"
                        style={{
                          left: `${line.x}%`,
                          top: `${line.y}%`,
                          fontSize: `${Math.max(8, 10 * line.size)}px`,
                          animationDelay: `${line.delay}s`,
                          transform: `scale(${line.size})`,
                          textShadow: '0 0 5px rgba(255,255,255,0.7)'
                        }}
                      >
                        {line.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
