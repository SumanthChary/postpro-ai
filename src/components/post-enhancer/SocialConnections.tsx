import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SocialConnection {
  platform: string;
  token: string;
  username?: string;
}

export const SocialConnections = () => {
  const [connections, setConnections] = useState<SocialConnection[]>([]);
  const [newPlatform, setNewPlatform] = useState('');
  const [newToken, setNewToken] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddConnection = async () => {
    if (!newPlatform || !newToken) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsAdding(true);
      // Store in Supabase
      const { error } = await supabase
        .from('social_connections')
        .insert({
          platform: newPlatform.toLowerCase(),
          access_token: newToken,
          username: newUsername,
          is_active: true
        });

      if (error) throw error;

      setConnections([...connections, {
        platform: newPlatform,
        token: newToken,
        username: newUsername
      }]);

      // Clear form
      setNewPlatform('');
      setNewToken('');
      setNewUsername('');

      toast({
        title: "Success",
        description: "Social media connection added successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add connection. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveConnection = async (platform: string) => {
    try {
      // Remove from Supabase
      const { error } = await supabase
        .from('social_connections')
        .delete()
        .eq('platform', platform.toLowerCase());

      if (error) throw error;

      setConnections(connections.filter(c => c.platform !== platform));

      toast({
        title: "Success",
        description: "Connection removed successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove connection",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-semibold">Add Social Media Connection</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Platform</label>
            <select
              className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2"
              value={newPlatform}
              onChange={(e) => setNewPlatform(e.target.value)}
            >
              <option value="">Select Platform</option>
              <option value="twitter">Twitter/X</option>
              <option value="linkedin">LinkedIn</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Access Token</label>
            <Input
              type="password"
              value={newToken}
              onChange={(e) => setNewToken(e.target.value)}
              placeholder="Your access token"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Username (optional)</label>
            <Input
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="@username"
              className="mt-1"
            />
          </div>
        </div>
        <Button
          onClick={handleAddConnection}
          disabled={isAdding}
          className="mt-4"
        >
          {isAdding ? "Adding..." : "Add Connection"}
        </Button>
      </div>

      {/* Connected Accounts */}
      {connections.length > 0 && (
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Connected Accounts</h3>
          <div className="space-y-3">
            {connections.map((connection) => (
              <div
                key={connection.platform}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="font-medium">{connection.platform}</div>
                  {connection.username && (
                    <div className="text-sm text-gray-500">{connection.username}</div>
                  )}
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveConnection(connection.platform)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="text-sm text-gray-500">
        <p>Need help finding your access tokens?</p>
        <ul className="list-disc list-inside mt-2">
          <li><a href="https://developer.twitter.com/en/docs/authentication/oauth-2-0" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Twitter API Documentation</a></li>
          <li><a href="https://learn.microsoft.com/en-us/linkedin/shared/authentication/authentication" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn API Documentation</a></li>
        </ul>
      </div>
    </div>
  );
};
