import React, { memo } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SparklesIcon, TrendingUpIcon, UsersIcon } from "lucide-react";
const EnhancedPostsShowcase = memo(() => {
  const posts = [{
    original: "Leadership is about giving orders and making tough decisions.",
    enhanced: "In today's fast-paced business environment, effective leadership is more crucial than ever. It's not just about giving orders; it's about inspiring and empowering your team to achieve common goals.\n\nA great leader fosters a culture of trust, open communication, and continuous learning. They lead by example, demonstrating integrity and resilience in the face of challenges. Remember, leadership is a journey, not a destination. Keep refining your skills, stay adaptable, and always prioritize the growth and well-being of your team.\n\n#Leadership #Management #Teamwork #BusinessStrategy",
    improvements: ["Storytelling approach", "Actionable insights", "Professional hashtags"],
    icon: <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
    author: "David Kim",
    role: "V.P. of Strategy",
    likes: "2,156",
    comments: "389",
    shares: "145"
  }, {
    original: "Here are some productivity tips that might help you.",
    enhanced: "Feeling overwhelmed? 🤯 Let's turn that chaos into clarity! Here are my go-to productivity tips to help you conquer your week:\n\n✨ Prioritize with the Eisenhower Matrix: Focus on what's truly important, not just what's urgent.\n⏰ Time-blocking for deep work: Schedule your focus time like you schedule meetings. No interruptions!\n🔴 Embrace the Pomodoro Technique: 25 minutes of focus, 5 minutes of break. Repeat. It's a game-changer.\n📁 Batch similar tasks: Answer all your emails at once. Make all your calls in one block. Efficiency is key!\n📖 Daily review & plan: End your day by planning the next. Wake up with a clear purpose.\n\nWhat are your favorite productivity hacks? Share them below! 👇 #Productivity #WorkSmarter #TimeManagement",
    improvements: ["Engaging emoji usage", "Structured bullet points", "Call-to-action"],
    icon: <TrendingUpIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
    author: "Jennifer Walsh",
    role: "Productivity Coach",
    likes: "1,934",
    comments: "234",
    shares: "87"
  }, {
    original: "Marketing strategy is important for business success.",
    enhanced: "Unlock the power of strategic marketing! In today's competitive landscape, a well-defined marketing strategy is crucial for success. Here's a breakdown of key elements:\n\n1. Target Audience: Identify and understand your ideal customer. What are their needs, pain points, and preferences?\n2. Value Proposition: Clearly articulate what makes your product or service unique and valuable.\n3. Channels: Select the most effective channels to reach your audience - social media, email, content marketing, or paid ads.\n4. Content Strategy: Develop a content calendar that aligns with your marketing goals and provides value.\n5. Measurement: Track key metrics to evaluate effectiveness and make data-driven decisions.\n\n#marketingstrategy #digitalmarketing #businessgrowth #marketingtips",
    improvements: ["Structured format", "Educational value", "Clear takeaways"],
    icon: <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
    author: "Michael Rodriguez",
    role: "Marketing Strategist", 
    likes: "3,291",
    comments: "678",
    shares: "189"
  }, {
    original: "Business growth requires good strategies.",
    enhanced: "🚀 Unlocking Exponential Business Growth\n\nIn today's dynamic market, sustainable growth isn't just about incremental improvements; it's about achieving exponential leaps. Here are key strategies:\n\n✅ Strategic Partnerships: Collaborate with complementary businesses to expand your reach.\n✅ Customer-Centric Innovation: Continuously refine offerings based on feedback and emerging needs.\n✅ Data-Driven Decisions: Leverage analytics to identify growth opportunities.\n✅ Agile Adaptation: Embrace flexibility and adapt quickly to market shifts.\n✅ Talent Development: Invest in your team's growth and empower them to drive innovation.\n\nLet's connect and discuss how we can elevate your business to new heights!\n\n#businessgrowth #strategy #innovation #leadership",
    improvements: ["Visual formatting", "Strategic insights", "Professional networking"],
    icon: <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
    author: "Sarah Chen", 
    role: "Growth Strategist",
    likes: "2,847",
    comments: "456", 
    shares: "123"
  }];
  return <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 lg:mb-8 tracking-tight">More Enhancements People did</h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed px-2">
            Real engagement outcomes before and after enhancement
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {posts.map((post, index) => <Card key={index} className="p-4 sm:p-5 lg:p-6 xl:p-8 flex flex-col gap-4 sm:gap-5 lg:gap-6 bg-white/80 backdrop-blur-sm shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300">
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
                <p className="text-gray-700 p-3 sm:p-4 lg:p-5 bg-green-50/80 rounded-xl border border-green-200/50 font-medium text-sm sm:text-base whitespace-pre-line">{post.enhanced}</p>
                <div className="flex gap-4 text-xs text-gray-600 mt-2">
                  <span>👍 {post.likes}</span>
                  <span>💬 {post.comments}</span>
                  <span>🔄 {post.shares}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  By {post.author} • {post.role}
                </div>
              </div>
              
              <div>
                <h4 className="font-bold mb-3 sm:mb-4 text-gray-900 text-sm sm:text-base lg:text-lg">Key Improvements</h4>
                <div className="flex flex-wrap gap-2">
                  {post.improvements.map((improvement, i) => <Badge key={i} variant="outline" className="bg-blue-50/80 text-blue-700 border-blue-200/50 font-medium py-1 px-2 sm:px-3 text-xs sm:text-sm">
                      {improvement}
                    </Badge>)}
                </div>
              </div>
            </Card>)}
        </div>
      </div>
    </section>;
});
EnhancedPostsShowcase.displayName = 'EnhancedPostsShowcase';
export default EnhancedPostsShowcase;