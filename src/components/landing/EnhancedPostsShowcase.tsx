
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
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-center mb-8">
          Transform Your Posts
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Card key={index} className="p-6 flex flex-col gap-4">
              <div>
                <h4 className="font-semibold mb-2 text-electric-purple">Original Post</h4>
                <p className="text-custom-text p-3 bg-gray-100 rounded-lg">{post.original}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-bright-teal">Enhanced Version</h4>
                <p className="text-custom-text p-3 bg-light-lavender rounded-lg">{post.enhanced}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Improvements</h4>
                <div className="flex flex-wrap gap-2">
                  {post.improvements.map((improvement, i) => (
                    <Badge key={i} variant="outline" className="bg-white">
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
