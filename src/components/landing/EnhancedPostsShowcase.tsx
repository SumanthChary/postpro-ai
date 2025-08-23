
import React, { memo } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SparklesIcon, TrendingUpIcon, UsersIcon } from "lucide-react";

const EnhancedPostsShowcase = memo(() => {
  const posts = [
    {
      original: "Just launched our new product!",
      enhanced: "🚀 Thrilled to announce the launch of our revolutionary product! After months of dedicated development and customer feedback, we're bringing innovation to your doorstep. #ProductLaunch #Innovation #Tech",
      improvements: ["Engaging emoji", "Emotional context", "Strategic hashtags"],
      icon: <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
    },
    {
      original: "Looking for feedback on our service",
      enhanced: "📊 Your insights shape our future! We're on a mission to elevate our service quality and we'd love to hear your thoughts. Share your experience with us and be part of our improvement journey. #CustomerFeedback #Growth #ContinuousImprovement",
      improvements: ["Clear call-to-action", "Value proposition", "Community building"],
      icon: <TrendingUpIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
    },
    {
      original: "Check out our latest blog post",
      enhanced: "🎯 Unlock the Secrets of Digital Success: Our latest blog post reveals 5 game-changing strategies that transformed our clients' online presence. Dive in to discover actionable insights backed by real case studies. #DigitalStrategy #Success #BusinessGrowth",
      improvements: ["Benefit-focused", "Curiosity hook", "Social proof"],
      icon: <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 lg:mb-8 tracking-tight">
            LinkedIn: Before vs After
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed px-2">
            Real engagement outcomes before and after enhancement
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {posts.map((post, index) => (
            <Card key={index} className="p-4 sm:p-5 lg:p-6 xl:p-8 flex flex-col gap-4 sm:gap-5 lg:gap-6 bg-white/80 backdrop-blur-sm shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 sm:gap-4 mb-1 sm:mb-2">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white shadow-lg">
                  {post.icon}
                </div>
                <h3 className="font-bold text-base sm:text-lg lg:text-xl text-gray-900">Enhancement {index + 1}</h3>
              </div>
              
              <div>
                <h4 className="font-bold mb-3 sm:mb-4 text-red-600 flex items-center gap-2 text-sm sm:text-base lg:text-lg">
                  Original Post
                </h4>
                <p className="text-gray-600 p-3 sm:p-4 lg:p-5 bg-red-50/80 rounded-xl border border-red-200/50 font-medium text-sm sm:text-base">{post.original}</p>
              </div>
              
              <div>
                <h4 className="font-bold mb-3 sm:mb-4 text-green-600 flex items-center gap-2 text-sm sm:text-base lg:text-lg">
                  Enhanced Version
                </h4>
                <p className="text-gray-700 p-3 sm:p-4 lg:p-5 bg-green-50/80 rounded-xl border border-green-200/50 font-medium text-sm sm:text-base">{post.enhanced}</p>
                <div className="flex gap-4 text-xs text-gray-600 mt-2">
                  <span>Likes: 12 → 55</span>
                  <span>Comments: 3 → 20</span>
                  <span>Reposts: 0 → 12</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold mb-3 sm:mb-4 text-gray-900 text-sm sm:text-base lg:text-lg">Key Improvements</h4>
                <div className="flex flex-wrap gap-2">
                  {post.improvements.map((improvement, i) => (
                    <Badge key={i} variant="outline" className="bg-blue-50/80 text-blue-700 border-blue-200/50 font-medium py-1 px-2 sm:px-3 text-xs sm:text-sm">
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
});

EnhancedPostsShowcase.displayName = 'EnhancedPostsShowcase';

export default EnhancedPostsShowcase;
