
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
  content: "Hi! I'm your AI social media assistant. Ask me about content creation, strategy, or post improvement!",
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
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="border-b border-gray-100 p-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Page Header */}
        <div className="p-6 border-b border-gray-100">
          <PageHeader />
        </div>

        {/* Chat Interface */}
        <div className="flex flex-col h-[calc(100vh-200px)]">
          <ChatHeader onReset={resetConversation} />
          
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4 max-w-3xl mx-auto">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {loading && <LoadingIndicator />}
            </div>
          </ScrollArea>
          
          <div className="border-t border-gray-100 p-4">
            <div className="max-w-3xl mx-auto">
              <ChatInput onSubmit={handleSubmit} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
