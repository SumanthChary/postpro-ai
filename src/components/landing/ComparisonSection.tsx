import { memo } from "react";
import { ThumbsUp, MessageCircle, Share, Heart } from "lucide-react";
import { ComponentComparisonSlider } from "@/components/ui/component-comparison-slider";

const BeforePost = memo(() => (
  <div className="w-full max-w-[280px] sm:max-w-sm bg-white rounded-lg shadow-md p-3 sm:p-4 scale-75 sm:scale-90 md:scale-100">
    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
      <img 
        alt="Profile picture of Sumanth Chary" 
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover" 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-J9p7Ki2rJ5nu8i-DjUIJruDAG5Z23A4jIRXnp9WxoUXgq24R4uNojkpjcsLqEZEpsjx-WtDslOMC5N15eBsm-rxIM5v7fCBdb6ipvVwkCe6vOX0IE8EszC2Lfo-NtmoKFod1cnge-BoSxI9AyPVIGEJnYCxhiUUuS27prrVqqtKfKdWAKsaAMobA0gGE8j2fNuMfWkeL-Rv9lVnkmMA9sPkFtzZzFOp5YOLGwmtoP4425urq2-WtYhjOPUAlH127stJWJSDNNUQ"
        loading="lazy"
      />
      <div className="flex flex-col">
        <p className="font-bold text-xs sm:text-sm text-black">Sumanth Chary</p>
        <p className="text-[10px] sm:text-xs text-gray-500">Entrepreneur</p>
      </div>
    </div>
    <p className="text-gray-800 mb-3 sm:mb-4 text-xs sm:text-sm">
      Growing your business can be challenging, but with the right strategies, it's possible. Here are a few tips to help you increase sales and expand your customer base.
    </p>
    <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500 mb-2 border-b border-gray-200 pb-2">
      <div className="flex items-center gap-1">
        <ThumbsUp className="h-3 w-3 text-blue-600" />
        <span>4 likes</span>
      </div>
      <span>1 comment</span>
    </div>
    <div className="grid grid-cols-3 gap-1">
      <button className="flex items-center justify-center gap-1 p-1.5 sm:p-2 rounded-lg text-gray-600 hover:bg-blue-50 transition-colors">
        <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="font-medium text-[10px] sm:text-xs">Like</span>
      </button>
      <button className="flex items-center justify-center gap-1 p-1.5 sm:p-2 rounded-lg text-gray-600 hover:bg-blue-50 transition-colors">
        <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="font-medium text-[10px] sm:text-xs">Comment</span>
      </button>
      <button className="flex items-center justify-center gap-1 p-1.5 sm:p-2 rounded-lg text-gray-600 hover:bg-blue-50 transition-colors">
        <Share className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="font-medium text-[10px] sm:text-xs">Share</span>
      </button>
    </div>
  </div>
));

BeforePost.displayName = "BeforePost";

const AfterPost = memo(() => (
  <div className="w-full max-w-[280px] sm:max-w-sm bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 scale-75 sm:scale-90 md:scale-100">
    <div className="p-3 sm:p-4">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBJ8XcWZmb2uq9UsausgHNxF6tctVumNOujqYWHtdELEJ_VDNz5Hs_eEo_efe2rVrjfFbIh5x4oriT-ZVz6F36Tt0Mu6Z1eUj825uHWBiqbanRyM4leqevJL20Ho-unsDT1s-MaDHrZ-FSyGvKD09zUVllgH8OqdMZL1AMJcAtt0ZFdPwpF-8ASwcs0hPI3UQWU6r1c5WIniWKc59X6vscA9y2SUZvYu67bKlFpDxipmI9Nilv5VesoiWKNwMG3kkz1JuW7afXtm3g")'}}></div>
        <div>
          <p className="text-xs sm:text-sm font-bold text-gray-800">Sumanth Chary</p>
          <p className="text-[10px] sm:text-xs text-gray-500">Entrepreneur</p>
        </div>
      </div>
      <div className="text-gray-800 space-y-1.5 sm:space-y-2">
        <p className="font-bold text-xs sm:text-sm">🚀 Boost Your Business!</p>
        <ul className="space-y-0.5 sm:space-y-1 text-[10px] sm:text-xs">
          <li className="flex items-center gap-1 sm:gap-2"><span className="text-blue-600">✓</span> Optimize your profile for maximum visibility.</li>
          <li className="flex items-center gap-1 sm:gap-2"><span className="text-blue-600">✓</span> Engage actively with your network.</li>
          <li className="flex items-center gap-1 sm:gap-2"><span className="text-blue-600">✓</span> Share valuable content consistently.</li>
          <li className="flex items-center gap-1 sm:gap-2"><span className="text-blue-600">✓</span> Leverage professional networking groups for targeted reach.</li>
          <li className="flex items-center gap-1 sm:gap-2"><span className="text-blue-600">✓</span> Use relevant hashtags to expand your audience.</li>
        </ul>
        <p className="text-blue-600 font-semibold pt-1.5 sm:pt-2 text-[10px] sm:text-xs">#ProfessionalNetworking #BusinessGrowth</p>
      </div>
    </div>
    <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 border-t border-gray-200 flex justify-around text-[10px] sm:text-xs">
      <div className="flex items-center gap-1 text-blue-600 font-bold">
        <Heart className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
        <span>1,847</span>
      </div>
      <div className="flex items-center gap-1 text-blue-600 font-bold">
        <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
        <span>423</span>
      </div>
      <div className="flex items-center gap-1 text-blue-600 font-bold">
        <Share className="h-3 w-3 sm:h-4 sm:w-4" />
        <span>156</span>
      </div>
    </div>
  </div>
));

AfterPost.displayName = "AfterPost";

const ComparisonSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 lg:mb-8 tracking-tight">
            Before vs After
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed px-2">
            See the dramatic difference AI enhancement makes to your social media posts
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="rounded-lg border overflow-hidden shadow-lg bg-gray-50 h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
            <ComponentComparisonSlider
              leftComponent={<BeforePost />}
              rightComponent={<AfterPost />}
              initialPosition={70}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
