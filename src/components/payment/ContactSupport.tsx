import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MessageCircle, Send } from "lucide-react";

export const ContactSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      // Simulate sending message - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent",
        description: "We'll get back to you within 24 hours!",
      });
      
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="bg-muted/10 border border-border rounded-xl p-6">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Need Help?</h3>
          <p className="text-sm text-muted-foreground">
            Questions about your purchase or need technical support?
          </p>
          
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => setIsOpen(true)}
              className="flex items-center space-x-2 hover:bg-primary/5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact Support</span>
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Available 24/7 • Response within 24 hours
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Contact Support</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="text-muted-foreground hover:text-foreground"
        >
          ×
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <Input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <Input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <Input
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="How can we help?"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <Textarea
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Describe your question or issue..."
          />
        </div>
        
        <Button
          type="submit"
          disabled={isSending}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white"
        >
          {isSending ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Sending...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </div>
          )}
        </Button>
      </form>
    </div>
  );
};