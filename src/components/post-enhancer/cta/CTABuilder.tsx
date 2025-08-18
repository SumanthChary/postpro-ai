import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Plus, Wand2, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CTATemplateSelector from './CTATemplateSelector';
import CTASuggestionEngine from './CTASuggestionEngine';

interface CTA {
  id: string;
  text: string;
  url?: string;
  type: 'link' | 'text' | 'contact';
  performance?: {
    clicks: number;
    impressions: number;
    ctr: number;
  };
}

interface CTABuilderProps {
  post: string;
  category: string;
  onCTAAdd: (cta: CTA) => void;
  selectedCTAs: CTA[];
}

const CTABuilder: React.FC<CTABuilderProps> = ({
  post,
  category,
  onCTAAdd,
  selectedCTAs,
}) => {
  const [customCTA, setCustomCTA] = useState({ text: '', url: '', type: 'link' as const });
  const [showABTest, setShowABTest] = useState(false);
  const { toast } = useToast();

  const handleCustomCTAAdd = () => {
    if (!customCTA.text.trim()) {
      toast({
        title: "Error",
        description: "Please enter CTA text",
        variant: "destructive",
      });
      return;
    }

    const newCTA: CTA = {
      id: Date.now().toString(),
      text: customCTA.text,
      url: customCTA.url || undefined,
      type: customCTA.type,
    };

    onCTAAdd(newCTA);
    setCustomCTA({ text: '', url: '', type: 'link' });
    
    toast({
      title: "CTA Added",
      description: "Your custom call-to-action has been added",
    });
  };

  const handleTemplateSelect = (template: any) => {
    const newCTA: CTA = {
      id: Date.now().toString(),
      text: template.text,
      url: template.url,
      type: template.type,
    };
    onCTAAdd(newCTA);
  };

  const handleSuggestionSelect = (suggestion: any) => {
    const newCTA: CTA = {
      id: Date.now().toString(),
      text: suggestion.text,
      url: suggestion.url,
      type: suggestion.type,
    };
    onCTAAdd(newCTA);
  };

  return (
    <div className="space-y-6 p-4 border rounded-lg bg-background/50">
      <div className="flex items-center gap-2">
        <ExternalLink className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Custom CTA Builder</h3>
        <Badge variant="secondary">Boost Engagement</Badge>
      </div>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
          <TabsTrigger value="smart">AI Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <CTATemplateSelector
            category={category}
            onTemplateSelect={handleTemplateSelect}
            selectedCTAs={selectedCTAs}
          />
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Create Custom CTA</CardTitle>
              <CardDescription>
                Design a personalized call-to-action for your specific goals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="cta-text">Call-to-Action Text</Label>
                <Input
                  id="cta-text"
                  placeholder="e.g., Book a free consultation"
                  value={customCTA.text}
                  onChange={(e) => setCustomCTA({ ...customCTA, text: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="cta-url">Link URL (optional)</Label>
                <Input
                  id="cta-url"
                  placeholder="https://your-website.com/book-call"
                  value={customCTA.url}
                  onChange={(e) => setCustomCTA({ ...customCTA, url: e.target.value })}
                />
              </div>

              <Button onClick={handleCustomCTAAdd} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Custom CTA
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="smart" className="space-y-4">
          <CTASuggestionEngine
            post={post}
            category={category}
            onSuggestionSelect={handleSuggestionSelect}
            selectedCTAs={selectedCTAs}
          />
        </TabsContent>
      </Tabs>

      {selectedCTAs.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Your CTAs
          </h4>
          <div className="space-y-2">
            {selectedCTAs.map((cta, index) => (
              <div key={cta.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{cta.text}</p>
                  {cta.url && (
                    <p className="text-sm text-muted-foreground truncate max-w-xs">
                      {cta.url}
                    </p>
                  )}
                </div>
                <Badge variant="outline">{cta.type}</Badge>
              </div>
            ))}
          </div>
          
          {selectedCTAs.length > 1 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowABTest(!showABTest)}
              className="w-full"
            >
              <Wand2 className="h-4 w-4 mr-2" />
              Enable A/B Testing
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CTABuilder;