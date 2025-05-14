
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { AvatarUpload } from "@/components/profile/AvatarUpload";
import { ProfileForm } from "@/components/profile/ProfileForm";
import UserCredits from "@/components/profile/UserCredits";
import { useProfileData } from "@/hooks/useProfileData";
import { supabase } from "@/integrations/supabase/client";
import Footer from "@/components/Footer";

const Profile = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>("");
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

  useEffect(() => {
    const getUserId = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUserId(data.user.id);
      }
    };
    
    getUserId();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-custom-bg">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="p-6">
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
          
          <div className="space-y-6">
            {userId && <UserCredits userId={userId} />}
            
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Subscription</h3>
              <Button 
                className="w-full"
                onClick={() => navigate("/subscription")}
              >
                Manage Subscription
              </Button>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
