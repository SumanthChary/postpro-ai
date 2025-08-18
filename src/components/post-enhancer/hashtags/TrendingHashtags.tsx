import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Hash, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TrendingHashtag {
  tag: string;
  posts: number;
  engagement: number;
  trend: 'hot' | 'rising' | 'steady';
  category: string;
}

interface TrendingHashtagsProps {
  onHashtagAdd: (hashtag: string) => void;
  selectedHashtags: string[];
}

const TrendingHashtags: React.FC<TrendingHashtagsProps> = ({
  onHashtagAdd,
  selectedHashtags,
}) => {
  const [trendingData, setTrendingData] = useState<Record<string, TrendingHashtag[]>>({});
  const { toast } = useToast();

  // Mock trending hashtags data - in production, this would come from your API
  useEffect(() => {
    setTrendingData({
      business: [
        { tag: 'entrepreneurship', posts: 45200, engagement: 8.5, trend: 'hot', category: 'business' },
        { tag: 'leadership', posts: 32100, engagement: 7.2, trend: 'rising', category: 'business' },
        { tag: 'innovation', posts: 28900, engagement: 6.8, trend: 'steady', category: 'business' },
        { tag: 'startup', posts: 25600, engagement: 9.1, trend: 'hot', category: 'business' },
        { tag: 'businesstips', posts: 18700, engagement: 5.9, trend: 'rising', category: 'business' }
      ],
      technology: [
        { tag: 'ai', posts: 67800, engagement: 12.3, trend: 'hot', category: 'technology' },
        { tag: 'machinelearning', posts: 34500, engagement: 8.7, trend: 'rising', category: 'technology' },
        { tag: 'blockchain', posts: 29200, engagement: 6.4, trend: 'steady', category: 'technology' },
        { tag: 'cybersecurity', posts: 21800, engagement: 7.1, trend: 'rising', category: 'technology' },
        { tag: 'cloudcomputing', posts: 19500, engagement: 5.8, trend: 'steady', category: 'technology' }
      ],
      marketing: [
        { tag: 'digitalmarketing', posts: 52300, engagement: 9.2, trend: 'hot', category: 'marketing' },
        { tag: 'contentmarketing', posts: 38700, engagement: 7.8, trend: 'rising', category: 'marketing' },
        { tag: 'socialmedia', posts: 44200, engagement: 8.1, trend: 'steady', category: 'marketing' },
        { tag: 'seo', posts: 31500, engagement: 6.9, trend: 'rising', category: 'marketing' },
        { tag: 'branding', posts: 27800, engagement: 6.2, trend: 'steady', category: 'marketing' }
      ],
      creative: [
        { tag: 'design', posts: 41600, engagement: 10.4, trend: 'hot', category: 'creative' },
        { tag: 'creativity', posts: 33200, engagement: 8.9, trend: 'rising', category: 'creative' },
        { tag: 'graphicdesign', posts: 29800, engagement: 7.6, trend: 'steady', category: 'creative' },
        { tag: 'ux', posts: 24500, engagement: 8.3, trend: 'rising', category: 'creative' },
        { tag: 'digitalart', posts: 22100, engagement: 9.7, trend: 'hot', category: 'creative' }
      ]
    });
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'hot': return '🔥';
      case 'rising': return '⬆️';
      case 'steady': return '📈';
      default: return '📊';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'hot': return 'text-red-500 border-red-200';
      case 'rising': return 'text-orange-500 border-orange-200';
      case 'steady': return 'text-green-500 border-green-200';
      default: return 'text-gray-500 border-gray-200';
    }
  };

  const handleHashtagClick = (hashtag: string) => {
    if (!selectedHashtags.includes(hashtag)) {
      onHashtagAdd(hashtag);
      toast({
        title: "Trending Hashtag Added",
        description: `#${hashtag} has been added to your post`,
      });
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-background/50">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Trending in Your Niche</h3>
      </div>

      <Tabs defaultValue="business" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="technology">Tech</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="creative">Creative</TabsTrigger>
        </TabsList>

        {Object.entries(trendingData).map(([category, hashtags]) => (
          <TabsContent key={category} value={category} className="space-y-3">
            <div className="grid gap-2">
              {hashtags.map((hashtag, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors ${getTrendColor(hashtag.trend)}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">
                      {getTrendIcon(hashtag.trend)}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4" />
                        <span className="font-medium">#{hashtag.tag}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{formatNumber(hashtag.posts)} posts</span>
                        <span>{hashtag.engagement}% engagement</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleHashtagClick(hashtag.tag)}
                    disabled={selectedHashtags.includes(hashtag.tag)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="text-xs text-muted-foreground">
        <p>Hashtag trends updated hourly • Click to add to your post</p>
      </div>
    </div>
  );
};

export default TrendingHashtags;