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
export const EnhancedMetrics = ({
  userId
}: MetricsProps) => {
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
        const {
          data: usageData,
          error: usageError
        } = await supabase.from('user_usage').select('*').eq('user_id', userId).order('created_at', {
          ascending: false
        });
        if (usageError) throw usageError;

        // Process usage data for charts
        const last7Days = Array.from({
          length: 7
        }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          return {
            name: date.toLocaleDateString('en-US', {
              weekday: 'short'
            }),
            value: usageData?.filter(u => new Date(u.created_at).toDateString() === date.toDateString()).length || 0,
            growth: Math.random() * 20 + 5 // Simulated growth percentage
          };
        }).reverse();
        const last30Days = Array.from({
          length: 4
        }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i * 7);
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
        const avgEngagement = 4.2 + totalEnhancements * 0.1; // Simulated growing engagement
        const viralityScore = Math.min(10, 6.5 + totalEnhancements * 0.05);
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
    return <Card className="p-4 sm:p-6 bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-xl animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-6"></div>
        <div className="h-64 bg-gray-200 rounded mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <div key={i} className="h-20 bg-gray-200 rounded"></div>)}
        </div>
      </Card>;
  }
  return;
};