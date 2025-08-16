import React, { useState } from 'react';
import { WhopAuthWrapper } from '@/components/whop/WhopAuthWrapper';
import PostEnhancer from '@/components/post-enhancer/PostEnhancer';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

const WhopApp: React.FC = () => {
  const [post, setPost] = useState('');
  const [category, setCategory] = useState('general');
  const [styleTone, setStyleTone] = useState('professional');

  return (
    <WhopAuthWrapper>
      <div className="min-h-screen bg-background">
        {/* Simple Header */}
        <div className="border-b bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold">PostPro AI</h1>
                <p className="text-sm text-muted-foreground">Transform your content with AI</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
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
      </div>
    </WhopAuthWrapper>
  );
};

export default WhopApp;