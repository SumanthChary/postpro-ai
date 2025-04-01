
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Ticket, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface RedeemCodeFormProps {
  onClose: () => void;
}

const RedeemCodeForm = ({ onClose }: RedeemCodeFormProps) => {
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (code.trim().toUpperCase() === "POST3X") {
        // Get current user
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          toast({
            title: "Authentication required",
            description: "Please sign in to redeem your code",
          });
          navigate("/auth");
          return;
        }
        
        // Show success UI
        setIsSuccess(true);
        
        // Show toast
        toast({
          title: "Code redeemed successfully!",
          description: "You now have access to the Monthly Plan features.",
        });
        
        // Redirect to profile or enhance page after a brief delay
        setTimeout(() => {
          navigate("/enhance");
        }, 3000);
      } else {
        toast({
          title: "Invalid code",
          description: "Please check your code and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center p-6">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <Check className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <h3 className="text-lg font-medium mb-2">Code Redeemed Successfully!</h3>
        <p className="text-sm text-gray-500 mb-4">
          You now have access to the Monthly Plan features.
        </p>
        <p className="text-xs text-gray-400">
          Redirecting you to the app...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h3 className="text-lg font-medium mb-4">Redeem Your Code</h3>
      <div className="mb-4">
        <Input
          placeholder="Enter code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="bg-electric-purple hover:bg-electric-purple/90"
          disabled={isSubmitting || code.trim() === ""}
        >
          {isSubmitting ? "Checking..." : "Redeem"}
        </Button>
      </div>
    </form>
  );
};

export default RedeemCodeForm;
