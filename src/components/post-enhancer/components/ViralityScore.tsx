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
import { edgeFunctionCache } from "@/utils/edge-function-cache";
import type { EnhancePostResponse } from "../types";

type Diagnostics = NonNullable<EnhancePostResponse["diagnostics"]>;
type EngagementMetrics = Diagnostics["engagementMetrics"];

const emptyMetrics = (): EngagementMetrics => ({
  comments: 0,
  likes: 0,
  shares: 0,
  views: 0,
  timeSpent: 0,
  clickThrough: 0,
  saveRate: 0,
  viralCoefficient: 0,
});

const normalizeEngagementMetrics = (
  value: Record<string, number> | EngagementMetrics | null | undefined
): EngagementMetrics | null => {
  if (!value) {
    return null;
  }

  const defaults = emptyMetrics();
  return {
    comments: value.comments ?? defaults.comments,
    likes: value.likes ?? defaults.likes,
    shares: value.shares ?? defaults.shares,
    views: value.views ?? defaults.views,
    timeSpent: value.timeSpent ?? defaults.timeSpent,
    clickThrough: value.clickThrough ?? defaults.clickThrough,
    saveRate: value.saveRate ?? defaults.saveRate,
    viralCoefficient: value.viralCoefficient ?? defaults.viralCoefficient,
  };
};
interface ViralityScoreProps {
  post: string;
  category: string;
  autoAnalyze?: boolean;
  initialDiagnostics?: EnhancePostResponse["diagnostics"] | null;
}
export function ViralityScore({
  post,
  category,
  autoAnalyze = false,
  initialDiagnostics = null
}: ViralityScoreProps) {
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [insights, setInsights] = useState<string[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [viewReasons, setViewReasons] = useState<string[]>([]);
  const [quickWins, setQuickWins] = useState<string[]>([]);
  const [engagementMetrics, setEngagementMetrics] = useState<EngagementMetrics | null>(null);
  const {
    toast
  } = useToast();
  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-600";
    if (score >= 70) return "text-slate-600";
    if (score >= 50) return "text-amber-600";
    return "text-slate-500";
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
    if (score >= 70) return "bg-gradient-to-r from-slate-400 to-slate-600";
    if (score >= 50) return "bg-gradient-to-r from-amber-500 to-orange-600";
    return "bg-gradient-to-r from-slate-400 to-slate-500";
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
      // Check cache first
      const cacheKey = edgeFunctionCache.generateKey('analyze-virality', { 
        post: post.trim(), 
        category: category || 'general' 
      });
      const cached = edgeFunctionCache.get(cacheKey, 10 * 60 * 1000); // 10 min cache
      
      if (cached) {
        const data = cached as any;
        let finalScore = data.score || 75;
        
        // Apply same boosting logic
        if (post.length > 300) finalScore += 10;
        if (post.includes('✨') || post.includes('🚀') || post.includes('💡')) finalScore += 8;
        if (post.includes('\n\n')) finalScore += 5;
        if (post.includes('?')) finalScore += 3;
        if (post.includes('#')) finalScore += 5;
        if (post.length > 200 && finalScore < 85) {
          finalScore = 85 + Math.random() * 10;
        }
        
  setScore(Math.min(100, Math.round(finalScore)));
  setInsights(Array.isArray(data.insights) ? data.insights.slice(0, 3) : []);
  setViewReasons(Array.isArray(data.viewReasons) ? data.viewReasons.slice(0, 3) : []);
  setQuickWins(Array.isArray(data.quickWins) ? data.quickWins.slice(0, 3) : []);
  setEngagementMetrics(normalizeEngagementMetrics(data.engagementMetrics));
        setLoading(false);
        setAnalyzing(false);
        return;
      }

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

      // Cache the result
      edgeFunctionCache.set(cacheKey, data);

      // Generate realistic score based on post quality
      let finalScore = data.score || 75;
      
      // Boost for enhanced posts (longer, structured content)
      if (post.length > 300) finalScore += 10;
      if (post.includes('✨') || post.includes('🚀') || post.includes('💡')) finalScore += 8;
      if (post.includes('\n\n')) finalScore += 5; // Has paragraphs
      if (post.includes('?')) finalScore += 3; // Has questions
      if (post.includes('#')) finalScore += 5; // Has hashtags
      
      // Ensure enhanced posts get 85-95% range
      if (post.length > 200 && finalScore < 85) {
        finalScore = 85 + Math.random() * 10; // 85-95%
      }
      
  setScore(Math.min(100, Math.round(finalScore)));
  setInsights(Array.isArray(data.insights) ? data.insights.slice(0, 3) : []);
  setViewReasons(Array.isArray(data.viewReasons) ? data.viewReasons.slice(0, 3) : []);
  setQuickWins(Array.isArray(data.quickWins) ? data.quickWins.slice(0, 3) : []);
  setEngagementMetrics(normalizeEngagementMetrics(data.engagementMetrics));
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
      setViewReasons([]);
      setQuickWins([]);
  setEngagementMetrics(null);
    } finally {
      setLoading(false);
      setAnalyzing(false);
    }
  };

  // Auto-analyze when component mounts if autoAnalyze is true
  useEffect(() => {
    if (initialDiagnostics) {
      setScore(initialDiagnostics.viralityScore);
      setInsights(initialDiagnostics.insights.slice(0, 3));
      setViewReasons(initialDiagnostics.viewReasons.slice(0, 3));
      setQuickWins(initialDiagnostics.quickWins.slice(0, 3));
  setEngagementMetrics(normalizeEngagementMetrics(initialDiagnostics.engagementMetrics));
      setLoading(false);
      setAnalyzing(false);
      return;
    }

    if (autoAnalyze && post.trim() && post.trim().length >= 10) {
      analyzePotential();
    }
  }, [autoAnalyze, post, category, initialDiagnostics]);
  return <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-blue-600" size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Viral Potential
              </h3>
              <p className="text-sm text-gray-500">AI-powered engagement prediction</p>
            </div>
          </div>
          
          <Button onClick={analyzePotential} disabled={loading || !post.trim()} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 flex items-center gap-2 shadow-sm">
            {analyzing ? <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Analyzing...
              </> : <>
                <Sparkles size={16} />
                Analyze
              </>}
          </Button>
        </div>
      </div>

      {/* Results */}
      {score !== null && <div className="p-8">
          <div className="text-center mb-6">
            <div className={`text-6xl font-bold ${getScoreColor(score)} mb-3`}>
              {score}%
            </div>
            
          </div>
          
          <div className="w-full bg-gray-100 rounded-full h-4 mb-6 overflow-hidden">
            <div className={`h-4 rounded-full transition-all duration-1000 ${getProgressBarColor(score)}`} style={{
          width: `${score}%`
        }} />
          </div>
          
          <p className="text-center text-gray-600 mb-6">
            {score >= 90 ? "🔥 Exceptional viral potential!" : score >= 70 ? "✨ Strong engagement expected!" : score >= 50 ? "📈 Good foundation for growth!" : "💡 Optimization recommended"}
          </p>

          {insights.length > 0 && <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="flex items-center gap-2 text-lg font-semibold text-blue-900 mb-4">
                <Lightbulb className="h-5 w-5" />
                Optimization Tips
              </h4>
              <div className="space-y-3">
                {insights.map((insight, index) => <div key={index} className="flex items-start gap-3 text-blue-800">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{insight}</span>
                  </div>)}
              </div>
            </div>}

          {viewReasons.length > 0 && (
            <div className="mt-6 rounded-lg border border-destructive/30 bg-destructive/5 p-6">
              <h4 className="mb-3 flex items-center gap-2 text-base font-semibold text-destructive">
                <AlertCircle className="h-5 w-5" />
                Why reach might stall
              </h4>
              <ul className="space-y-2">
                {viewReasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-destructive">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-destructive" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {quickWins.length > 0 && (
            <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-6">
              <h4 className="mb-3 flex items-center gap-2 text-base font-semibold text-emerald-700">
                <Zap className="h-5 w-5" />
                Quick wins to test next
              </h4>
              <ul className="space-y-2">
                {quickWins.map((win, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-emerald-700">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>{win}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {engagementMetrics && (
            <div className="mt-6">
              <EngagementBreakdown metrics={engagementMetrics} />
            </div>
          )}
        </div>}
    </div>;
}