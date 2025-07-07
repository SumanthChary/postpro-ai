
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface UsageRecord {
  id: string;
  action_type: string;
  credits_used: number;
  created_at: string;
  metadata?: any;
}

const UsageHistory = () => {
  const [usage, setUsage] = useState<UsageRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('user_usage')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) throw error;
        setUsage(data || []);
      } catch (error) {
        console.error('Error fetching usage history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsage();
  }, []);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="h-40 bg-gray-200 rounded"></div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center mb-4">
        <Activity className="w-5 h-5 mr-2 text-blue-600" />
        <h3 className="text-xl font-semibold font-cabinet">Recent Activity</h3>
      </div>

      {usage.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="font-cabinet">No activity yet</p>
          <p className="text-sm font-cabinet">Start enhancing posts to see your usage history</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {usage.map((record) => (
            <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium font-cabinet">
                    {record.action_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center font-cabinet">
                    <Calendar className="w-3 h-3 mr-1" />
                    {format(new Date(record.created_at), 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="font-cabinet">
                {record.credits_used} credit{record.credits_used !== 1 ? 's' : ''}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default UsageHistory;
