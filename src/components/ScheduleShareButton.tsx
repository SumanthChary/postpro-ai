import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Clock, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ScheduleShareButtonProps {
  content: string;
  platform?: string;
}

const ScheduleShareButton: React.FC<ScheduleShareButtonProps> = ({ 
  content, 
  platform = 'linkedin' 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scheduleDateTime, setScheduleDateTime] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isScheduling, setIsScheduling] = useState(false);
  const { toast } = useToast();

  const handleSchedule = async () => {
    if (!scheduleDateTime) {
      toast({
        title: "Error",
        description: "Please select a date and time for scheduling",
        variant: "destructive",
      });
      return;
    }

    if (!webhookUrl) {
      toast({
        title: "Error", 
        description: "Please enter your Zapier webhook URL",
        variant: "destructive",
      });
      return;
    }

    setIsScheduling(true);

    try {
      // Call Zapier webhook with the scheduled post data
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          content,
          platform,
          scheduled_time: scheduleDateTime,
          timestamp: new Date().toISOString(),
          triggered_from: window.location.origin,
        }),
      });

      toast({
        title: "Post Scheduled!",
        description: `Your ${platform} post has been scheduled. Check your Zapier dashboard to confirm.`,
      });

      setIsModalOpen(false);
      setScheduleDateTime('');
      setWebhookUrl('');
    } catch (error) {
      console.error('Error scheduling post:', error);
      toast({
        title: "Error",
        description: "Failed to schedule the post. Please check your webhook URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsScheduling(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1.5 sm:gap-2 text-sm py-1.5 sm:py-2 px-3 sm:px-4 whitespace-nowrap"
        >
          <Calendar className="w-4 h-4" />
          Schedule
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Schedule Your Post
          </DialogTitle>
          <DialogDescription>
            Schedule your enhanced post to be shared automatically via Zapier
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="webhook-url">Zapier Webhook URL</Label>
            <Input
              id="webhook-url"
              type="url"
              placeholder="https://hooks.zapier.com/hooks/catch/..."
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Get this from your Zapier webhook trigger
            </p>
          </div>
          
          <div>
            <Label htmlFor="schedule-time">Schedule Date & Time</Label>
            <Input
              id="schedule-time"
              type="datetime-local"
              value={scheduleDateTime}
              onChange={(e) => setScheduleDateTime(e.target.value)}
              className="mt-1"
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="flex-1"
              disabled={isScheduling}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSchedule}
              disabled={isScheduling || !scheduleDateTime || !webhookUrl}
              className="flex-1"
            >
              {isScheduling ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Scheduling...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Schedule
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleShareButton;