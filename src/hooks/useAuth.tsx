
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useAuth = (redirectPath = "/auth", requireAuth = false) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hasRedirected, setHasRedirected] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener FIRST
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (!mounted) return;

        if (event === "SIGNED_OUT") {
          setUser(null);
          setHasRedirected(false);
          if (requireAuth && !hasRedirected) {
            setHasRedirected(true);
            navigate(redirectPath);
          }
        } else if (event === "SIGNED_IN" && session) {
          setUser(session.user);
          setHasRedirected(false);
        } else if (event === "TOKEN_REFRESHED" && session) {
          setUser(session.user);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    const getUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (error) {
          console.error("Session error:", error);
          setUser(null);
          setLoading(false);
          return;
        }
        
        if (!session?.user && requireAuth && !hasRedirected) {
          setHasRedirected(true);
          toast({
            title: "Authentication Required",
            description: "Please sign in to access this feature",
            variant: "destructive",
          });
          navigate(redirectPath);
        } else if (session?.user) {
          setUser(session.user);
        }
        
        setLoading(false);
      } catch (error: any) {
        console.error("Authentication error:", error);
        if (!mounted) return;
        
        setUser(null);
        setLoading(false);
        
        if (requireAuth && !hasRedirected) {
          setHasRedirected(true);
          toast({
            title: "Authentication Error",
            description: "Please try signing in again",
            variant: "destructive",
          });
          navigate(redirectPath);
        }
      }
    };

    getUser();
    
    return () => {
      mounted = false;
      authListener?.subscription.unsubscribe();
    };
  }, [navigate, toast, redirectPath, requireAuth]);

  return { user, loading };
};
