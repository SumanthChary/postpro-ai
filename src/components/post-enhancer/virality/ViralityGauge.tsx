import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, Users, Share2 } from 'lucide-react';

interface ViralityGaugeProps {
  score: number;
  breakdown: {
    engagement: number;
    reach: number;
    shareability: number;
  };
}

const ViralityGauge: React.FC<ViralityGaugeProps> = ({ score, breakdown }) => {
  const getScoreColor = (score: number) => {
    if (score >= 71) return 'text-green-600';
    if (score >= 41) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 71) return 'from-green-500 to-green-600';
    if (score >= 41) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 71) return { text: 'High Viral Potential', variant: 'default' as const };
    if (score >= 41) return { text: 'Moderate Potential', variant: 'secondary' as const };
    return { text: 'Needs Optimization', variant: 'outline' as const };
  };

  // Calculate the rotation angle for the gauge (180 degrees span)
  const rotation = (score / 100) * 180;

  return (
    <div className="space-y-6">
      {/* Main Gauge */}
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold">Viral Potential Score</h3>
            
            {/* Speedometer Gauge */}
            <div className="relative w-48 h-24 mx-auto">
              {/* Background Arc */}
              <svg className="w-full h-full" viewBox="0 0 200 100">
                <defs>
                  <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="50%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                </defs>
                
                {/* Background arc */}
                <path
                  d="M 20 90 A 80 80 0 0 1 180 90"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                
                {/* Colored arc based on score */}
                <path
                  d="M 20 90 A 80 80 0 0 1 180 90"
                  stroke="url(#gaugeGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(score / 100) * 251.2} 251.2`}
                  className="transition-all duration-1000 ease-out"
                />
                
                {/* Needle */}
                <g transform={`rotate(${rotation - 90} 100 90)`}>
                  <line
                    x1="100"
                    y1="90"
                    x2="100"
                    y2="20"
                    stroke="#374151"
                    strokeWidth="2"
                    className="transition-transform duration-1000 ease-out"
                  />
                  <circle cx="100" cy="90" r="4" fill="#374151" />
                </g>
              </svg>
              
              {/* Score display */}
              <div className="absolute inset-0 flex items-end justify-center pb-2">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
                    {score}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    out of 100
                  </div>
                </div>
              </div>
            </div>
            
            <Badge 
              variant={getScoreBadge(score).variant}
              className="text-sm"
            >
              {getScoreBadge(score).text}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Engagement Rate</p>
                <p className="text-xl font-bold text-blue-600">{breakdown.engagement}%</p>
              </div>
            </div>
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${breakdown.engagement}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reach Score</p>
                <p className="text-xl font-bold text-green-600">{breakdown.reach}%</p>
              </div>
            </div>
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${breakdown.reach}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Share2 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Share Likelihood</p>
                <p className="text-xl font-bold text-purple-600">{breakdown.shareability}%</p>
              </div>
            </div>
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${breakdown.shareability}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ViralityGauge;