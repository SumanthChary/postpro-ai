
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { BoltIcon, WandIcon } from "lucide-react";
import { Twitter } from "lucide-react";

interface PostEnhancerProps {
  post: string;
  setPost: (post: string) => void;
  category: string;
  setCategory: (category: string) => void;
  handleEnhancePost: () => void;
  handlePostToTwitter: () => void;
}

const PostEnhancer = ({
  post,
  setPost,
  category,
  setCategory,
  handleEnhancePost,
  handlePostToTwitter,
}: PostEnhancerProps) => {
  return (
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
          <Button
            onClick={handlePostToTwitter}
            className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white"
          >
            <Twitter className="w-4 h-4 mr-2" />
            Post to Twitter
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PostEnhancer;
