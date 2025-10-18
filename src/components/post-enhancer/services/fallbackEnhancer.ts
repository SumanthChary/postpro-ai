import { EnhancePostResponse } from "../types";

const HASHTAG_SETS: Record<string, string[]> = {
  business: ["#Leadership", "#Growth", "#B2BMarketing", "#BusinessStrategy", "#LinkedInTips"],
  technology: ["#Tech", "#Innovation", "#AI", "#ProductBuild", "#FutureOfWork"],
  lifestyle: ["#Mindset", "#Productivity", "#Wellbeing", "#Habits", "#CreatorLife"],
  marketing: ["#Marketing", "#BrandStory", "#CustomerJourney", "#SocialSelling", "#DemandGen"],
  creative: ["#Design", "#Creativity", "#Storytelling", "#BuildInPublic", "#ContentDesign"],
  default: ["#ContentMarketing", "#AudienceGrowth", "#CreatorCommunity", "#BuildInPublic", "#PersonalBrand"]
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

const buildBulletPoints = (post: string) => {
  const sentences = post
    .split(/[\n.?!]+/)
    .map((line) => sentenceCase(line))
    .filter((line) => line.length > 4);

  if (sentences.length === 0) {
    return ["Clarify the core problem your audience is facing.", "Share a concrete example or data point.", "Close with a call-to-action so readers can respond."];
  }

  return sentences.slice(0, 4).map((sentence) => sentence.replace(/^[-•\s]+/, ""));
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
  const viralityScore = Math.max(48, Math.min(94, Math.round(58 + Math.min(wordCount, 280) * 0.12)));

  const viewReasons: string[] = [];
  if (wordCount < 60) viewReasons.push("The post is quite short, add a richer example to earn saves and comments.");
  if (wordCount > 250) viewReasons.push("LinkedIn readers skim fast—tighten the copy so the main point lands quickly.");
  if (!/[?]|call to action|cta|comment|reply|share/i.test(post)) viewReasons.push("Invite the reader to react or answer a question so the algorithm detects engagement early.");

  const quickWins = [
    "Start with a first-line hook that calls out your audience directly.",
    "Work in one specific example or metric to make the insight tangible.",
    "Finish with a directional CTA—ask for a reply, save, or DM to drive depth of engagement."
  ];

  const highlights = [
    `Clean ${category} insight packaged into ${bullets.length} scannable bullets.`,
    `Tone calibrated for a ${styleTone} delivery without sounding robotic.`
  ];

  const base = viralityScore;
  const engagementMetrics = {
    comments: Math.min(55, Math.round(base * 0.62)),
    likes: Math.min(82, Math.round(base * 0.9)),
    shares: Math.min(48, Math.round(base * 0.58)),
    views: Math.min(100, Math.round(base * 1.12)),
    timeSpent: Math.min(68, Math.round(40 + wordCount * 0.08)),
    clickThrough: Math.min(52, Math.round(30 + bullets.length * 4)),
    saveRate: Math.min(46, Math.round(28 + bullets.length * 3.5)),
    viralCoefficient: Math.min(41, Math.round(base / 2.6))
  };

  return {
    viralityScore,
    insights: [
      `Readers will grasp the core idea in under ${Math.max(30, Math.round(wordCount / 4))} seconds.`,
      `The structure balances narrative with bullet clarity for mobile skimmers.`
    ],
    viewReasons,
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
  const hook = sentenceCase(cleanedPost.split(/[\n.]/)[0] || "Here is a sharper version of your idea");
  const bullets = buildBulletPoints(cleanedPost);
  const hashtags = pickHashtags(category);
  const toneEmoji = STYLE_EMOJI[styleTone] ?? "✨";
  const cta = styleTone === "authoritative"
    ? "If this resonates, tell me how you're tackling it in 2025."
    : "What would you add? Drop your take so others can learn too.";

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
