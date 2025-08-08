
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
import UserCredits from "@/components/profile/UserCredits";
import SubscriptionInfo from "@/components/profile/SubscriptionInfo";
import UsageHistory from "@/components/profile/UsageHistory";
import AccountSettings from "@/components/profile/AccountSettings";
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
      <div className="max-w-7xl mx-auto p-4 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-white/80 backdrop-blur-sm border-gray-200/50 hover:bg-white/90 transition-all duration-200"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <UserCredits userId={userId} />
          </div>
        </div>
        
        {/* Real-time Activity and Metrics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <EnhancedMetrics userId={userId} />
          </div>
          <div className="lg:col-span-1">
            <RealTimeActivity />
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 font-cabinet">Profile & Settings</h1>
          
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-sm">
              <TabsTrigger value="profile" className="font-cabinet">Profile</TabsTrigger>
              <TabsTrigger value="subscription" className="font-cabinet">Subscription</TabsTrigger>
              <TabsTrigger value="credits" className="font-cabinet">Credits</TabsTrigger>
              <TabsTrigger value="activity" className="font-cabinet">Activity</TabsTrigger>
              <TabsTrigger value="settings" className="font-cabinet">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-xl">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 font-cabinet">Profile Information</h2>
                    
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
                  {userId && <SubscriptionInfo />}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="subscription">
              <div className="grid md:grid-cols-2 gap-6">
                {userId && <SubscriptionInfo />}
                <Card className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-xl">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 font-cabinet">Manage Subscription</h3>
                  <p className="text-gray-600 mb-4 font-cabinet">
                    Upgrade or modify your subscription plan to access more features and unlimited enhancements.
                  </p>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-cabinet"
                    onClick={() => navigate("/subscription")}
                  >
                    View All Plans
                  </Button>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="credits">
              <div className="grid md:grid-cols-2 gap-6">
                {userId && <UserCredits userId={userId} />}
                <Card className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-xl">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 font-cabinet">How Credits Work</h3>
                  <div className="space-y-3 text-sm text-gray-600 font-cabinet">
                    <p>• Each post enhancement uses 1 credit</p>
                    <p>• Credits are included with your subscription plan</p>
                    <p>• Free plan includes 50 credits to get you started</p>
                    <p>• Credits expire 3 months after being earned</p>
                    <p>• Upgrade your plan for more credits and features</p>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activity">
              <div className="grid md:grid-cols-1 gap-6">
                <UsageHistory />
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="grid md:grid-cols-1 gap-6">
                <AccountSettings />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
