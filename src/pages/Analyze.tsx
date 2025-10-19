import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SemiCircularGauge from "@/components/ui/SemiCircularGauge";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  ExternalLink,
  Link as LinkIcon,
  Loader2,
  RefreshCcw,
  Share2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatEngagementNumber, formatPlatformLabel, paletteForScore } from "@/utils/analysisUtils";

interface AnalysisAuthor {
  name?: string;
  handle?: string;
  avatarUrl?: string;
  followers?: number;
}

interface AnalysisMetrics {
  likes?: number;
  comments?: number;
  shares?: number;
  views?: number;
  bookmarks?: number;
  [key: string]: number | undefined;
}

interface AnalysisMetadata {
  postUrl: string | null;
  platform: string;
  postText: string;
  metrics: AnalysisMetrics;
  author: AnalysisAuthor;
  postedAt: string | null;
}

interface AnalysisResult {
  viralityScore: number;
  whyItWorked: string[];
  replicateTips: string[];
  source: string;
  metadata: AnalysisMetadata;
}

const USAGE_KEY = "postpro-ai:public-analysis-usage";
const EMAIL_KEY = "postpro-ai:public-analysis-email";

const buildSharePayload = (analysis: AnalysisResult, email: string | null) => ({
  analysis: {
    postUrl: analysis.metadata.postUrl,
    platform: analysis.metadata.platform,
    postText: analysis.metadata.postText,
    viralityScore: analysis.viralityScore,
    whyItWorked: analysis.whyItWorked,
    replicateTips: analysis.replicateTips,
    metrics: analysis.metadata.metrics,
    author: analysis.metadata.author,
    postedAt: analysis.metadata.postedAt,
    email,
    source: analysis.source,
  },
});

