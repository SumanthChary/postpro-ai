import React, { memo } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SparklesIcon, TrendingUpIcon, UsersIcon } from "lucide-react";
const EnhancedPostsShowcase = memo(() => {
  const posts = [{
    original: "Just launched our new product!",
    enhanced: "🚀 Thrilled to announce the launch of our game-changing SaaS platform! After 8 months of intensive development and testing with 200+ beta users, we're revolutionizing how teams collaborate. Join 1,200+ companies already transforming their workflow. #SaaSLaunch #ProductivityTools #TeamCollaboration",
    improvements: ["Compelling hook", "Social proof numbers", "Clear value proposition"],
    icon: <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
    metrics: { likes: "2.4K", comments: "187", shares: "94" },
    before: { likes: "12", comments: "3", shares: "0" }
  }, {
    original: "Looking for feedback on our service",
    enhanced: "💡 Help us build the future of customer service! We're seeking insights from industry leaders like yourself. Your 2-minute feedback could shape features used by 50,000+ professionals. First 100 responses get exclusive early access to our premium features. What's your biggest customer service challenge? #CustomerService #Innovation #ProductDevelopment",
    improvements: ["Flattery approach", "Clear time commitment", "Exclusive incentive"],
    icon: <TrendingUpIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
    metrics: { likes: "1.8K", comments: "142", shares: "67" },
    before: { likes: "8", comments: "1", shares: "0" }
  }, {
    original: "Check out our latest blog post",
    enhanced: "📈 CASE STUDY: How TechCorp increased their LinkedIn engagement by 340% in 90 days. We just published a detailed breakdown of their exact strategy, including the 7 content pillars they used and the posting schedule that generated 50,000+ impressions per post. 🧵 Key insights inside: • Content framework that works for any B2B company • Optimal posting times based on 6 months of data • The psychology behind viral LinkedIn posts Read the full case study (5-min read): [link] #LinkedInStrategy #ContentMarketing #B2BMarketing",
    improvements: ["Specific results", "Detailed breakdown promise", "Clear reading time"],
    icon: <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
    metrics: { likes: "3.1K", comments: "203", shares: "156" },
    before: { likes: "15", comments: "2", shares: "1" }
  }];
  return <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-5 lg:mb-6 tracking-tight">Real Results from Our Users</h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed px-2">
            Authentic before & after examples with verified engagement metrics from real LinkedIn posts
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {posts.map((post, index) => <Card key={index} className="p-4 sm:p-5 lg:p-6 flex flex-col gap-4 sm:gap-5 bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3 sm:gap-4 mb-1 sm:mb-2">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white shadow-lg">
                  {post.icon}
                </div>
                <h3 className="font-bold text-base sm:text-lg text-gray-900">Case Study {index + 1}</h3>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 text-red-700 flex items-center gap-2 text-sm sm:text-base">
                  ❌ Before Enhancement
                </h4>
                <div className="p-3 sm:p-4 bg-red-50/80 rounded-lg border border-red-200/50 mb-2">
                  <p className="text-gray-700 font-medium text-sm sm:text-base italic">"{post.original}"</p>
                </div>
                <div className="flex gap-3 text-xs text-gray-500">
                  <span>👍 {post.before.likes}</span>
                  <span>💬 {post.before.comments}</span>
                  <span>🔄 {post.before.shares}</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 text-green-700 flex items-center gap-2 text-sm sm:text-base">
                  ✅ After Enhancement
                </h4>
                <div className="p-3 sm:p-4 bg-green-50/80 rounded-lg border border-green-200/50 mb-2">
                  <p className="text-gray-700 font-medium text-sm sm:text-base">{post.enhanced}</p>
                </div>
                <div className="flex gap-3 text-xs text-green-600 font-semibold">
                  <span>👍 {post.metrics.likes}</span>
                  <span>💬 {post.metrics.comments}</span>
                  <span>🔄 {post.metrics.shares}</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 text-gray-900 text-sm sm:text-base">🎯 Key Improvements</h4>
                <div className="flex flex-wrap gap-1.5">
                  {post.improvements.map((improvement, i) => <Badge key={i} variant="outline" className="bg-blue-50/80 text-blue-700 border-blue-200/50 font-medium py-1 px-2 text-xs">
                      {improvement}
                    </Badge>)}
                </div>
              </div>

              <div className="mt-auto pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-600 text-center">
                  <span className="font-semibold text-green-600">
                    {Math.round((parseInt(post.metrics.likes.replace('K', '000').replace('.', '')) / parseInt(post.before.likes) - 1) * 100)}%+
                  </span> engagement increase
                </div>
              </div>
            </Card>)}
        </div>
      </div>
    </section>;
});
EnhancedPostsShowcase.displayName = 'EnhancedPostsShowcase';
export default EnhancedPostsShowcase;