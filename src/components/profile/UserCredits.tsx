
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Coins, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { supabase } from "@/integrations/supabase/client";
import { UserCredit } from "@/types/pricing";

interface UserCreditsProps {
  userId: string;
}

const UserCredits = ({ userId }: UserCreditsProps) => {
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState<UserCredit[]>([]);
  const [totalCredits, setTotalCredits] = useState(0);
  const [maxCredits, setMaxCredits] = useState(2000); // Default max for UI

  useEffect(() => {
    const fetchCredits = async () => {
      if (!userId) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase.functions.invoke('handle-credits', {
          body: { 
            action: 'get',
            userId
          }
        });

        if (error) throw error;
        
        if (data.success) {
          setCredits(data.credits || []);
          setTotalCredits(data.totalCredits || 0);
          
          // Set max credits based on the highest tier or current credits
          const highestTier = 2000; // Based on yearly plan
          setMaxCredits(Math.max(highestTier, data.totalCredits));
        }
      } catch (error) {
        console.error('Error fetching credits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, [userId]);

  if (loading) {
    return (
      <Card className="p-4 animate-pulse">
        <div className="h-16 bg-gray-200 rounded mb-4"></div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold flex items-center">
          <Coins className="w-5 h-5 mr-2 text-green-600" />
          Your Credits
        </h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-gray-400 hover:text-gray-600">
                <Info className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                Credits can be used for premium features. They expire 3 months after being earned.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600">Available Credits</span>
          <span className="font-semibold">{totalCredits}</span>
        </div>
        <Progress value={(totalCredits / maxCredits) * 100} className="h-2" />
      </div>

      {credits.length > 0 ? (
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Credit Breakdown</h4>
          {credits.map((credit) => {
            const expiryDate = new Date(credit.expires_at);
            const now = new Date();
            const daysLeft = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
            
            return (
              <div key={credit.id} className="flex justify-between text-sm">
                <span>{credit.balance} credits</span>
                <span className="text-gray-500">
                  Expires in {daysLeft} days
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          No credits available. Subscribe to a plan to earn credits!
        </div>
      )}
    </Card>
  );
};

export default UserCredits;
