
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useProfileData = () => {
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

  const getProfileScore = async (currentUsername: string = username, currentBio: string = bio) => {
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

  useEffect(() => {
    getProfile();
  }, []);

  return {
    loading,
    setLoading,
    username,
    setUsername,
    bio,
    setBio,
    avatarUrl,
    setAvatarUrl,
    uploading,
    setUploading,
    suggestions,
    setSuggestions,
    profileScore,
    setProfileScore,
    improvements,
    setImprovements,
    getProfile,
    getProfileScore
  };
};
