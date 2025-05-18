
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useAuth = (redirectPath = "/auth", requireAuth = false) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST to prevent missing auth events
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          setUser(null);
          if (requireAuth) {
            navigate(redirectPath);
          }
        } else if (event === "SIGNED_IN" && session) {
          setUser(session.user);
        }
      }
    );

    // THEN check for existing session
    const getUser = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user && requireAuth) {
          toast({
            title: "Authentication Required",
            description: "Please sign in to access this feature",
            variant: "destructive",
          });
          navigate(redirectPath);
          return;
        }
        
        setUser(session?.user || null);
      } catch (error: any) {
        console.error("Authentication error:", error);
        if (requireAuth) {
          toast({
            title: "Authentication Error",
            description: error.message || "Failed to authenticate",
            variant: "destructive",
          });
          navigate(redirectPath);
        }
      } finally {
        setLoading(false);
      }
    };

    getUser();
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate, toast, redirectPath, requireAuth]);

  return { user, loading };
};
