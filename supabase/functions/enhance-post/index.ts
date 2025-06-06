
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MAX_FREE_POSTS = 5;

// Update logic to enforce limits based on user plans
const PLAN_LIMITS = {
  free: 5, // 5 Post Enhancements/Month
  weekly: Infinity, // Unlimited Post Enhancements
  monthly: Infinity, // Unlimited Post Enhancements
  yearly: Infinity, // Unlimited Post Enhancements
  enterprise: Infinity, // Unlimited Post Enhancements
};

const PLAN_FEATURES = {
  free: {
    maxPosts: 5,
    accessTemplates: false,
    accessViralityTips: false,
    accessAdvancedAI: false,
  },
  weekly: {
    maxPosts: Infinity,
    accessTemplates: true,
    accessViralityTips: true,
    accessAdvancedAI: false,
  },
  monthly: {
    maxPosts: Infinity,
    accessTemplates: true,
    accessViralityTips: true,
    accessAdvancedAI: true,
  },
  yearly: {
    maxPosts: Infinity,
    accessTemplates: true,
    accessViralityTips: true,
    accessAdvancedAI: true,
  },
  enterprise: {
    maxPosts: Infinity,
    accessTemplates: true,
    accessViralityTips: true,
    accessAdvancedAI: true,
    apiAccess: true,
  },
};

let referralBonusCount = 0; // Track the number of users who have received referral bonuses
const MAX_REFERRAL_BONUSES = 100; // Limit to the first 100 users

async function handleReferralBonus(userId: string) {
  if (referralBonusCount >= MAX_REFERRAL_BONUSES) {
    console.log(`Referral bonus limit reached. No more bonuses available.`);
    return 0; // No bonus if limit is reached
  }

  console.log(`Adding referral bonus for user: ${userId}`);
  const bonusPosts = 2; // Bonus posts for referring a new user

  // Increment the referral bonus count
  referralBonusCount++;

  // Update the user's post count or plan features in the database
  return bonusPosts;
}

async function getUserPlanAndPostCount(userId: string) {
  // Mocked function: Replace with actual database query to fetch user plan and post count
  return { plan: 'free', postCount: 3 }; // Example response
}

async function fetchUserPlanFromDatabase(userId: string) {
  // Mock implementation - replace with actual database query
  return 'free';
}

async function getUserPlanFeatures(userId: string, email: string) {
  const testingAccountEmail = 'enjoywithpandu@gmail.com';

  if (email === testingAccountEmail) {
    return {
      maxPosts: Infinity,
      accessTemplates: true,
      accessViralityTips: true,
      accessAdvancedAI: true,
      allFeatures: true,
    };
  }

  const userPlan = await fetchUserPlanFromDatabase(userId); // Replace with actual DB query
  return PLAN_FEATURES[userPlan as keyof typeof PLAN_FEATURES] || PLAN_FEATURES['free'];
}

