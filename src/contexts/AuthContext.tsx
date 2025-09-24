import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback, useMemo } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

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

  useEffect(() => {
    let mounted = true;
    let hasProcessedSession = false;

    const updateAuthState = useCallback((currentSession: Session | null, shouldSetLoading = true) => {
      if (!mounted) return;
      
      if (currentSession?.user) {
        setUser(currentSession.user);
        setSession(currentSession);
      } else {
        setUser(null);
        setSession(null);
      }
      
      if (shouldSetLoading) {
        setLoading(false);
      }
    }, []);

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (!mounted) return;
        
        // Prevent multiple processing of the same session
        if (event === "INITIAL_SESSION" && hasProcessedSession) {
          return;
        }
        
        if (event === "INITIAL_SESSION") {
          hasProcessedSession = true;
        }

        updateAuthState(currentSession);
      }
    );

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (error) {
          console.error("Session error:", error);
          updateAuthState(null);
          return;
        }
        
        hasProcessedSession = true;
        updateAuthState(initialSession);
      } catch (error: any) {
        console.error("Authentication error:", error);
        if (mounted) {
          updateAuthState(null);
        }
      }
    };

    getInitialSession();
    
    return () => {
      mounted = false;
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextType = useMemo(() => ({
    user,
    session,
    loading,
  }), [user, session, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};