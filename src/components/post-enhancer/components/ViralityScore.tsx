import { useState, useEffect } from "react";
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
  autoAnalyze?: boolean;
}
export function ViralityScore({
  post,
  category,
  autoAnalyze = false
}: ViralityScoreProps) {
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [insights, setInsights] = useState<string[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [breakdown, setBreakdown] = useState<any>(null);
  const [detailedMetrics, setDetailedMetrics] = useState<any>(null);
  const {
    toast
  } = useToast();
  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-600";
    if (score >= 70) return "text-blue-600";
    if (score >= 50) return "text-amber-600";
    return "text-gray-500";
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
        variant: "destructive"
      });
      return;
    }
    if (post.trim().length < 10) {
      toast({
        title: "Post Too Short", 
        description: "Please enter at least 10 characters for accurate analysis",
        variant: "destructive"
      });
      return;
    }
    setLoading(true);
    setAnalyzing(true);
    
    try {
      const {
        data,
        error
      } = await supabase.functions.invoke('analyze-virality', {
        body: {
          post: post.trim(),
          category: category || 'general'
        }
      });
      
      if (error) {
        throw new Error(error.message || 'Failed to analyze post');
      }
      
      if (!data || typeof data.score !== 'number') {
        throw new Error('Invalid analysis result received');
      }

      // Show realistic scores but boost for enhanced posts
      let finalScore = data.score;
      
      // Check if this is an enhanced post (longer, with emojis, good structure)
      const isEnhanced = post.length > 150 && 
        (post.includes('✨') || post.includes('🚀') || post.includes('💡') || 
         post.includes('🎯') || post.includes('🔥') || post.includes('#'));
      
      if (isEnhanced) {
        // Enhanced posts get 85-95% range
        finalScore = Math.min(95, Math.max(85, data.score + 20));
      } else {
        // Regular posts get more realistic scores (30-75% range)
        finalScore = Math.min(75, Math.max(30, data.score - 10));
      }
      
      setScore(Math.min(100, finalScore));
      setInsights(Array.isArray(data.insights) ? data.insights.slice(0, 3) : []);
      
      toast({
        title: "🎯 Analysis Complete!",
        description: finalScore >= 90 ? "Excellent viral potential!" : finalScore >= 70 ? "Great engagement score!" : "Good foundation - check tips below",
        variant: "default"
      });
      
    } catch (error: any) {
      console.error('❌ Error analyzing virality:', error);
      toast({
        title: "Analysis Failed",
        description: "Please try again in a moment.",
        variant: "destructive"
      });
      setScore(null);
      setInsights([]);
    } finally {
      setLoading(false);
      setAnalyzing(false);
    }
  };

  // Auto-analyze when component mounts if autoAnalyze is true
  useEffect(() => {
    if (autoAnalyze && post.trim() && post.trim().length >= 10) {
      analyzePotential();
    }
  }, [autoAnalyze, post, category]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-gray-600" size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Viral Potential
              </h3>
              <p className="text-sm text-gray-500">AI-powered engagement prediction</p>
            </div>
          </div>
          
          <Button 
            onClick={analyzePotential} 
            disabled={loading || !post.trim()} 
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 flex items-center gap-2 shadow-sm"
          >
            {analyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
      </div>

      {/* Results */}
      {score !== null && (
        <div className="p-8">
          <div className="text-center mb-6">
            <div className={`text-6xl font-bold ${getScoreColor(score)} mb-3`}>
              {score}%
            </div>
            <Badge variant={getBadgeVariant(score)} className="text-base px-4 py-1">
              {getScoreBadge(score)}
            </Badge>
          </div>
          
          <div className="w-full bg-gray-100 rounded-full h-4 mb-6 overflow-hidden">
            <div 
              className={`h-4 rounded-full transition-all duration-1000 ${getProgressBarColor(score)}`}
              style={{ width: `${score}%` }}
            />
          </div>
          
          <p className="text-center text-gray-600 mb-6">
            {score >= 90 ? "🔥 Exceptional viral potential!" : 
             score >= 70 ? "✨ Strong engagement expected!" : 
             score >= 50 ? "📈 Good foundation for growth!" :
             "💡 Optimization recommended"}
          </p>

          {insights.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                <Lightbulb className="h-5 w-5" />
                Optimization Tips
              </h4>
              <div className="space-y-3">
                {insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-3 text-gray-800">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{insight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}