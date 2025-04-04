import { ChevronRight } from "lucide-react";
import { businessProducts } from "@/data/business";

export default function BusinessSection() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-['Comic_Neue',cursive] text-center mb-8 text-purple-700">For business</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {businessProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={`${product.title} illustration`} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-['Comic_Neue',cursive] text-purple-700 mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <a 
                  href={product.link.url} 
                  className="text-blue-600 hover:text-pink-500 font-semibold transition-colors duration-300 flex items-center"
                >
                  {product.link.text}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
