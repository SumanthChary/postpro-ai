
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/chatbot/PageHeader";
import ChatHeader from "@/components/chatbot/ChatHeader";
import ChatMessage from "@/components/chatbot/ChatMessage";
import LoadingIndicator from "@/components/chatbot/LoadingIndicator";
import ChatInput from "@/components/chatbot/ChatInput";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const initialMessage: Message = {
  role: "assistant",
  content: "👋 Hi! I'm your AI social media assistant. Ask me about content creation, strategy, or post improvement!",
  timestamp: new Date(),
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (input: string) => {
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
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
    setMessages([initialMessage]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-3 sm:py-4 px-2 sm:px-3">
      <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
        {/* Back Button */}
        <div className="mb-2">
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-1 bg-white/80 backdrop-blur-sm border-gray-200/50 hover:bg-white/90 text-xs px-2 py-1.5">
              <ArrowLeft size={12} className="sm:w-3 sm:h-3" />
              <span className="hidden xs:inline">Back to Home</span>
              <span className="xs:hidden">Back</span>
            </Button>
          </Link>
        </div>

        {/* Header Section */}
        <PageHeader />

        {/* Chat Interface */}
        <Card className="max-w-3xl mx-auto shadow-md sm:shadow-lg border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
          <ChatHeader onReset={resetConversation} />
          
          <ScrollArea className="h-[300px] sm:h-[350px] p-2 sm:p-3" ref={scrollAreaRef}>
            <div className="space-y-2 sm:space-y-3">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {loading && <LoadingIndicator />}
            </div>
          </ScrollArea>
          
          <ChatInput onSubmit={handleSubmit} loading={loading} />
        </Card>
      </div>
    </div>
  );
};

export default Chatbot;
