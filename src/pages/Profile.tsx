
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { AvatarUpload } from "@/components/profile/AvatarUpload";
import { ProfileForm } from "@/components/profile/ProfileForm";
import PostUsage from "@/components/profile/PostUsage";
import SubscriptionInfo from "@/components/profile/SubscriptionInfo";
import ReferralSystem from "@/components/profile/ReferralSystem";
import { EnhancedMetrics } from "@/components/profile/EnhancedMetrics";
import { StreaksSection } from "@/components/profile/StreaksSection";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50/30">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-white/80 backdrop-blur-sm border-blue-200 hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl rounded-full px-6"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="text-center sm:text-right">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-cabinet">
              Profile Management
            </h1>
            <p className="text-slate-600 mt-2 font-medium">Manage your account and preferences</p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-lg rounded-2xl p-2 backdrop-blur-sm">
            <TabsTrigger value="profile" className="font-cabinet text-xs sm:text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-blue-600 rounded-xl transition-all duration-300">Profile</TabsTrigger>
            <TabsTrigger value="subscription" className="font-cabinet text-xs sm:text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-blue-600 rounded-xl transition-all duration-300">Subscription</TabsTrigger>
            <TabsTrigger value="streaks" className="font-cabinet text-xs sm:text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-blue-600 rounded-xl transition-all duration-300">Streaks</TabsTrigger>
            <TabsTrigger value="referrals" className="font-cabinet text-xs sm:text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-blue-600 rounded-xl transition-all duration-300">Referrals</TabsTrigger>
            <TabsTrigger value="metrics" className="font-cabinet text-xs sm:text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-blue-600 rounded-xl transition-all duration-300 hidden lg:block">Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="lg:col-span-2">
                <Card className="p-6 sm:p-8 bg-white/80 backdrop-blur-lg border border-blue-200/50 shadow-2xl rounded-3xl hover:shadow-3xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-cabinet">Profile Information</h2>
                  </div>
                  
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

          <TabsContent value="referrals">
            <div className="max-w-5xl">
              {userId && <ReferralSystem userId={userId} />}
            </div>
          </TabsContent>

          <TabsContent value="streaks" className="lg:block">
            <div className="max-w-7xl">
              {userId && (
                <div className="space-y-6">
                  <StreaksSection userId={userId} />
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="lg:block hidden">
            <div className="max-w-7xl">
              {userId && (
                <div className="space-y-6">
                  <Card className="p-6 sm:p-8 bg-white/80 backdrop-blur-lg border border-blue-200/50 shadow-2xl rounded-3xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-cabinet">Performance Metrics</h2>
                    </div>
                    <EnhancedMetrics userId={userId} />
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
