
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Crown, Calendar, TrendingUp, Settings, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSubscription } from "@/hooks/useSubscription";

const SubscriptionInfo = () => {
  const navigate = useNavigate();
  const { subscription, loading, usageStats } = useSubscription();

  if (loading) {
    return (
      <Card className="p-6">
        <div className="h-20 bg-gray-200 rounded mb-4"></div>
      </Card>
    );
  }

  if (!subscription) return null;

  const normalizedPlanName = subscription.plan_name.toLowerCase();
  const isStarterPlan = normalizedPlanName.includes('starter');
  const isLifetimePlan = normalizedPlanName.includes('lifetime');
  const progressValue = usageStats.monthlyLimit === -1 ? 100 : 
    (usageStats.currentCount / (usageStats.monthlyLimit || 1)) * 100;
  const hasVirality = subscription.subscription_limits?.has_virality_score;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold flex items-center font-cabinet">
          <Crown className="w-5 h-5 mr-2 text-yellow-600" />
          Current Plan
        </h3>
        <Badge variant={isStarterPlan ? "secondary" : "default"} className="font-cabinet">
          {subscription.plan_name}
        </Badge>
      </div>

      <div className="space-y-4">
        {/* Usage Progress */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600 font-cabinet">Monthly Usage</span>
            <span className="font-semibold font-cabinet">
              {usageStats.monthlyLimit === -1 ? "Unlimited" : 
                `${usageStats.currentCount}/${usageStats.monthlyLimit}`}
            </span>
          </div>
          <Progress value={progressValue} className="h-2" />
          {usageStats.remainingUses > 0 && usageStats.monthlyLimit !== -1 && (
            <p className="text-xs text-gray-500 mt-1 font-cabinet">
              {usageStats.remainingUses} enhancements remaining this month
            </p>
          )}
        </div>

        {/* Plan Features */}
        <div className="space-y-2">
          <h4 className="font-medium font-cabinet">Plan Features</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              {subscription.subscription_limits?.has_premium_templates ? 
                <Check className="w-4 h-4 text-green-500 mr-2" /> : 
                <X className="w-4 h-4 text-red-500 mr-2" />
              }
              <span className="font-cabinet">Premium Templates</span>
            </div>
            <div className="flex items-center">
              {subscription.subscription_limits?.has_virality_score ? 
                <Check className="w-4 h-4 text-green-500 mr-2" /> : 
                <X className="w-4 h-4 text-red-500 mr-2" />
              }
              <span className="font-cabinet">Virality Score</span>
            </div>
            <div className="flex items-center">
              {subscription.subscription_limits?.has_ab_testing ? 
                <Check className="w-4 h-4 text-green-500 mr-2" /> : 
                <X className="w-4 h-4 text-red-500 mr-2" />
              }
              <span className="font-cabinet">A/B Testing</span>
            </div>
            <div className="flex items-center">
              {subscription.subscription_limits?.has_advanced_ai ? 
                <Check className="w-4 h-4 text-green-500 mr-2" /> : 
                <X className="w-4 h-4 text-red-500 mr-2" />
              }
              <span className="font-cabinet">Advanced AI</span>
            </div>
          </div>
        </div>

        {(!hasVirality || isStarterPlan) && (
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800 mb-2 font-cabinet">
              Upgrade to Pro for unlimited virality reporting, analytics, and priority support. Lifetime members keep it forever.
            </p>
            <Button 
              size="sm"
              onClick={() => navigate("/pricing")}
              className="w-full font-cabinet"
            >
              View plans
            </Button>
          </div>
        )}

        {isLifetimePlan && (
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm text-purple-800 font-cabinet">
              Lifetime access locked. Enjoy every new feature and extension update as soon as it ships.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SubscriptionInfo;
