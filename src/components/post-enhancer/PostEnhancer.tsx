
import { PostEnhancerProps } from "./types";
import { PostEnhancerLogic } from "./components/PostEnhancerLogic";
import { PaymentTrustBadges } from "./components/PaymentTrustBadges";

const PostEnhancer = ({
  post,
  setPost,
  category,
  setCategory,
  styleTone,
  setStyleTone,
}: PostEnhancerProps) => {
  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {/* Current Post Section */}
        <div className="glass-card card-shadow p-4 sm:p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Current Post</h3>
          <PostEnhancerLogic
            post={post}
            setPost={setPost}
            category={category}
            setCategory={setCategory}
            styleTone={styleTone}
            setStyleTone={setStyleTone}
            isCurrentPost={true}
          />
        </div>

        {/* AI Enhanced Section */}
        <div className="glass-card card-shadow p-4 sm:p-6 rounded-2xl flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">AI-Enhanced Version</h3>
            <div className="flex items-center space-x-1 text-green-500 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="hidden sm:inline">24 people enhancing posts right now</span>
              <span className="sm:hidden">Live</span>
            </div>
          </div>
          <PostEnhancerLogic
            post={post}
            setPost={setPost}
            category={category}
            setCategory={setCategory}
            styleTone={styleTone}
            setStyleTone={setStyleTone}
            isCurrentPost={false}
          />
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="mt-6 sm:mt-8 text-center">
        <button className="btn-gradient text-white font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-lg text-base sm:text-lg">
          ✨ ENHANCE MY POST FREE
        </button>
        <p className="text-xs text-gray-500 mt-3 sm:mt-4">Your content stays private and secure.</p>
      </div>

      <PaymentTrustBadges />
    </div>
  );
};

export default PostEnhancer;
