import React, { memo } from 'react';
import { ThumbsUp, MessageCircle, Share, Send, MoreHorizontal } from "lucide-react";

const LinkedInPost = ({ author, role, timeAgo, content, hashtags, likes, comments, shares, avatar }: any) => (
  <div className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
    <div className="p-3 sm:p-4 flex items-start space-x-3">
      <img 
        alt={`${author}'s profile picture`} 
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0" 
        src={avatar}
      />
      <div className="flex-grow min-w-0">
        <p className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white truncate">{author}</p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 truncate">{role}</p>
        <p className="text-xs text-slate-500 dark:text-slate-500">{timeAgo} • 🌍</p>
      </div>
      <button className="text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full p-1.5 flex-shrink-0">
        <MoreHorizontal className="w-5 h-5" />
      </button>
    </div>
    
    <div className="px-3 sm:px-4 pb-3">
      <div className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
        {content}
      </div>
      
      <div className="flex flex-wrap gap-1 sm:gap-2 mt-3">
        {hashtags.map((tag: string, i: number) => (
          <span key={i} className="text-blue-600 dark:text-blue-400 font-medium text-sm">
            #{tag}
          </span>
        ))}
      </div>
    </div>
    
    <div className="px-3 sm:px-4 py-2 flex justify-between items-center text-xs sm:text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700">
      <div className="flex items-center space-x-1">
        <div className="flex -space-x-0.5">
          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
            <ThumbsUp className="w-2.5 h-2.5 text-white fill-current" />
          </div>
          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">👏</span>
          </div>
        </div>
        <span className="ml-1">{likes}</span>
      </div>
      <div className="flex space-x-3 sm:space-x-4">
        <span>{comments} comments</span>
        <span>{shares} shares</span>
      </div>
    </div>
    
    <div className="border-t border-slate-100 dark:border-slate-700">
      <div className="grid grid-cols-4 text-slate-600 dark:text-slate-300">
        <button className="flex items-center justify-center space-x-1 sm:space-x-2 py-2 sm:py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          <ThumbsUp className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm font-medium">Like</span>
        </button>
        <button className="flex items-center justify-center space-x-1 sm:space-x-2 py-2 sm:py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm font-medium">Comment</span>
        </button>
        <button className="flex items-center justify-center space-x-1 sm:space-x-2 py-2 sm:py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          <Share className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm font-medium">Share</span>
        </button>
        <button className="flex items-center justify-center space-x-1 sm:space-x-2 py-2 sm:py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm font-medium">Send</span>
        </button>
      </div>
    </div>
  </div>
);

