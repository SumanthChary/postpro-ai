import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  MessageCircle, 
  Heart, 
  Share2, 
  Eye, 
  Clock,
  Users,
  Zap
} from 'lucide-react';

interface EngagementMetric {
  name: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  impact: 'high' | 'medium' | 'low';
  icon: React.ReactNode;
  description: string;
  recommendation?: string;
}

interface EngagementBreakdownProps {
  metrics: {
    comments: number;
    likes: number;
    shares: number;
    views: number;
    timeSpent: number;
    clickThrough: number;
    saveRate: number;
    viralCoefficient: number;
  };
}

const EngagementBreakdown: React.FC<EngagementBreakdownProps> = ({ metrics }) => {
  const engagementMetrics: EngagementMetric[] = [
    {
      name: 'Comment Rate',
      score: metrics.comments,
      trend: 'up',
      impact: 'high',
      icon: <MessageCircle className="h-4 w-4" />,
      description: 'Likelihood to generate comments',
      recommendation: metrics.comments < 50 ? 'Add discussion-provoking questions' : undefined
    },
    {
      name: 'Like Potential',
      score: metrics.likes,
      trend: 'stable',
      impact: 'medium',
      icon: <Heart className="h-4 w-4" />,
      description: 'Expected like engagement',
      recommendation: metrics.likes < 60 ? 'Include more relatable content' : undefined
    },
    {
      name: 'Share Likelihood',
      score: metrics.shares,
      trend: 'up',
      impact: 'high',
      icon: <Share2 className="h-4 w-4" />,
      description: 'Probability of being shared',
      recommendation: metrics.shares < 40 ? 'Make content more shareable with insights' : undefined
    },
    {
      name: 'View Retention',
      score: metrics.views,
      trend: 'up',
      impact: 'medium',
      icon: <Eye className="h-4 w-4" />,
      description: 'Expected view completion rate',
    },
    {
      name: 'Time Spent',
      score: metrics.timeSpent,
      trend: 'stable',
      impact: 'medium',
      icon: <Clock className="h-4 w-4" />,
      description: 'Average reading time score',
    },
    {
      name: 'Click Rate',
      score: metrics.clickThrough,
      trend: 'up',
      impact: 'high',
      icon: <Users className="h-4 w-4" />,
      description: 'Link click-through potential',
    },
    {
      name: 'Save Rate',
      score: metrics.saveRate,
      trend: 'up',
      impact: 'medium',
      icon: <TrendingUp className="h-4 w-4" />,
      description: 'Bookmark/save likelihood',
    },
    {
      name: 'Viral Coefficient',
      score: metrics.viralCoefficient,
      trend: 'up',
      impact: 'high',
      icon: <Zap className="h-4 w-4" />,
      description: 'Overall virality multiplier',
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '→';
      default: return '→';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-orange-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const getProgressColor = (score: number) => {
    if (score >= 70) return 'bg-green-600';
    if (score >= 50) return 'bg-orange-600';
    return 'bg-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Detailed Engagement Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {engagementMetrics.map((metric, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    {metric.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{metric.name}</span>
                      <span className="text-lg">{getTrendIcon(metric.trend)}</span>
                      <Badge 
                        className={`text-xs ${getImpactColor(metric.impact)}`}
                      >
                        {metric.impact} impact
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {metric.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getScoreColor(metric.score)}`}>
                    {metric.score}%
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Progress 
                  value={metric.score} 
                  className="h-2"
                />
                
                {metric.recommendation && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>💡 Tip:</strong> {metric.recommendation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-primary" />
            <span className="font-medium">Overall Assessment</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Your post shows strong potential for {metrics.viralCoefficient >= 70 ? 'viral' : metrics.viralCoefficient >= 50 ? 'good' : 'moderate'} engagement.
            Focus on improving metrics with high impact and low scores for maximum effect.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementBreakdown;