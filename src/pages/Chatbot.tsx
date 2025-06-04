
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Bot, User, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hi there! I'm your AI social media assistant. Ask me anything about content creation, strategy, or how to improve your posts!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
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
        content: "👋 Hi there! I'm your AI social media assistant. Ask me anything about content creation, strategy, or how to improve your posts!",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <div className="mb-4">
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-2 bg-white/80 backdrop-blur-sm border-gray-200/50 hover:bg-white/90">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-3">
            <div className="p-4 rounded-2xl" style={{ backgroundColor: 'rgba(57,107,255,0.1)' }}>
              <Sparkles className="w-8 h-8" style={{ color: 'rgba(57,107,255,1)' }} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              AI Assistant
            </h1>
          </div>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            Get expert advice on social media strategy, content creation, and engagement tactics from our intelligent AI assistant
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'rgba(57,107,255,1)' }}></div>
              Content Strategy
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'rgba(57,107,255,1)' }}></div>
              Hashtag Research
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'rgba(57,107,255,1)' }}></div>
              Engagement Tips
            </span>
          </div>
        </div>

        {/* Chat Interface */}
        <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-gray-200/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl" style={{ backgroundColor: 'rgba(57,107,255,0.1)' }}>
                <Bot style={{ color: 'rgba(57,107,255,1)' }} size={20} />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Social Media Assistant</h2>
                <p className="text-sm text-gray-500">Always here to help</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={resetConversation} className="gap-2 hover:bg-gray-100">
              <RefreshCw size={14} />
              Reset Chat
            </Button>
          </div>
          
          <ScrollArea className="h-[500px] p-6" ref={scrollAreaRef}>
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.role === "user"
                        ? "text-white rounded-tr-sm"
                        : "bg-gray-50 text-gray-800 rounded-tl-sm border border-gray-200/50"
                    }`}
                    style={message.role === "user" ? { backgroundColor: 'rgba(57,107,255,1)' } : {}}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {message.role === "assistant" ? (
                        <Bot size={16} style={{ color: 'rgba(57,107,255,1)' }} />
                      ) : (
                        <User size={16} />
                      )}
                      <span className="text-xs font-medium opacity-70">
                        {message.role === "user" ? "You" : "AI Assistant"}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <span className="text-xs opacity-50 block text-right mt-2">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-4 rounded-2xl bg-gray-50 text-gray-800 rounded-tl-sm border border-gray-200/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot size={16} style={{ color: 'rgba(57,107,255,1)' }} />
                      <span className="text-xs font-medium opacity-70">AI Assistant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'rgba(57,107,255,0.4)' }} />
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'rgba(57,107,255,0.4)', animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'rgba(57,107,255,0.4)', animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <form onSubmit={handleSubmit} className="p-6 border-t border-gray-200/50 bg-gray-50/50">
            <div className="flex gap-3">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me about social media strategy, content ideas, or anything else..."
                className="resize-none bg-white/80 border-gray-200/50 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                rows={1}
                disabled={loading}
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={loading || !input.trim()}
                className="h-10 w-10 text-white"
                style={{ backgroundColor: 'rgba(57,107,255,1)' }}
              >
                <Send size={16} />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Chatbot;
