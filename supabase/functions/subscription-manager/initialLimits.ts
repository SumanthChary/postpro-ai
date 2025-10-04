export const getInitialLimits = (planName: string = 'STARTER', isAdmin: boolean = false) => {
  // Admin always gets unlimited access
  if (isAdmin) {
    return {
      monthly_post_limit: -1,
      has_premium_templates: true,
      has_virality_score: true,
      has_ab_testing: true,
      has_advanced_ai: true,
      has_priority_support: true,
      has_trending_hashtags: true,
      has_cta_generator: true,
      has_analytics: true,
      has_ai_chat: true,
      tone_options_limit: -1,
      credits_included: -1
    };
  }

  // Starter Plan - Limited features to encourage upgrades
  if (planName === 'STARTER') {
    return {
      monthly_post_limit: 30,
      has_premium_templates: false,
      has_virality_score: false,
      has_ab_testing: false,
      has_advanced_ai: false,
      has_priority_support: false,
      has_trending_hashtags: false,
      has_cta_generator: false,
      has_analytics: false,
      has_ai_chat: false,
      tone_options_limit: 5,
      credits_included: 30
    };
  }

  // Professional, Annual, and Lifetime Plans - Full access
  if (planName === 'PROFESSIONAL' || planName === 'PRO ANNUAL' || planName === 'LIFETIME CREATOR') {
    return {
      monthly_post_limit: -1, // unlimited
      has_premium_templates: true,
      has_virality_score: true,
      has_ab_testing: false, // Reserved for future enterprise tier
      has_advanced_ai: true,
      has_priority_support: true,
      has_trending_hashtags: true,
      has_cta_generator: true,
      has_analytics: true,
      has_ai_chat: true,
      tone_options_limit: 15,
      credits_included: -1
    };
  }

  // Default to Starter limits for unknown plans
  return {
    monthly_post_limit: 30,
    has_premium_templates: false,
    has_virality_score: false,
    has_ab_testing: false,
    has_advanced_ai: false,
    has_priority_support: false,
    has_trending_hashtags: false,
    has_cta_generator: false,
    has_analytics: false,
    has_ai_chat: false,
    tone_options_limit: 5,
    credits_included: 30
  };
};
