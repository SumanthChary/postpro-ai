
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ExternalLinkIcon } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip,
  ResponsiveContainer
} from 'recharts';
import { ChartContainer } from "@/components/ui/chart";

interface StatsComponentProps {
  statsData: Array<{
    label: string;
    value: string;
    icon: React.ElementType;
    growth?: string;
  }>;
  earningsData: Array<{
    month: string;
    earnings: number;
  }>;
  progressValue: number;
  chartConfig: Record<string, any>;
}

const AffiliateStats: React.FC<StatsComponentProps> = ({ 
  statsData, 
  earningsData, 
  progressValue,
  chartConfig 
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-electric-purple">Earnings Dashboard</h3>
        <div className="h-[300px]">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={earningsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip
                  content={({active, payload}) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border rounded shadow text-sm">
                          <p>${payload[0].value}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-sm text-gray-500">Next payout</p>
            <p className="font-semibold">Aug 1, 2025</p>
          </div>
          <Button variant="outline" size="sm">
            View Transactions <ExternalLinkIcon className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </Card>
      
      <Card className="p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-electric-purple">Referral Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          {statsData.map((stat, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <stat.icon className="w-4 h-4" />
                <span className="text-sm">{stat.label}</span>
              </div>
              <p className="text-xl font-bold">{stat.value}</p>
              {stat.growth && (
                <p className="text-xs text-green-600 mt-1">{stat.growth}</p>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-600">Monthly target: $600</span>
            <span className="text-sm font-medium">{progressValue}%</span>
          </div>
          <Progress value={progressValue} className="h-2" />
          <p className="text-xs text-gray-500 mt-2">
            You're on track to hit your monthly target! Just $161.25 more to go.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AffiliateStats;
