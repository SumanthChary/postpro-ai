import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Enhance = () => {
  const [content, setContent] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const { toast } = useToast();

  const handleEnhance = async () => {
    if (!content.trim()) {
      toast({
        title: "Please enter some content",
        description: "Your post content cannot be empty",
        variant: "destructive",
      });
      return;
    }

    setIsEnhancing(true);
    // Simulate API call
    setTimeout(() => {
      setIsEnhancing(false);
      toast({
        title: "Post Enhanced!",
        description: "Your post has been professionally enhanced.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-linkedin to-twitter bg-clip-text text-transparent">
            Enhance Your Post
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transform your content into engaging posts that capture attention and drive engagement
          </p>
        </div>

        {/* Main Content */}
        <Card className="p-6 shadow-lg bg-white/80 backdrop-blur-sm border border-gray-100">
          <div className="space-y-4">
            <Textarea
              placeholder="Paste your post content here..."
              className="min-h-[200px] text-lg p-4 rounded-[10px] border-gray-200 focus:border-linkedin focus:ring-linkedin resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="flex justify-end">
              <Button
                size="lg"
                className="bg-linkedin hover:bg-linkedin/90 text-white font-medium px-8"
                onClick={handleEnhance}
                disabled={isEnhancing}
              >
                {isEnhancing ? (
                  "Enhancing..."
                ) : (
                  <>
                    <Wand2 className="mr-2 h-5 w-5" />
                    Enhance Post
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Tips Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-4 bg-white/60 backdrop-blur-sm hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-800 mb-2">Professional Tone</h3>
            <p className="text-gray-600 text-sm">
              Perfect for LinkedIn's professional audience
            </p>
          </Card>
          <Card className="p-4 bg-white/60 backdrop-blur-sm hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-800 mb-2">Engagement Boost</h3>
            <p className="text-gray-600 text-sm">
              Optimized for maximum reach and interaction
            </p>
          </Card>
          <Card className="p-4 bg-white/60 backdrop-blur-sm hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-800 mb-2">AI-Powered</h3>
            <p className="text-gray-600 text-sm">
              Smart suggestions based on platform trends
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Enhance;