const Analyze = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [manualText, setManualText] = useState("");
  const [manualMode, setManualMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [usageCount, setUsageCount] = useState(0);
  const [savedEmail, setSavedEmail] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [shareState, setShareState] = useState<{ url: string; copied: boolean } | null>(null);
  const [shareLoading, setShareLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedUsage = Number(window.localStorage.getItem(USAGE_KEY) ?? 0);
    const storedEmail = window.localStorage.getItem(EMAIL_KEY);
    setUsageCount(Number.isFinite(storedUsage) ? storedUsage : 0);
    setSavedEmail(storedEmail ?? null);
    if (storedEmail) {
      setEmailInput(storedEmail);
    }
  }, []);

  const scorePalette = useMemo(() => {
    if (!analysis) return paletteForScore(70);
    return paletteForScore(analysis.viralityScore);
  }, [analysis]);

  const gaugeColor = useMemo(() => {
    const progressClass = scorePalette.progress || "";
    if (progressClass.includes("emerald")) return "#10B981";
    if (progressClass.includes("amber")) return "#F59E0B";
    if (progressClass.includes("rose")) return "#F43F5E";
    return "#2563EB";
  }, [scorePalette]);

  const scoreDescriptor = useMemo(() => {
    if (!analysis) return "Optimize your hook to boost reach.";
    const score = analysis.viralityScore;
    if (score >= 85) return "Viral-ready copy";
    if (score >= 70) return "Strong potential with light tweaks";
    if (score >= 50) return "Solid base—optimize next steps";
    return "Needs fresh storytelling to stand out";
  }, [analysis]);

  const handleAnalyze = useCallback(async () => {
    const trimmedUrl = url.trim();
    const trimmedText = manualText.trim();

    if (!trimmedUrl && !trimmedText) {
      setError("Paste a public post URL or provide the post text.");
      return;
    }

    if (manualMode && trimmedText.length < 20) {
      setError("Provide enough post text so we can score it accurately.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("analyze-public-post", {
        body: {
          url: trimmedUrl || undefined,
          postText: manualMode ? trimmedText : undefined,
        },
      });

      if (fnError) {
        throw fnError;
      }

      if (data?.requiresManualInput) {
        setManualMode(true);
        setError(data.message ?? "Paste the post text so we can analyze it.");
        setAnalysis(null);
        return;
      }

      if (!data?.success || !data.analysis) {
        throw new Error(data?.error || "Unexpected response.");
      }

      const received = data.analysis as AnalysisResult;
      const normalized: AnalysisResult = {
        viralityScore: received.viralityScore,
        whyItWorked: Array.isArray(received.whyItWorked) ? received.whyItWorked : [],
        replicateTips: Array.isArray(received.replicateTips) ? received.replicateTips : [],
        source: received.source,
        metadata: {
          postUrl: received.metadata?.postUrl ?? null,
          platform: received.metadata?.platform ?? "social",
          postText: received.metadata?.postText ?? "",
          metrics: (received.metadata?.metrics as AnalysisMetrics) ?? {},
          author: received.metadata?.author ?? {},
          postedAt: received.metadata?.postedAt ?? null,
        },
      };

      setAnalysis(normalized);
      setShareState(null);

      if (typeof window !== "undefined") {
        const nextUsage = usageCount + 1;
        setUsageCount(nextUsage);
        window.localStorage.setItem(USAGE_KEY, String(nextUsage));
        if (nextUsage >= 2 && !savedEmail) {
          setShowEmailModal(true);
        }
      }
    } catch (caught) {
      console.error(caught);
      setError(caught instanceof Error ? caught.message : "Unable to analyze this post right now.");
      setAnalysis(null);
    } finally {
      setLoading(false);
    }
  }, [url, manualText, manualMode, usageCount, savedEmail]);

  const handleReset = () => {
    setAnalysis(null);
    setError(null);
    setManualText("");
    setUrl("");
    setManualMode(false);
    setShareState(null);
  };

  const handleShare = async () => {
    if (!analysis) return;
    if (!savedEmail) {
      setShowEmailModal(true);
      return;
    }

    setShareLoading(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("share-public-analysis", {
        body: buildSharePayload(analysis, savedEmail),
      });

      if (fnError) {
        throw fnError;
      }

      if (!data?.success || !data.shareUrl) {
        throw new Error(data?.error || "Unable to create share link.");
      }

      setShareState({ url: data.shareUrl, copied: false });
      toast({
        title: "Share link ready",
        description: "Copy and drop it anywhere you want to showcase this breakdown.",
      });
    } catch (caught) {
      console.error(caught);
      toast({
        title: "Share failed",
        description: caught instanceof Error ? caught.message : "Something went wrong while generating the link.",
        variant: "destructive",
      });
    } finally {
      setShareLoading(false);
    }
  };

  const handleCopyShare = async () => {
    if (!shareState?.url) return;
    try {
      await navigator.clipboard.writeText(shareState.url);
      setShareState({ url: shareState.url, copied: true });
      toast({ title: "Copied", description: "Link copied to your clipboard." });
    } catch (error) {
      console.error(error);
      toast({ title: "Copy failed", description: "Copy it manually if the clipboard is blocked.", variant: "destructive" });
    }
  };

  const handleEmailSubmit = () => {
    const trimmed = emailInput.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmed)) {
      toast({ title: "Invalid email", description: "Enter a valid email address to unlock exports.", variant: "destructive" });
      return;
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem(EMAIL_KEY, trimmed);
    }

    setSavedEmail(trimmed);
    setShowEmailModal(false);
    toast({ title: "Email saved", description: "You can now export or share every analysis." });
  };

  const metricEntries = useMemo(() => {
    if (!analysis) return [] as Array<{ label: string; value: string }>;
    return Object.entries(analysis.metadata.metrics || {}).reduce<Array<{ label: string; value: string }>>(
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
    if (!analysis?.metadata.postedAt) return null;
    const date = new Date(analysis.metadata.postedAt);
    if (Number.isNaN(date.getTime())) return null;
    return date.toLocaleString();
  }, [analysis]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 text-center">
          <Badge className="mx-auto w-fit rounded-full bg-blue-600/10 px-4 py-1 text-sm font-semibold text-blue-700">
            Virality Predictor
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Predict your post’s breakout potential instantly
          </h1>
          <p className="mx-auto max-w-3xl text-base text-slate-600 sm:text-lg">
            Drop a LinkedIn or X URL, or paste the post copy. We translate it into a polished virality score with clear recommendations in seconds.
          </p>
        </div>

        <Card className="border-0 bg-white/95 shadow-2xl backdrop-blur-xl">
          <CardContent className="space-y-6 p-6 sm:p-9">
            <div className="flex flex-col gap-3">
              <Label htmlFor="post-url" className="text-sm font-semibold text-slate-700">
                Public post URL
              </Label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex-1">
                  <Input
                    id="post-url"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                    placeholder="https://www.linkedin.com/posts/..."
                    className="h-14 rounded-2xl border-blue-100 bg-white text-base shadow-inner focus-visible:ring-blue-500"
                  />
                </div>
                <Button
                  size="lg"
                  className="h-14 rounded-2xl bg-blue-600 text-base font-semibold shadow-lg hover:bg-blue-700"
                  onClick={handleAnalyze}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Predicting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Run Prediction
                    </span>
                  )}
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-2xl border border-blue-100 bg-blue-50/80 p-4 text-sm text-blue-800 sm:flex-row sm:items-center sm:justify-between">
              <span>
                Not public yet?{" "}
                <button className="font-semibold text-blue-700 underline-offset-4 hover:underline" onClick={() => setManualMode(true)}>
                  Paste the draft text instead.
                </button>
              </span>
              <div className="flex items-center gap-2 text-xs font-medium text-blue-600">
                <LinkIcon className="h-4 w-4" /> Supports LinkedIn &amp; X URLs
              </div>
            </div>

            {manualMode && (
              <div className="flex flex-col gap-3">
                <Label htmlFor="post-text" className="text-sm font-semibold text-slate-700">
                  Post text fallback
                </Label>
                <Textarea
                  id="post-text"
                  value={manualText}
                  onChange={(event) => setManualText(event.target.value)}
                  placeholder="Paste the full post copy here if the URL cannot be fetched."
                  className="min-h-[160px] rounded-2xl border-blue-100 bg-white shadow-inner focus-visible:ring-blue-500"
                />
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertTitle>We need a little more info</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {analysis && (
          <div className="space-y-8">
            <Card className="border-0 bg-gradient-to-tr from-blue-50/70 via-white to-white shadow-2xl">
              <CardHeader className="space-y-6">
                <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <SemiCircularGauge
                    value={analysis.viralityScore}
                    indicatorColor={gaugeColor}
                    trackColor="#e2e8f0"
                    label="Virality Score"
                    className="w-full lg:w-auto"
                  />
                  <div className="flex flex-col items-center gap-2 text-center lg:items-end lg:text-right">
                    <Badge className="rounded-full bg-blue-600/10 px-3 py-1 text-sm font-medium text-blue-700">
                      {formatPlatformLabel(analysis.metadata.platform)} insight
                    </Badge>
                    <p className={cn("text-base font-semibold", scorePalette.text)}>{scoreDescriptor}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500 text-center lg:text-left">
                  Balanced from hook strength, storytelling clarity, engagement signals, and creator credibility.
                </p>
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
                  <CardTitle className="text-xl font-semibold text-slate-800">How to replicate or improve</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-600">
                  {analysis.replicateTips.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 rounded-xl bg-slate-50/80 p-3">
                      <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-semibold text-emerald-600">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <p>{item}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 bg-gradient-to-r from-white via-blue-50 to-white shadow-lg">
              <CardContent className="flex flex-col gap-6 p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Post snapshot</p>
                    <h2 className="text-2xl font-bold text-blue-900">{formatPlatformLabel(analysis.metadata.platform)} breakdown</h2>
                    {formattedPostedAt && <p className="text-sm text-blue-700">Published {formattedPostedAt}</p>}
                    {analysis.metadata.postUrl && (
                      <Button asChild variant="link" className="px-0 text-sm text-blue-600">
                        <a href={analysis.metadata.postUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                          View original post <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-col items-start gap-2 rounded-2xl border border-blue-100 bg-white/80 p-4 text-sm text-blue-800">
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Author</p>
                    <p className="text-base font-semibold text-blue-900">{analysis.metadata.author.name || "Unknown"}</p>
                    {analysis.metadata.author.handle && <p>@{analysis.metadata.author.handle}</p>}
                    {analysis.metadata.author.followers && (
                      <p className="text-xs text-blue-700">
                        {formatEngagementNumber(analysis.metadata.author.followers)} followers
                      </p>
                    )}
                  </div>
                </div>
                <Separator />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Post content</p>
                    <p className="rounded-2xl border border-blue-100 bg-white/80 p-4 text-sm leading-relaxed text-blue-900 whitespace-pre-wrap">
                      {analysis.metadata.postText}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Engagement snapshot</p>
                    <div className="grid gap-3 rounded-2xl border border-blue-100 bg-white/80 p-4 text-sm text-blue-800">
                      {metricEntries.length ? (
                        metricEntries.map((metric) => (
                          <div key={metric.label} className="flex items-center justify-between">
                            <span className="font-medium text-blue-900">{metric.label}</span>
                            <span className="text-blue-600">{metric.value}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-blue-700">No public metrics provided. We estimated engagement from content signals.</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="rounded-full" onClick={handleReset}>
                  <RefreshCcw className="mr-2 h-4 w-4" /> Predict another post
                </Button>
                <Button
                  className="rounded-full bg-blue-600 font-semibold hover:bg-blue-700"
                  onClick={handleShare}
                  disabled={shareLoading}
                >
                  {shareLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating link...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Share2 className="h-4 w-4" />
                      Share prediction
                    </span>
                  )}
                </Button>
              </div>
              {shareState?.url && (
                <div className="flex flex-wrap items-center gap-3 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm shadow">
                  <span className="font-medium text-slate-700">Share link ready</span>
                  <code className="truncate text-xs text-slate-500">{shareState.url}</code>
                  <Button size="sm" variant="outline" className="rounded-full" onClick={handleCopyShare}>
                    {shareState.copied ? "Copied" : "Copy"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {!analysis && !loading && (
          <div className="rounded-3xl border border-dashed border-blue-200 bg-white/60 p-8 text-center text-slate-500">
            Paste a URL above to see a full viral breakdown in seconds.
          </div>
        )}
      </div>

      <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Unlock exports and share links</DialogTitle>
            <DialogDescription>
              Drop your email to save analyses, export, and share every breakdown. We will send occasional growth tips.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <Label htmlFor="analysis-email" className="text-sm font-medium text-slate-600">
              Email address
            </Label>
            <Input
              id="analysis-email"
              value={emailInput}
              onChange={(event) => setEmailInput(event.target.value)}
              placeholder="you@example.com"
              className="rounded-2xl border-blue-100 focus-visible:ring-blue-500"
            />
          </div>
          <DialogFooter className="flex flex-col gap-2 sm:flex-row">
            <Button variant="outline" className="flex-1" onClick={() => setShowEmailModal(false)}>
              Maybe later
            </Button>
            <Button className="flex-1 bg-blue-600 font-semibold hover:bg-blue-700" onClick={handleEmailSubmit}>
              Save &amp; unlock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Analyze;
