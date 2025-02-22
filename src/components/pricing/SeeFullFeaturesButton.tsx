
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface SeeFullFeaturesButtonProps {
  onClick: () => void;
}

const SeeFullFeaturesButton = ({ onClick }: SeeFullFeaturesButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="group text-electric-purple hover:text-electric-purple/90"
      variant="link"
    >
      See Full Features
      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </Button>
  );
};

export default SeeFullFeaturesButton;
