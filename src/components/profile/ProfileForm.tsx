
import { Brain, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProfileFormProps {
  username: string;
  setUsername: (username: string) => void;
  bio: string;
  setBio: (bio: string) => void;
  suggestions: string[];
  setSuggestions: (suggestions: string[]) => void;
  profileScore: number;
  improvements: string[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  getProfileScore: () => Promise<void>;
}

export const ProfileForm = ({
  username,
  setUsername,
  bio,
  setBio,
  suggestions,
  setSuggestions,
  profileScore,
  improvements,
  loading,
  setLoading,
  getProfileScore,
}: ProfileFormProps) => {
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

  const updateProfile = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("No user logged in");

      if (username.length < 3) {
        toast({
          title: "Invalid username",
          description: "Username must be at least 3 characters long",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          username,
          bio,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;

      await getProfileScore();

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
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

      {(username || bio) && (
        <div className="space-y-3 p-4 bg-secondary/20 rounded-lg">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Profile Completion</span>
              <span className="text-sm font-medium">{profileScore}%</span>
            </div>
            <Progress value={profileScore} className="w-full" />
          </div>
          {improvements.length > 0 && (
            <div className="space-y-2">
              <span className="text-sm font-medium">Suggestions:</span>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                {improvements.map((improvement, idx) => (
                  <li key={idx}>{improvement}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <Button
        onClick={updateProfile}
        disabled={loading}
        className="w-full"
      >
        {loading ? "Updating..." : "Update Profile"}
      </Button>
    </div>
  );
};
