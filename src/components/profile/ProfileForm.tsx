
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { UsernameSection } from "./UsernameSection";
import { BioSection } from "./BioSection";
import { ProfileScoreSection } from "./ProfileScoreSection";

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
  const [initialValues, setInitialValues] = useState({ username: "", bio: "" });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setInitialValues({ username, bio });
  }, []);

  useEffect(() => {
    const hasChanged = username !== initialValues.username || bio !== initialValues.bio;
    setHasChanges(hasChanged);
  }, [username, bio, initialValues]);

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
      
      // Update initial values after successful save
      setInitialValues({ username, bio });
      setHasChanges(false);

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
      <UsernameSection
        username={username}
        setUsername={setUsername}
        bio={bio}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
      />

      <BioSection
        bio={bio}
        setBio={setBio}
        username={username}
      />

      {(username || bio) && (
        <ProfileScoreSection
          profileScore={profileScore}
          improvements={improvements}
        />
      )}

      <Button
        onClick={updateProfile}
        disabled={loading || !hasChanges}
        className={`w-full transition-all duration-300 ${
          hasChanges 
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg' 
            : ''
        }`}
      >
        {loading ? "Saving Changes..." : hasChanges ? "Save Changes" : "No Changes to Save"}
      </Button>
      
      {hasChanges && (
        <p className="text-sm text-amber-600 text-center font-medium animate-pulse">
          You have unsaved changes
        </p>
      )}
    </div>
  );
};
