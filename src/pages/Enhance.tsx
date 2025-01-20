import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { LinkedinIcon, TwitterIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Enhance = () => {
  const [post, setPost] = useState("");
  const [platform, setPlatform] = useState<"linkedin" | "twitter">("linkedin");
  const { toast } = useToast();

  const handleEnhance = () => {
    // This would connect to your AI enhancement service
    toast({
      title: "Enhancement in progress",
      description: "Your post is being enhanced by our AI.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Enhance Your Post</h1>
        
        <div className="max-w-2xl mx-auto">
          <Card className="p-6">
            <div className="flex gap-4 mb-6">
              <Button
                variant={platform === "linkedin" ? "default" : "outline"}
                className={platform === "linkedin" ? "bg-linkedin hover:bg-linkedin/90" : ""}
                onClick={() => setPlatform("linkedin")}
              >
                <LinkedinIcon className="w-5 h-5 mr-2" />
                LinkedIn
              </Button>
              <Button
                variant={platform === "twitter" ? "default" : "outline"}
                className={platform === "twitter" ? "bg-twitter hover:bg-twitter/90" : ""}
                onClick={() => setPlatform("twitter")}
              >
                <TwitterIcon className="w-5 h-5 mr-2" />
                Twitter
              </Button>
            </div>

            <Textarea
              placeholder="Enter your post here..."
              className="mb-6 min-h-[200px]"
              value={post}
              onChange={(e) => setPost(e.target.value)}
            />

            <div className="flex justify-end">
              <Button
                className="bg-linkedin hover:bg-linkedin/90"
                onClick={handleEnhance}
                disabled={!post.trim()}
              >
                Enhance Post
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Enhance;