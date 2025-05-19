
import { Twitter, Linkedin, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-custom-text py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <h3 className="font-montserrat font-extrabold text-2xl mb-4 text-white">PostPro AI</h3>
            <p className="text-white/80 mb-6 max-w-sm">
              Elevate your social media presence with AI-powered content enhancement that drives real engagement and grows your audience.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a 
                href="#" 
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a 
                href="#" 
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a 
                href="mailto:sumanthchary.business@gmail.com" 
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-bold text-white text-lg mb-5">Product</h4>
            <ul className="space-y-3">
              <li><Link to="/features" className="text-white/70 hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/subscription" className="text-white/70 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/blogs" className="text-white/70 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-bold text-white text-lg mb-5">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/affiliate" className="text-white/70 hover:text-white transition-colors">Affiliate</Link></li>
              <li><Link to="/" className="text-white/70 hover:text-white transition-colors">About Us</Link></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-bold text-white text-lg mb-5">Legal</h4>
            <ul className="space-y-3">
              <li><Link to="/terms-and-conditions" className="text-white/70 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy" className="text-white/70 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cancellation-policy" className="text-white/70 hover:text-white transition-colors">Cancellation</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} PostPro AI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Help Center</a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Status</a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Changelog</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
