import React, { useState } from 'react';
import { WhopAuthWrapper } from '@/components/whop/WhopAuthWrapper';
import PostEnhancer from '@/components/post-enhancer/PostEnhancer';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Target, MessageCircle, BarChart3, CheckCircle, ArrowRight, Flame, Lightbulb } from 'lucide-react';

const WhopApp: React.FC = () => {
  const [post, setPost] = useState('');
  const [category, setCategory] = useState('general');
  const [styleTone, setStyleTone] = useState('professional');

  const realResults = [
    { metric: "Post goes viral", chance: "78% higher", description: "Our AI spots what makes content spread" },
    { metric: "Engagement rate", boost: "+284%", description: "Comments, likes, shares all increase" },
    { metric: "Profile views", increase: "+156%", description: "More visibility = more opportunities" }
  ];

  const painPoints = [
    { problem: "Spend hours writing posts that get 3 likes", solution: "Get viral-worthy content in 30 seconds" },
    { problem: "Your expertise gets ignored on LinkedIn", solution: "AI makes your knowledge impossible to ignore" },
    { problem: "Competitors outperform your content", solution: "Consistently create posts that outrank theirs" }
  ];

  return (
    <WhopAuthWrapper>
      <div className="min-h-screen page-gradient">
        {/* Hook Header */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-center py-2 text-sm font-bold">
          🔥 LIVE: Watch your engagement explode in real-time
        </div>

        {/* Simple Header */}
        <div className="border-b bg-white/90 backdrop-blur-lg shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="h-12 w-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">PostPro AI</h1>
                <p className="text-sm text-gray-600">Turn boring posts into viral content</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Main Tool */}
            <div className="lg:col-span-3">
              <div className="mb-6 text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Stop getting ignored on LinkedIn
                </h2>
                <p className="text-lg text-gray-600">
                  Your expertise deserves attention. Our AI makes your content impossible to scroll past.
                </p>
              </div>
              
              <Card className="modern-card border-2 border-purple-200">
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

            {/* Results Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Real Results */}
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-5">
                  <div className="flex items-center mb-4">
                    <Flame className="h-6 w-6 text-red-500 mr-2" />
                    <h3 className="font-bold text-gray-900">What Actually Happens</h3>
                  </div>
                  <div className="space-y-4">
                    {realResults.map((result, idx) => (
                      <div key={idx} className="border-l-4 border-green-400 pl-4">
                        <div className="font-bold text-green-700 text-lg">
                          {result.chance || result.boost || result.increase}
                        </div>
                        <div className="font-semibold text-gray-900 text-sm">{result.metric}</div>
                        <div className="text-xs text-gray-600">{result.description}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Problem/Solution */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-5">
                  <div className="flex items-center mb-4">
                    <Target className="h-6 w-6 text-blue-600 mr-2" />
                    <h3 className="font-bold text-gray-900">Your Struggles End Here</h3>
                  </div>
                  <div className="space-y-4">
                    {painPoints.map((point, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="text-sm text-red-600 font-medium">
                          ❌ {point.problem}
                        </div>
                        <div className="text-sm text-green-600 font-medium">
                          ✅ {point.solution}
                        </div>
                        {idx < painPoints.length - 1 && <hr className="my-3 border-gray-200" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Social Proof */}
              <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                <CardContent className="p-5">
                  <div className="flex items-center mb-4">
                    <MessageCircle className="h-6 w-6 text-orange-600 mr-2" />
                    <h3 className="font-bold text-gray-900">Real Users, Real Results</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm italic text-gray-700 mb-2">
                        "My post got 47,000 views yesterday. I've never had anything go this viral before."
                      </p>
                      <p className="text-xs font-semibold text-gray-900">- Sarah M., Marketing Director</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm italic text-gray-700 mb-2">
                        "Finally broke through the LinkedIn algorithm. My engagement is up 400%."
                      </p>
                      <p className="text-xs font-semibold text-gray-900">- James K., Startup Founder</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12">
            <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <Lightbulb className="h-8 w-8 text-yellow-300 mr-3" />
                  <h2 className="text-2xl font-bold">Your Next Post Could Be Your Breakthrough</h2>
                </div>
                <p className="text-lg mb-6 text-blue-100">
                  Stop letting great ideas get buried. Start creating content that gets the attention you deserve.
                </p>
                <div className="flex items-center justify-center space-x-6 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-300 mr-2" />
                    <span>Works in 30 seconds</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-300 mr-2" />
                    <span>No monthly limits</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-300 mr-2" />
                    <span>Money-back guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </WhopAuthWrapper>
  );
};

export default WhopApp;