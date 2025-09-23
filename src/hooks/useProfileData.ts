
import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Cache for profile data to avoid unnecessary API calls
const profileCache = new Map();
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

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

  const getProfile = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return;
      }

      // Check cache first
      const cacheKey = `profile_${user.id}`;
      const cached = profileCache.get(cacheKey);
      if (cached && (Date.now() - cached.timestamp) < CACHE_EXPIRY) {
        const { data } = cached;
        setUsername(data.username || "");
        setAvatarUrl(data.avatar_url || "");
        setBio(data.bio || "");
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
        // Cache the result
        profileCache.set(cacheKey, {
          data,
          timestamp: Date.now()
        });

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
  }, []);

  const getProfileScore = useCallback(async (currentUsername: string = username, currentBio: string = bio) => {
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
  }, [username, bio]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  // Memoize the return object to prevent unnecessary re-renders
  return useMemo(() => ({
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
  }), [
    loading,
    username,
    bio,
    avatarUrl,
    uploading,
    suggestions,
    profileScore,
    improvements,
    getProfile,
    getProfileScore
  ]);
};
