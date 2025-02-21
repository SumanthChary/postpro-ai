
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Upload, Wand2, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [profileScore, setProfileScore] = useState<number>(0);
  const [improvements, setImprovements] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("username, avatar_url, bio")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      if (data) {
        setUsername(data.username || "");
        setAvatarUrl(data.avatar_url || "");
        setBio(data.bio || "");
        if (data.username && data.bio) {
          await getProfileScore(data.username, data.bio);
        }
      }
    } catch (error: any) {
      toast({
        title: "Error fetching profile",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user logged in");

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      toast({
        title: "Success",
        description: "Avatar uploaded successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error uploading avatar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

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

  const getProfileScore = async (currentUsername = username, currentBio = bio) => {
    try {
      const { data: result, error } = await supabase.functions.invoke('enhance-profile', {
        body: { 
          action: 'getProfileScore',
          currentUsername,
          bio: currentBio,
        },
      });

      if (error) throw error;
      
      setProfileScore(result.result.score);
      setImprovements(result.result.suggestions);
    } catch (error: any) {
      console.error("Error getting profile score:", error);
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
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
        
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={avatarUrl} alt={username} />
              <AvatarFallback>{username?.charAt(0)?.toUpperCase()}</AvatarFallback>
            </Avatar>
            
            <div className="flex items-center space-x-4">
              <Input
                type="file"
                accept="image/*"
                onChange={uploadAvatar}
                disabled={uploading}
                className="hidden"
                id="avatar-upload"
              />
              <Button
                onClick={() => document.getElementById('avatar-upload')?.click()}
                disabled={uploading}
                variant="outline"
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? "Uploading..." : "Upload Avatar"}
              </Button>
            </div>
          </div>

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
      </Card>
    </div>
  );
};

export default Profile;
