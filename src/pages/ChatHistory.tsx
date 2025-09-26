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
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/chatbot">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft size={16} />
              Back to Chat
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Chat History
          </h1>
          <p className="text-muted-foreground text-base max-w-lg mx-auto">
            Review your previous conversations
          </p>
        </div>

        {/* Chat History List */}
        <div className="space-y-3">
          {chatHistory.length === 0 ? (
            <Card className="border-border/50">
              <CardContent className="flex flex-col items-center justify-center py-10">
                <MessageSquare className="h-10 w-10 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium text-foreground mb-2">No conversations yet</h3>
                <p className="text-muted-foreground text-center text-sm mb-4">
                  Start chatting to see your history here
                </p>
                <Link to="/chatbot">
                  <Button size="sm">Start New Chat</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            chatHistory.map((chat) => (
              <Card key={chat.id} className="border-border/50 hover:bg-muted/30 transition-colors duration-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground mb-2 text-sm truncate">
                        {chat.title}
                      </h3>
                      <p className="text-muted-foreground text-xs mb-2 line-clamp-1">
                        {chat.last_message}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(chat.created_at)}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {chat.message_count}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 flex-shrink-0">
                      <Link to={`/chatbot?history=${chat.id}`}>
                        <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                          Continue
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteChat(chat.id)}
                        className="text-muted-foreground hover:text-destructive h-7 px-2"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
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