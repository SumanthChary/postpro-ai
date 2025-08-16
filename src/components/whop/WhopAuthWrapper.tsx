import React, { ReactNode } from 'react';
import { useWhopAuth } from '@/hooks/useWhopAuth';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WhopAuthWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const WhopAuthWrapper: React.FC<WhopAuthWrapperProps> = ({ 
  children, 
  fallback 
}) => {
  const { loading, isAuthenticated, user, redirectToWhopAuth, isWhopContext } = useWhopAuth();

  console.log('WhopAuthWrapper state:', { loading, isAuthenticated, user, isWhopContext });

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Connecting to Whop...</p>
        </div>
      </div>
    );
  }

  // If not in Whop context, show authentication option but still allow access
  if (!isWhopContext) {
    return (
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-blue-800">Demo Mode</span>
          </div>
          <p className="text-sm text-blue-700">
            You're viewing the Whop app in demo mode. Install this app in your Whop community for full functionality.
          </p>
          <Button 
            onClick={() => window.open('https://whop.com/apps/app_tOxwzuc0RwXQfw/install/', '_blank')} 
            variant="outline" 
            size="sm" 
            className="mt-2 border-blue-300 text-blue-700 hover:bg-blue-100"
          >
            Install on Whop
          </Button>
        </div>
        {children}
      </div>
    );
  }

  // Show authentication required for Whop context
  if (!isAuthenticated && isWhopContext) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Authentication Required</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-muted-foreground">
              Please authenticate with Whop to access PostPro AI.
            </p>
            <Button onClick={redirectToWhopAuth} className="w-full">
              Connect with Whop
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User is authenticated or in demo mode, show the app
  return (
    <div className="whop-app-container">
      {/* Optional Whop user info bar */}
      {user && isWhopContext && (
        <div className="bg-primary/10 border-b px-4 py-2 text-sm">
          <div className="flex items-center justify-between">
            <span>
              Welcome, <strong>{user.username}</strong>!
            </span>
            <span className="text-muted-foreground">
              Connected via Whop
            </span>
          </div>
        </div>
      )}
      
      {children}
    </div>
  );
};