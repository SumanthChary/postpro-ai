export const getInitialLimits = (isAdmin: boolean = false) => ({
  monthly_post_limit: isAdmin ? -1 : 50, // -1 means unlimited, regular users get 50 posts
  has_premium_templates: true, // Give access to premium templates
  has_virality_score: true,
  has_ab_testing: isAdmin, // Admin-only feature
  has_advanced_ai: true,
  has_priority_support: isAdmin,
  credits_included: isAdmin ? -1 : 50 // -1 means unlimited
});
