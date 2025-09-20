
import { ThumbsUp, MessageCircle, Share, Heart } from "lucide-react";

const BeforePost = () => (
  <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center gap-3 mb-4">
      <img 
        alt="Profile picture of Sumanth Chary" 
        className="w-14 h-14 rounded-full object-cover" 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-J9p7Ki2rJ5nu8i-DjUIJruDAG5Z23A4jIRXnp9WxoUXgq24R4uNojkpjcsLqEZEpsjx-WtDslOMC5N15eBsm-rxIM5v7fCBdb6ipvVwkCe6vOX0IE8EszC2Lfo-NtmoKFod1cnge-BoSxI9AyPVIGEJnYCxhiUUuS27prrVqqtKfKdWAKsaAMobA0gGE8j2fNuMfWkeL-Rv9lVnkmMA9sPkFtzZzFOp5YOLGwmtoP4425urq2-WtYhjOPUAlH127stJWJSDNNUQ"
      />
      <div className="flex flex-col">
        <p className="font-bold text-lg text-black">Sumanth Chary</p>
        <p className="text-sm text-gray-500">Entrepreneur</p>
      </div>
    </div>
    <p className="text-gray-800 mb-4">
      Growing your business can be challenging, but with the right strategies, it's possible. Here are a few tips to help you increase sales and expand your customer base.
    </p>
    <div className="flex items-center justify-between text-sm text-gray-500 mb-2 border-b border-gray-200 pb-2">
      <div className="flex items-center gap-1">
        <ThumbsUp className="h-4 w-4 text-blue-600" />
        <span>4 likes</span>
      </div>
      <span>1 comment</span>
    </div>
    <div className="grid grid-cols-3 gap-2">
      <button className="flex items-center justify-center gap-2 p-2 rounded-lg text-gray-600 hover:bg-blue-50 transition-colors">
        <ThumbsUp className="h-5 w-5" />
        <span className="font-medium text-sm">Like</span>
      </button>
      <button className="flex items-center justify-center gap-2 p-2 rounded-lg text-gray-600 hover:bg-blue-50 transition-colors">
        <MessageCircle className="h-5 w-5" />
        <span className="font-medium text-sm">Comment</span>
      </button>
      <button className="flex items-center justify-center gap-2 p-2 rounded-lg text-gray-600 hover:bg-blue-50 transition-colors">
        <Share className="h-5 w-5" />
        <span className="font-medium text-sm">Share</span>
      </button>
    </div>
  </div>
);

const AfterPost = () => (
  <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBJ8XcWZmb2uq9UsausgHNxF6tctVumNOujqYWHtdELEJ_VDNz5Hs_eEo_efe2rVrjfFbIh5x4oriT-ZVz6F36Tt0Mu6Z1eUj825uHWBiqbanRyM4leqevJL20Ho-unsDT1s-MaDHrZ-FSyGvKD09zUVllgH8OqdMZL1AMJcAtt0ZFdPwpF-8ASwcs0hPI3UQWU6r1c5WIniWKc59X6vscA9y2SUZvYu67bKlFpDxipmI9Nilv5VesoiWKNwMG3kkz1JuW7afXtm3g")'}}></div>
        <div>
          <p className="text-xl font-bold text-gray-800">Sumanth Chary</p>
          <p className="text-sm text-gray-500">Entrepreneur</p>
        </div>
      </div>
      <div className="text-gray-800 space-y-3">
        <p className="font-bold text-lg">🚀 Boost Your Business!</p>
        <ul className="space-y-2">
          <li className="flex items-center gap-2"><span className="text-blue-600">✓</span> Optimize your profile for maximum visibility.</li>
          <li className="flex items-center gap-2"><span className="text-blue-600">✓</span> Engage actively with your network.</li>
          <li className="flex items-center gap-2"><span className="text-blue-600">✓</span> Share valuable content consistently.</li>
          <li className="flex items-center gap-2"><span className="text-blue-600">✓</span> Leverage professional networking groups for targeted reach.</li>
          <li className="flex items-center gap-2"><span className="text-blue-600">✓</span> Use relevant hashtags to expand your audience.</li>
        </ul>
        <p className="text-blue-600 font-semibold pt-2">#ProfessionalNetworking #BusinessGrowth</p>
      </div>
    </div>
    <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-around">
      <div className="flex items-center gap-2 text-blue-600 font-bold">
        <Heart className="h-5 w-5 fill-current" />
        <span>1,847</span>
      </div>
      <div className="flex items-center gap-2 text-blue-600 font-bold">
        <MessageCircle className="h-5 w-5" />
        <span>423</span>
      </div>
      <div className="flex items-center gap-2 text-blue-600 font-bold">
        <Share className="h-5 w-5" />
        <span>156</span>
      </div>
    </div>
  </div>
);

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
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="space-y-4">
              <div className="text-center lg:text-left">
                <span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-4">
                  Before: Basic Post
                </span>
              </div>
              <div className="flex justify-center lg:justify-start">
                <BeforePost />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="text-center lg:text-left">
                <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                  After: AI Enhanced
                </span>
              </div>
              <div className="flex justify-center lg:justify-start">
                <AfterPost />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
