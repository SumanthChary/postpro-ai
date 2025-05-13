
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const EnhancedPostsShowcase = () => {
  const posts = [
    {
      original: "Just launched our new product!",
      enhanced: "🚀 Thrilled to announce the launch of our revolutionary product! After months of dedicated development and customer feedback, we're bringing innovation to your doorstep. #ProductLaunch #Innovation #Tech",
      improvements: ["Engaging emoji", "Emotional context", "Strategic hashtags"],
      stats: "+164% engagement"
    },
    {
      original: "Looking for feedback on our service",
      enhanced: "📊 Your insights shape our future! We're on a mission to elevate our service quality and we'd love to hear your thoughts. Share your experience with us and be part of our improvement journey. #CustomerFeedback #Growth #ContinuousImprovement",
      improvements: ["Clear call-to-action", "Value proposition", "Community building"],
      stats: "+88% comments"
    },
    {
      original: "Check out our latest blog post",
      enhanced: "🎯 Unlock the Secrets of Digital Success: Our latest blog post reveals 5 game-changing strategies that transformed our clients' online presence. Dive in to discover actionable insights backed by real case studies. #DigitalStrategy #Success #BusinessGrowth",
      improvements: ["Benefit-focused", "Curiosity hook", "Social proof"],
      stats: "+112% clicks"
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Transform Your Posts
        </h2>
        <p className="text-center text-lg mb-8 max-w-3xl mx-auto">
          See the difference AI enhancement makes:
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="bg-gray-50 p-6 border-b">
                <h4 className="font-semibold mb-2 text-electric-purple flex items-center">
                  Original Post
                </h4>
                <p className="text-custom-text p-3 bg-gray-100 rounded-lg min-h-[80px]">{post.original}</p>
              </div>
              
              <div className="flex justify-center -mt-3 z-10 relative">
                <div className="bg-electric-purple p-1 rounded-full">
                  <ArrowRight className="text-white w-5 h-5" />
                </div>
              </div>
              
              <div className="p-6 bg-white">
                <h4 className="font-semibold mb-2 text-bright-teal flex items-center justify-between">
                  <span>Enhanced Version</span>
                  <Badge variant="outline" className="bg-bright-teal/10 text-bright-teal">
                    {post.stats}
                  </Badge>
                </h4>
                <p className="text-custom-text p-3 bg-light-lavender/50 rounded-lg">{post.enhanced}</p>
                
                <div className="mt-4">
                  <h5 className="text-sm font-semibold mb-2">Improvements</h5>
                  <div className="flex flex-wrap gap-2">
                    {post.improvements.map((improvement, i) => (
                      <Badge key={i} variant="outline" className="bg-white">
                        {improvement}
                      </Badge>
                    ))}
                  </div>
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
