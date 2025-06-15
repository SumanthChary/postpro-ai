
import { PLAN_LIMITS, PLAN_FEATURES } from './config.ts';

export async function getUserPlanAndPostCount(userId: string) {
  console.log(`Getting plan for user: ${userId}`);
  return { plan: 'free', postCount: 1 };
}

export async function fetchUserPlanFromDatabase(userId: string) {
  console.log(`Fetching plan for user: ${userId}`);
  return 'free';
}

export async function getUserPlanFeatures(userId: string, email: string) {
  const creatorEmails = ['enjoywithpandu@gmail.com'];

  if (creatorEmails.includes(email)) {
    return {
      maxPosts: Infinity,
      accessTemplates: true,
      accessViralityTips: true,
      accessAdvancedAI: true,
      allFeatures: true,
      unlimited: true,
    };
  }

  const userPlan = await fetchUserPlanFromDatabase(userId);
  return PLAN_FEATURES[userPlan as keyof typeof PLAN_FEATURES] || PLAN_FEATURES['free'];
}

export async function incrementPostCount(userId: string) {
  console.log(`Incrementing post count for user: ${userId}`);
}

export async function checkUserPlanLimits(userId: string) {
  const { plan, postCount } = await getUserPlanAndPostCount(userId);
  const maxPosts = PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS] || 0;

  console.log(`User plan: ${plan}, postCount: ${postCount}, maxPosts: ${maxPosts}`);

  if (postCount >= maxPosts && maxPosts !== Infinity) {
    throw new Error(`Post limit reached for your ${plan} plan. Upgrade to a higher plan to create more posts.`);
  }

  await incrementPostCount(userId);
}
