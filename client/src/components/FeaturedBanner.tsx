import { Button } from "@/components/ui/button";

export default function FeaturedBanner() {
  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="bg-purple-700 rounded-xl overflow-hidden shadow-2xl relative">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 
                className="text-3xl font-['Comic_Neue',cursive] text-white mb-4"
                style={{ textShadow: "0 0 10px #ff6b9e, 0 0 20px #8a2be2" }}
              >
                Microsoft Copilot
              </h2>
              <p className="text-white text-lg mb-6">
                Your AI companion that helps you write, code, create, and reason—with your permission and your guidance.
              </p>
              <Button 
                className="inline-block bg-white text-purple-700 font-bold px-6 py-2 rounded-md hover:bg-opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(138,43,226,0.6)]"
              >
                Learn more about Copilot
              </Button>
            </div>
            <div className="md:w-1/2 relative min-h-[300px]">
              {/* Anime-styled Copilot visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-3/4 h-3/4">
                  {/* Anime-style AI assistant with glowing effects */}
                  <div className="w-full h-full animate-[float_5s_ease-in-out_infinite]">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="50" r="40" fill="#f0f" opacity="0.6">
                        <animate attributeName="r" from="40" to="45" dur="3s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="50" cy="50" r="30" fill="#00f" opacity="0.4">
                        <animate attributeName="r" from="30" to="35" dur="2.5s" repeatCount="indefinite" />
                      </circle>
                      <g transform="translate(50, 50)">
                        <path d="M0,-25 L10,0 L0,25 L-10,0 Z" fill="#fff">
                          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="10s" repeatCount="indefinite" />
                        </path>
                      </g>
                    </svg>
                  </div>
                  
                  {/* Animated code particles */}
                  <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-50">
                    <div className="absolute top-[10%] left-[20%] font-mono text-white animate-[float_5s_infinite]">
                      &lt;div&gt;
                    </div>
                    <div className="absolute top-[30%] left-[70%] font-mono text-white animate-[float_4s_infinite]">
                      const ai = new Copilot();
                    </div>
                    <div className="absolute top-[60%] left-[30%] font-mono text-white animate-[float_6s_infinite]">
                      await ai.assist();
                    </div>
                    <div className="absolute top-[80%] left-[60%] font-mono text-white animate-[float_4.5s_infinite]">
                      &lt;/div&gt;
                    </div>
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
