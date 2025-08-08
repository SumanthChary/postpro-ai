import { useState, useEffect } from 'react';
import { Activity, User, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

interface ActivityItem {
  id: string;
  user_name: string;
  location: string;
  action: string;
  timestamp: string;
}

export const RealTimeActivity = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    // Subscribe to real-time updates
    const subscription = supabase
      .channel('post-enhancements')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'post_enhancements'
      }, (payload) => {
        const newActivity = payload.new as ActivityItem;
        setActivities(prev => [newActivity, ...prev].slice(0, 5));
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-lg">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Real-Time Activity
          </h3>
        </div>
        
        <div className="space-y-4">
          {activities.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No recent activity to show
            </div>
          ) : (
            activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/50 border border-gray-100 transition-all duration-200 hover:bg-gray-50/80"
              >
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.user_name} from {activity.location}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {activity.action}
                  </p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  {new Date(activity.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  );
};
