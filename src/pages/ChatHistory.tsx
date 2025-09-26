import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MessageSquare, Clock, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ChatHistory {
  id: string;
  title: string;
  last_message: string;
  created_at: string;
  message_count: number;
}

const ChatHistory = () => {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth('/auth', true);

  useEffect(() => {
    if (user) {
      fetchChatHistory();
    }
  }, [user]);

  const fetchChatHistory = async () => {
    try {
      // This is a placeholder - you'll need to implement chat history storage
      // For now, showing mock data
      const mockHistory: ChatHistory[] = [
        {
          id: "1",
          title: "LinkedIn Strategy Discussion",
          last_message: "How can I improve my LinkedIn engagement?",
          created_at: new Date().toISOString(),
          message_count: 12
        },
        {
          id: "2", 
          title: "Content Creation Tips",
          last_message: "What are the best hashtags for business content?",
          created_at: new Date(Date.now() - 86400000).toISOString(),
          message_count: 8
        }
      ];
      
      setChatHistory(mockHistory);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      toast.error('Failed to load chat history');
    } finally {
      setLoading(false);
    }
  };

  const deleteChat = async (chatId: string) => {
    try {
      setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
      toast.success('Chat deleted successfully');
    } catch (error) {
      console.error('Error deleting chat:', error);
      toast.error('Failed to delete chat');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/50 py-12 px-4 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 font-medium">Loading chat history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <div className="mb-4">
          <Link to="/chatbot">
            <Button variant="outline" size="sm" className="gap-2 bg-white/80 backdrop-blur-sm border-gray-200/50 hover:bg-white/90 transition-all duration-200">
              <ArrowLeft size={16} />
              Back to Chat
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Chat History
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium px-4">
            Review your previous conversations with our AI assistant
          </p>
        </div>

        {/* Chat History List */}
        <div className="space-y-4">
          {chatHistory.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No chat history yet</h3>
                <p className="text-gray-600 text-center mb-4">
                  Start a conversation with our AI assistant to see your chat history here.
                </p>
                <Link to="/chatbot">
                  <Button>Start New Chat</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            chatHistory.map((chat) => (
              <Card key={chat.id} className="bg-white/80 backdrop-blur-sm border-gray-200/50 hover:bg-white/90 transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
                        {chat.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {formatDate(chat.created_at)}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {chat.message_count} messages
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteChat(chat.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {chat.last_message}
                  </p>
                  <Link to={`/chatbot?history=${chat.id}`}>
                    <Button variant="outline" size="sm">
                      Continue Chat
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;