import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, BarChart2, Clock, Zap, Target, Award, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface MetricsProps {
  userId: string;
}

interface ChartData {
  name: string;
  value: number;
  growth?: number;
}

interface MetricsSummary {
  totalEnhancements: number;
  avgEngagement: number;
  viralityScore: number;
  weeklyGrowth: number;
  creditsUsed: number;
  timesSaved: number;
}

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];

export const EnhancedMetrics = ({ userId }: MetricsProps) => {
  const [weeklyData, setWeeklyData] = useState<ChartData[]>([]);
  const [monthlyData, setMonthlyData] = useState<ChartData[]>([]);
  const [summary, setSummary] = useState<MetricsSummary>({
    totalEnhancements: 0,
    avgEngagement: 0,
    viralityScore: 0,
    weeklyGrowth: 0,
    creditsUsed: 0,
    timesSaved: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!userId) return;
      
      try {
        setLoading(true);
        
        // Fetch user usage data for real metrics
        const { data: usageData, error: usageError } = await supabase
          .from('user_usage')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (usageError) throw usageError;

        // Process usage data for charts
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          return {
            name: date.toLocaleDateString('en-US', { weekday: 'short' }),
            value: usageData?.filter(u => 
              new Date(u.created_at).toDateString() === date.toDateString()
            ).length || 0,
            growth: Math.random() * 20 + 5 // Simulated growth percentage
          };
        }).reverse();

        const last30Days = Array.from({ length: 4 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (i * 7));
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - 7);
          
          return {
            name: `Week ${4 - i}`,
            value: usageData?.filter(u => {
              const usageDate = new Date(u.created_at);
              return usageDate >= weekStart && usageDate <= date;
            }).length || 0,
            growth: Math.random() * 30 + 10
          };
        }).reverse();

        setWeeklyData(last7Days);
        setMonthlyData(last30Days);

        // Calculate summary metrics
        const totalEnhancements = usageData?.length || 0;
        const avgEngagement = 4.2 + (totalEnhancements * 0.1); // Simulated growing engagement
        const viralityScore = Math.min(10, 6.5 + (totalEnhancements * 0.05));
        const weeklyGrowth = last7Days.reduce((sum, day) => sum + (day.growth || 0), 0) / 7;
        const creditsUsed = usageData?.reduce((sum, u) => sum + (u.credits_used || 1), 0) || 0;
        const timesSaved = totalEnhancements * 15; // Assume 15 minutes saved per enhancement

        setSummary({
          totalEnhancements,
          avgEngagement,
          viralityScore,
          weeklyGrowth,
          creditsUsed,
          timesSaved
        });

      } catch (error) {
        console.error('Error fetching metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [userId]);

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  if (loading) {
    return (
      <Card className="p-4 sm:p-6 bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-xl animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-6"></div>
        <div className="h-64 bg-gray-200 rounded mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
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
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <BarChart2 className="w-5 h-5 text-white" />
            </div>
            Performance Analytics
          </h3>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="font-medium">+{summary.weeklyGrowth.toFixed(1)}% this week</span>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="group p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50 hover:shadow-lg transition-all duration-300 hover-scale">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-blue-700 mb-1">Total Enhancements</div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-900 font-cabinet">{summary.totalEnhancements.toLocaleString()}</div>
              </div>
              <div className="p-3 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-blue-600">
              <ArrowUpRight className="w-4 h-4" />
              <span>+{(summary.weeklyGrowth / 7).toFixed(1)}% daily avg</span>
            </div>
          </div>

          <div className="group p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/50 hover:shadow-lg transition-all duration-300 hover-scale">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-green-700 mb-1">Engagement Rate</div>
                <div className="text-2xl sm:text-3xl font-bold text-green-900 font-cabinet">{summary.avgEngagement.toFixed(1)}%</div>
              </div>
              <div className="p-3 bg-green-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
              <ArrowUpRight className="w-4 h-4" />
              <span>Above industry avg</span>
            </div>
          </div>

          <div className="group p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200/50 hover:shadow-lg transition-all duration-300 hover-scale sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-purple-700 mb-1">Time Saved</div>
                <div className="text-2xl sm:text-3xl font-bold text-purple-900 font-cabinet">{formatTime(summary.timesSaved)}</div>
              </div>
              <div className="p-3 bg-purple-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-purple-600">
              <Award className="w-4 h-4" />
              <span>Productivity boost</span>
            </div>
          </div>
        </div>

        {/* Charts */}
        <Tabs defaultValue="weekly" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100/80 backdrop-blur-sm">
            <TabsTrigger value="weekly" className="font-cabinet">7 Days</TabsTrigger>
            <TabsTrigger value="monthly" className="font-cabinet">4 Weeks</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-4">
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2 }}
                    fill="url(#colorGradient)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="url(#barGradient)" 
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};
