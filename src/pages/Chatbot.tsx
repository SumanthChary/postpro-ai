
import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CornerDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ChatMessageList } from "@/components/ui/chat-message-list";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat-bubble";
import { ChatInput } from "@/components/ui/chat-input";

interface Message {
  id: number;
  content: string;
  sender: "user" | "ai";
}

const initialMessage: Message = {
  id: 1,
  content: "Hi! I'm your AI social media assistant. Ask me about content creation, strategy, or post improvement!",
  sender: "ai",
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user",
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('chat-assistant', {
        body: {
          message: input,
          history: messages.map(msg => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.content
          }))
        }
      });
      
      if (error) throw error;
      
      const assistantMessage: Message = {
        id: messages.length + 2,
        content: data.response,
        sender: "ai",
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
      setIsLoading(false);
    }
  };

  const resetConversation = () => {
    setMessages([initialMessage]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Chat Interface */}
        <div className="bg-white shadow-sm rounded-t-lg mx-4 mt-4 h-[calc(100vh-120px)] flex flex-col">
          {/* Chat Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
              <p className="text-sm text-gray-500">Ask me anything about social media strategy</p>
            </div>
            <div className="flex gap-2">
              <Link to="/chat-history">
                <Button variant="outline" size="sm" className="text-gray-600 hover:text-gray-900">
                  History
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetConversation} 
                className="text-gray-600 hover:text-gray-900"
              >
                New Chat
              </Button>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-hidden">
            <ChatMessageList>
              {messages.map((message) => (
                <ChatBubble
                  key={message.id}
                  variant={message.sender === "user" ? "sent" : "received"}
                >
                  <ChatBubbleAvatar
                    fallback={message.sender === "user" ? "You" : "AI"}
                  />
                  <ChatBubbleMessage
                    variant={message.sender === "user" ? "sent" : "received"}
                  >
                    {message.content}
                  </ChatBubbleMessage>
                </ChatBubble>
              ))}

              {isLoading && (
                <ChatBubble variant="received">
                  <ChatBubbleAvatar fallback="AI" />
                  <ChatBubbleMessage isLoading />
                </ChatBubble>
              )}
            </ChatMessageList>
          </div>
          
          {/* Input */}
          <div className="border-t border-gray-100 p-4">
            <form
              onSubmit={handleSubmit}
              className="relative rounded-xl border border-gray-200 bg-white focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 p-1"
            >
              <ChatInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:border-0"
              />
              <div className="flex items-center justify-end p-3 pt-0">
                <Button 
                  type="submit" 
                  size="sm" 
                  className="ml-auto gap-1.5 bg-blue-600 hover:bg-blue-700" 
                  disabled={!input.trim() || isLoading}
                >
                  Send
                  <CornerDownLeft className="size-3.5" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
