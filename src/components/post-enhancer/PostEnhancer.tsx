
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
    <div className="space-y-8 w-full px-4 sm:px-0">
      <div className="max-w-4xl mx-auto">
        <PostEnhancerLogic
          post={post}
          setPost={setPost}
          category={category}
          setCategory={setCategory}
          styleTone={styleTone}
          setStyleTone={setStyleTone}
        />

        <PaymentTrustBadges />
      </div>
    </div>
  );
};

export default PostEnhancer;
