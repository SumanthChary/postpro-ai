import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Clock, Loader2, Sparkles, Wand2 } from "lucide-react";
import type { EnhancePostResponse } from "@/components/post-enhancer/types";
import { loadEnhancementsLocally, type LocalEnhancementRecord } from "@/components/post-enhancer/services/localHistory";
import { cn } from "@/lib/utils";
import { formatPlatformLabel, paletteForScore } from "@/utils/analysisUtils";

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
  <div className="grid gap-4 lg:grid-cols-2">
    {Array.from({ length: 4 }).map((_, index) => (
      <Card key={index} className="border-0 bg-white/80 shadow-lg">
        <CardHeader className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
          <Skeleton className="h-3 w-2/3" />
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
  const isMountedRef = useRef(true);

  const runIfMounted = useCallback((callback: () => void) => {
    if (isMountedRef.current) {
      callback();
    }
  }, []);

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
    runIfMounted(() => {
      setLoading(true);
      setError(null);
    });

    const localRecords = loadEnhancementsLocally(user?.id);
    const mappedLocalRecords = localRecords.map(mapLocalRecord);

    if (!user) {
      runIfMounted(() => {
        setItems(sortHistoryItems(mappedLocalRecords));
        setLoading(false);
      });
      return;
    }

    try {
      const { data, error: queryError } = await supabase
        .from("post_enhancements")
        .select("id, original_post, enhanced_platforms, category, style_tone, virality_score, insights, view_reasons, quick_wins, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50);

      if (queryError) {
        throw queryError;
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
      runIfMounted(() => {
        setItems(combinedHistory);
        setError(null);
      });
    } catch (err) {
      console.error("Post history query failed", err);
      runIfMounted(() => {
        if (mappedLocalRecords.length) {
          setItems(sortHistoryItems(mappedLocalRecords));
          setError(null);
        } else {
          setItems([]);
          setError("Failed to load enhancement history. Please try again.");
        }
      });
    } finally {
      runIfMounted(() => {
        setLoading(false);
      });
    }
  }, [user, mapLocalRecord, runIfMounted]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  useEffect(() => () => {
    isMountedRef.current = false;
  }, []);

  const isGuest = !user;
  const headerDescription = isGuest
    ? "Review enhancements saved on this device. Sign in to sync them securely across sessions."
    : "Track every AI upgrade you've generated and the tailored insights we delivered.";

  const historyItems = useMemo(() =>
    items.map((item) => {
      const normalizedScore = typeof item.virality_score === "number" ? Math.round(item.virality_score) : 0;
      const palette = paletteForScore(normalizedScore || 60);
      const platformBadges = Object.entries(item.enhanced_platforms || {})
        .filter(([, value]) => Boolean(value))
        .map(([platform]) => formatPlatformLabel(platform));

      return {
        ...item,
        normalizedScore,
        palette,
        platformBadges,
      };
    }),
  [items]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 rounded-3xl border border-blue-100/80 bg-white/90 p-6 shadow-xl sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <Badge className="w-fit gap-1 bg-blue-600/10 text-blue-700">
              <Wand2 className="h-3.5 w-3.5" /> Post enhancer
            </Badge>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Post enhancement history</h1>
              <p className="max-w-2xl text-sm text-slate-500 sm:text-base">{headerDescription}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {isGuest && (
              <Link to="/auth">
                <Button variant="outline" className="rounded-full border-blue-600/40 text-blue-700 hover:bg-blue-50">
                  Sign in to sync
                </Button>
              </Link>
            )}
            <Button
              variant="secondary"
              onClick={fetchHistory}
              disabled={loading}
              className="rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {loading ? "Refreshing" : "Refresh"}
            </Button>
            <Link to="/enhance">
              <Button className="rounded-full bg-blue-600 px-6 font-semibold shadow-lg hover:bg-blue-700">
                New enhancement
              </Button>
            </Link>
          </div>
        </div>

        {loading && <LoadingState />}
        {!loading && error && (
          <Card className="border border-rose-200 bg-rose-50/80">
            <CardContent className="flex items-center gap-3 py-6 text-sm text-rose-600">
              <AlertCircle className="h-5 w-5" />
              {error}
            </CardContent>
          </Card>
        )}
        {!loading && !error && items.length === 0 && <EmptyState isGuest={isGuest} />}

        {!loading && !error && historyItems.length > 0 && (
          <div className="grid gap-6 lg:grid-cols-2">
            {historyItems.map((item) => (
              <Card key={item.id} className="border-0 bg-white/90 shadow-2xl">
                <CardHeader className="space-y-5">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-3">
                      <Badge className="rounded-full bg-blue-600/10 text-blue-700">
                        {item.category || "Category"}
                      </Badge>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock className="h-3.5 w-3.5" />
                        {formatDate(item.created_at)}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-semibold text-slate-900">
                      {item.style_tone || "Custom tone"}
                    </CardTitle>
                    {item.platformBadges.length ? (
                      <div className="flex flex-wrap gap-2">
                        {item.platformBadges.map((platform) => (
                          <Badge key={platform} variant="outline" className="rounded-full border-blue-200 text-xs text-blue-700">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-end justify-between">
                      <p className="text-sm font-medium text-slate-500">Virality potential</p>
                      <span className={cn("text-3xl font-bold", item.palette.text)}>
                        {item.normalizedScore || "--"}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={cn("h-full rounded-full", item.palette.progress)}
                        style={{ width: `${Math.min(Math.max(item.normalizedScore, 0), 100)}%` }}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Original post</p>
                    <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-4 text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
                      {item.original_post}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {item.view_reasons?.length ? (
                      <div className="space-y-3 rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600">Risks spotted</p>
                        <ul className="space-y-2 text-sm text-amber-700">
                          {item.view_reasons.slice(0, 3).map((reason, index) => (
                            <li key={index}>• {reason}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {item.quick_wins?.length ? (
                      <div className="space-y-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">Quick wins</p>
                        <ul className="space-y-2 text-sm text-emerald-700">
                          {item.quick_wins.slice(0, 3).map((tip, index) => (
                            <li key={index}>• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>

                  <Link to="/enhance" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
                    <Sparkles className="h-4 w-4" /> Re-run with refinements
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostHistory;
