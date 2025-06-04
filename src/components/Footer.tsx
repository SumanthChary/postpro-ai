
import { Twitter, Linkedin, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-16">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-4 mb-6 lg:mb-8">
              <img 
                src="/lovable-uploads/01519854-3b9c-4c6b-99bc-bbb2f1e7aa5a.png" 
                alt="PostPro AI Logo" 
                className="w-12 lg:w-14 h-12 lg:h-14 rounded-xl object-contain shadow-lg"
              />
              <h3 className="text-3xl lg:text-4xl font-bold">PostPro AI</h3>
            </div>
            <p className="text-gray-300 text-lg lg:text-xl leading-relaxed mb-6 lg:mb-8 max-w-md font-medium">
              Elevate your social media presence with AI-powered content enhancement. 
              Transform ordinary posts into engagement magnets.
            </p>
          </div>
          
          <div>
            <h4 className="text-xl lg:text-2xl font-bold mb-6 lg:mb-8 text-white">Quick Links</h4>
            <ul className="space-y-3 lg:space-y-4">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors text-lg lg:text-xl font-medium">Home</Link></li>
              <li><Link to="/features" className="text-gray-300 hover:text-white transition-colors text-lg lg:text-xl font-medium">Features</Link></li>
              <li><Link to="/subscription" className="text-gray-300 hover:text-white transition-colors text-lg lg:text-xl font-medium">Pricing</Link></li>
              <li><Link to="/blogs" className="text-gray-300 hover:text-white transition-colors text-lg lg:text-xl font-medium">Blog</Link></li>
              <li><Link to="/affiliate" className="text-gray-300 hover:text-white transition-colors text-lg lg:text-xl font-medium">Affiliate</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl lg:text-2xl font-bold mb-6 lg:mb-8 text-white">Connect</h4>
            <div className="space-y-4 lg:space-y-5 mb-6 lg:mb-8">
              <a href="mailto:sumanthchary.business@gmail.com" className="text-gray-300 hover:text-white transition-colors text-lg lg:text-xl font-medium block break-all">
                sumanthchary.business@gmail.com
              </a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="p-3 lg:p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors group">
                <Twitter className="w-5 lg:w-6 h-5 lg:h-6 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-3 lg:p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors group">
                <Linkedin className="w-5 lg:w-6 h-5 lg:h-6 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-3 lg:p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors group">
                <Instagram className="w-5 lg:w-6 h-5 lg:h-6 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-3 lg:p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors group">
                <Mail className="w-5 lg:w-6 h-5 lg:h-6 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 lg:pt-10 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-lg lg:text-xl font-medium">
            &copy; {new Date().getFullYear()} PostPro AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
