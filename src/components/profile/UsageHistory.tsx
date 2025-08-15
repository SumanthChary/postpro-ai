
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Calendar, Zap, Clock, TrendingUp, Award } from "lucide-react";
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
  const [stats, setStats] = useState({
    totalActions: 0,
    totalCredits: 0,
    avgPerDay: 0,
    streak: 0
  });

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
          .limit(20);

        if (error) throw error;
        setUsage(data || []);

        // Calculate stats
        const totalActions = data?.length || 0;
        const totalCredits = data?.reduce((sum, record) => sum + (record.credits_used || 1), 0) || 0;
        const uniqueDays = new Set(data?.map(record => 
          new Date(record.created_at).toDateString()
        )).size;
        const avgPerDay = uniqueDays > 0 ? totalActions / uniqueDays : 0;
        
        setStats({
          totalActions,
          totalCredits,
          avgPerDay,
          streak: Math.min(uniqueDays, 7) // Simplified streak calculation
        });

      } catch (error) {
        console.error('Error fetching usage history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsage();
  }, []);

  const getActionIcon = (actionType: string) => {
    switch (actionType.toLowerCase()) {
      case 'enhance_post':
        return <Zap className="w-4 h-4 text-blue-500" />;
      case 'generate_content':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'analyze_performance':
        return <Award className="w-4 h-4 text-purple-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActionColor = (actionType: string) => {
    switch (actionType.toLowerCase()) {
      case 'enhance_post':
        return 'bg-blue-50 border-blue-200';
      case 'generate_content':
        return 'bg-green-50 border-green-200';
      case 'analyze_performance':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  if (loading) {
    return (
      <Card className="p-4 sm:p-6 bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-xl animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 sm:p-6 bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-3 font-cabinet">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
              <Activity className="w-5 h-5 text-white" />
            </div>
            Usage History
          </h3>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
              {stats.streak} day streak
            </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
            <div className="text-xs font-medium text-blue-600 mb-1">Total Actions</div>
            <div className="text-lg font-bold text-blue-900">{stats.totalActions}</div>
          </div>
          
          <div className="p-3 rounded-lg bg-green-50 border border-green-200">
            <div className="text-xs font-medium text-green-600 mb-1">Credits Used</div>
            <div className="text-lg font-bold text-green-900">{stats.totalCredits}</div>
          </div>
          
          <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
            <div className="text-xs font-medium text-purple-600 mb-1">Daily Avg</div>
            <div className="text-lg font-bold text-purple-900">{stats.avgPerDay.toFixed(1)}</div>
          </div>
          
          <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
            <div className="text-xs font-medium text-orange-600 mb-1">Active Days</div>
            <div className="text-lg font-bold text-orange-900">{stats.streak}</div>
          </div>
        </div>

        {/* Activity List */}
        {usage.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2 font-cabinet">No activity yet</h4>
            <p className="text-sm text-gray-500 font-cabinet">Start enhancing posts to see your usage history</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {usage.map((record, index) => (
              <div 
                key={record.id} 
                className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 hover:shadow-md animate-slide-in-right ${getActionColor(record.action_type)}`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {getActionIcon(record.action_type)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 font-cabinet text-sm sm:text-base">
                      {record.action_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-cabinet">
                      <Calendar className="w-3 h-3" />
                      <span>{format(new Date(record.created_at), 'MMM dd, yyyy')}</span>
                      <Clock className="w-3 h-3 ml-2" />
                      <span>{format(new Date(record.created_at), 'HH:mm')}</span>
                    </div>
                  </div>
                </div>
                
                <Badge 
                  variant="outline" 
                  className="font-cabinet bg-white/80 hover:bg-white transition-colors duration-200"
                >
                  {record.credits_used} credit{record.credits_used !== 1 ? 's' : ''}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default UsageHistory;