async function incrementPostCount(userId: string) {
  // Mocked function: Replace with actual database update to increment post count
  console.log(`Incrementing post count for user: ${userId}`);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 204, 
      headers: corsHeaders 
    });
  }

  try {
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (error) {
      console.error('Invalid JSON in request:', error);
      return new Response(JSON.stringify({ error: 'Invalid JSON in request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const { userId, post, category, styleTone = "professional" } = requestBody;
    console.log('Starting enhance-post function with:', { userId, post, category, styleTone });

    // Validate required fields
    if (!post?.trim()) {
      console.error('Missing post content');
      return new Response(JSON.stringify({ error: 'Post content is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    if (!category?.trim()) {
      console.error('Missing category');
      return new Response(JSON.stringify({ error: 'Category is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Get API key
    const apiKey = Deno.env.get('GOOGLE_AI_API_KEY');
    if (!apiKey) {
      console.error('Google AI API key not found');
      return new Response(JSON.stringify({ error: 'API configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Check user plan and post count if userId is provided
    if (userId) {
      try {
        const { plan, postCount } = await getUserPlanAndPostCount(userId);
        const maxPosts = PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS] || 0;

        if (postCount >= maxPosts) {
          return new Response(JSON.stringify({
            error: `Post limit reached for your ${plan} plan. Upgrade to a higher plan to create more posts.`,
          }), {
            status: 403,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }

        // Check user plan and features
        const { accessTemplates } = await getUserPlanFeatures(userId, '');

        if (!accessTemplates) {
          return new Response(JSON.stringify({
            error: 'Upgrade to the Pro plan to access post templates.',
          }), {
            status: 403,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }

        // Increment post count for the user
        await incrementPostCount(userId);
      } catch (error) {
        console.error('Error checking user plan:', error);
        // Continue execution for now, but log the error
      }
    }

    try {
      // Updated API URL for Gemini
      const apiUrl = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';
      console.log(`Calling Gemini API at: ${apiUrl}`);
      
      // Create separate prompts for each platform
      const generatePlatformContent = async (platform: string) => {
        let promptText = '';
        
        if (platform === 'linkedin') {
          promptText = `
          Transform this ${category} post into a highly engaging, ${styleTone} LinkedIn post following modern LinkedIn best practices and writing style of top influencers like Nicolas Cole.
          
          Original post: "${post}"
          
          Follow these CRITICAL formatting guidelines:
          1. Use single-line format - each sentence or thought on a separate line (not paragraphs)
          2. Write like a 6-year experienced LinkedIn writer who understands modern social media
          3. Use ${styleTone} tone that's authentic and conversational yet professional
          4. Start with a strong hook that grabs attention in the first line
          5. Use strategic line breaks for visual appeal and readability
          6. Include 2-3 relevant emojis placed strategically (not overuse)
          7. Add a compelling call-to-action that encourages engagement
          8. End with 3-5 trending, relevant hashtags
          9. Keep it scannable - each line should be impactful
          10. Use storytelling elements where appropriate
          11. Make it relatable and actionable
          
          Format example:
          Hook line here 🚀
          
          Context or story line
          
          Key insight line
          
          Another valuable point
          
          Call to action question?
          
          #HashTag1 #HashTag2 #HashTag3
          
          Write the enhanced LinkedIn post now:
          `;
        } else if (platform === 'twitter') {
          promptText = `
          Transform this ${category} post into a compelling, ${styleTone} Twitter/X post that follows modern Twitter best practices.
          
          Original post: "${post}"
          
          Guidelines:
          1. Keep under 280 characters - be concise and punchy
          2. Use ${styleTone} tone that's engaging and shareable
          3. Start with a strong hook or controversial/interesting statement
          4. Include 1-2 relevant emojis
          5. Add 2-3 trending hashtags
          6. Make it tweet-worthy - something people want to retweet
          7. Use line breaks strategically if needed
          8. End with engaging element (question, call-to-action, or thought-provoking statement)
          
          Write the enhanced Twitter post now:
          `;
        } else if (platform === 'instagram') {
          promptText = `
          Transform this ${category} post into an engaging, ${styleTone} Instagram caption that drives engagement.
          
          Original post: "${post}"
          
          Guidelines:
          1. Create a ${styleTone} tone that's Instagram-native and engaging
          2. Start with an attention-grabbing opening line
          3. Use storytelling approach with personal touch
          4. Include strategic line breaks for visual appeal
          5. Add 3-4 relevant emojis throughout the caption
          6. Include a clear call-to-action for engagement
          7. End with 5-8 discoverable and trending hashtags
          8. Make it authentic and relatable to Instagram audience
          9. Encourage comments and saves
          
          Write the enhanced Instagram caption now:
          `;
        } else if (platform === 'facebook') {
          promptText = `
          Transform this ${category} post into an engaging, ${styleTone} Facebook post optimized for the platform.
          
          Original post: "${post}"
          
          Guidelines:
          1. Use ${styleTone} tone that encourages meaningful conversation
          2. Write in a more personal, community-focused style
          3. Add context and background information
          4. Use 2-3 relevant emojis
          5. Include conversation starters or questions
          6. Keep paragraphs short with good spacing
          7. Add a clear call-to-action that promotes engagement
          8. Use 1-2 hashtags maximum (Facebook users prefer fewer hashtags)
          9. Make it shareable and discussion-worthy
          
          Write the enhanced Facebook post now:
          `;
        }
        
        const requestBody = {
          contents: [{
            parts: [{
              text: promptText
            }]
          }]
        };
        
        console.log(`Request payload for ${platform}:`, JSON.stringify(requestBody));
        
        try {
          const response = await fetch(`${apiUrl}?key=${apiKey}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
          });
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error(`Gemini API error for ${platform} (${response.status}):`, errorText);
            return null;
          }
          
          const data = await response.json();
          return data.candidates?.[0]?.content?.parts?.[0]?.text;
        } catch (fetchError) {
          console.error(`Network error for ${platform}:`, fetchError);
          return null;
        }
      };
      
      // Process platforms in parallel with error handling
      const [linkedinText, twitterText, instagramText, facebookText] = await Promise.allSettled([
        generatePlatformContent('linkedin'),
        generatePlatformContent('twitter'),
        generatePlatformContent('instagram'),
        generatePlatformContent('facebook')
      ]);
      
      // Extract successful results
      interface Platforms {
        linkedin?: string;
        twitter?: string;
        instagram?: string;
        facebook?: string;
      }

      const platforms: Platforms = {};

      if (linkedinText.status === 'fulfilled' && linkedinText.value) {
        platforms.linkedin = linkedinText.value.trim();
      }
      if (twitterText.status === 'fulfilled' && twitterText.value) {
        platforms.twitter = twitterText.value.trim();
      }
      if (instagramText.status === 'fulfilled' && instagramText.value) {
        platforms.instagram = instagramText.value.trim();
      }
      if (facebookText.status === 'fulfilled' && facebookText.value) {
        platforms.facebook = facebookText.value.trim();
      }
      
      if (Object.keys(platforms).length === 0) {
        console.error('No enhanced content generated for any platform');
        return new Response(JSON.stringify({ error: 'Failed to generate enhanced content for any platform' }), {
          status: 422,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      return new Response(JSON.stringify({ platforms }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    } catch (apiError: any) {
      console.error('Error calling Gemini API:', apiError);
      return new Response(JSON.stringify({ 
        error: 'Error processing with AI service', 
        details: apiError.message
      }), {
        status: 502,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
  } catch (error: any) {
    console.error('Error in enhance-post function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An unexpected error occurred'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
});
