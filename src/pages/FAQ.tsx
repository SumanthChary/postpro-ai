import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { HomeIcon } from "lucide-react";

const FAQPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/50 flex flex-col">
      <div className="flex-grow pt-16 sm:pt-20 md:pt-24">
        <div className="container mx-auto px-4">
          <Button 
            onClick={() => navigate("/")}
            variant="outline" 
            size="sm"
            className="mb-6 flex items-center gap-2 bg-white/80 backdrop-blur-sm border-gray-200/50 hover:bg-white/90"
          >
            <HomeIcon size={16} />
            <span>Back to Home</span>
          </Button>
          
          <FAQ />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQPage;