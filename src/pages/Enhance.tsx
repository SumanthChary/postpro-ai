
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Wand2, Lightbulb, ArrowRight, Zap, Award } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";

const Enhance = () => {
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("business");

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-light-lavender py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Header Section */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="inline-flex items-center justify-center mb-2">
            <Sparkles className="w-6 h-6 mr-2 text-electric-purple animate-pulse" />
            <span className="text-sm font-semibold text-electric-purple">AI-POWERED</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight">
            <span className="bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">
              Enhance Your Content
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transform your ideas into captivating posts that will engage your audience and boost your online presence
          </p>
        </div>

        {/* Main Content - Post Enhancer Component */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-electric-purple to-bright-teal rounded-xl blur opacity-30"></div>
          <PostEnhancer 
            post={post}
            setPost={setPost}
            category={category}
            setCategory={setCategory}
          />
        </div>

        {/* Features Grid Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card className="p-6 bg-white/80 backdrop-blur-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="rounded-full bg-light-lavender/50 w-12 h-12 flex items-center justify-center mb-4">
              <Wand2 className="w-6 h-6 text-electric-purple" />
            </div>
            <h3 className="font-semibold text-gray-800 text-lg mb-2">Smart Enhancement</h3>
            <p className="text-gray-600 text-sm">
              Our AI analyzes your content and enhances it with professional language and structure
            </p>
          </Card>
          
          <Card className="p-6 bg-white/80 backdrop-blur-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="rounded-full bg-light-lavender/50 w-12 h-12 flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6 text-electric-purple" />
            </div>
            <h3 className="font-semibold text-gray-800 text-lg mb-2">Platform Optimized</h3>
            <p className="text-gray-600 text-sm">
              Tailored content for LinkedIn, Twitter, and Instagram to maximize engagement
            </p>
          </Card>
          
          <Card className="p-6 bg-white/80 backdrop-blur-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="rounded-full bg-light-lavender/50 w-12 h-12 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-electric-purple" />
            </div>
            <h3 className="font-semibold text-gray-800 text-lg mb-2">Instant Results</h3>
            <p className="text-gray-600 text-sm">
              Get professional-grade content in seconds, ready to publish and engage your audience
            </p>
          </Card>
        </div>

        {/* How it Works Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">How It Works</h2>
            <p className="text-gray-600">Three simple steps to enhance your content</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 mt-6">
            <div className="flex-1 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-electric-purple flex items-center justify-center text-white font-bold mb-4">1</div>
              <h3 className="font-semibold mb-2">Paste Your Content</h3>
              <p className="text-sm text-gray-600">Add your rough draft or ideas into the editor</p>
            </div>
            
            <div className="hidden md:block w-8 self-center">
              <ArrowRight className="w-6 h-6 text-gray-400" />
            </div>
            
            <div className="flex-1 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-electric-purple flex items-center justify-center text-white font-bold mb-4">2</div>
              <h3 className="font-semibold mb-2">Choose Category</h3>
              <p className="text-sm text-gray-600">Select the type of content you want to create</p>
            </div>
            
            <div className="hidden md:block w-8 self-center">
              <ArrowRight className="w-6 h-6 text-gray-400" />
            </div>
            
            <div className="flex-1 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-electric-purple flex items-center justify-center text-white font-bold mb-4">3</div>
              <h3 className="font-semibold mb-2">Enhance</h3>
              <p className="text-sm text-gray-600">Our AI transforms your content into engaging posts</p>
            </div>
          </div>
        </div>

        {/* Trust Section */}
        <div className="text-center py-8 space-y-6">
          <div className="flex items-center justify-center">
            <Award className="w-6 h-6 mr-2 text-electric-purple" />
            <h2 className="text-2xl font-bold">Trusted by content creators</h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            <img src="/placeholder.svg" alt="Company Logo" className="h-8" />
            <img src="/placeholder.svg" alt="Company Logo" className="h-8" />
            <img src="/placeholder.svg" alt="Company Logo" className="h-8" />
            <img src="/placeholder.svg" alt="Company Logo" className="h-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enhance;
