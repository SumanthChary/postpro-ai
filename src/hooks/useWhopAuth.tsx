import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface WhopUser {
  id: string;
  username: string;
  email: string;
  profile_pic_url?: string;
  discord_id?: string;
}

interface WhopAuthState {
  user: WhopUser | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export const useWhopAuth = () => {
  const [authState, setAuthState] = useState<WhopAuthState>({
    user: null,
    loading: true,
    isAuthenticated: false,
  });
  const { toast } = useToast();

  // Check if user is coming from Whop (has community context)
  const isWhopContext = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has('whop_app_id') || urlParams.has('community_id') || window.parent !== window;
  }, []);

  // Get Whop context from URL parameters
  const getWhopContext = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      appId: urlParams.get('whop_app_id'),
      communityId: urlParams.get('community_id'),
      userId: urlParams.get('user_id'),
      token: urlParams.get('token'),
    };
  }, []);

  // Initialize Whop authentication
  const initializeWhopAuth = useCallback(async () => {
    console.log('Initializing Whop auth, isWhopContext:', isWhopContext());
    
    if (!isWhopContext()) {
      // For testing purposes, allow the app to work in standalone mode
      console.log('Not in Whop context, setting as not authenticated');
      setAuthState(prev => ({ ...prev, loading: false, isAuthenticated: false }));
      return;
    }

    try {
      const context = getWhopContext();
      console.log('Whop context:', context);
      
      if (context.token && context.userId) {
        // Verify token with Whop API
        const { data, error } = await supabase.functions.invoke('whop-api', {
          body: {
            action: 'getUserInfo',
            token: context.token,
          },
        });

        if (error) {
          throw error;
        }

        if (data?.success) {
          setAuthState({
            user: data.data,
            loading: false,
            isAuthenticated: true,
          });
          
          // Store user context
          localStorage.setItem('whop_context', JSON.stringify(context));
          localStorage.setItem('whop_user', JSON.stringify(data.data));
        }
      } else {
        // For testing, just set loading to false
        console.log('No token/userId in context, user needs to authenticate');
        setAuthState(prev => ({ ...prev, loading: false, isAuthenticated: false }));
      }
    } catch (error) {
      console.error('Whop auth initialization failed:', error);
      toast({
        title: 'Authentication Error',
        description: 'Failed to authenticate with Whop. Please try again.',
        variant: 'destructive',
      });
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, [isWhopContext, getWhopContext, toast]);

  // Redirect to Whop OAuth
  const redirectToWhopAuth = useCallback(() => {
    // Use hardcoded app ID since we can't access environment variables in browser
    const appId = 'app_tOxwzuc0RwXQfw';
    const redirectUri = encodeURIComponent(`${window.location.origin}/whop/callback`);
    const whopAuthUrl = `https://whop.com/oauth2/authorize?client_id=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=user:read`;
    
    if (window.parent !== window) {
      // If in iframe, use postMessage to parent
      window.parent.postMessage({
        type: 'whop_auth_redirect',
        url: whopAuthUrl,
      }, '*');
    } else {
      window.location.href = whopAuthUrl;
    }
  }, []);

  // Handle OAuth callback
  const handleWhopCallback = useCallback(async (code: string, state?: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }));

      const { data, error } = await supabase.functions.invoke('whop-auth', {
        body: { code, state },
      });

      if (error) {
        throw error;
      }

      if (data?.success) {
        setAuthState({
          user: data.user,
          loading: false,
          isAuthenticated: true,
        });

        // Store tokens
        localStorage.setItem('whop_user', JSON.stringify(data.user));
        localStorage.setItem('whop_tokens', JSON.stringify(data.whop_tokens));

        toast({
          title: 'Welcome!',
          description: `Successfully logged in as ${data.user.username}`,
        });

        return true;
      }
    } catch (error) {
      console.error('Whop callback error:', error);
      toast({
        title: 'Authentication Failed',
        description: 'Failed to complete authentication. Please try again.',
        variant: 'destructive',
      });
      setAuthState(prev => ({ ...prev, loading: false }));
      return false;
    }
  }, [toast]);

  // Sign out
  const signOut = useCallback(() => {
    localStorage.removeItem('whop_user');
    localStorage.removeItem('whop_tokens');
    localStorage.removeItem('whop_context');
    
    setAuthState({
      user: null,
      loading: false,
      isAuthenticated: false,
    });

    toast({
      title: 'Signed Out',
      description: 'You have been signed out successfully.',
    });
  }, [toast]);

  // Get user subscriptions
  const getUserSubscriptions = useCallback(async () => {
    if (!authState.isAuthenticated) return null;

    try {
      const { data, error } = await supabase.functions.invoke('whop-api', {
        body: { action: 'getUserSubscriptions' },
      });

      if (error) throw error;
      return data?.data || [];
    } catch (error) {
      console.error('Failed to get user subscriptions:', error);
      return null;
    }
  }, [authState.isAuthenticated]);

  // Initialize on mount
  useEffect(() => {
    // Check for stored user first
    const storedUser = localStorage.getItem('whop_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          loading: false,
          isAuthenticated: true,
        });
        return;
      } catch {
        localStorage.removeItem('whop_user');
      }
    }

    initializeWhopAuth();
  }, [initializeWhopAuth]);

  return {
    ...authState,
    isWhopContext: isWhopContext(),
    whopContext: getWhopContext(),
    signOut,
    redirectToWhopAuth,
    handleWhopCallback,
    getUserSubscriptions,
  };
};