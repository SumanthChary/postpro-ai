
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
        // Don't force navigation here - just return silently
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("username, avatar_url, bio")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Profile fetch error:", error.message);
        return;
      }

      if (data) {
        setUsername(data.username || "");
        setAvatarUrl(data.avatar_url || "");
        setBio(data.bio || "");
        if (data.username && data.bio) {
          await getProfileScore(data.username, data.bio);
        }
      }
    } catch (error: any) {
      console.error("Error fetching profile:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getProfileScore = async (currentUsername: string = username, currentBio: string = bio) => {
    try {
      if (!currentUsername || !currentBio) return;
      
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
