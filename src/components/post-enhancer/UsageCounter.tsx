import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const UsageCounter = () => {
  const [usage, setUsage] = useState<{ current: number; limit: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsage();
  }, []);

  const fetchUsage = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('subscribers')
        .select('monthly_post_count, plan_name')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        // Determine limit based on plan
        let limit = 30; // Default Starter plan
        if (data.plan_name === 'PROFESSIONAL' || data.plan_name === 'PRO ANNUAL' || data.plan_name === 'LIFETIME CREATOR') {
          limit = -1; // Unlimited
        }
        
        setUsage({
          current: data.monthly_post_count || 0,
          limit: limit
        });
      }
    } catch (error) {
      console.error('Error fetching usage:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !usage) return null;

  // Only show for limited plans (not unlimited)
  if (usage.limit === -1) return null;

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
