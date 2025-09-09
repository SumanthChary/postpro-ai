import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Sparkles, Users, TrendingUp, Crown } from 'lucide-react';

export const WhopLaunchBanner: React.FC = () => {
  const handleWhopAppClick = () => {
    window.open('/whop-app', '_blank');
  };

  const handleWhopInstallClick = () => {
    window.open('https://whop.com/apps/app_tOxwzuc0RwXQfw/install/', '_blank');
  };

  return (
    <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-r from-primary/5 via-background to-primary/5">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
      
      <CardHeader className="relative">
        <div className="flex items-center space-x-2 mb-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            <Crown className="h-3 w-3 mr-1" />
            Now on Whop
          </Badge>
          <Badge variant="outline" className="text-green-600 border-green-600">
            Live
          </Badge>
        </div>
        
        <CardTitle className="text-2xl font-bold text-blue-600">
          PostPro AI on Whop Marketplace
        </CardTitle>
        
        <p className="text-muted-foreground">
          Your AI-powered content enhancement tool is now available on Whop! 
          Join thousands of creators already transforming their social media presence.
        </p>
      </CardHeader>
      
      <CardContent className="relative space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/50">
            <div className="p-2 bg-primary/10 rounded-full">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm">Community-Focused</p>
              <p className="text-xs text-muted-foreground">Integrate with Discord communities</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/50">
            <div className="p-2 bg-primary/10 rounded-full">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm">Viral Content</p>
              <p className="text-xs text-muted-foreground">AI-powered engagement boost</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/50">
            <div className="p-2 bg-primary/10 rounded-full">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm">Premium Features</p>
              <p className="text-xs text-muted-foreground">Exclusive templates & analytics</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={handleWhopAppClick} 
            size="lg" 
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Try Whop App
          </Button>
          
          <Button 
            onClick={handleWhopInstallClick} 
            variant="outline" 
            size="lg" 
            className="flex-1 border-primary text-primary hover:bg-primary/10"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Install on Whop
          </Button>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Available for all Discord communities • Instant setup • Premium support included
          </p>
        </div>
      </CardContent>
    </Card>
  );
};