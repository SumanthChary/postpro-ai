
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip
} from 'recharts';
import { ChartContainer } from "@/components/ui/chart";

interface DetailedStatsProps {
  referralSourceData: Array<{
    name: string;
    value: number;
  }>;
  colors: string[];
  chartConfig: Record<string, any>;
}

const DetailedStats: React.FC<DetailedStatsProps> = ({ 
  referralSourceData, 
  colors,
  chartConfig 
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-electric-purple">Traffic Sources</h3>
        <div className="h-[300px] flex justify-center">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={referralSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {referralSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {referralSourceData.map((source, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-sm" 
                style={{ backgroundColor: colors[index % colors.length] }}
              ></div>
              <span className="text-sm">{source.name}: {source.value}%</span>
            </div>
          ))}
        </div>
      </Card>
      
      <Card className="p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-electric-purple">Top Performing Posts</h3>
        <div className="space-y-4">
          <div className="border border-gray-100 rounded-lg p-3">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-sm">LinkedIn Post about AI Content</h4>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">42 clicks</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Jun 15, 2025</span>
              <span>12 conversions (28.5%)</span>
            </div>
          </div>
          
          <div className="border border-gray-100 rounded-lg p-3">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-sm">Twitter Thread on Content Creation</h4>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">36 clicks</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Jun 10, 2025</span>
              <span>8 conversions (22.2%)</span>
            </div>
          </div>
          
          <div className="border border-gray-100 rounded-lg p-3">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-sm">Email Campaign to Subscribers</h4>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">28 clicks</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Jun 5, 2025</span>
              <span>10 conversions (35.7%)</span>
            </div>
          </div>
        </div>
        
        <Button variant="outline" size="sm" className="w-full mt-4">
          View All Referral Sources
        </Button>
      </Card>
    </div>
  );
};

export default DetailedStats;
