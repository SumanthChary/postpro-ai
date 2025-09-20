
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuthContext } from "@/contexts/AuthContext";

export const useAuth = (redirectPath = "/auth", requireAuth = false) => {
  const { user, loading } = useAuthContext();
  const [hasRedirected, setHasRedirected] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (loading) return; // Don't redirect while still loading

    if (!user && requireAuth && !hasRedirected) {
      setHasRedirected(true);
      toast({
        title: "Authentication Required",
        description: "Please sign in to access this feature",
        variant: "destructive",
      });
      navigate(redirectPath);
    }
  }, [user, loading, requireAuth, hasRedirected, navigate, redirectPath, toast]);

  // Reset redirect flag when user logs in
  useEffect(() => {
    if (user && hasRedirected) {
      setHasRedirected(false);
    }
  }, [user, hasRedirected]);

  return { user, loading };
};
