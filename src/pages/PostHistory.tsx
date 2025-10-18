import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Clock, Sparkles } from "lucide-react";
import type { EnhancePostResponse } from "@/components/post-enhancer/types";
import { loadEnhancementsLocally, type LocalEnhancementRecord } from "@/components/post-enhancer/services/localHistory";

type PostEnhancementRow = Database["public"]["Tables"]["post_enhancements"]["Row"];

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

const toStringArray = (value: Database["public"]["Tables"]["post_enhancements"]["Row"]["insights"]): string[] => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }
  return [];
};

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getTimestampBucket = (timestamp: string) => {
  const parsed = Date.parse(timestamp);
  if (Number.isNaN(parsed)) return 0;
  return Math.floor(parsed / 60000);
};

const createHistoryKey = (item: EnhancementHistoryItem) => {
  const normalizedPost = item.original_post.trim();
  const normalizedCategory = item.category?.trim() ?? "";
  const normalizedTone = item.style_tone?.trim() ?? "";
  return `${normalizedPost}|${normalizedCategory}|${normalizedTone}|${getTimestampBucket(item.created_at)}`;
};

const sortHistoryItems = (items: EnhancementHistoryItem[]) =>
  [...items].sort((a, b) => {
    const first = Date.parse(b.created_at);
    const second = Date.parse(a.created_at);
    if (Number.isNaN(first) && Number.isNaN(second)) return 0;
    if (Number.isNaN(first)) return 1;
    if (Number.isNaN(second)) return -1;
    return first - second;
  });

const mergeHistoryRecords = (
  remote: EnhancementHistoryItem[],
  local: EnhancementHistoryItem[],
) => {
  const merged = new Map<string, EnhancementHistoryItem>();

  const addRecord = (record: EnhancementHistoryItem) => {
    merged.set(createHistoryKey(record), record);
  };

  local.forEach(addRecord);
  remote.forEach(addRecord);

  return sortHistoryItems(Array.from(merged.values()));
};

const EmptyState = ({ isGuest }: { isGuest: boolean }) => (
  <Card className="border-dashed shadow-sm">
    <CardContent className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <Sparkles className="h-8 w-8 text-primary" />
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">No enhancements saved yet</h3>
        <p className="text-sm text-muted-foreground">
          {isGuest
            ? "Enhance a post to start a local history. Sign in to sync it forever."
            : "Enhance a post and we'll keep the full history here automatically."}
        </p>
      </div>
      <div className="flex flex-col items-center gap-2 sm:flex-row">
        <Link to="/enhance">
          <Button>Enhance your first post</Button>
        </Link>
        {isGuest && (
          <Link to="/auth">
            <Button variant="outline">Sign in</Button>
          </Link>
        )}
      </div>
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

  const mapLocalRecord = useCallback((record: LocalEnhancementRecord): EnhancementHistoryItem => ({
    id: record.id,
    original_post: record.original_post,
    enhanced_platforms: record.enhanced_platforms,
    category: record.category,
    style_tone: record.style_tone,
    virality_score: record.virality_score,
    insights: record.insights ?? [],
    view_reasons: record.view_reasons ?? [],
    quick_wins: record.quick_wins ?? [],
    created_at: record.created_at,
  }), []);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError(null);

    const localRecords = loadEnhancementsLocally(user?.id);
    const mappedLocalRecords = localRecords.map(mapLocalRecord);

    if (!user) {
      setItems(sortHistoryItems(mappedLocalRecords));
      setLoading(false);
      return;
    }

    const { data, error: queryError } = await supabase
      .from("post_enhancements")
      .select("id, original_post, enhanced_platforms, category, style_tone, virality_score, insights, view_reasons, quick_wins, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);

    if (queryError) {
      console.error("Post history query failed", queryError);
      if (mappedLocalRecords.length) {
        setItems(sortHistoryItems(mappedLocalRecords));
        setError(null);
      } else {
        setItems([]);
        setError("Failed to load enhancement history. Please try again.");
      }
      setLoading(false);
      return;
    }

    const remoteRecords = (data ?? []).map((item: PostEnhancementRow) => ({
      id: item.id,
      original_post: item.original_post,
      enhanced_platforms: (item.enhanced_platforms ?? {}) as EnhancePostResponse["platforms"],
      category: item.category,
      style_tone: item.style_tone,
      virality_score: item.virality_score,
      insights: toStringArray(item.insights),
      view_reasons: toStringArray(item.view_reasons),
      quick_wins: toStringArray(item.quick_wins),
      created_at: item.created_at,
    }));

    const combinedHistory = mergeHistoryRecords(remoteRecords, mappedLocalRecords);
    setItems(combinedHistory);
    setLoading(false);
  }, [user, mapLocalRecord]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const isGuest = !user;
  const headerDescription = isGuest
    ? "Review enhancements saved on this device. Sign in to sync them securely across sessions."
    : "Track every AI upgrade you've generated and the tailored insights we delivered.";

  return (
    <div className="mx-auto min-h-screen max-w-5xl space-y-6 px-4 py-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Post enhancement history</h1>
          <p className="text-sm text-muted-foreground">{headerDescription}</p>
        </div>
        <div className="flex gap-2">
          {isGuest && (
            <Link to="/auth">
              <Button variant="secondary">Sign in</Button>
            </Link>
          )}
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
      {!loading && !error && items.length === 0 && <EmptyState isGuest={isGuest} />}

      {!loading && !error && items.length > 0 && (
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="shadow-sm border border-slate-100">
              <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-base font-semibold text-slate-900 break-words">
                    {item.category} • {item.style_tone}
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="tracking-wide">
                      Virality {Math.round(item.virality_score ?? 0)}
                    </Badge>
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <Clock className="h-3.5 w-3.5" />
                      {formatDate(item.created_at)}
                    </div>
                  </div>
                </div>
                <Link to="/enhance" className="text-sm text-primary hover:underline whitespace-nowrap">
                  Re-run with fixes
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="mb-1 text-sm font-medium text-muted-foreground">Original post</h3>
                  <p className="rounded-md border border-dashed border-muted-foreground/30 bg-muted/40 p-3 text-sm text-muted-foreground whitespace-pre-wrap break-words">
                    {item.original_post}
                  </p>
                </div>

                {item.view_reasons?.length ? (
                  <div>
                    <h4 className="mb-1 text-sm font-medium text-slate-800">Why it may not earn views</h4>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                      {item.view_reasons.slice(0, 3).map((reason, index) => (
                        <li key={index}>{reason}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {item.quick_wins?.length ? (
                  <div>
                    <h4 className="mb-1 text-sm font-medium text-slate-800">Quick wins delivered</h4>
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