const EnhancedPostsShowcase = memo(() => {
  const posts = [
    {
      author: "David Kim",
      role: "Leadership Insights | V.P. of Strategy", 
      timeAgo: "2w",
      content: `In today's fast-paced business environment, effective leadership is more crucial than ever. It's not just about giving orders; it's about inspiring and empowering your team to achieve common goals.

A great leader fosters a culture of trust, open communication, and continuous learning. They lead by example, demonstrating integrity and resilience in the face of challenges. Remember, leadership is a journey, not a destination. Keep refining your skills, stay adaptable, and always prioritize the growth and well-being of your team.`,
      hashtags: ["Leadership", "Management", "Teamwork", "BusinessStrategy"],
      likes: "2,156",
      comments: "389",
      shares: "145", 
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOINDmym_TcaVDB9tap33yXOH9C7QI9WJ-bPjYxeHaiDJDeMxgK86JdJkRl6HGd17t0cJomABlVEActy0G6OC1570aqB8H3z2IKN1_LL3zTI9Qa-zD1AaPRkUV616OyElhv3QkJJdNZl5Ws04ZGleql-JeHP-475GBAav3YMkLTm75dFPf1sUherQvqzhXZmaNpQz7oXLFhsA7_DutiblpIfgg5sPFAhaDmWvhSjk-lsqAuYo9YDUKOCoPjD_LjPGsLCrE0WXmI5-q"
    },
    {
      author: "Jennifer Walsh",
      role: "Productivity Coach",
      timeAgo: "1w", 
      content: `Feeling overwhelmed? 🤯 Let's turn that chaos into clarity! Here are my go-to productivity tips to help you conquer your week:

✨ Prioritize with the Eisenhower Matrix: Focus on what's truly important, not just what's urgent.
⏰ Time-blocking for deep work: Schedule your focus time like you schedule meetings. No interruptions!
🔴 Embrace the Pomodoro Technique: 25 minutes of focus, 5 minutes of break. Repeat. It's a game-changer.
📁 Batch similar tasks: Answer all your emails at once. Make all your calls in one block. Efficiency is key!
📖 Daily review & plan: End your day by planning the next. Wake up with a clear purpose.

What are your favorite productivity hacks? Share them below! 👇`,
      hashtags: ["Productivity", "WorkSmarter", "TimeManagement"],
      likes: "1,934", 
      comments: "234",
      shares: "87",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTdiq7OvYqPJAFER4eoT4UaNvflgzWlrzd72-DDzENSOYCi-rlofYkNrec2SuuKckYftsHikgtHuDKu6eF50_JvWW9OMvcisW7UgwNPHVhbOG_Ce-TBIf9gfOJtbigZcuhicedSb3fMFU5hf6UQPvfe6_xB6qhKtfIW5qkbJkz_SoKC3mOqR-zNlfTCvGEFTrzvZ4wXtotCLCNLL_JVfQqgtu5eWWuC7XxzQA5ByRFaDBbwgCWQl8GDQfXLwm0lXg87XU7_RMsFmLw"
    },
    {
      author: "Michael Rodriguez", 
      role: "Marketing Strategist",
      timeAgo: "3d",
      content: `Unlock the power of strategic marketing! In today's competitive landscape, a well-defined marketing strategy is crucial for success. Here's a breakdown of key elements to consider:

1. Target Audience: Identify and understand your ideal customer. What are their needs, pain points, and preferences?

2. Value Proposition: Clearly articulate what makes your product or service unique and valuable to your target audience.

3. Channels: Select the most effective channels to reach your audience, whether it's social media, email marketing, content marketing, or paid advertising.

4. Content Strategy: Develop a content calendar that aligns with your marketing goals and provides value to your audience.

5. Measurement: Track key metrics to evaluate the effectiveness of your marketing efforts and make data-driven decisions.`,
      hashtags: ["marketingstrategy", "digitalmarketing", "businessgrowth", "marketingtips"],
      likes: "3,291",
      comments: "678", 
      shares: "189",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCj3zgG8Gy0M-muPpoF2MqWO7a1qB4Ez9I6UP2XZIF_kc-Nm-uI2vo-GkrbQ40hdjcRnnMzavBDenv1narhORWBaeKnpODrKLkrzWM86SScPqU2afABxjxnUqeWHqMtYqa91mLyGVZCmVnWgJXXlAdvXL1ACptAtD-eJgWgzHxK0GWZzKb3uNRORvrF-53l7oDD4aGflS19nPQAmHjoVxx2UagHrqkQK1q5UDHKQcJDeFbvoz9VcT2U-w6SgXjKbgL_ZeL5qJefCu4"
    },
    {
      author: "Sarah Chen",
      role: "Growth Strategist | Helping businesses scale", 
      timeAgo: "2d",
      content: `🚀 Unlocking Exponential Business Growth

In today's dynamic market, sustainable growth isn't just about incremental improvements; it's about achieving exponential leaps. Here are some key strategies to propel your business forward:

✅ Strategic Partnerships: Collaborate with complementary businesses to expand your reach and tap into new markets.
✅ Customer-Centric Innovation: Continuously refine your offerings based on customer feedback and emerging needs.  
✅ Data-Driven Decisions: Leverage analytics to identify growth opportunities and optimize your strategies.
✅ Agile Adaptation: Embrace flexibility and adapt quickly to market shifts and evolving customer preferences.
✅ Talent Development: Invest in your team's growth and empower them to drive innovation and excellence.

Let's connect and discuss how we can elevate your business to new heights!`,
      hashtags: ["businessgrowth", "strategy", "innovation", "leadership"],
      likes: "2,847",
      comments: "456", 
      shares: "123",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtXpLekhUePD8bFzV4UhLyOpnUUGIZPBjjeMQLcHjK50swNzdEz90AgWanC6meQPDGozJm9IvAt78G8oxO_K4xSHqS3umNA-ZwVVozhkeBZu4V2cuUOx-5oCilmjXoIPaa381wcPzveElHE60PSOzHZ9GNFsBlUQfssuuX6QXdcE1mtdL-Uv2VdH_X_b4XOrgKyhdkYQzR3mf-PKNBouPSX8oFVqpg86vuwcFycdrvvCfXDCPCtzhGPrh_eQrhrlrDrRCwm1fseBE"
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 lg:mb-8 tracking-tight">
            More Enhancements People Did
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed px-2">
            Real engagement outcomes before and after enhancement
          </p>
        </div>
        
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto">
          {posts.map((post, index) => (
            <LinkedInPost key={index} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
});
EnhancedPostsShowcase.displayName = 'EnhancedPostsShowcase';
export default EnhancedPostsShowcase;