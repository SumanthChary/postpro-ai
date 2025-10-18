import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Clock, Sparkles } from "lucide-react";
import type { EnhancePostResponse } from "@/components/post-enhancer/types";

interface EnhancementHistoryItem {
  id: string;
  original_post: string;
  enhanced_platforms: EnhancePostResponse["platforms"];
  category: string;
  style_tone: string;
  virality_score: number | null;
  insights: string[];
  view_reasons: string[];
  quick_wins: string[];
  created_at: string;
}

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const EmptyState = () => (
  <Card className="border-dashed">
    <CardContent className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <Sparkles className="h-8 w-8 text-primary" />
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">No enhancements saved yet</h3>
        <p className="text-sm text-muted-foreground">
          Enhance a post and we\'ll keep the full history here automatically.
        </p>
      </div>
      <Link to="/enhance">
        <Button>Enhance your first post</Button>
      </Link>
    </CardContent>
  </Card>
);

const LoadingState = () => (
  <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, index) => (
      <Card key={index}>
        <CardHeader className="space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
          <Skeleton className="h-3 w-3/5" />
        </CardContent>
      </Card>
    ))}
  </div>
);

const PostHistory = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<EnhancementHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    const { data, error: queryError } = await supabase
      .from("post_enhancements")
      .select("id, original_post, enhanced_platforms, category, style_tone, virality_score, insights, view_reasons, quick_wins, created_at")
      .order("created_at", { ascending: false })
      .limit(50);

    if (queryError) {
      setError("Failed to load enhancement history. Please try again.");
      setItems([]);
    } else {
      setItems((data as EnhancementHistoryItem[]) ?? []);
    }

    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchHistory();
    } else {
      setItems([]);
      setLoading(false);
    }
  }, [user, fetchHistory]);

  if (!user) {
    return (
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-4 py-16 text-center">
        <AlertCircle className="mx-auto h-10 w-10 text-destructive" />
        <div>
          <h1 className="text-2xl font-semibold">Sign in to view your history</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We securely store every enhancement you generate. Once you sign in, your full history will appear here.
          </p>
        </div>
        <div className="flex justify-center">
          <Link to="/auth">
            <Button>Sign in</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-5xl space-y-6 px-4 py-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Post enhancement history</h1>
          <p className="text-sm text-muted-foreground">Track every AI upgrade you\'ve generated and the tailored insights we delivered.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchHistory} disabled={loading}>
            Refresh
          </Button>
          <Link to="/enhance">
            <Button>New enhancement</Button>
          </Link>
        </div>
      </div>

      {loading && <LoadingState />}
      {!loading && error && (
        <Card>
          <CardContent className="flex items-center gap-3 py-6 text-sm text-destructive">
            <AlertCircle className="h-5 w-5" />
            {error}
          </CardContent>
        </Card>
      )}
      {!loading && !error && items.length === 0 && <EmptyState />}

      {!loading && !error && items.length > 0 && (
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-base font-semibold">{item.category} • {item.style_tone}</CardTitle>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary">Virality {Math.round(item.virality_score ?? 0)}</Badge>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {formatDate(item.created_at)}
                    </div>
                  </div>
                </div>
                <Link to="/enhance" className="text-sm text-primary hover:underline">
                  Re-run with fixes
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="mb-1 text-sm font-medium text-muted-foreground">Original post</h3>
                  <p className="rounded-md border border-dashed border-muted-foreground/30 bg-muted/40 p-3 text-sm text-muted-foreground whitespace-pre-wrap">
                    {item.original_post}
                  </p>
                </div>

                {item.view_reasons?.length ? (
                  <div>
                    <h4 className="mb-1 text-sm font-medium">Why it may not earn views</h4>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                      {item.view_reasons.slice(0, 3).map((reason, index) => (
                        <li key={index}>{reason}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {item.quick_wins?.length ? (
                  <div>
                    <h4 className="mb-1 text-sm font-medium">Quick wins delivered</h4>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                      {item.quick_wins.slice(0, 3).map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostHistory;
