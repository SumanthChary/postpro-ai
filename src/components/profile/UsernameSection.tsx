
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UsernameSectionProps {
  username: string;
  setUsername: (username: string) => void;
  bio: string;
  suggestions: string[];
  setSuggestions: (suggestions: string[]) => void;
}

export const UsernameSection = ({
  username,
  setUsername,
  bio,
  suggestions,
  setSuggestions,
}: UsernameSectionProps) => {
  const { toast } = useToast();

  const getSuggestedUsernames = async () => {
    try {
      const { data: result, error } = await supabase.functions.invoke('enhance-profile', {
        body: { action: 'suggestUsername', bio },
      });

      if (error) throw error;
      setSuggestions(result.result);
      
      toast({
        title: "Username Suggestions",
        description: "Check out these AI-generated username suggestions!",
      });
    } catch (error: any) {
      toast({
        title: "Error getting suggestions",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium" htmlFor="username">
          Username
        </label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={getSuggestedUsernames}
                className="h-8"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                Get Suggestions
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Get AI-suggested usernames based on your bio
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
        className="w-full"
      />
      {suggestions.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {suggestions.map((suggestion, idx) => (
            <Button
              key={idx}
              variant="outline"
              size="sm"
              onClick={() => setUsername(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
