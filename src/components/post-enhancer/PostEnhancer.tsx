
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LinkedinIcon, TwitterIcon, InstagramIcon, SparklesIcon, RocketIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PostEnhancerProps {
  post: string;
  setPost: (post: string) => void;
  category: string;
  setCategory: (category: string) => void;
}

const PostEnhancer = ({
  post,
  setPost,
  category,
  setCategory,
}: PostEnhancerProps) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [originalPost, setOriginalPost] = useState("");
  const [enhancedPosts, setEnhancedPosts] = useState<{
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  }>({});
  const { toast } = useToast();

  const handleEnhancePost = async () => {
    if (!post.trim()) {
      toast({
        title: "Empty Post",
        description: "Please enter some content to enhance",
        variant: "destructive",
      });
      return;
    }

    setIsEnhancing(true);
    setOriginalPost(post);

    try {
      console.log('Calling enhance-post function with:', { post, category });
      
      const { data, error } = await supabase.functions.invoke('enhance-post', {
        body: { post, category }
      });

      console.log('Response from enhance-post:', { data, error });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (!data?.platforms) {
        throw new Error('No enhanced posts received from the API');
      }

      setEnhancedPosts(data.platforms);
      toast({
        title: "Posts Enhanced!",
        description: "Your posts have been professionally enhanced for each platform",
      });
    } catch (error: any) {
      console.error('Error enhancing post:', error);
      toast({
        title: "Enhancement Failed",
        description: error.message || "There was an error enhancing your post. Please try again.",
        variant: "destructive",
      });
      setPost(originalPost);
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="max-w-2xl mx-auto p-6 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <SparklesIcon className="w-5 h-5 text-electric-purple" />
              <h2 className="text-lg font-montserrat font-extrabold text-custom-text">Professional Post Enhancer</h2>
            </div>
            <div className="flex space-x-3">
              <LinkedinIcon className="w-5 h-5 text-[#0077B5]" />
              <TwitterIcon className="w-5 h-5 text-[#1DA1F2]" />
              <InstagramIcon className="w-5 h-5 text-[#E4405F]" />
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
            placeholder="Paste your post here to enhance it with professional AI magic ✨"
            className="min-h-[200px] text-base font-opensans resize-none rounded-[10px] border-gray-200 focus:border-electric-purple focus:ring-electric-purple transition-all duration-200"
          />
          
          <div className="flex justify-end space-x-3">
            <Button 
              variant="outline" 
              className="text-custom-text border-electric-purple hover:bg-electric-purple/5 font-opensans"
              onClick={() => {
                setPost(originalPost || "");
                setOriginalPost("");
                setEnhancedPosts({});
              }}
              disabled={isEnhancing || !post}
            >
              Reset
            </Button>
            <Button 
              className="bg-gradient-to-r from-electric-purple to-bright-teal text-white hover:opacity-90 font-opensans group"
              onClick={handleEnhancePost}
              disabled={isEnhancing}
            >
              {isEnhancing ? (
                <>
                  <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                  Enhancing...
                </>
              ) : (
                <>
                  <RocketIcon className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-45" />
                  Enhance Post
                </>
              )}
            </Button>
          </div>

          {Object.keys(enhancedPosts).length > 0 && (
            <div className="mt-8">
              <Tabs defaultValue="linkedin" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="linkedin" className="flex items-center gap-2">
                    <LinkedinIcon className="w-4 h-4" />
                    LinkedIn
                  </TabsTrigger>
                  <TabsTrigger value="twitter" className="flex items-center gap-2">
                    <TwitterIcon className="w-4 h-4" />
                    Twitter
                  </TabsTrigger>
                  <TabsTrigger value="instagram" className="flex items-center gap-2">
                    <InstagramIcon className="w-4 h-4" />
                    Instagram
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="linkedin" className="mt-4">
                  <Textarea
                    value={enhancedPosts.linkedin}
                    readOnly
                    className="min-h-[150px] text-base"
                  />
                </TabsContent>
                <TabsContent value="twitter" className="mt-4">
                  <Textarea
                    value={enhancedPosts.twitter}
                    readOnly
                    className="min-h-[150px] text-base"
                  />
                </TabsContent>
                <TabsContent value="instagram" className="mt-4">
                  <Textarea
                    value={enhancedPosts.instagram}
                    readOnly
                    className="min-h-[150px] text-base"
                  />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PostEnhancer;
