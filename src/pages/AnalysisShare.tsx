import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, RefreshCcw, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatEngagementNumber, formatPlatformLabel, paletteForScore } from "@/utils/analysisUtils";

interface SharedAnalysis {
  viralityScore: number;
  whyItWorked: string[];
  replicateTips: string[];
  postText: string;
  postUrl: string | null;
  platform: string | null;
  metrics: Record<string, number>;
  postedAt: string | null;
  authorName: string | null;
  authorHandle: string | null;
  authorFollowers: number | null;
  createdAt: string;
}

const AnalysisShare = () => {
  const { slug } = useParams<{ slug: string }>();
  const [analysis, setAnalysis] = useState<SharedAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!slug) {
        setError("Missing analysis reference.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const { data, error: queryError } = await supabase
        .from("public_post_analyses")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (queryError || !data) {
        setError("We could not find this analysis.");
        setAnalysis(null);
        setLoading(false);
        return;
      }

      const metricsJson = (data.metrics as Record<string, number>) ?? {};
      const why = Array.isArray(data.why_it_worked) ? (data.why_it_worked as string[]) : [];
      const replicate = Array.isArray(data.replicate_tips) ? (data.replicate_tips as string[]) : [];

      setAnalysis({
        viralityScore: data.virality_score,
        whyItWorked: why,
        replicateTips: replicate,
        postText: data.post_text ?? "",
        postUrl: data.post_url ?? null,
        platform: data.platform ?? null,
        metrics: metricsJson,
        postedAt: data.posted_at,
        authorName: data.author_name,
        authorHandle: data.author_handle,
        authorFollowers: data.author_followers,
        createdAt: data.created_at,
      });
      setLoading(false);
    };

    fetchAnalysis();
  }, [slug]);

  const scorePalette = useMemo(() => paletteForScore(analysis?.viralityScore ?? 70), [analysis]);

  const metricEntries = useMemo(() => {
    if (!analysis) return [] as Array<{ label: string; value: string }>;
    return Object.entries(analysis.metrics).reduce<Array<{ label: string; value: string }>>(
      (acc, [key, rawValue]) => {
        if (typeof rawValue !== "number") return acc;
        const formatted = formatEngagementNumber(rawValue);
        if (!formatted) return acc;
        acc.push({
          label: key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()),
          value: formatted,
        });
        return acc;
      },
      [],
    );
  }, [analysis]);

  const formattedPostedAt = useMemo(() => {
    if (!analysis?.postedAt) return null;
    const date = new Date(analysis.postedAt);
    if (Number.isNaN(date.getTime())) return null;
    return date.toLocaleString();
  }, [analysis]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (copyError) {
      console.error(copyError);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white via-sky-50 to-white">
        <div className="flex items-center gap-2 rounded-full border border-blue-100 bg-white px-6 py-3 text-sm text-slate-600 shadow">
          <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
          Loading the viral breakdown...
        </div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-white">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-16">
          <Alert variant="destructive">
            <AlertTitle>Analysis unavailable</AlertTitle>
            <AlertDescription>{error ?? "This share link has expired or never existed."}</AlertDescription>
          </Alert>
          <Button asChild className="w-fit rounded-full bg-blue-600 font-semibold hover:bg-blue-700">
            <Link to="/analyze">
              <RefreshCcw className="mr-2 h-4 w-4" /> Run your own prediction
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 text-center">
          <Badge className="mx-auto w-fit bg-blue-600/10 text-blue-700">Shared prediction</Badge>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {formatPlatformLabel(analysis.platform)} virality snapshot
          </h1>
          <p className="text-sm text-slate-500">Generated on {new Date(analysis.createdAt).toLocaleString()}</p>
        </div>

        <Card className="border-0 bg-white/90 shadow-2xl">
          <CardHeader className="space-y-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-lg text-slate-500">Virality Score</CardTitle>
                <p className={cn("text-4xl font-bold", scorePalette.text)}>{analysis.viralityScore}</p>
              </div>
              <Badge className="bg-blue-600/10 text-blue-700">
                {formatPlatformLabel(analysis.platform)} insight
              </Badge>
            </div>
            <div className="space-y-3">
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={cn("h-full rounded-full transition-all duration-500", scorePalette.progress)}
                  style={{ width: `${Math.min(Math.max(analysis.viralityScore, 0), 100)}%` }}
                />
              </div>
              <p className="text-sm text-slate-500">
                Scored from hook strength, structure, engagement metrics, author credibility, and topical relevance.
              </p>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-0 bg-white/90 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-800">Why it worked</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              {analysis.whyItWorked.map((item, index) => (
                <div key={index} className="flex items-start gap-3 rounded-xl bg-slate-50/80 p-3">
                  <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-xs font-semibold text-blue-700">
                    {index + 1}
                  </span>
                  <p>{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/90 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-800">Replicate or improve</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              {analysis.replicateTips.map((item, index) => (
                <div key={index} className="flex items-start gap-3 rounded-xl bg-slate-50/80 p-3">
                  <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-semibold text-emerald-600">
                    •
                  </span>
                  <p>{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 bg-gradient-to-r from-white via-blue-50 to-white shadow-lg">
          <CardContent className="space-y-6 p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Post snapshot</p>
                <h2 className="text-2xl font-bold text-slate-900">{formatPlatformLabel(analysis.platform)} breakdown</h2>
                {formattedPostedAt && <p className="text-sm text-slate-500">Published {formattedPostedAt}</p>}
                {analysis.postUrl && (
                  <Button asChild variant="link" className="px-0 text-sm text-blue-600">
                    <a href={analysis.postUrl} target="_blank" rel="noreferrer">
                      View original post
                    </a>
                  </Button>
                )}
              </div>
              <div className="rounded-2xl border border-blue-100 bg-white/80 p-4 text-sm text-slate-600">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Author</p>
                <p className="text-base font-semibold text-slate-900">{analysis.authorName || "Unknown"}</p>
                {analysis.authorHandle && <p>@{analysis.authorHandle}</p>}
                {analysis.authorFollowers && (
                  <p className="text-xs text-slate-500">{formatEngagementNumber(analysis.authorFollowers)} followers</p>
                )}
              </div>
            </div>
            <Separator />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Post content</p>
                <p className="rounded-2xl border border-blue-100 bg-white/80 p-4 text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
                  {analysis.postText}
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Engagement snapshot</p>
                <div className="grid gap-3 rounded-2xl border border-blue-100 bg-white/80 p-4 text-sm text-slate-600">
                  {metricEntries.length ? (
                    metricEntries.map((metric) => (
                      <div key={metric.label} className="flex items-center justify-between">
                        <span className="font-medium text-slate-700">{metric.label}</span>
                        <span className="text-slate-500">{metric.value}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No public metrics stored for this analysis.</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-3">
          <Button className="rounded-full bg-blue-600 font-semibold hover:bg-blue-700" onClick={handleCopyLink}>
            <Share2 className="mr-2 h-4 w-4" /> {copied ? "Link copied" : "Copy share link"}
          </Button>
          <Button variant="outline" asChild className="rounded-full">
            <Link to="/analyze">
              <RefreshCcw className="mr-2 h-4 w-4" /> Run your own prediction
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisShare;
