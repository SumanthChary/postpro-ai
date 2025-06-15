
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Coins, Info, Gift, Crown, Star } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { UserCredit } from "@/types/pricing";

interface UserCreditsProps {
  userId: string;
}

const UserCredits = ({ userId }: UserCreditsProps) => {
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState<UserCredit[]>([]);
  const [totalCredits, setTotalCredits] = useState(0);
  const [isUnlimited, setIsUnlimited] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [maxCredits, setMaxCredits] = useState(50); // Default to trial max
  const navigate = useNavigate();

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
          setIsUnlimited(data.unlimited || false);
          setIsCreator(data.isCreator || false);
          
          // Set max credits based on account type
          if (data.unlimited || data.isCreator) {
            setMaxCredits(999999);
          } else {
            // For trial users, max is 50. For paid users, use highest tier or current credits
            const highestTier = 2000; // Based on yearly plan
            setMaxCredits(Math.max(50, highestTier, data.totalCredits));
          }
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

  const isTrialUser = !isUnlimited && !isCreator && totalCredits <= 50;
  const progressValue = (isUnlimited || isCreator) ? 100 : (totalCredits / maxCredits) * 100;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold flex items-center font-cabinet">
          {isCreator ? (
            <Star className="w-5 h-5 mr-2 text-purple-600" />
          ) : isUnlimited ? (
            <Crown className="w-5 h-5 mr-2 text-yellow-600" />
          ) : (
            <Coins className="w-5 h-5 mr-2 text-green-600" />
          )}
          Your Credits
          {isTrialUser && <Gift className="w-4 h-4 ml-2 text-blue-500" />}
        </h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-gray-400 hover:text-gray-600">
                <Info className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs font-cabinet">
                {isCreator 
                  ? "You have unlimited credits as a creator account."
                  : isUnlimited 
                    ? "You have unlimited credits as an admin account."
                    : isTrialUser 
                      ? "You're on a free trial with 50 credits. Each post enhancement uses 1 credit."
                      : "Credits can be used for premium features. They expire 3 months after being earned."
                }
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600 font-cabinet">
            {(isUnlimited || isCreator) ? "Unlimited Credits" : "Available Credits"}
          </span>
          <span className="font-semibold font-cabinet">
            {(isUnlimited || isCreator) ? "∞" : totalCredits}
            {isTrialUser && <span className="text-blue-500 text-xs ml-1 font-cabinet">(Free Trial)</span>}
            {isCreator && <span className="text-purple-500 text-xs ml-1 font-cabinet">(Creator)</span>}
          </span>
        </div>
        <Progress value={progressValue} className="h-2" />
        {isTrialUser && totalCredits > 0 && (
          <p className="text-xs text-blue-600 mt-1 font-cabinet">
            {totalCredits} free credits remaining
          </p>
        )}
      </div>

      {!isUnlimited && !isCreator && (
        <>
          {totalCredits === 0 && (
            <div className="text-center py-4 bg-red-50 rounded-lg border border-red-200 mb-4">
              <h4 className="font-medium text-red-800 mb-2 font-cabinet">No Credits Available</h4>
              <p className="text-sm text-red-600 mb-3 font-cabinet">
                You've used all your {isTrialUser ? "free trial" : ""} credits. 
                Upgrade to a paid plan to continue using premium features.
              </p>
              <Button 
                onClick={() => navigate("/subscription")}
                className="bg-red-600 hover:bg-red-700 text-white font-cabinet"
              >
                Upgrade Now
              </Button>
            </div>
          )}

          {credits.length > 0 ? (
            <div className="space-y-3">
              <h4 className="text-sm font-medium font-cabinet">Credit Breakdown</h4>
              {credits.map((credit) => {
                const expiryDate = new Date(credit.expires_at);
                const now = new Date();
                const daysLeft = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <div key={credit.id} className="flex justify-between text-sm">
                    <span className="font-cabinet">{credit.balance} credits</span>
                    <span className="text-gray-500 font-cabinet">
                      {credit.id === 'unlimited' ? 'Never expires' : `Expires in ${daysLeft} days`}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : totalCredits === 0 && (
            <div className="text-center py-4 text-gray-500">
              <p className="font-cabinet">No credits available. Subscribe to a plan to earn credits!</p>
            </div>
          )}

          {isTrialUser && totalCredits > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-sm font-medium text-blue-800 mb-1 font-cabinet">Free Trial Active</h4>
              <p className="text-xs text-blue-600 mb-2 font-cabinet">
                You're using our free trial. Each post enhancement costs 1 credit.
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/subscription")}
                className="w-full border-blue-300 text-blue-700 hover:bg-blue-100 font-cabinet"
              >
                Upgrade for More Credits
              </Button>
            </div>
          )}
        </>
      )}

      {isCreator && (
        <div className="text-center py-4 bg-purple-50 rounded-lg border border-purple-200">
          <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <h4 className="font-medium text-purple-800 font-cabinet">Creator Account</h4>
          <p className="text-sm text-purple-600 font-cabinet">You have unlimited access to all features</p>
        </div>
      )}

      {isUnlimited && !isCreator && (
        <div className="text-center py-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <Crown className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <h4 className="font-medium text-yellow-800 font-cabinet">Admin Account</h4>
          <p className="text-sm text-yellow-600 font-cabinet">You have unlimited access to all features</p>
        </div>
      )}
    </Card>
  );
};

export default UserCredits;
