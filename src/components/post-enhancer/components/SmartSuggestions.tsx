
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, ThumbsUp, MessageSquare, Share2, Bookmark, Hash, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useHashtags from "@/hooks/useHashtags";

interface SmartSuggestionsProps {
  post: string;
  category: string;
  onSuggestionClick: (suggestion: string) => void;
}

const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({
  post,
  category,
  onSuggestionClick
}) => {
  const { toast } = useToast();
  const { getCategoryHashtags } = useHashtags();
  const [hashtags, setHashtags] = useState<string[]>([]);
  
  const ctas = [
    { text: "What are your thoughts on this?", icon: <MessageCircle className="w-4 h-4" /> },
    { text: "Like if you found this helpful!", icon: <ThumbsUp className="w-4 h-4" /> },
    { text: "Share with someone who needs to see this", icon: <Share2 className="w-4 h-4" /> },
    { text: "Save this for later reference", icon: <Bookmark className="w-4 h-4" /> },
    { text: "Follow for more content like this", icon: <MessageSquare className="w-4 h-4" /> },
    { text: "Tag someone who would benefit from this", icon: <Hash className="w-4 h-4" /> }
  ];

  useEffect(() => {
    if (category) {
      const suggestedHashtags = getCategoryHashtags(category);
      // Get a random subset of 5 hashtags
      const randomHashtags = [...suggestedHashtags]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
      setHashtags(randomHashtags);
    }
  }, [category]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "You can now paste this into your post",
      });
    });
  };

  const handleClick = (suggestion: string) => {
    onSuggestionClick(suggestion);
    toast({
      title: "Added to post",
      description: "Suggestion added to your post"
    });
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-electric-purple" />
          Smart Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Trending Hashtags</h3>
          <div className="flex flex-wrap gap-2">
            {hashtags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="cursor-pointer hover:bg-electric-purple/10 transition-colors group"
                onClick={() => handleClick(tag)}
              >
                {tag}
                <Copy 
                  className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(tag);
                  }}
                />
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Engagement CTAs</h3>
          <div className="space-y-2">
            {ctas.map((cta, index) => (
              <Button 
                key={index}
                variant="outline" 
                size="sm"
                className="w-full justify-start text-left text-xs hover:bg-electric-purple/10 hover:border-electric-purple/30 group"
                onClick={() => handleClick(cta.text)}
              >
                {cta.icon}
                <span className="ml-2 truncate">{cta.text}</span>
                <Copy 
                  className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(cta.text);
                  }}
                />
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartSuggestions;
