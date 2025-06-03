
import { Twitter, Linkedin, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <img 
                src="/lovable-uploads/01519854-3b9c-4c6b-99bc-bbb2f1e7aa5a.png" 
                alt="PostPro AI Logo" 
                className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg object-contain"
              />
              <h3 className="text-2xl sm:text-3xl font-bold">PostPro AI</h3>
            </div>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 max-w-md">
              Elevate your social media presence with AI-powered content enhancement. 
              Transform ordinary posts into engagement magnets.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors text-base sm:text-lg">Home</Link></li>
              <li><Link to="/features" className="text-gray-300 hover:text-white transition-colors text-base sm:text-lg">Features</Link></li>
              <li><Link to="/subscription" className="text-gray-300 hover:text-white transition-colors text-base sm:text-lg">Pricing</Link></li>
              <li><Link to="/blogs" className="text-gray-300 hover:text-white transition-colors text-base sm:text-lg">Blog</Link></li>
              <li><Link to="/affiliate" className="text-gray-300 hover:text-white transition-colors text-base sm:text-lg">Affiliate</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Connect</h4>
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <a href="mailto:sumanthchary.business@gmail.com" className="text-gray-300 hover:text-white transition-colors text-base sm:text-lg block break-all">
                sumanthchary.business@gmail.com
              </a>
            </div>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="p-2 sm:p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Twitter className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
              <a href="#" className="p-2 sm:p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Linkedin className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
              <a href="#" className="p-2 sm:p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Instagram className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
              <a href="#" className="p-2 sm:p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Mail className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-6 sm:pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-base sm:text-lg">
            &copy; {new Date().getFullYear()} PostPro AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
