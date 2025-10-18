import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { generatePostDiagnostics } from "../_shared/postDiagnostics.ts";

// deno-lint-ignore-file no-explicit-any
// @ts-ignore: provided by Deno runtime
declare const Deno: any;

type Platform = "linkedin" | "twitter" | "x" | "unknown";

type ThirdPartyAuthor = {
  name?: string;
  handle?: string;
  avatarUrl?: string;
  followers?: number;
};

type ThirdPartyMetrics = {
  likes?: number;
  comments?: number;
  shares?: number;
  reposts?: number;
  views?: number;
  bookmarks?: number;
  impressions?: number;
};

type ThirdPartyPayload = {
  content?: string;
  text?: string;
  postText?: string;
  author?: ThirdPartyAuthor;
  metrics?: ThirdPartyMetrics;
  stats?: ThirdPartyMetrics;
  postedAt?: string;
  publishedAt?: string;
  platform?: string;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const detectPlatform = (url?: string): Platform => {
  if (!url) return "unknown";
  const normalized = url.toLowerCase();
  if (normalized.includes("linkedin.com")) return "linkedin";
  if (normalized.includes("twitter.com") || normalized.includes("x.com")) return "twitter";
  return "unknown";
};

const coerceNumber = (value: unknown): number | undefined => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return undefined;
};

const normalizeThirdPartyData = (payload: unknown) => {
  const root = (payload && typeof payload === "object" && !Array.isArray(payload) ? payload : {}) as Record<string, unknown>;
  const data = (root.data && typeof root.data === "object" && !Array.isArray(root.data) ? root.data : root) as ThirdPartyPayload;

  const content = data.content || data.text || data.postText || "";

  const sourceMetrics = data.metrics || data.stats || {};
  const metrics = {
    likes: coerceNumber((sourceMetrics as ThirdPartyMetrics).likes),
    comments: coerceNumber((sourceMetrics as ThirdPartyMetrics).comments),
    shares: coerceNumber((sourceMetrics as ThirdPartyMetrics).shares ?? (sourceMetrics as ThirdPartyMetrics).reposts),
    views: coerceNumber((sourceMetrics as ThirdPartyMetrics).views ?? (sourceMetrics as ThirdPartyMetrics).impressions),
    bookmarks: coerceNumber((sourceMetrics as ThirdPartyMetrics).bookmarks),
  };

  const authorData = (data.author && typeof data.author === "object" ? data.author : {}) as ThirdPartyAuthor;
  const author = {
    name: typeof authorData.name === "string" ? authorData.name : undefined,
    handle: typeof authorData.handle === "string" ? authorData.handle : undefined,
    avatarUrl: typeof authorData.avatarUrl === "string" ? authorData.avatarUrl : undefined,
    followers: coerceNumber(authorData.followers),
  };

  const rawPostedAt = data.postedAt || data.publishedAt;
  const postedAt = typeof rawPostedAt === "string" ? rawPostedAt : null;
  const platform = (data.platform || null) as string | null;

  return {
    content,
    metrics,
    author,
    postedAt,
    platform,
  };
};

const formatMetricsForPrompt = (metrics: ThirdPartyMetrics): string => {
  const parts: string[] = [];
  if (metrics.likes !== undefined) parts.push(`Likes: ${metrics.likes}`);
  if (metrics.comments !== undefined) parts.push(`Comments: ${metrics.comments}`);
  if (metrics.shares !== undefined) parts.push(`Shares: ${metrics.shares}`);
  if (metrics.views !== undefined) parts.push(`Views: ${metrics.views}`);
  if (metrics.bookmarks !== undefined) parts.push(`Bookmarks: ${metrics.bookmarks}`);
  return parts.join(", ");
};

const buildPrompt = (
  platform: Platform,
  postText: string,
  metrics: ThirdPartyMetrics,
  author: ThirdPartyAuthor,
  postedAt: string | null,
) => {
  const platformLabel = platform === "unknown" ? "social" : platform === "twitter" ? "X / Twitter" : "LinkedIn";
  const metricsSummary = formatMetricsForPrompt(metrics) || "No public metrics available";
  const authorSummary = [author.name, author.handle ? `(${author.handle})` : null, author.followers ? `${author.followers} followers` : null]
    .filter(Boolean)
    .join(" ");
  const postedSummary = postedAt ? new Date(postedAt).toISOString() : "Unknown";

  return `You are an elite social media analyst. Review the following ${platformLabel} post and score its viral potential.
Post text: """${postText}"""
Public metrics: ${metricsSummary}
Author: ${authorSummary || "Unknown"}
Published at: ${postedSummary}

Assess the hook, storytelling, structure, clarity, call-to-action, topical relevance, hashtag usage, and credibility.
Respond with strict JSON:
{
  "viralityScore": number between 0 and 100,
  "whyItWorked": ["insight 1", "insight 2", "insight 3"],
  "replicateTips": ["tip 1", "tip 2", "tip 3"]
}
Keep each bullet to 16 words or fewer and rooted in the post details.`;
};

