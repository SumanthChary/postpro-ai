
import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BioSectionProps {
  bio: string;
  setBio: (bio: string) => void;
  username: string;
}

export const BioSection = ({ bio, setBio, username }: BioSectionProps) => {
  const { toast } = useToast();

  const generateBio = async () => {
    try {
      const { data: result, error } = await supabase.functions.invoke('enhance-profile', {
        body: { action: 'generateBio', currentUsername: username },
      });

      if (error) throw error;
      setBio(result.result);
      
      toast({
        title: "Bio Generated",
        description: "Your AI-generated bio is ready!",
      });
    } catch (error: any) {
      toast({
        title: "Error generating bio",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium" htmlFor="bio">
          Bio
        </label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={generateBio}
                className="h-8"
              >
                <Brain className="w-4 h-4 mr-2" />
                Generate Bio
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Generate a professional bio with AI
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Textarea
        id="bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Tell us about yourself"
        className="w-full min-h-[100px]"
      />
    </div>
  );
};
