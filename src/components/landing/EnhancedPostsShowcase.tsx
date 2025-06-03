
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SparklesIcon, TrendingUpIcon, UsersIcon } from "lucide-react";

const EnhancedPostsShowcase = () => {
  const posts = [
    {
      original: "Just launched our new product!",
      enhanced: "🚀 Thrilled to announce the launch of our revolutionary product! After months of dedicated development and customer feedback, we're bringing innovation to your doorstep. #ProductLaunch #Innovation #Tech",
      improvements: ["Engaging emoji", "Emotional context", "Strategic hashtags"],
      icon: <SparklesIcon className="w-5 h-5" />
    },
    {
      original: "Looking for feedback on our service",
      enhanced: "📊 Your insights shape our future! We're on a mission to elevate our service quality and we'd love to hear your thoughts. Share your experience with us and be part of our improvement journey. #CustomerFeedback #Growth #ContinuousImprovement",
      improvements: ["Clear call-to-action", "Value proposition", "Community building"],
      icon: <TrendingUpIcon className="w-5 h-5" />
    },
    {
      original: "Check out our latest blog post",
      enhanced: "🎯 Unlock the Secrets of Digital Success: Our latest blog post reveals 5 game-changing strategies that transformed our clients' online presence. Dive in to discover actionable insights backed by real case studies. #DigitalStrategy #Success #BusinessGrowth",
      improvements: ["Benefit-focused", "Curiosity hook", "Social proof"],
      icon: <UsersIcon className="w-5 h-5" />
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
            Transform Your Posts
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See real examples of how AI enhancement transforms ordinary posts into viral content
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Card key={index} className="p-6 flex flex-col gap-6 bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  {post.icon}
                </div>
                <h3 className="font-semibold text-lg text-gray-900">Enhancement {index + 1}</h3>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-red-600 flex items-center gap-2">
                  Original Post
                </h4>
                <p className="text-gray-600 p-4 bg-red-50 rounded-lg border border-red-200">{post.original}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-green-600 flex items-center gap-2">
                  Enhanced Version
                </h4>
                <p className="text-gray-700 p-4 bg-green-50 rounded-lg border border-green-200">{post.enhanced}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-gray-900">Key Improvements</h4>
                <div className="flex flex-wrap gap-2">
                  {post.improvements.map((improvement, i) => (
                    <Badge key={i} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {improvement}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedPostsShowcase;
