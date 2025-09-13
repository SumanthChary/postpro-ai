
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RealTimeActivity } from "@/components/profile/RealTimeActivity";
import { EnhancedMetrics } from "@/components/profile/EnhancedMetrics";
import { useNavigate } from "react-router-dom";
import { AvatarUpload } from "@/components/profile/AvatarUpload";
import { ProfileForm } from "@/components/profile/ProfileForm";
import PostUsage from "@/components/profile/PostUsage";
import SubscriptionInfo from "@/components/profile/SubscriptionInfo";
import UsageHistory from "@/components/profile/UsageHistory";
import AccountSettings from "@/components/profile/AccountSettings";
import ReferralSystem from "@/components/profile/ReferralSystem";
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
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-white/80 backdrop-blur-sm border-gray-200/50 hover:bg-white/90 transition-all duration-200"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-cabinet">Profile & Settings</h1>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg">
            <TabsTrigger value="profile" className="font-cabinet text-xs sm:text-sm">Profile</TabsTrigger>
            <TabsTrigger value="subscription" className="font-cabinet text-xs sm:text-sm">Subscription</TabsTrigger>
            <TabsTrigger value="activity" className="font-cabinet text-xs sm:text-sm">Activity</TabsTrigger>
            <TabsTrigger value="referrals" className="font-cabinet text-xs sm:text-sm">Referrals</TabsTrigger>
            <TabsTrigger value="settings" className="font-cabinet text-xs sm:text-sm">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-xl">
                  <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 font-cabinet">Profile Information</h2>
                  
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
              
              <div className="lg:col-span-1 space-y-6">
                {userId && <SubscriptionInfo />}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="subscription">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {userId && <SubscriptionInfo />}
              {userId && <PostUsage userId={userId} />}
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <div className="space-y-6">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <EnhancedMetrics userId={userId} />
                </div>
                <div className="xl:col-span-1">
                  <RealTimeActivity />
                </div>
              </div>
              <UsageHistory />
            </div>
          </TabsContent>

          <TabsContent value="referrals">
            <div className="max-w-4xl">
              {userId && <ReferralSystem userId={userId} />}
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="max-w-4xl">
              <AccountSettings />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
