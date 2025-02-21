
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { WandIcon } from "lucide-react";

interface PostEnhancerProps {
  post: string;
  setPost: (post: string) => void;
  category: string;
  setCategory: (category: string) => void;
  handleEnhancePost: () => void;
}

const PostEnhancer = ({
  post,
  setPost,
  category,
  setCategory,
  handleEnhancePost,
}: PostEnhancerProps) => {
  return (
    <>
      <Card className="p-6 mb-12">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setCategory("business")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === "business"
                  ? "bg-electric-purple text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Business
            </button>
            <button
              onClick={() => setCategory("tech")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === "tech"
                  ? "bg-electric-purple text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Tech
            </button>
            <button
              onClick={() => setCategory("marketing")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === "marketing"
                  ? "bg-electric-purple text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Marketing
            </button>
          </div>

          <Textarea
            placeholder="Write your post here..."
            className="min-h-[200px] text-lg p-4"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />

          <div className="flex flex-wrap gap-4">
            <Button
              onClick={handleEnhancePost}
              className="bg-electric-purple hover:bg-electric-purple/90 text-white"
            >
              <WandIcon className="w-4 h-4 mr-2" />
              Enhance Post
            </Button>
          </div>
        </div>
      </Card>

      <div className="max-w-2xl mx-auto mt-16 mb-8">
        <div className="bg-gradient-to-r from-electric-purple/10 to-bright-teal/10 rounded-lg p-6 text-center border border-electric-purple/20">
          <h3 className="text-xl font-montserrat font-bold mb-2 bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">
            Coming Soon
          </h3>
          <p className="text-custom-text font-opensans">
            Direct posting to LinkedIn, Twitter, Instagram and other platforms will be available soon!
          </p>
        </div>
      </div>
    </>
  );
};

export default PostEnhancer;
