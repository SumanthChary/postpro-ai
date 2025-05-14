
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bot, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ChatMessage from "@/components/chatbot/ChatMessage";
import ChatLoading from "@/components/chatbot/ChatLoading";
import ChatInput from "@/components/chatbot/ChatInput";
import QuickActionButtons from "@/components/chatbot/QuickActionButtons";
import Footer from "@/components/Footer";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hi there! I'm your social media assistant. Ask me anything about content creation, social media strategy, or how to improve your posts! I can help with specific platforms like LinkedIn, Twitter, Instagram, and more.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current;
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('chat-assistant', {
        body: {
          message: input,
          history: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }
      });
      
      if (error) throw error;
      
      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Chatbot error:', error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetConversation = () => {
    setMessages([
      {
        role: "assistant",
        content: "👋 Hi there! I'm your social media assistant. Ask me anything about content creation, social media strategy, or how to improve your posts! I can help with specific platforms like LinkedIn, Twitter, Instagram, and more.",
        timestamp: new Date(),
      },
    ]);
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleImageSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Image upload simulation - in a real app, this would upload to storage
    setImageUploading(true);
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userMessage: Message = {
        role: "user",
        content: `[Shared an image: ${file.name}] Can you analyze this image and suggest improvements for my social media?`,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, userMessage]);
      
      // Simulate AI response to image
      setTimeout(() => {
        const assistantMessage: Message = {
          role: "assistant",
          content: "I've analyzed your image. To make it more engaging on social media, consider: 1) Adding a text overlay with a key statistic or question, 2) Increasing the contrast for better visibility, 3) Using the rule of thirds for composition. Would you like specific advice for a particular platform?",
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, assistantMessage]);
      }, 2000);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setImageUploading(false);
      // Clear the input to allow the same file to be uploaded again
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const shareStrategy = () => {
    setInput("Can you recommend a content strategy for growing my LinkedIn network?");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Back Button */}
        <div className="mb-4">
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">
            AI Social Media Assistant
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get expert advice on social media strategy, content creation, and engagement tactics
          </p>
        </div>

        {/* Quick Action Buttons */}
        <QuickActionButtons 
          shareStrategy={shareStrategy} 
          handleImageUpload={handleImageUpload}
          imageUploading={imageUploading}
        />

        {/* Chat Interface */}
        <Card className="max-w-2xl mx-auto shadow-lg border-0 bg-white/70 backdrop-blur-sm overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center gap-2">
              <Bot className="text-electric-purple" size={20} />
              <h2 className="font-medium">Social Media Assistant</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={resetConversation} className="gap-1">
              <RefreshCw size={14} />
              Reset
            </Button>
          </div>
          
          <ScrollArea className="h-[400px] p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {(loading || imageUploading) && <ChatLoading />}
            </div>
          </ScrollArea>
          
          <ChatInput 
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            loading={loading}
            imageUploading={imageUploading}
            fileInputRef={fileInputRef}
            handleImageUpload={handleImageUpload}
            handleImageSelected={handleImageSelected}
          />
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Chatbot;
