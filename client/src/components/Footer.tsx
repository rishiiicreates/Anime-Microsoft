import { footerColumns, footerBottomLinks } from "@/data/footer";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {footerColumns.map((column, index) => (
            <div key={index}>
              <h3 className="font-bold mb-4 text-sm">{column.title}</h3>
              <ul className="space-y-3 text-xs text-gray-400">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.url} 
                      className="hover:text-pink-500 transition-colors duration-300"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-700">
          <div className="flex flex-wrap items-center mb-4 md:mb-0 text-xs text-gray-400">
            <span className="mr-4">English (United States)</span>
            {footerBottomLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.url} 
                className="mr-4 hover:text-pink-500 transition-colors duration-300"
              >
                {link.text}
              </a>
            ))}
          </div>
          <div className="text-xs text-gray-400">
            © Microsoft 2023
          </div>
        </div>
      </div>
    </footer>
  );
}
