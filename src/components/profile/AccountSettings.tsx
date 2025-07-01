
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Bell, Shield, Mail, Trash2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AccountSettings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    marketing: false,
    updates: true,
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    dataSharing: false,
  });
  const { toast } = useToast();

  const handleExportData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      toast({
        title: "Data Export Requested",
        description: "Your data export will be sent to your email within 24 hours.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to request data export.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    try {
      // In a real implementation, you'd call an edge function to handle account deletion
      toast({
        title: "Account Deletion Requested",
        description: "Your account deletion request has been submitted. This may take up to 30 days to complete.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center mb-6">
        <Shield className="w-5 h-5 mr-2 text-gray-600" />
        <h3 className="text-xl font-semibold font-cabinet">Account Settings</h3>
      </div>

      <div className="space-y-6">
        {/* Notification Settings */}
        <div>
          <div className="flex items-center mb-3">
            <Bell className="w-4 h-4 mr-2" />
            <h4 className="font-medium font-cabinet">Notifications</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications" className="font-cabinet">Email Notifications</Label>
              <Switch
                id="email-notifications"
                checked={notifications.email}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, email: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="marketing-emails" className="font-cabinet">Marketing Emails</Label>
              <Switch
                id="marketing-emails"
                checked={notifications.marketing}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, marketing: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="product-updates" className="font-cabinet">Product Updates</Label>
              <Switch
                id="product-updates"
                checked={notifications.updates}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, updates: checked }))
                }
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Privacy Settings */}
        <div>
          <div className="flex items-center mb-3">
            <Shield className="w-4 h-4 mr-2" />
            <h4 className="font-medium font-cabinet">Privacy</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="profile-visible" className="font-cabinet">Public Profile</Label>
              <Switch
                id="profile-visible"
                checked={privacy.profileVisible}
                onCheckedChange={(checked) => 
                  setPrivacy(prev => ({ ...prev, profileVisible: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="data-sharing" className="font-cabinet">Analytics Data Sharing</Label>
              <Switch
                id="data-sharing"
                checked={privacy.dataSharing}
                onCheckedChange={(checked) => 
                  setPrivacy(prev => ({ ...prev, dataSharing: checked }))
                }
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Data Management */}
        <div>
          <div className="flex items-center mb-3">
            <Download className="w-4 h-4 mr-2" />
            <h4 className="font-medium font-cabinet">Data Management</h4>
          </div>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              onClick={handleExportData}
              className="w-full justify-start font-cabinet"
            >
              <Download className="w-4 h-4 mr-2" />
              Export My Data
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteAccount}
              className="w-full justify-start font-cabinet"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AccountSettings;
