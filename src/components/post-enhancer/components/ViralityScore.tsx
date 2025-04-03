
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge"; 
import { Sparkles, TrendingUp, AlertCircle } from "lucide-react";
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
  const { toast } = useToast();

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return "Viral Potential";
    if (score >= 60) return "Good Engagement";
    return "Needs Improvement";
  };

  const getBadgeVariant = (score: number): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  const analyzePotential = async () => {
    if (!post.trim()) {
      toast({
        title: "Empty Post",
        description: "Please enter some content to analyze",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    console.log("Analyzing virality for:", { post: post.substring(0, 50) + "...", category });
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-virality', {
        body: { 
          post,
          category
        }
      });

      if (error) {
        console.error('Error response from analyze-virality function:', error);
        throw error;
      }

      console.log('Virality score result:', data);
      
      if (!data || typeof data.score !== 'number') {
        throw new Error('Invalid response format from virality analysis');
      }
      
      setScore(data.score);
      setInsights(data.insights || []);
      
      toast({
        title: "Analysis Complete",
        description: `Your post has a virality score of ${data.score}%`,
      });
    } catch (error: any) {
      console.error('Error analyzing virality:', error);
      
      // Fallback for development/testing
      if (process.env.NODE_ENV === 'development') {
        console.log('Using fallback virality score for development');
        const fallbackScore = Math.floor(Math.random() * 40) + 50; // Random score between 50-90
        const fallbackInsights = [
          "Add more engaging questions to increase interaction",
          "Include trending hashtags relevant to your topic",
          "Consider shortening your sentences for better readability"
        ];
        setScore(fallbackScore);
        setInsights(fallbackInsights);
        
        toast({
          title: "Development Mode",
          description: "Using sample virality score data",
        });
        setLoading(false);
        return;
      }
      
      toast({
        title: "Analysis Failed",
        description: error.message || "There was an error analyzing your post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="text-electric-purple" size={20} />
          Virality Potential
        </h3>
        <Button 
          onClick={analyzePotential} 
          disabled={loading || !post.trim()}
          size="sm"
          className="flex items-center gap-1"
        >
          {loading ? "Analyzing..." : "Analyze"}
          <Sparkles size={16} className="ml-1" />
        </Button>
      </div>

      {score !== null && (
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Virality Score</p>
              <p className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}%</p>
            </div>
            <Badge variant={getBadgeVariant(score)}>
              {getScoreBadge(score)}
            </Badge>
          </div>
          
          <Progress value={score} className="h-2" />
          
          {insights.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium flex items-center gap-2">
                <AlertCircle size={16} />
                Improvement Insights:
              </p>
              <ul className="space-y-2 text-sm">
                {insights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
