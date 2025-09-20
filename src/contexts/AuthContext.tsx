import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useReferralTracking } from '@/hooks/useReferralTracking';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { processReferral } = useReferralTracking();

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener FIRST
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession?.user?.email);
        
        if (!mounted) return;

        if (event === "SIGNED_OUT") {
          setUser(null);
          setSession(null);
        } else if (event === "SIGNED_IN" && currentSession) {
          setUser(currentSession.user);
          setSession(currentSession);
          
          // Process referral for new users
          const isNewUser = currentSession.user.created_at && 
            new Date(currentSession.user.created_at).getTime() > (Date.now() - 60000); // Within last minute
          
          if (isNewUser) {
            processReferral(currentSession.user.id, 'free');
          }
        } else if (event === "TOKEN_REFRESHED" && currentSession) {
          setUser(currentSession.user);
          setSession(currentSession);
        } else if (event === "INITIAL_SESSION" && currentSession) {
          setUser(currentSession.user);
          setSession(currentSession);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    const getInitialSession = async () => {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (error) {
          console.error("Session error:", error);
          setUser(null);
          setSession(null);
          setLoading(false);
          return;
        }
        
        if (initialSession?.user) {
          setUser(initialSession.user);
          setSession(initialSession);
        }
        
        setLoading(false);
      } catch (error: any) {
        console.error("Authentication error:", error);
        if (!mounted) return;
        
        setUser(null);
        setSession(null);
        setLoading(false);
      }
    };

    getInitialSession();
    
    return () => {
      mounted = false;
      authListener?.subscription.unsubscribe();
    };
  }, [processReferral]);

  const value: AuthContextType = {
    user,
    session,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};