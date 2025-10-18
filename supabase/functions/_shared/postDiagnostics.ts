import type { PlatformContent } from "../enhance-post/types.ts";

interface DiagnosticInputs {
  originalPost: string;
  category: string;
  styleTone: string;
  enhancedPlatforms?: PlatformContent;
}

export interface EngagementMetrics {
  comments: number;
  likes: number;
  shares: number;
  views: number;
  timeSpent: number;
  clickThrough: number;
  saveRate: number;
  viralCoefficient: number;
}

export interface PostDiagnostics {
  viralityScore: number;
  insights: string[];
  viewReasons: string[];
  engagementMetrics: EngagementMetrics;
  quickWins: string[];
  highlights: string[];
}

const clamp = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, Math.round(value)));
};

const hasHashtags = (text: string) => /#\w+/.test(text);

const hasQuestions = (text: string) => /\?/.test(text);

const hasCallToAction = (text: string) => /(comment|share|like|follow|join|click|try|sign up|discover|dm)/i.test(text);

const hasHook = (text: string) => /^(did you know|here's|imagine|what if|stop|ever felt|today|breaking|psa|real talk|let's talk)/i.test(text.trim());

const hasStructure = (text: string) => /\n\n|\n-|\d\./.test(text) || text.includes("•") || text.includes("-");

const hasEmojis = (text: string) => /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}]/u.test(text);

const measureLengthScore = (text: string) => {
  const length = text.trim().length;
  if (length < 80) return 45;
  if (length < 140) return 65;
  if (length < 260) return 85;
  if (length < 380) return 92;
  if (length < 480) return 88;
  return 75;
};

const buildViewReasons = (text: string, metrics: EngagementMetrics): string[] => {
  const reasons: string[] = [];
  if (!hasHook(text)) {
    reasons.push("The opening line lacks a strong hook to capture attention in the first second.");
  }
  if (!hasStructure(text)) {
    reasons.push("The post reads like a block of text; break it into punchy lines or bullets to improve skim-ability.");
  }
  if (!hasHashtags(text)) {
    reasons.push("No hashtags detected, which limits discovery beyond your existing followers.");
  }
  if (!hasCallToAction(text)) {
    reasons.push("There's no clear call-to-action prompting comments or clicks.");
  }
  if (metrics.shares < 55) {
    reasons.push("The shareability score is low; add a bold statement or statistic people will want to pass on.");
  }
  if (!hasEmojis(text)) {
    reasons.push("Consider adding a few relevant emojis to create visual contrast in the feed.");
  }
  return reasons.slice(0, 4);
};

const extractHighlights = (platforms?: PlatformContent): string[] => {
  if (!platforms) return [];
  const highlights: string[] = [];
  const linkedin = platforms.linkedin ?? "";
  if (linkedin.includes("👉")) highlights.push("Clear action steps highlighted for LinkedIn readers.");
  if (linkedin.includes("🔥") || linkedin.includes("🚀")) highlights.push("Energy and enthusiasm infused through emoji usage.");
  if (linkedin.length > 250) highlights.push("Long-form narrative ready for LinkedIn reach.");
  const twitter = platforms.twitter ?? "";
  if (twitter.includes("#")) highlights.push("Hashtag-rich Twitter caption for discoverability.");
  const instagram = platforms.instagram ?? "";
  if (instagram.includes("call to action")) highlights.push("Instagram caption includes an explicit call-to-action.");
  return highlights.slice(0, 3);
};

const buildQuickWins = (text: string): string[] => {
  const wins: string[] = [];
  if (!hasHook(text)) {
    wins.push("Rewrite the first sentence as a bold hook (e.g. 'Stop scrolling if...').");
  }
  if (!hasQuestions(text)) {
    wins.push("Add a question near the end to spark comments.");
  }
  if (!hasHashtags(text)) {
    wins.push("Drop in 3-5 niche hashtags so the algorithm knows who to show this to.");
  }
  if (!hasCallToAction(text)) {
    wins.push("Close with a call-to-action nudging readers to respond or DM you.");
  }
  if (!hasStructure(text)) {
    wins.push("Split long paragraphs into short skimmable lines.");
  }
  return wins.slice(0, 4);
};

export const generatePostDiagnostics = ({ originalPost, category, styleTone, enhancedPlatforms }: DiagnosticInputs): PostDiagnostics => {
  const baseScore = measureLengthScore(originalPost);
  let score = baseScore;

  if (hasHook(originalPost)) score += 6;
  if (hasStructure(originalPost)) score += 8;
  if (hasQuestions(originalPost)) score += 5;
  if (hasHashtags(originalPost)) score += 6;
  if (hasCallToAction(originalPost)) score += 7;
  if (hasEmojis(originalPost)) score += 3;
  if (styleTone === "professional") score += 2;
  if (category === "technology" || category === "business") score += 2;

  const insights: string[] = [];
  if (!hasHook(originalPost)) {
    insights.push("Open with a tension-filled hook to stop the scroll.");
  } else {
    insights.push("Strong hook detected—keep the first line punchy.");
  }

  if (!hasStructure(originalPost)) {
    insights.push("Break the post into short lines or bullets for easier skimming.");
  } else {
    insights.push("Great structure—easy to read in fast feeds.");
  }

  if (!hasHashtags(originalPost)) {
    insights.push("Add 3-5 targeted hashtags so the algorithm knows where to route it.");
  } else {
    insights.push("Hashtags look solid—helps with discovery.");
  }

  if (!hasCallToAction(originalPost)) {
    insights.push("Finish with a clear call-to-action inviting comments or shares.");
  } else {
    insights.push("CTA detected—good job nudging readers to respond.");
  }

  const engagementMetrics: EngagementMetrics = {
    comments: clamp(baseScore + (hasQuestions(originalPost) ? 20 : -10), 30, 95),
    likes: clamp(baseScore + (hasEmojis(originalPost) ? 10 : 0), 35, 95),
    shares: clamp(baseScore + (hasStructure(originalPost) ? 10 : -8), 25, 90),
    views: clamp(baseScore + (hasHook(originalPost) ? 15 : -12), 30, 97),
    timeSpent: clamp(baseScore + (hasStructure(originalPost) ? 8 : -5), 40, 90),
    clickThrough: clamp(baseScore + (hasCallToAction(originalPost) ? 12 : -8), 25, 85),
    saveRate: clamp(baseScore + (styleTone === "professional" ? 5 : 0), 20, 80),
    viralCoefficient: clamp(baseScore + (hasHashtags(originalPost) ? 10 : -10), 25, 95),
  };

  const viewReasons = buildViewReasons(originalPost, engagementMetrics);
  const quickWins = buildQuickWins(originalPost);
  const highlights = extractHighlights(enhancedPlatforms);

  return {
    viralityScore: clamp(score, 45, 98),
    insights,
    viewReasons,
    engagementMetrics,
    quickWins,
    highlights,
  };
};
