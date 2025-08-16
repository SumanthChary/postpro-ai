
import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Coins, Crown, Star, Gift, ArrowUpRight, Zap, Target, TrendingUp, Info } from "lucide-react";
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
  const [maxCredits, setMaxCredits] = useState(50);
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
          
          if (data.unlimited || data.isCreator) {
            setMaxCredits(999999);
          } else {
            const highestTier = 2000;
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

  const progressValue = useMemo(() => {
    if (isUnlimited || isCreator) return 100;
    return Math.min((totalCredits / maxCredits) * 100, 100);
  }, [totalCredits, maxCredits, isUnlimited, isCreator]);

  const isTrialUser = !isUnlimited && !isCreator && totalCredits <= 50;

  if (loading) {
    return (
      <Card className="p-4 sm:p-6 bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-xl animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
        <div className="h-16 bg-gray-200 rounded"></div>
      </Card>
    );
  }

  const getStatusConfig = () => {
    if (isUnlimited) {
      return {
        icon: <Star className="w-5 h-5 text-yellow-500" />,
        title: "Admin Access",
        description: "Unlimited everything",
        color: "from-primary to-accent",
        bgColor: "bg-gradient-to-br from-primary/10 to-accent/10",
        borderColor: "border-yellow-200"
      };
    }
    if (isCreator) {
      return {
        icon: <Crown className="w-5 h-5 text-purple-500" />,
        title: "Creator Plan",
        description: "Premium features unlocked",
        color: "from-purple-500 to-pink-500",
        bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
        borderColor: "border-purple-200"
      };
    }
    if (isTrialUser) {
      return {
        icon: <Gift className="w-5 h-5 text-blue-500" />,
        title: "Trial User",
        description: "Limited free credits",
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
        borderColor: "border-blue-200"
      };
    }
    return {
      icon: <Coins className="w-5 h-5 text-green-500" />,
      title: "Your Credits",
      description: "Basic features available",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      borderColor: "border-green-200"
    };
  };

  const status = getStatusConfig();

  return (
    <Card className={`p-4 sm:p-6 ${status.bgColor} backdrop-blur-sm border ${status.borderColor} shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in hover-scale`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 bg-gradient-to-r ${status.color} rounded-lg`}>
              {status.icon}
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-cabinet">{status.title}</h3>
              <p className="text-sm text-gray-600 font-cabinet">{status.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-white/80 hover:bg-white transition-colors duration-200">
              {isUnlimited || isCreator ? "∞" : totalCredits.toLocaleString()} credits
            </Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Info className="w-4 h-4" />
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
        </div>

        {/* Progress Section */}
        {!isUnlimited && !isCreator && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm font-cabinet">
              <span className="text-gray-600">Usage</span>
              <span className="font-semibold text-gray-900">
                {totalCredits} / {maxCredits === 999999 ? "∞" : maxCredits.toLocaleString()}
              </span>
            </div>
            
            <Progress 
              value={progressValue} 
              className="h-3 bg-white/50"
            />
            
            <div className="flex items-center justify-between text-xs text-gray-500 font-cabinet">
              <span>
                {totalCredits === 0 ? "No credits remaining" : `${totalCredits} credits left`}
              </span>
              <span>
                {Math.round(progressValue)}% used
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons & Stats */}
        <div className="space-y-3">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-white/50 rounded-lg border border-white/30">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Zap className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-lg font-bold text-gray-900">{totalCredits || "—"}</div>
              <div className="text-xs text-gray-600">Available</div>
            </div>
            
            <div className="p-3 bg-white/50 rounded-lg border border-white/30">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Target className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-lg font-bold text-gray-900">97%</div>
              <div className="text-xs text-gray-600">Success</div>
            </div>
            
            <div className="p-3 bg-white/50 rounded-lg border border-white/30">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-lg font-bold text-gray-900">+284%</div>
              <div className="text-xs text-gray-600">Boost</div>
            </div>
          </div>

          {/* Status Messages */}
          {totalCredits === 0 && !isUnlimited && !isCreator && (
            <div className="p-4 bg-white/60 rounded-lg border border-white/40">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h4 className="font-semibold text-gray-900 font-cabinet">Credits Exhausted</h4>
                  <p className="text-sm text-gray-600 font-cabinet">Upgrade to continue enhancing your posts</p>
                </div>
                <Button 
                  onClick={() => navigate('/subscription')}
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 font-cabinet"
                >
                  Upgrade Now
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default UserCredits;
