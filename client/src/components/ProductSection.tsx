import { ChevronRight } from "lucide-react";
import { products } from "@/data/products";

export default function ProductSection() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={`${product.title} illustration`} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                />
                {product.badge && (
                  <div className="absolute top-2 right-2">
                    <span className={`inline-block ${product.badge.color} text-white text-xs px-2 py-1 rounded-full`}>
                      {product.badge.text}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-['Comic_Neue',cursive] text-purple-700 mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex flex-wrap space-x-4">
                  {product.links.map((link, index) => (
                    <a 
                      key={index}
                      href={link.url} 
                      className="text-blue-600 hover:text-pink-500 font-semibold transition-colors duration-300 flex items-center mb-2"
                    >
                      {link.text}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
