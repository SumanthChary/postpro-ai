import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, ExternalLink, MessageCircle, Calendar, Download, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CTATemplate {
  id: string;
  text: string;
  url?: string;
  type: 'link' | 'text' | 'contact';
  category: string[];
  icon: React.ReactNode;
  description: string;
  performance: number; // Expected performance boost percentage
}

interface CTATemplateSelectorProps {
  category: string;
  onTemplateSelect: (template: CTATemplate) => void;
  selectedCTAs: any[];
}

const CTATemplateSelector: React.FC<CTATemplateSelectorProps> = ({
  category,
  onTemplateSelect,
  selectedCTAs,
}) => {
  const { toast } = useToast();

  const templates: CTATemplate[] = [
    {
      id: '1',
      text: 'Connect with me on LinkedIn',
      type: 'link',
      category: ['business', 'marketing', 'technology'],
      icon: <Users className="h-4 w-4" />,
      description: 'Grow your professional network',
      performance: 25,
    },
    {
      id: '2',
      text: 'Book a free consultation',
      type: 'link',
      category: ['business', 'marketing'],
      icon: <Calendar className="h-4 w-4" />,
      description: 'Generate high-quality leads',
      performance: 45,
    },
    {
      id: '3',
      text: 'Download my free guide',
      type: 'link',
      category: ['business', 'marketing', 'education'],
      icon: <Download className="h-4 w-4" />,
      description: 'Build your email list effectively',
      performance: 35,
    },
    {
      id: '4',
      text: 'Drop a comment below',
      type: 'text',
      category: ['business', 'marketing', 'creative'],
      icon: <MessageCircle className="h-4 w-4" />,
      description: 'Increase post engagement',
      performance: 30,
    },
    {
      id: '5',
      text: 'Visit my website for more insights',
      type: 'link',
      category: ['business', 'technology', 'creative'],
      icon: <ExternalLink className="h-4 w-4" />,
      description: 'Drive traffic to your site',
      performance: 20,
    },
    {
      id: '6',
      text: 'Share your thoughts in the comments',
      type: 'text',
      category: ['business', 'creative', 'lifestyle'],
      icon: <MessageCircle className="h-4 w-4" />,
      description: 'Spark meaningful conversations',
      performance: 28,
    },
    {
      id: '7',
      text: 'Join my upcoming webinar',
      type: 'link',
      category: ['business', 'technology', 'education'],
      icon: <Calendar className="h-4 w-4" />,
      description: 'Build engaged community',
      performance: 40,
    },
    {
      id: '8',
      text: 'Follow for daily tips',
      type: 'text',
      category: ['business', 'marketing', 'creative'],
      icon: <Users className="h-4 w-4" />,
      description: 'Grow your follower base',
      performance: 15,
    },
  ];

  const filteredTemplates = templates.filter(template => 
    template.category.includes(category)
  );

  const handleTemplateSelect = (template: CTATemplate) => {
    const isSelected = selectedCTAs.some(cta => cta.text === template.text);
    if (isSelected) {
      toast({
        title: "Already Added",
        description: "This CTA is already in your list",
        variant: "destructive",
      });
      return;
    }

    onTemplateSelect(template);
    toast({
      title: "Template Added",
      description: `"${template.text}" has been added to your post`,
    });
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 40) return 'text-green-600 border-green-200';
    if (performance >= 25) return 'text-orange-600 border-orange-200';
    return 'text-blue-600 border-blue-200';
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-2">Popular CTA Templates</h4>
        <p className="text-sm text-muted-foreground">
          Pre-built templates optimized for {category} content
        </p>
      </div>

      <div className="grid gap-3">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 bg-muted rounded-lg">
                    {template.icon}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium">{template.text}</h5>
                    <p className="text-sm text-muted-foreground mb-2">
                      {template.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getPerformanceColor(template.performance)}`}
                      >
                        +{template.performance}% engagement
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {template.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleTemplateSelect(template)}
                  disabled={selectedCTAs.some(cta => cta.text === template.text)}
                  className="ml-2"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CTATemplateSelector;