
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { AvatarUpload } from "@/components/profile/AvatarUpload";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { useProfileData } from "@/hooks/useProfileData";

const Profile = () => {
  const navigate = useNavigate();
  const {
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
    improvements,
    getProfileScore
  } = useProfileData();

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
          <AvatarUpload
            avatarUrl={avatarUrl}
            username={username}
            setAvatarUrl={setAvatarUrl}
            uploading={uploading}
            setUploading={setUploading}
          />

          <ProfileForm
            username={username}
            setUsername={setUsername}
            bio={bio}
            setBio={setBio}
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            profileScore={profileScore}
            improvements={improvements}
            loading={loading}
            setLoading={setLoading}
            getProfileScore={getProfileScore}
          />
        </div>
      </Card>
    </div>
  );
};

export default Profile;
