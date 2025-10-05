import { Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface UpgradePromptProps {
  featureName: string;
  message: string;
}

const UpgradePrompt = ({ featureName, message }: UpgradePromptProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 rounded-xl p-6 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
        <Lock className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        {featureName} is a Pro Feature
      </h3>
      <p className="text-muted-foreground mb-4">
        {message}
      </p>
      <Button 
        onClick={() => navigate('/subscription')}
        className="bg-primary hover:bg-primary/90"
        size="lg"
      >
        Upgrade to Professional - Only $9.99/mo
      </Button>
      <p className="text-xs text-muted-foreground mt-3">
        Get unlimited posts, virality scores, templates, and more
      </p>
    </div>
  );
};

export default UpgradePrompt;
