
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge"; 
import { TrendingUp, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ViralityScoreProps {
  post: string;
  category: string;
}

export function ViralityScore({ post, category }: ViralityScoreProps) {
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [insights, setInsights] = useState<string[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const { toast } = useToast();

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-600";
    if (score >= 70) return "text-blue-600";
    if (score >= 50) return "text-amber-600";
    return "text-red-500";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 85) return "Viral Ready";
    if (score >= 70) return "High Potential";
    if (score >= 50) return "Good Engagement";
    return "Needs Work";
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
      
      // Success toast with score-based message
      const scoreMessage = data.score >= 80 
        ? `Excellent! Your post has viral potential with ${data.score}% score!`
        : data.score >= 60
        ? `Good potential! Score: ${data.score}% - Check insights for improvements`
        : `Score: ${data.score}% - Follow the insights to boost engagement`;

      toast({
        title: "Analysis Complete",
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
          <div className="p-2 bg-gray-50 rounded-lg">
            <TrendingUp className="text-gray-700" size={18} />
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
          className="flex items-center gap-2"
        >
          {analyzing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              Analyzing...
            </>
          ) : (
            "Analyze"
          )}
        </Button>
      </div>

      {score !== null && (
        <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-100">
          {/* Score Display */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">
                Virality Score
              </p>
              <div className="flex items-center gap-3">
                <p className={`text-3xl font-bold ${getScoreColor(score)}`}>
                  {score}%
                </p>
                <Badge variant={getBadgeVariant(score)} className="px-3 py-1">
                  {getScoreBadge(score)}
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Low</span>
              <span>High</span>
            </div>
            <div className="relative">
              <Progress value={score} className="h-3" />
              <div 
                className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-700 ${getProgressBarColor(score)}`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
          
          {/* Insights */}
          {insights.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Improvement Insights</h4>
              
              <div className="space-y-3">
                {insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {insight}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          {score !== null && score < 70 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="text-blue-600" size={16} />
                <p className="text-sm font-medium text-blue-800">
                  Boost Your Viral Potential
                </p>
              </div>
              <p className="text-xs text-blue-700">
                Follow the insights above to improve your post's engagement potential and reach a wider audience.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