const analyzeWithAI = async (
  platform: Platform,
  postText: string,
  metrics: ThirdPartyMetrics,
  author: ThirdPartyAuthor,
  postedAt: string | null,
) => {
  const apiKey = Deno.env.get("GOOGLE_AI_API_KEY") || Deno.env.get("GOOGLE_AI_KEY");
  if (!apiKey) return null;

  const prompt = buildPrompt(platform, postText, metrics, author, postedAt);
  const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

  const response = await fetch(`${apiUrl}?key=${apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.55,
        topP: 0.9,
        maxOutputTokens: 768,
      },
    }),
  });

  if (!response.ok) {
    console.error("Gemini request failed", await response.text());
    return null;
  }

  const body = await response.json();
  const aiResponse = body.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!aiResponse) return null;

  try {
    const cleaned = aiResponse.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    if (
      typeof parsed.viralityScore !== "number" ||
      !Array.isArray(parsed.whyItWorked) ||
      !Array.isArray(parsed.replicateTips)
    ) {
      return null;
    }

    return {
      viralityScore: Math.max(0, Math.min(100, Math.round(parsed.viralityScore))),
      whyItWorked: parsed.whyItWorked.slice(0, 4).map((item: unknown) => String(item).trim()).filter(Boolean),
      replicateTips: parsed.replicateTips.slice(0, 4).map((item: unknown) => String(item).trim()).filter(Boolean),
      source: "ai",
    };
  } catch (error) {
    console.error("Failed to parse AI response", error);
    return null;
  }
};

const buildFallback = (postText: string) => {
  const diagnostics = generatePostDiagnostics({
    originalPost: postText,
    category: "general",
    styleTone: "professional",
  });

  const whyItWorked = diagnostics.highlights.length
    ? diagnostics.highlights
    : [
        "Solid pacing keeps readers engaged",
        "Clear structure aids readability",
        "Actionable takeaways encourage saves",
      ];

  const replicateTips = diagnostics.quickWins.length
    ? diagnostics.quickWins
    : [
        "Sharpen the opening hook",
        "Add a strong call-to-action",
        "Use 3-5 relevant hashtags",
      ];

  return {
    viralityScore: diagnostics.viralityScore,
    whyItWorked,
    replicateTips,
    source: "fallback",
  };
};

const buildMetricsFallback = (text: string): ThirdPartyMetrics => {
  const diagnostics = generatePostDiagnostics({
    originalPost: text,
    category: "general",
    styleTone: "professional",
  });

  return {
    likes: diagnostics.engagementMetrics.likes,
    comments: diagnostics.engagementMetrics.comments,
    shares: diagnostics.engagementMetrics.shares,
    views: diagnostics.engagementMetrics.views,
  };
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { url, postText, platform: inputPlatform } = body as {
      url?: string;
      postText?: string;
      platform?: Platform;
    };

    if (!url && !postText) {
      return new Response(JSON.stringify({ success: false, error: "Provide a post URL or text." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let platform: Platform = inputPlatform ?? detectPlatform(url);
    let resolvedPostText = typeof postText === "string" ? postText.trim() : "";
    let author: ThirdPartyAuthor = {};
    let metrics: ThirdPartyMetrics = {};
    let postedAt: string | null = null;

    const thirdPartyUrl = Deno.env.get("SOCIAL_POST_API_URL");
    const thirdPartyKey = Deno.env.get("SOCIAL_POST_API_KEY");

    if (!resolvedPostText && url && thirdPartyUrl) {
      try {
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (thirdPartyKey) {
          headers.Authorization = `Bearer ${thirdPartyKey}`;
        }

        const response = await fetch(thirdPartyUrl, {
          method: "POST",
          headers,
          body: JSON.stringify({ url }),
        });

        if (response.ok) {
          const payload = await response.json();
          const normalized = normalizeThirdPartyData(payload);
          resolvedPostText = normalized.content?.trim() || "";
          metrics = normalized.metrics;
          author = normalized.author;
          postedAt = normalized.postedAt;
          if (normalized.platform && platform === "unknown") {
            platform = detectPlatform(normalized.platform);
          }
        } else {
          console.error("Third-party API failed", await response.text());
        }
      } catch (error) {
        console.error("Third-party fetch threw", error);
      }
    }

    if (!resolvedPostText) {
      return new Response(
        JSON.stringify({
          success: false,
          requiresManualInput: true,
          message: "Paste the full post text so we can run the analysis.",
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    if (!metrics.likes && !metrics.comments && !metrics.shares && !metrics.views) {
      metrics = { ...metrics, ...buildMetricsFallback(resolvedPostText) };
    }

    const aiResult = await analyzeWithAI(platform, resolvedPostText, metrics, author, postedAt);
    const analysis = aiResult ?? buildFallback(resolvedPostText);

    const responsePayload = {
      success: true,
      analysis: {
        viralityScore: analysis.viralityScore,
        whyItWorked: analysis.whyItWorked,
        replicateTips: analysis.replicateTips,
        source: analysis.source,
        metadata: {
          postUrl: url ?? null,
          platform,
          postText: resolvedPostText,
          metrics,
          author,
          postedAt,
        },
      },
    };

    return new Response(JSON.stringify(responsePayload), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("analyze-public-post error", error);
    return new Response(JSON.stringify({ success: false, error: "Unable to analyze post." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
