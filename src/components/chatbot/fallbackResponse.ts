const normalize = (value: string) => value.trim().replace(/\s+/g, " ");

const extractTheme = (message: string) => {
  const normalized = normalize(message).toLowerCase();
  if (normalized.includes("hashtag")) return "hashtags";
  if (normalized.includes("linkedin")) return "LinkedIn";
  if (normalized.includes("twitter")) return "Twitter";
  if (normalized.includes("content")) return "content";
  if (normalized.includes("engagement")) return "engagement";
  if (normalized.includes("hook")) return "hooks";
  return "social content";
};

const buildSuggestions = (theme: string) => {
  switch (theme.toLowerCase()) {
    case "hashtags":
      return [
        "Group your hashtags into audience (#Who), topic (#What) and outcome (#Why) so the algorithm understands the post context.",
        "Stick with 3-5 targeted hashtags—mix one broad tag with two niche tags to index in the right feeds.",
        "Refresh saved hashtag sets every quarter. Engagement data changes fast, especially on LinkedIn." 
      ];
    case "linkedin":
      return [
        "Open with a bold, specific hook—call out your audience or the burning problem in the first line.",
        "Structure posts with 2-3 short paragraphs or bullets. Keep line length friendly for mobile readers.",
        "Close with a question or next step. Comments in the first 90 minutes are the strongest signal." 
      ];
    case "twitter":
      return [
        "Use high-contrast language—verbs and numbers beat adjectives on X/Twitter.",
        "Thread idea? Make tweet one the punchline, tease the tactical detail in tweet two.",
        "Schedule threads when your followers are active—consistency wins the algorithm." 
      ];
    case "engagement":
      return [
        "Audit your first line. If readers don’t pause there, they’ll never see the CTA.",
        "Add one story or example. Concrete detail beats generic advice every single time.",
        "Reply to every meaningful comment in the first hour. It doubles perceived momentum." 
      ];
    default:
      return [
        "Clarify the promise. What transformation or takeaway does the reader get by the end?",
        "Swap vague claims for specifics. Numbers, timeframes, or named frameworks improve trust immediately.",
        "Give them something to do—reply, save, or DM. Algorithms reward depth of interaction." 
      ];
  }
};

export const generateChatFallbackResponse = (message: string) => {
  const theme = extractTheme(message);
  const suggestions = buildSuggestions(theme);
  const tidyMessage = normalize(message).slice(0, 220);
  const normalized = normalize(message).toLowerCase();
  const simpleGreeting = /^(hi|hey|hello|yo|hiya|hola|sup|good\s*(morning|afternoon|evening)?)$/i;

  if (simpleGreeting.test(normalized)) {
    return "Hey! I’m your social growth partner. Ask me what you’re working on and I’ll give you sharp, platform-ready ideas.";
  }

  return `Signal check: the main model is warming up, so here’s a quick, high-IQ plan you can run with right now.\n\nFocus: ${theme}\nReader prompt: “${tidyMessage || "What should I post?"}”\n\nTry this:\n• ${suggestions[0]}\n• ${suggestions[1]}\n• ${suggestions[2]}\n\nCome back with a result and I’ll riff deeper once the full assistant is ready.`;
};
