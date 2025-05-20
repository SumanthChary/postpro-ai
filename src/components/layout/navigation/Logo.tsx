
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
      <img 
        src="/lovable-uploads/01519854-3b9c-4c6b-99bc-bbb2f1e7aa5a.png" 
        alt="PostPro AI Logo" 
        className="w-8 h-8 rounded-lg object-contain"
      />
      <span className="text-2xl font-montserrat font-extrabold bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">
        PostPro AI
      </span>
    </div>
  );
};

export default Logo;
