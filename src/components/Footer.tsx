import { Twitter, Linkedin, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return <footer className="bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-10">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4 lg:mb-5">
              <img src="/lovable-uploads/01519854-3b9c-4c6b-99bc-bbb2f1e7aa5a.png" alt="PostPro AI Logo" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg object-contain shadow-lg" />
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-50">PostPro AI</h3>
            </div>
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-5 max-w-md font-medium">
              Transform your LinkedIn presence with AI-powered content enhancement. 
              Join 500+ professionals already growing their audience.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-medium">✓ 500+ Active Users</span>
              <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-medium">✓ 50K+ Posts Enhanced</span>
              <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs font-medium">✓ 340% Avg Engagement Boost</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 lg:mb-5 text-white">Quick Links</h4>
            <ul className="space-y-1.5 sm:space-y-2 lg:space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base font-medium">Home</Link></li>
              <li><Link to="/features" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base font-medium">Features</Link></li>
              <li><Link to="/subscription" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base font-medium">Pricing</Link></li>
              <li><Link to="/blogs" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base font-medium">Blog</Link></li>
              <li><Link to="/affiliate" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base font-medium">Affiliate Program</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 lg:mb-5 text-white">Support</h4>
            <ul className="space-y-1.5 sm:space-y-2 lg:space-y-3">
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base font-medium">Contact Us</Link></li>
              <li><Link to="/support" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base font-medium">Help Center</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base font-medium">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base font-medium">Terms & Conditions</Link></li>
            </ul>
          </div>
          
        </div>
        
        <div className="pt-4 sm:pt-6 lg:pt-8 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm font-medium">
              &copy; {new Date().getFullYear()} PostPro AI. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex space-x-2.5">
                <a href="mailto:sumanthchary.business@gmail.com" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group">
                  <Mail className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group">
                  <Twitter className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group">
                  <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;