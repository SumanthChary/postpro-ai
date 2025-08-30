import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Crown, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface PostUsageProps {
  userId: string;
}

const PostUsage = ({ userId }: PostUsageProps) => {
  const [loading, setLoading] = useState(true);
  const [postsThisMonth, setPostsThisMonth] = useState(0);
  const [postLimit, setPostLimit] = useState(5); // Default to FREE plan
  const [subscriptionTier, setSubscriptionTier] = useState<string>("FREE");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsage = async () => {
      if (!userId) return;
      
      try {
        setLoading(true);
        
        // Get current month's usage
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        
        const { data: usageData, error: usageError } = await supabase
          .from('user_usage')
          .select('*')
          .eq('user_id', userId)
          .gte('created_at', startOfMonth.toISOString());
        
        if (usageError) throw usageError;
        
        setPostsThisMonth(usageData?.length || 0);
        
        // Get user's subscription info to determine post limit
        const { data: subData } = await supabase
          .from('subscribers')
          .select('*')
          .eq('user_id', userId)
          .single();
        
        if (subData?.subscribed && subData.subscription_tier) {
          setSubscriptionTier(subData.subscription_tier);
          setPostLimit(-1); // Unlimited for paid plans
        } else {
          setSubscriptionTier("FREE");
          setPostLimit(5); // Free plan limit
        }
        
      } catch (error) {
        console.error('Error fetching usage:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsage();
  }, [userId]);

  const isUnlimited = postLimit === -1;
  const progressValue = isUnlimited ? 100 : Math.min((postsThisMonth / postLimit) * 100, 100);
  const isNearLimit = !isUnlimited && postsThisMonth >= postLimit * 0.8;
  const isAtLimit = !isUnlimited && postsThisMonth >= postLimit;

  if (loading) {
    return (
      <Card className="p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
        <div className="h-16 bg-gray-200 rounded"></div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              isUnlimited ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 
              isAtLimit ? 'bg-red-100' : isNearLimit ? 'bg-orange-100' : 'bg-blue-100'
            }`}>
              {isUnlimited ? (
                <Crown className="w-5 h-5 text-white" />
              ) : (
                <FileText className={`w-5 h-5 ${
                  isAtLimit ? 'text-red-600' : isNearLimit ? 'text-orange-600' : 'text-blue-600'
                }`} />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Monthly Posts</h3>
              <p className="text-sm text-gray-600">
                {subscriptionTier} Plan Usage
              </p>
            </div>
          </div>
          
          <Badge variant="outline" className="bg-white">
            {subscriptionTier}
          </Badge>
        </div>

        {/* Usage Stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Posts this month</span>
            <span className="font-semibold text-gray-900">
              {postsThisMonth} {isUnlimited ? '' : `/ ${postLimit}`}
            </span>
          </div>
          
          {!isUnlimited && (
            <>
              <Progress value={progressValue} className="h-3" />
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>
                  {postLimit - postsThisMonth > 0 
                    ? `${postLimit - postsThisMonth} posts remaining` 
                    : 'Limit reached'
                  }
                </span>
                <span>{Math.round(progressValue)}% used</span>
              </div>
            </>
          )}
          
          {isUnlimited && (
            <div className="flex items-center gap-2 text-purple-600 text-sm font-medium">
              <Zap className="w-4 h-4" />
              Unlimited posts available
            </div>
          )}
        </div>

        {/* Upgrade prompt for free users */}
        {subscriptionTier === "FREE" && isAtLimit && (
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h4 className="font-semibold text-orange-900">Monthly limit reached</h4>
                <p className="text-sm text-orange-700">Upgrade to continue creating posts</p>
              </div>
              <Button 
                onClick={() => navigate('/pricing')}
                size="sm"
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                Upgrade Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PostUsage;