import React from 'react';
import { WhopAuthWrapper } from '@/components/whop/WhopAuthWrapper';
import { WhopPricingCards } from '@/components/whop/WhopPaymentButton';
import PostEnhancer from '@/components/post-enhancer/PostEnhancer';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, Users, Crown } from 'lucide-react';

const WhopApp: React.FC = () => {
  const [post, setPost] = useState('');
  const [category, setCategory] = useState('general');
  const [styleTone, setStyleTone] = useState('professional');

  const features = [
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: 'AI-Powered Enhancement',
      description: 'Transform your content with advanced AI that understands your brand voice and audience.'
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: 'Virality Score',
      description: 'Get real-time predictions on how likely your content is to go viral.'
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: 'Multi-Platform',
      description: 'Optimize content for Twitter, LinkedIn, Instagram, and more platforms.'
    },
    {
      icon: <Crown className="h-5 w-5" />,
      title: 'Premium Templates',
      description: 'Access exclusive templates used by top content creators.'
    },
  ];

  return (
    <WhopAuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
        {/* Header */}
        <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold">PostPro AI</h1>
                <Badge variant="secondary">Powered by Whop</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="enhance" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="enhance">Enhance Content</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="pricing">Upgrade</TabsTrigger>
            </TabsList>

            <TabsContent value="enhance" className="space-y-6">
              <div className="text-center space-y-4 mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Transform Your Content with AI
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Create viral-worthy content that engages your audience and drives results. 
                  Our AI understands what makes content perform.
                </p>
              </div>

              {/* Enhanced Post Enhancer */}
              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span>Content Enhancement Studio</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PostEnhancer 
                    post={post} 
                    setPost={setPost} 
                    category={category} 
                    setCategory={setCategory} 
                    styleTone={styleTone} 
                    setStyleTone={setStyleTone} 
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="space-y-6">
              <div className="text-center space-y-4 mb-8">
                <h2 className="text-3xl font-bold">Powerful Features for Creators</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Everything you need to create content that resonates with your audience.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {features.map((feature, index) => (
                  <Card key={index} className="transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-6">
              <div className="text-center space-y-4 mb-8">
                <h2 className="text-3xl font-bold">Choose Your Plan</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Unlock premium features and take your content to the next level.
                </p>
              </div>

              <WhopPricingCards />
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <footer className="border-t bg-background/50 mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <div className="h-6 w-6 bg-primary rounded flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">
                  PostPro AI - Powered by Whop
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Transform your social media presence with AI
              </div>
            </div>
          </div>
        </footer>
      </div>
    </WhopAuthWrapper>
  );
};

export default WhopApp;