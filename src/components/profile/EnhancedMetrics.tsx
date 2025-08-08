import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, BarChart2, Clock } from 'lucide-react';

interface MetricsProps {
  userId: string;
}

interface ChartData {
  name: string;
  value: number;
}

export const EnhancedMetrics = ({ userId }: MetricsProps) => {
  const [weeklyData, setWeeklyData] = useState<ChartData[]>([]);
  const [monthlyData, setMonthlyData] = useState<ChartData[]>([]);
  const [selectedMetric, setSelectedMetric] = useState('enhancements');

  useEffect(() => {
    // Fetch metrics data
    const fetchMetrics = async () => {
      try {
        // TODO: Replace with actual API calls
        const weeklyResponse = await fetch(`/api/metrics/weekly/${userId}`);
        const weeklyData = await weeklyResponse.json();
        setWeeklyData(weeklyData);

        const monthlyResponse = await fetch(`/api/metrics/monthly/${userId}`);
        const monthlyData = await monthlyResponse.json();
        setMonthlyData(monthlyData);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    fetchMetrics();
  }, [userId]);

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-lg">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-blue-600" />
            Performance Metrics
          </h3>
          
          <div className="flex items-center gap-2">
            <select
              className="text-sm border rounded-md px-2 py-1"
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
            >
              <option value="enhancements">Enhancements</option>
              <option value="engagement">Engagement</option>
              <option value="virality">Virality Score</option>
            </select>
          </div>
        </div>

        <Tabs defaultValue="weekly" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
            <div className="text-sm text-blue-600 mb-1">Total Enhancements</div>
            <div className="text-2xl font-semibold">1,234</div>
          </div>
          
          <div className="p-4 rounded-lg bg-green-50 border border-green-100">
            <div className="text-sm text-green-600 mb-1">Avg. Engagement Rate</div>
            <div className="text-2xl font-semibold">4.8%</div>
          </div>
          
          <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
            <div className="text-sm text-purple-600 mb-1">Virality Score</div>
            <div className="text-2xl font-semibold">8.9</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
