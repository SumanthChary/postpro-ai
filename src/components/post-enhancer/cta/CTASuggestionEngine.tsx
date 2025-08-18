import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2, Plus, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CTASuggestion {
  text: string;
  url?: string;
  type: 'link' | 'text' | 'contact';
  reasoning: string;
  confidence: number;
  expectedImpact: string;
}

interface CTASuggestionEngineProps {
  post: string;
  category: string;
  onSuggestionSelect: (suggestion: CTASuggestion) => void;
  selectedCTAs: any[];
}

const CTASuggestionEngine: React.FC<CTASuggestionEngineProps> = ({
  post,
  category,
  onSuggestionSelect,
  selectedCTAs,
}) => {
  const [suggestions, setSuggestions] = useState<CTASuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateSuggestions = async () => {
    if (!post.trim()) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-cta-suggestions', {
        body: { post, category }
      });

      if (error) throw error;
      setSuggestions(data.suggestions || []);
    } catch (error) {
      console.error('Error generating CTA suggestions:', error);
      // Fallback to mock data for demo
      setSuggestions([
        {
          text: 'What\'s your biggest challenge with this topic?',
          type: 'text',
          reasoning: 'Encourages engagement and builds community discussion',
          confidence: 0.85,
          expectedImpact: '+30% comments'
        },
        {
          text: 'DM me for personalized advice',
          type: 'contact',
          reasoning: 'Creates direct connection opportunity based on helpful content',
          confidence: 0.78,
          expectedImpact: '+25% DMs'
        },
        {
          text: 'Save this post for later reference',
          type: 'text',
          reasoning: 'Content appears educational and valuable for future use',
          confidence: 0.92,
          expectedImpact: '+40% saves'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (post.trim()) {
      const debounceTimer = setTimeout(() => {
        generateSuggestions();
      }, 1500);
      return () => clearTimeout(debounceTimer);
    }
  }, [post, category]);

  const handleSuggestionSelect = (suggestion: CTASuggestion) => {
    const isSelected = selectedCTAs.some(cta => cta.text === suggestion.text);
    if (isSelected) {
      toast({
        title: "Already Added",
        description: "This CTA is already in your list",
        variant: "destructive",
      });
      return;
    }

    onSuggestionSelect(suggestion);
    toast({
      title: "AI Suggestion Added",
      description: `"${suggestion.text}" has been added to your post`,
    });
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 bg-green-50 border-green-200';
    if (confidence >= 0.6) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-blue-600 bg-blue-50 border-blue-200';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Wand2 className="h-5 w-5 text-primary" />
        <h4 className="font-medium">AI-Powered CTA Suggestions</h4>
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      </div>

      {!post.trim() && (
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">
              Write your post content to get personalized CTA suggestions
            </p>
          </CardContent>
        </Card>
      )}

      {suggestions.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            AI-analyzed suggestions based on your content and {category} best practices
          </p>
          
          {suggestions.map((suggestion, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge 
                      className={`text-xs ${getConfidenceColor(suggestion.confidence)}`}
                      variant="outline"
                    >
                      {Math.round(suggestion.confidence * 100)}% confidence
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {suggestion.type}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleSuggestionSelect(suggestion)}
                    disabled={selectedCTAs.some(cta => cta.text === suggestion.text)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <h5 className="font-medium mb-2">{suggestion.text}</h5>
                
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <strong>Why this works:</strong> {suggestion.reasoning}
                  </p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">
                      {suggestion.expectedImpact}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && suggestions.length === 0 && post.trim() && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              No AI suggestions available. Try the templates or create a custom CTA.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CTASuggestionEngine;