export const paletteForScore = (score: number) => {
  if (score >= 80) {
    return {
      accent: "from-emerald-400 via-emerald-500 to-emerald-600",
      text: "text-emerald-600",
      progress: "bg-emerald-500",
    };
  }
  if (score >= 60) {
    return {
      accent: "from-amber-300 via-amber-400 to-orange-500",
      text: "text-amber-500",
      progress: "bg-amber-500",
    };
  }
  return {
    accent: "from-rose-300 via-rose-400 to-rose-500",
    text: "text-rose-500",
    progress: "bg-rose-500",
  };
};

export const formatPlatformLabel = (platform: string | null | undefined) => {
  if (!platform) return "Social";
  const normalized = platform.toLowerCase();
  if (normalized === "linkedin") return "LinkedIn";
  if (normalized === "twitter" || normalized === "x") return "X / Twitter";
  return "Social";
};

export const formatEngagementNumber = (value?: number | null) => {
  if (value === null || value === undefined) return null;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
};
