
import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CornerDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ChatMessageList } from "@/components/ui/chat-message-list";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat-bubble";
import { ChatInput } from "@/components/ui/chat-input";
import { generateChatFallbackResponse } from "@/components/chatbot/fallbackResponse";

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

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        content: input,
        sender: "user",
      },
    ]);
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
      if (!data || typeof data !== "object") {
        throw new Error("Invalid response format");
      }
      if (data.error) {
        throw new Error(data.error);
      }
      if (!data.response) {
        throw new Error("No response returned");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: data.response,
          sender: "ai",
        },
      ]);
    } catch (error: any) {
      console.error('Chatbot error:', error);
      const fallbackResponse = generateChatFallbackResponse(input);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: fallbackResponse,
          sender: "ai",
        },
      ]);
      toast({
        title: "Using quick-start assistance",
        description: "The primary AI service is slow, so we generated a rapid playbook instead.",
        variant: "default",
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
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 pb-6 pt-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-3 py-3 sm:px-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Chat Interface */}
        <div className="mt-4 flex flex-1 flex-col rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Chat Header */}
          <div className="flex flex-col gap-3 border-b border-gray-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
              <p className="text-sm text-gray-500">Ask me anything about social media strategy</p>
            </div>
            <div className="flex flex-wrap gap-2 sm:flex-nowrap">
              <Link to="/chat-history" className="w-full sm:w-auto">
                <Button variant="ghost" size="sm" className="w-full text-gray-500 hover:text-gray-700 sm:w-auto">
                  History
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetConversation} 
                className="w-full text-gray-600 hover:text-gray-900 sm:w-auto"
              >
                New Chat
              </Button>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-hidden">
            <ChatMessageList className="px-3 sm:px-6">
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
          <div className="border-t border-gray-100 px-3 py-4 sm:px-4">
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
