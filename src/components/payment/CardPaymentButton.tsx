
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const CardPaymentButton = () => {
  const { toast } = useToast();
  
  return (
    <Button
      className="w-full bg-electric-blue hover:bg-electric-blue/90"
      onClick={() => {
        toast({
          title: "Coming Soon",
          description: "Card payments will be available shortly.",
        });
      }}
    >
      <CreditCard className="mr-2 h-4 w-4" />
      Pay with Card
    </Button>
  );
};
