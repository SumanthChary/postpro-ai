
import { PostEnhancerProps } from "./types";
import { PostEnhancerLogicWithLimits } from "./components/PostEnhancerLogicWithLimits";


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
        <PostEnhancerLogicWithLimits
          post={post}
          setPost={setPost}
          category={category}
          setCategory={setCategory}
          styleTone={styleTone}
          setStyleTone={setStyleTone}
        />
      </div>
    </div>
  );
};

export default PostEnhancer;
