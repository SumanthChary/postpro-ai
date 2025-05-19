
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const EnhancedPostsShowcase = () => {
  const posts = [
    {
      original: "Just launched our new product!",
      enhanced: "🚀 Thrilled to announce the launch of our revolutionary product! After months of dedicated development and customer feedback, we're bringing innovation to your doorstep. #ProductLaunch #Innovation #Tech",
      improvements: ["Engaging emoji", "Emotional context", "Strategic hashtags"]
    },
    {
      original: "Looking for feedback on our service",
      enhanced: "📊 Your insights shape our future! We're on a mission to elevate our service quality and we'd love to hear your thoughts. Share your experience with us and be part of our improvement journey. #CustomerFeedback #Growth #ContinuousImprovement",
      improvements: ["Clear call-to-action", "Value proposition", "Community building"]
    },
    {
      original: "Check out our latest blog post",
      enhanced: "🎯 Unlock the Secrets of Digital Success: Our latest blog post reveals 5 game-changing strategies that transformed our clients' online presence. Dive in to discover actionable insights backed by real case studies. #DigitalStrategy #Success #BusinessGrowth",
      improvements: ["Benefit-focused", "Curiosity hook", "Social proof"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-light-lavender/30 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <div className="px-4 py-2 bg-electric-purple/10 rounded-full text-sm font-medium text-electric-purple inline-block mb-3">
            Before & After
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Transform Your Posts
          </h2>
          <p className="text-lg text-center mb-10 max-w-2xl mx-auto text-custom-text">
            See how our AI transforms basic posts into engaging content that drives real results
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-lg rounded-2xl transition-all duration-300 hover:shadow-xl">
              <div className="border-b border-gray-100 p-6">
                <h4 className="font-medium mb-3 text-electric-purple flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  Original Post
                </h4>
                <p className="text-custom-text p-4 bg-gray-50 rounded-lg text-sm">{post.original}</p>
              </div>
              
              <div className="border-b border-gray-100 p-6 bg-gradient-to-br from-white to-light-lavender/20">
                <h4 className="font-medium mb-3 text-bright-teal flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-bright-teal"></div>
                  Enhanced Version
                </h4>
                <p className="text-custom-text p-4 bg-white rounded-lg shadow-sm text-sm">{post.enhanced}</p>
              </div>
              
              <div className="p-6">
                <h4 className="font-medium mb-3">Key Improvements</h4>
                <div className="flex flex-wrap gap-2">
                  {post.improvements.map((improvement, i) => (
                    <Badge key={i} variant="outline" className="bg-electric-purple/5 border-electric-purple/20 text-electric-purple">
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
