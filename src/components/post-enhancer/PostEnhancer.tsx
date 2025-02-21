
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LinkedinIcon, TwitterIcon, InstagramIcon, SparklesIcon, RocketIcon } from "lucide-react";

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
    <Card className="max-w-2xl mx-auto p-6 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <SparklesIcon className="w-5 h-5 text-electric-purple" />
            <h2 className="text-lg font-montserrat font-extrabold text-custom-text">Post Enhancer</h2>
          </div>
          <div className="flex space-x-3">
            <LinkedinIcon className="w-5 h-5 text-electric-purple" />
            <TwitterIcon className="w-5 h-5 text-bright-teal" />
            <InstagramIcon className="w-5 h-5 text-coral-red" />
          </div>
        </div>

        <Select
          value={category}
          onValueChange={setCategory}
        >
          <SelectTrigger className="w-full mb-4">
            <SelectValue placeholder="Select post category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="business">Business & Entrepreneurship</SelectItem>
            <SelectItem value="technology">Technology & Innovation</SelectItem>
            <SelectItem value="lifestyle">Lifestyle & Personal Development</SelectItem>
            <SelectItem value="marketing">Marketing & Digital Media</SelectItem>
            <SelectItem value="creative">Creative & Design</SelectItem>
          </SelectContent>
        </Select>
        
        <Textarea
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder="Paste your post here to enhance it with trending hashtags..."
          className="min-h-[200px] text-base font-opensans resize-none rounded-[10px] border-gray-200 focus:border-electric-purple focus:ring-electric-purple transition-all duration-200"
        />
        
        <div className="flex justify-end space-x-3">
          <Button 
            variant="outline" 
            className="text-custom-text border-electric-purple hover:bg-electric-purple/5 font-opensans"
            onClick={() => setPost("")}
          >
            Reset
          </Button>
          <Button 
            className="bg-gradient-to-r from-electric-purple to-bright-teal text-white hover:opacity-90 font-opensans"
            onClick={handleEnhancePost}
          >
            <RocketIcon className="w-4 h-4 mr-2" />
            Enhance Post
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PostEnhancer;
