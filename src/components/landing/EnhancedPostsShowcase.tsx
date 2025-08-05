
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SparklesIcon, TrendingUpIcon, UsersIcon } from "lucide-react";

const EnhancedPostsShowcase = () => {
  const posts = [
    {
      original: "I got promoted at work",
      enhanced: "🎉 BREAKING: Just secured the promotion I've been working towards for 2 years! From countless late nights to learning new skills, every step was worth it. To everyone grinding - your breakthrough is coming! 💪 #CareerGrowth #Promotion #NeverGiveUp #WorkHard #Success #Motivation",
      improvements: ["Emotional storytelling", "Personal journey", "Inspirational CTA", "Premium hashtag strategy"],
      icon: <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
    },
    {
      original: "Had coffee with a client today",
      enhanced: "☕ Game-changing client meeting today! What started as a simple coffee chat turned into a $50K partnership discussion. Sometimes the best deals happen outside the boardroom. Key lesson: Relationships before revenue, always. #ClientMeeting #BusinessDevelopment #Networking #SalesStrategy #EntrepreneurLife",
      improvements: ["Revenue hook", "Story arc", "Value-driven insight", "Multiple engagement angles"],
      icon: <TrendingUpIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
    },
    {
      original: "Attended a conference yesterday",
      enhanced: "🚀 Mind = BLOWN at yesterday's tech conference! Met 3 industry leaders, discovered 5 game-changing tools, and sparked 2 potential collaborations. ROI on one day: Priceless. Who else believes in the power of showing up? Drop your best conference insights below! 👇 #TechConference #Networking #Innovation #ROI #ShowUp",
      improvements: ["Specific metrics", "Community engagement", "Direct CTA", "FOMO creation"],
      icon: <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 lg:mb-8 tracking-tight">
            Worth Every Premium Credit
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed px-2">
            Real transformations using our 10-credit premium AI enhancement system. Each post becomes a viral masterpiece.
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
};

export default EnhancedPostsShowcase;
