import React, { useState } from 'react';
import { WhopAuthWrapper } from '@/components/whop/WhopAuthWrapper';
import PostEnhancer from '@/components/post-enhancer/PostEnhancer';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, TrendingUp, Clock, Users2 } from 'lucide-react';

const WhopApp: React.FC = () => {
  const [post, setPost] = useState('');
  const [category, setCategory] = useState('business');
  const [styleTone, setStyleTone] = useState('professional');

  return (
    <WhopAuthWrapper>
      <div className="min-h-screen bg-background">
        {/* Minimal Header */}
        <div className="border-b bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">PostPro AI</h1>
                </div>
              </div>
              <div className="text-xs text-muted-foreground font-medium">
                Professional Edition
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Tool - Takes up 2 columns */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
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
              </div>

              {/* Sidebar with metrics */}
              <div className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4">Proven Results</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          <span className="text-sm text-muted-foreground">Avg. Engagement</span>
                        </div>
                        <span className="font-semibold text-foreground">+300%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="text-sm text-muted-foreground">Time Saved</span>
                        </div>
                        <span className="font-semibold text-foreground">5hrs/week</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Users2 className="h-4 w-4 text-primary" />
                          <span className="text-sm text-muted-foreground">Active Users</span>
                        </div>
                        <span className="font-semibold text-foreground">50K+</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3">Why PostPro AI?</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Enterprise Security</p>
                          <p className="text-xs text-muted-foreground">Bank-level encryption</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Lightning Fast</p>
                          <p className="text-xs text-muted-foreground">Content in under 3 seconds</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Trusted Globally</p>
                          <p className="text-xs text-muted-foreground">By professionals worldwide</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WhopAuthWrapper>
  );
};

export default WhopApp;