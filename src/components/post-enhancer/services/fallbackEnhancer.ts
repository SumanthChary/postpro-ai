import { EnhancePostResponse } from "../types";

type Diagnostics = NonNullable<EnhancePostResponse["diagnostics"]>;
type EngagementMetrics = Diagnostics["engagementMetrics"];

const HASHTAG_SETS: Record<string, string[]> = {
  business: ["#Leadership", "#Growth", "#RevenuePlay", "#B2BMarketing", "#LinkedInTips"],
  technology: ["#Tech", "#Innovation", "#AI", "#ProductBuild", "#FutureOfWork"],
  lifestyle: ["#Mindset", "#Productivity", "#Wellbeing", "#Habits", "#CreatorLife"],
  marketing: ["#Marketing", "#BrandStory", "#DemandGen", "#SocialSelling", "#CreatorEconomy"],
  creative: ["#Design", "#Creativity", "#Storytelling", "#BuildInPublic", "#ContentDesign"],
  default: ["#ContentMarketing", "#AudienceGrowth", "#CreatorCommunity", "#BuildInPublic", "#PersonalBrand"]
};

const AUDIENCE_HOOKS: Record<string, string> = {
  business: "Founders & operators",
  technology: "Builders shipping product",
  lifestyle: "Creators optimising their routines",
  marketing: "Revenue teams",
  creative: "Storytellers and designers",
  default: "Growth-minded creators"
};

const TONE_OPENERS: Record<string, string> = {
  professional: "here's the exact playbook",
  conversational: "this is the shortcut that's working right now",
  enthusiastic: "we just unlocked a repeatable win",
  authoritative: "the proven framework that removes guesswork"
};

const STYLE_EMOJI: Record<string, string> = {
  professional: "📊",
  conversational: "💬",
  enthusiastic: "🚀",
  authoritative: "🧠"
};

const sentenceCase = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const lower = trimmed.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

const pickHashtags = (category: string) => {
  const pool = HASHTAG_SETS[category as keyof typeof HASHTAG_SETS] ?? HASHTAG_SETS.default;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).join(" ");
};

const extractSentences = (post: string) =>
  post
    .split(/[\n.?!]+/)
    .map((line) => sentenceCase(line))
    .map((line) => line.replace(/^[−•\s]+/, ""))
    .filter((line) => line.length > 4);

const buildHook = (post: string, category: string, styleTone: string) => {
  const audience = AUDIENCE_HOOKS[category as keyof typeof AUDIENCE_HOOKS] ?? AUDIENCE_HOOKS.default;
  const opener = TONE_OPENERS[styleTone as keyof typeof TONE_OPENERS] ?? TONE_OPENERS.professional;
  const metricMatch = post.match(/(\d+%|\$\d+[\d,]*|\d+x|\d+\s?(?:days|hrs|hours|weeks))/i);
  const outcomeMatch = post.match(/(leads|pipeline|signups|engagement|sales|bookings|clients|revenue)/i);

  if (metricMatch && outcomeMatch) {
    return `${audience}: ${opener} that delivered ${metricMatch[0]} ${outcomeMatch[0].toLowerCase()}.`;
  }

  if (metricMatch) {
    return `${audience}: ${opener} that pulled ${metricMatch[0]} in results.`;
  }

  if (outcomeMatch) {
    return `${audience}: ${opener} for ${outcomeMatch[0].toLowerCase()} this quarter.`;
  }

  return `${audience}: ${opener} your competitors are quietly running.`;
};

const buildBulletPoints = (sentences: string[]) => {
  const defaults = [
    "Opportunity → Call out the needle-moving change your audience is chasing this month.",
    "Playbook → Break the move into 3 punchy steps so it feels replicable.",
    "Proof → Anchor it with a metric, screenshot, or micro-case study.",
    "Next Move → Signal what to do once they finish reading (comment, DM, or forward)."
  ];

  if (sentences.length === 0) {
    return defaults;
  }

  const clones = [...sentences];
  return defaults.map((template, index) => {
    const [label, fallback] = template.split("→");
    const payload = clones[index] ?? fallback;
    return `${label.trim()} → ${payload.trim()}`;
  });
};

const buildLinkedIn = (hook: string, bullets: string[], cta: string, hashtags: string, toneEmoji: string) => {
  const formattedBullets = bullets.map((line) => `• ${line}`).join("\n");
  return `${toneEmoji} ${hook}\n\n${formattedBullets}\n\n${cta}\n\n${hashtags}`.trim();
};

const buildTwitter = (hook: string, bullets: string[], hashtags: string) => {
  const base = [`${hook}`].concat(bullets.slice(0, 2)).concat([hashtags.split(" ").slice(0, 2).join(" ")]);
  let tweet = base.join("\n\n");
  if (tweet.length > 260) {
    tweet = tweet.slice(0, 257).trimEnd() + "…";
  }
  return tweet;
};

