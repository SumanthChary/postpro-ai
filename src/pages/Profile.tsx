
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/50">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:bg-white/90"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-xl">
              <h1 className="text-2xl font-bold mb-6 text-gray-900">Profile Settings</h1>
              
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
            
            <Card className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Subscription</h3>
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                onClick={() => navigate("/subscription")}
              >
                Manage Subscription
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
