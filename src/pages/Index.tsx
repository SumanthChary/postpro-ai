import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { LinkedinIcon, TwitterIcon, SparklesIcon, RocketIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const [post, setPost] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold gradient-text">ProfilePerfect AI</div>
          <div className="space-x-4">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Button>
            <Button className="bg-black hover:bg-black/90 text-white">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 tracking-tight">
            Transform Your{" "}
            <span className="gradient-text">Social Media Presence</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Enhance your LinkedIn & Twitter posts with AI magic. Create content that
            captivates and converts.
          </p>
        </div>

        {/* Main Card */}
        <Card className="max-w-2xl mx-auto p-6 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <SparklesIcon className="w-5 h-5 text-yellow-500" />
                <h2 className="text-lg font-semibold">Post Enhancer</h2>
              </div>
              <div className="flex space-x-2">
                <LinkedinIcon className="w-5 h-5 text-linkedin" />
                <TwitterIcon className="w-5 h-5 text-twitter" />
              </div>
            </div>
            
            <Textarea
              value={post}
              onChange={(e) => setPost(e.target.value)}
              placeholder="Paste your post here to enhance it with AI..."
              className="min-h-[200px] text-base resize-none rounded-xl border-gray-200 focus:border-gray-300 focus:ring-gray-200 transition-all duration-200"
            />
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" className="text-gray-600">
                Reset
              </Button>
              <Button className="bg-gradient-to-r from-linkedin to-twitter text-white hover:opacity-90">
                <RocketIcon className="w-4 h-4 mr-2" />
                Enhance Post
              </Button>
            </div>
          </div>
        </Card>

        {/* Tips Section */}
        <div className="max-w-2xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border-0 bg-white/70 backdrop-blur-sm hover:shadow-md transition-all duration-200">
            <LinkedinIcon className="w-8 h-8 text-linkedin mb-4" />
            <h3 className="text-lg font-semibold mb-2">LinkedIn Optimization</h3>
            <p className="text-gray-600">
              Perfect your professional presence with AI-enhanced posts that engage your network
            </p>
          </Card>
          <Card className="p-6 border-0 bg-white/70 backdrop-blur-sm hover:shadow-md transition-all duration-200">
            <TwitterIcon className="w-8 h-8 text-twitter mb-4" />
            <h3 className="text-lg font-semibold mb-2">Twitter Enhancement</h3>
            <p className="text-gray-600">
              Craft engaging tweets that capture attention and drive meaningful engagement
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;