const buildInstagram = (hook: string, bullets: string[], cta: string, hashtags: string) => {
  const formattedBullets = bullets.map((line) => `✨ ${line}`).join("\n");
  return `${hook}\n\n${formattedBullets}\n\n${cta}\n\n${hashtags}`.trim();
};

const buildFacebook = (hook: string, bullets: string[], cta: string, hashtags: string) => {
  const paragraphs = bullets.map((line) => line).join("\n\n");
  return `${hook}\n\n${paragraphs}\n\n${cta}\n\n${hashtags}`.trim();
};

const buildDiagnostics = (post: string, category: string, styleTone: string, bullets: string[]): EnhancePostResponse["diagnostics"] => {
  const wordCount = post.split(/\s+/).filter(Boolean).length;
  const hasMetric = /(\d+%|\$\d+[\d,]*|\d+x)/.test(post);
  const hasParagraphs = /\n\n/.test(post);
  const hasCTA = /(?:comment|reply|dm|save|share|drop your take|tell me)/i.test(post);

  const structureBonus = bullets.length >= 4 ? 4 : bullets.length * 1.5;
  const metricBonus = hasMetric ? 3 : 0;
  const ctaBonus = hasCTA ? 2 : 0;
  const flowBonus = hasParagraphs ? 2 : 0;

  const viralityScore = Math.min(97, Math.max(90, Math.round(92 + structureBonus + metricBonus + ctaBonus + flowBonus - 4)));

  const viewReasons: string[] = [];
  if (!hasMetric) {
    viewReasons.push("Fix now → Drop a proof point (metric, client quote, or screenshot) so it feels real.");
  }
  if (!hasParagraphs) {
    viewReasons.push("Boost depth → Break the story into 2-3 short paragraphs for mobile skim speed.");
  }
  if (!hasCTA) {
    viewReasons.push("Fix now → End with a clear CTA (ask for a reply, DM, or save) to spark early engagement.");
  }

  const quickWins = [
    "Hook with the problem your audience complains about most this week.",
    "Show the play in motion—list the steps or ingredients they can copy immediately.",
    "Close with what to do next (reply, DM, share) so the algorithm sees depth fast."
  ];

  const highlights = [
    `${category.charAt(0).toUpperCase() + category.slice(1)} insight packaged into ${bullets.length} high-scan bullets.`,
    `Tone locked for a ${styleTone} delivery without reading like AI filler.`
  ];

  const normalizedBullets = Math.min(4, bullets.length);
  const engagementMetrics: EngagementMetrics = {
    comments: Math.min(90, Math.round(viralityScore * 0.95 + (hasCTA ? 4 : 0))),
    likes: Math.min(97, Math.round(viralityScore * 1.04)),
    shares: Math.min(88, Math.round(viralityScore * 0.82 + (hasMetric ? 2 : 0))),
    views: Math.min(100, Math.round(viralityScore * 1.1)),
    timeSpent: Math.min(82, Math.round(66 + normalizedBullets * 3)),
    clickThrough: Math.min(85, Math.round(62 + normalizedBullets * 4 + (hasCTA ? 3 : 0))),
    saveRate: Math.min(82, Math.round(58 + normalizedBullets * 3.5 + (hasMetric ? 2 : 0))),
    viralCoefficient: Math.min(74, Math.round(viralityScore * 0.72))
  };

  return {
    viralityScore,
    insights: [
      `Expect a fast skim: readers hit the key idea in ~${Math.max(18, Math.round(wordCount / 5))} seconds.`,
      `The play shows steps + proof + CTA, the trio most correlated with viral lift.`
    ],
    viewReasons: viewReasons.slice(0, 2),
    quickWins,
    highlights,
    engagementMetrics
  };
};

export const generateFallbackEnhancement = (
  post: string,
  category: string,
  styleTone: string
): EnhancePostResponse => {
  const cleanedPost = post.trim();
  const sentences = extractSentences(cleanedPost);
  const hook = buildHook(cleanedPost, category, styleTone);
  const bullets = buildBulletPoints(sentences);
  const hashtags = pickHashtags(category);
  const toneEmoji = STYLE_EMOJI[styleTone] ?? "✨";
  const ctaMap: Record<string, string> = {
    authoritative: "If this resonates, tell me how you're tackling it in 2025.",
    professional: "Drop the play you're testing so we can compare notes.",
    conversational: "What part lands for you? Reply so we can swap ideas.",
    enthusiastic: "Save this for your next sprint and tell me how it lands!"
  };
  const cta = ctaMap[styleTone] ?? ctaMap.professional;

  const linkedin = buildLinkedIn(hook, bullets, cta, hashtags, toneEmoji);
  const twitter = buildTwitter(hook, bullets, hashtags);
  const instagram = buildInstagram(hook, bullets, cta, hashtags);
  const facebook = buildFacebook(hook, bullets, cta, hashtags);

  return {
    platforms: {
      linkedin,
      twitter,
      instagram,
      facebook
    },
    diagnostics: buildDiagnostics(cleanedPost, category, styleTone, bullets)
  };
};
