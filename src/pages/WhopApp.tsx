import React, { useState } from 'react';
import { WhopAuthWrapper } from '@/components/whop/WhopAuthWrapper';
import PostEnhancer from '@/components/post-enhancer/PostEnhancer';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, BarChart3, Users } from 'lucide-react';

const WhopApp: React.FC = () => {
  const [post, setPost] = useState('');
  const [category, setCategory] = useState('general');
  const [styleTone, setStyleTone] = useState('professional');

  return (
    <WhopAuthWrapper>
      <div className="min-h-screen bg-gray-50">
        {/* Clean Header */}
        <div className="bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">PostPro AI</h1>
                <p className="text-sm text-gray-600">Professional Social Media Enhancement</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Transform Your Social Media Content
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create professional, engaging posts that drive results across all platforms. 
              Optimize your content strategy with AI-powered enhancement.
            </p>
          </div>
          
          {/* Main Tool */}
          <Card className="shadow-lg border-0 mb-8">
            <CardContent className="p-8">
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

          {/* Simple Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Higher Engagement</h3>
                <p className="text-sm text-gray-600">Optimized content performs significantly better</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Broader Reach</h3>
                <p className="text-sm text-gray-600">Connect with your target audience effectively</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Sparkles className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Professional Quality</h3>
                <p className="text-sm text-gray-600">Consistent, high-quality content every time</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </WhopAuthWrapper>
  );
};

export default WhopApp;