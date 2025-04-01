
import { Twitter, Linkedin, Instagram, Mail, FileText, Shield, FileMinus, Ship, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-electric-purple text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-montserrat font-extrabold text-2xl mb-4">PostPro AI</h3>
            <p className="font-opensans">Elevate your social media presence with AI-powered content enhancement.</p>
          </div>
          <div>
            <h4 className="font-montserrat font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 font-opensans">
              <li><Link to="/" className="hover:text-bright-teal transition-colors">Home</Link></li>
              <li><Link to="/features" className="hover:text-bright-teal transition-colors">Features</Link></li>
              <li><Link to="/subscription" className="hover:text-bright-teal transition-colors">Pricing</Link></li>
              <li><Link to="/blogs" className="hover:text-bright-teal transition-colors">Blog</Link></li>
              <li>
                <Link to="/shipping" className="hover:text-bright-teal transition-colors flex items-center">
                  <Ship className="w-4 h-4 mr-1" />
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-bright-teal transition-colors flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-montserrat font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-2 font-opensans">
              <li>
                <Link to="/terms-and-conditions" className="hover:text-bright-teal transition-colors flex items-center">
                  <FileText className="w-4 h-4 mr-1" />
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-bright-teal transition-colors flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cancellation-policy" className="hover:text-bright-teal transition-colors flex items-center">
                  <FileMinus className="w-4 h-4 mr-1" />
                  Cancellation & Refunds
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-montserrat font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 font-opensans">
              <li><a href="mailto:sumanthchary.business@gmail.com" className="hover:text-bright-teal transition-colors">sumanthchary.business@gmail.com</a></li>
            </ul>
            <h4 className="font-montserrat font-bold text-lg mt-6 mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-bright-teal transition-colors"><Twitter className="w-6 h-6" /></a>
              <a href="#" className="hover:text-bright-teal transition-colors"><Linkedin className="w-6 h-6" /></a>
              <a href="#" className="hover:text-bright-teal transition-colors"><Instagram className="w-6 h-6" /></a>
              <a href="#" className="hover:text-bright-teal transition-colors"><Mail className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/20 text-center font-opensans">
          <p>&copy; {new Date().getFullYear()} PostPro AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
