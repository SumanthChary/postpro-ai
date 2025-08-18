
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge"; 
import { Sparkles, TrendingUp, AlertCircle, Zap, Target, Lightbulb, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ViralityGauge from '../virality/ViralityGauge';
import EngagementBreakdown from '../virality/EngagementBreakdown';

interface ViralityScoreProps {
  post: string;
  category: string;
}

export function ViralityScore({ post, category }: ViralityScoreProps) {
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [insights, setInsights] = useState<string[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [breakdown, setBreakdown] = useState<any>(null);
  const [detailedMetrics, setDetailedMetrics] = useState<any>(null);
  const { toast } = useToast();

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-600";
    if (score >= 70) return "text-blue-600";
    if (score >= 50) return "text-amber-600";
    return "text-red-500";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 85) return "🚀 Viral Ready";
    if (score >= 70) return "⚡ High Potential";
    if (score >= 50) return "📈 Good Engagement";
    return "🔧 Needs Work";
  };

  const getBadgeVariant = (score: number): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 85) return "default";
    if (score >= 70) return "secondary";
    if (score >= 50) return "outline";
    return "destructive";
  };

  const getProgressBarColor = (score: number) => {
    if (score >= 85) return "bg-gradient-to-r from-emerald-500 to-green-600";
    if (score >= 70) return "bg-gradient-to-r from-blue-500 to-indigo-600";
    if (score >= 50) return "bg-gradient-to-r from-amber-500 to-orange-600";
    return "bg-gradient-to-r from-red-500 to-pink-600";
  };

  const analyzePotential = async () => {
    if (!post.trim()) {
      toast({
        title: "Empty Post",
        description: "Please enter some content to analyze for viral potential",
        variant: "destructive",
      });
      return;
    }

    if (post.trim().length < 10) {
      toast({
        title: "Post Too Short",
        description: "Please enter at least 10 characters for accurate analysis",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setAnalyzing(true);
    console.log("🔍 Analyzing virality for:", { 
      postLength: post.length, 
      category,
      preview: post.substring(0, 100) + "..." 
    });
    
    try {
      // Add a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));

      const { data, error } = await supabase.functions.invoke('analyze-virality', {
        body: { 
          post: post.trim(),
          category: category || 'general'
        }
      });

      if (error) {
        console.error('❌ Error from analyze-virality function:', error);
        throw new Error(error.message || 'Failed to analyze post');
      }

      console.log('✅ Virality analysis result:', data);
      
      if (!data) {
        throw new Error('No response from virality analysis service');
      }

      if (typeof data.score !== 'number' || data.score < 0 || data.score > 100) {
        console.warn('⚠️ Invalid score received:', data.score);
        throw new Error('Invalid analysis result received');
      }
      
      setScore(data.score);
      setInsights(Array.isArray(data.insights) ? data.insights : []);
      setBreakdown(data.breakdown || { engagement: 75, reach: 82, shareability: 68 });
      setDetailedMetrics(data.detailedMetrics || {
        comments: 72,
        likes: 85,
        shares: 68,
        views: 78,
        timeSpent: 65,
        clickThrough: 45,
        saveRate: 58,
        viralCoefficient: data.score
      });
      
      // Success toast with score-based message
      const scoreMessage = data.score >= 80 
        ? `Excellent! Your post has viral potential with ${data.score}% score!`
        : data.score >= 60
        ? `Good potential! Score: ${data.score}% - Check insights for improvements`
        : `Score: ${data.score}% - Follow the insights to boost engagement`;

      toast({
        title: "Analysis Complete! 🎯",
        description: scoreMessage,
        variant: data.score >= 60 ? "default" : "destructive",
      });

    } catch (error: any) {
      console.error('❌ Error analyzing virality:', error);
      
      // Enhanced error handling with specific messages
      let errorMessage = "Failed to analyze your post. Please try again.";
      
      if (error.message?.includes('API')) {
        errorMessage = "AI service temporarily unavailable. Please try again in a moment.";
      } else if (error.message?.includes('network')) {
        errorMessage = "Connection issue. Please check your internet and try again.";
      } else if (error.message?.includes('timeout')) {
        errorMessage = "Analysis is taking longer than expected. Please try again.";
      }
      
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });

      // Reset states on error
      setScore(null);
      setInsights([]);
    } finally {
      setLoading(false);
      setAnalyzing(false);
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
            <TrendingUp className="text-purple-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Virality Potential
            </h3>
            <p className="text-sm text-gray-600">
              AI-powered engagement prediction
            </p>
          </div>
        </div>
        
        <Button 
          onClick={analyzePotential} 
          disabled={loading || !post.trim()}
          size="sm"
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {analyzing ? (
            <>
              <div className="rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Analyze
            </>
          )}
        </Button>
      </div>

      {score !== null && (
        <div className="space-y-6">
          {/* Enhanced Virality Gauge */}
          <ViralityGauge 
            score={score} 
            breakdown={breakdown || { engagement: 75, reach: 82, shareability: 68 }}
          />
          
          {/* Detailed Engagement Breakdown */}
          {detailedMetrics && (
            <EngagementBreakdown metrics={detailedMetrics} />
          )}

          {insights.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Priority Improvement Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {insights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="p-1 bg-primary/20 rounded-full mt-1">
                        <ArrowRight className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm flex-1">{insight}</span>
                      <Badge variant="outline" className="text-xs">
                        Impact: {index === 0 ? 'High' : index === 1 ? 'Medium' : 'Low'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {score < 60 && (
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Boost Your Viral Potential
                </CardTitle>
                <CardDescription>
                  Your post needs optimization to reach viral potential
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <TrendingUp className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Add Emotional Hooks</p>
                      <p className="text-xs text-muted-foreground">Start with compelling opening lines</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Target className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Include Questions</p>
                      <p className="text-xs text-muted-foreground">Encourage audience engagement</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Lightbulb className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Share Personal Stories</p>
                      <p className="text-xs text-muted-foreground">Add authenticity and relatability</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
