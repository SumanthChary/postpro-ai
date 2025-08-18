import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Hash, TrendingUp, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface HashtagSuggestion {
  tag: string;
  relevance: number;
  trendStrength: 'hot' | 'rising' | 'steady';
  category: string;
}

interface HashtagSuggestionPanelProps {
  post: string;
  category: string;
  onHashtagAdd: (hashtag: string) => void;
  selectedHashtags: string[];
}

const HashtagSuggestionPanel: React.FC<HashtagSuggestionPanelProps> = ({
  post,
  category,
  onHashtagAdd,
  selectedHashtags,
}) => {
  const [suggestions, setSuggestions] = useState<HashtagSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const trendIcons = {
    hot: '🔥',
    rising: '⬆️',
    steady: '📈'
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'hot': return 'text-red-500';
      case 'rising': return 'text-orange-500';
      case 'steady': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const analyzeHashtags = async () => {
    if (!post.trim()) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-hashtags', {
        body: { post, category }
      });

      if (error) throw error;
      setSuggestions(data.suggestions || []);
    } catch (error) {
      console.error('Error analyzing hashtags:', error);
      toast({
        title: "Error",
        description: "Failed to analyze hashtags. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (post.trim()) {
      const debounceTimer = setTimeout(() => {
        analyzeHashtags();
      }, 1000);
      return () => clearTimeout(debounceTimer);
    }
  }, [post, category]);

  const handleHashtagClick = (hashtag: string) => {
    if (!selectedHashtags.includes(hashtag)) {
      onHashtagAdd(hashtag);
      toast({
        title: "Hashtag Added",
        description: `#${hashtag} has been added to your post`,
      });
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-background/50">
      <div className="flex items-center gap-2">
        <Hash className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Smart Hashtag Suggestions</h3>
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      </div>

      {suggestions.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            AI-powered hashtags to increase your post visibility by up to 60%
          </p>
          
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 h-auto py-2 px-3"
                onClick={() => handleHashtagClick(suggestion.tag)}
                disabled={selectedHashtags.includes(suggestion.tag)}
              >
                <span className={getTrendColor(suggestion.trendStrength)}>
                  {trendIcons[suggestion.trendStrength]}
                </span>
                <span>#{suggestion.tag}</span>
                <Plus className="h-3 w-3" />
                <Badge variant="secondary" className="text-xs">
                  {Math.round(suggestion.relevance * 100)}%
                </Badge>
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span className="text-red-500">🔥</span> Hot trending
            </div>
            <div className="flex items-center gap-1">
              <span className="text-orange-500">⬆️</span> Rising
            </div>
            <div className="flex items-center gap-1">
              <span className="text-green-500">📈</span> Steady growth
            </div>
          </div>
        </div>
      )}

      {!loading && suggestions.length === 0 && post.trim() && (
        <p className="text-sm text-muted-foreground">
          Write your post content to get AI-powered hashtag suggestions
        </p>
      )}
    </div>
  );
};

export default HashtagSuggestionPanel;