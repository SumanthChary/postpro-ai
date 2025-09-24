import { Twitter, Linkedin, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/lovable-uploads/01519854-3b9c-4c6b-99bc-bbb2f1e7aa5a.png" alt="PostPro AI Logo" className="w-8 h-8 rounded-lg" />
              <h3 className="text-xl font-bold">PostPro AI</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              AI-powered LinkedIn content enhancement for professional growth.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/features" className="text-gray-300 hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/subscription" className="text-gray-300 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/blogs" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/affiliate" className="text-gray-300 hover:text-white transition-colors">Affiliate</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="mailto:sumanthchary.business@gmail.com" className="text-gray-300 hover:text-white transition-colors text-sm block">
                sumanthchary.business@gmail.com
              </a>
              <div className="flex space-x-3">
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} PostPro AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;