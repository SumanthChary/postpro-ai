import { useState, useEffect } from 'react';
import { Activity, User, Clock, Sparkles, TrendingUp, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

interface ActivityItem {
  id: string;
  user_name: string;
  location: string;
  action: string;
  timestamp: string;
  enhancement_type?: string;
}

const mockActivities = [
  { id: '1', user_name: 'Alex M.', location: 'New York', action: 'Enhanced a LinkedIn post', timestamp: new Date().toISOString(), enhancement_type: 'professional' },
  { id: '2', user_name: 'Sarah K.', location: 'London', action: 'Generated viral content', timestamp: new Date(Date.now() - 300000).toISOString(), enhancement_type: 'viral' },
  { id: '3', user_name: 'Mike R.', location: 'Toronto', action: 'Improved engagement rates', timestamp: new Date(Date.now() - 600000).toISOString(), enhancement_type: 'engagement' },
  { id: '4', user_name: 'Emma S.', location: 'Sydney', action: 'Created compelling content', timestamp: new Date(Date.now() - 900000).toISOString(), enhancement_type: 'content' },
  { id: '5', user_name: 'David L.', location: 'Berlin', action: 'Optimized post timing', timestamp: new Date(Date.now() - 1200000).toISOString(), enhancement_type: 'timing' },
];

export const RealTimeActivity = () => {
  const [activities, setActivities] = useState<ActivityItem[]>(mockActivities);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    // Simulate real-time activity updates
    const interval = setInterval(() => {
      const locations = ['New York', 'London', 'Toronto', 'Sydney', 'Berlin', 'Tokyo', 'Paris', 'Amsterdam', 'Singapore', 'Dubai'];
      const names = ['Alex M.', 'Sarah K.', 'Mike R.', 'Emma S.', 'David L.', 'Lisa P.', 'John D.', 'Maria G.', 'Chris W.', 'Anna B.'];
      const actions = [
        'Enhanced a LinkedIn post',
        'Generated viral content', 
        'Improved engagement rates',
        'Created compelling content',
        'Optimized post timing',
        'Boosted content reach',
        'Crafted professional copy'
      ];
      const types = ['professional', 'viral', 'engagement', 'content', 'timing'];

      const newActivity = {
        id: Date.now().toString(),
        user_name: names[Math.floor(Math.random() * names.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        timestamp: new Date().toISOString(),
        enhancement_type: types[Math.floor(Math.random() * types.length)]
      };

      setActivities(prev => [newActivity, ...prev].slice(0, 6));
      setTotalUsers(prev => prev + 1);
    }, 8000 + Math.random() * 7000); // Random interval between 8-15 seconds

    // Initial total users count
    setTotalUsers(1247 + Math.floor(Math.random() * 100));

    return () => clearInterval(interval);
  }, []);

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'viral': return <Sparkles className="w-4 h-4 text-purple-500" />;
      case 'engagement': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'professional': return <User className="w-4 h-4 text-blue-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActionColor = (type: string) => {
    switch (type) {
      case 'viral': return 'bg-purple-100 border-purple-200';
      case 'engagement': return 'bg-green-100 border-green-200';
      case 'professional': return 'bg-blue-100 border-blue-200';
      case 'content': return 'bg-primary/10 border-primary/20';
      case 'timing': return 'bg-indigo-100 border-indigo-200';
      default: return 'bg-gray-100 border-gray-200';
    }
  };

  return (
    <Card className="p-4 sm:p-6 bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-lg sm:text-xl font-bold flex items-center gap-3 font-cabinet">
            <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
              <Activity className="w-5 h-5 text-white" />
            </div>
            Live Activity
          </h3>
          <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200 animate-pulse">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            {totalUsers.toLocaleString()} active users
          </Badge>
        </div>

        {/* Activity Feed */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-500 hover:shadow-md animate-slide-in-right ${getActionColor(activity.enhancement_type || 'default')}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border-2 border-white/50">
                  {getActionIcon(activity.enhancement_type || 'default')}
                </div>
              </div>
              
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-gray-900 font-cabinet">
                    {activity.user_name}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>{activity.location}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 font-cabinet">
                  {activity.action}
                </p>
              </div>
              
              <div className="flex-shrink-0 flex items-center gap-1 text-xs text-gray-400">
                <Clock className="w-3 h-3" />
                <span className="hidden sm:inline">
                  {new Date(activity.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
                <span className="sm:hidden">
                  {Math.floor((Date.now() - new Date(activity.timestamp).getTime()) / 60000)}m
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="font-cabinet">Updates every few seconds</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-cabinet">Live</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
