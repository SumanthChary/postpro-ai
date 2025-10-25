import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";

const UsageCounter = () => {
  const [usage, setUsage] = useState<{ current: number; limit: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchUsage = async () => {
      if (!user) {
        if (isMounted) {
          setUsage(null);
          setLoading(false);
        }
        return;
      }

      try {
        const { data, error } = await supabase
          .from('subscribers')
          .select(`
            monthly_post_count,
            plan_name,
            subscription_limits (monthly_post_limit)
          `)
          .eq('user_id', user.id)
          .single();

        if (error) throw error;

        if (isMounted && data) {
          const limit = data.subscription_limits?.monthly_post_limit ?? (data.plan_name ? -1 : 0);

          setUsage({
            current: data.monthly_post_count || 0,
            limit
          });
        }
      } catch (error) {
        console.error('Error fetching usage:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (!authLoading) {
      setLoading(true);
      fetchUsage();
    }

    return () => {
      isMounted = false;
    };
  }, [user, authLoading]);

  if (loading || !usage) return null;

  // Only show for limited plans (not unlimited)
  if (usage.limit === -1) return null;

  if (usage.limit === 0) {
    return (
      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-amber-900">
            Trial required to start enhancing
          </span>
        </div>
        <p className="text-sm text-amber-800">
          Activate your 7-day trial or choose a plan to unlock unlimited enhancements across the web app and extension.
        </p>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/pricing')}
          className="mt-3"
        >
          View plans
        </Button>
      </div>
    );
  }

  const percentage = (usage.current / usage.limit) * 100;
  const remaining = usage.limit - usage.current;
  const isNearLimit = remaining <= 5;

  return (
    <div className="mb-6 p-4 bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">
          Posts Used This Month: {usage.current} / {usage.limit}
        </span>
        <span className="text-sm text-muted-foreground">
          {remaining} remaining
        </span>
      </div>
      <Progress value={percentage} className="h-2 mb-3" />
      
      {isNearLimit && (
        <Alert variant="destructive" className="mt-3">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span className="text-sm">
              You're running low on posts! Only {remaining} left.
            </span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/subscription')}
              className="ml-2"
            >
              Upgrade Now
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default UsageCounter;
