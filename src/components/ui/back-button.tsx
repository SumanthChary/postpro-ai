
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  label?: string;
  to?: string;
  className?: string;
}

export const BackButton = ({ 
  label = "Back", 
  to = "/", 
  className = "" 
}: BackButtonProps) => {
  const navigate = useNavigate();
  
  return (
    <Button
      variant="ghost"
      className={`mb-6 ${className}`}
      onClick={() => navigate(to)}
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      {label}
    </Button>
  );
};
