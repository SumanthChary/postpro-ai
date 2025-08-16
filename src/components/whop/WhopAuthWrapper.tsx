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

  // If not in Whop context, render children normally
  if (!isWhopContext) {
    return <>{children}</>;
  }

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

  // Show authentication required
  if (!isAuthenticated) {
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

  // User is authenticated, show the app
  return (
    <div className="whop-app-container">
      {/* Optional Whop user info bar */}
      {user && (
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