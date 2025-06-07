import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MAX_FREE_POSTS = 5;

const PLAN_LIMITS = {
  free: 5,
  weekly: Infinity,
  monthly: Infinity,
  yearly: Infinity,
  enterprise: Infinity,
};

const PLAN_FEATURES = {
  free: {
    maxPosts: 5,
    accessTemplates: true, // Changed to true for testing
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

async function getUserPlanAndPostCount(userId: string) {
  // Mock implementation - replace with actual database query
  console.log(`Getting plan for user: ${userId}`);
  return { plan: 'free', postCount: 1 }; // Allow requests for testing
}

async function fetchUserPlanFromDatabase(userId: string) {
  console.log(`Fetching plan for user: ${userId}`);
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

  const userPlan = await fetchUserPlanFromDatabase(userId);
  return PLAN_FEATURES[userPlan as keyof typeof PLAN_FEATURES] || PLAN_FEATURES['free'];
}

async function incrementPostCount(userId: string) {
  console.log(`Incrementing post count for user: ${userId}`);
}

serve(async (req) => {
  console.log('Request received:', req.method, req.url);
  
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

    // Get API key - try both environment variable names
    const apiKey = Deno.env.get('GOOGLE_AI_API_KEY') || Deno.env.get('GOOGLE_AI_KEY');
    if (!apiKey) {
      console.error('Google AI API key not found in environment variables');
      return new Response(JSON.stringify({ error: 'API configuration error - missing API key' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    console.log('API key found, proceeding with enhancement');

    // Check user plan and post count if userId is provided
    if (userId) {
      try {
        const { plan, postCount } = await getUserPlanAndPostCount(userId);
        const maxPosts = PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS] || 0;

        console.log(`User plan: ${plan}, postCount: ${postCount}, maxPosts: ${maxPosts}`);

        if (postCount >= maxPosts && maxPosts !== Infinity) {
          return new Response(JSON.stringify({
            error: `Post limit reached for your ${plan} plan. Upgrade to a higher plan to create more posts.`,
          }), {
            status: 403,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }

        await incrementPostCount(userId);
      } catch (error) {
        console.error('Error checking user plan:', error);
        // Continue execution for now, but log the error
      }
    }

    try {
      const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
      console.log(`Calling Gemini API at: ${apiUrl}`);
      
      // Generate content for each platform
      const generatePlatformContent = async (platform: string) => {
        let promptText = '';
        
        if (platform === 'linkedin') {
          promptText = `Transform this ${category} post into a highly engaging, ${styleTone} LinkedIn post that follows this EXACT line-by-line format and storytelling structure:

Original post: "${post}"

REQUIRED FORMAT STRUCTURE:
1. Start with a powerful, attention-grabbing opening line (like "Just Start. Wherever You Are. With Whatever You Have.")
2. Use single-line format - each sentence or thought on a separate line with proper spacing
3. Tell a compelling story with specific details, dates, or personal experiences
4. Use storytelling elements: "Back then...", "Today...", "Fast forward to..."
5. Include concrete examples and relatable struggles/challenges
6. Build emotional connection through vulnerability and authenticity
7. Show clear transformation/progress over time
8. End with an inspiring, actionable takeaway or call-to-action

EXAMPLE STRUCTURE TO FOLLOW:
[Powerful Opening Line]

[Personal story beginning - specific detail/memory]
[Context about the situation back then]
[Challenges and limitations faced]

[More specific struggles and obstacles]
[Details that make it relatable and human]

[Transition to present - "Fast forward to today" or similar]
[Clear progress and achievements made]
[Skills/knowledge gained over time]

[Reflection on the journey and what made the difference]

[Inspiring closing line that motivates action]

TONE REQUIREMENTS:
- ${styleTone} yet authentic and relatable
- Inspiring and motivational without being preachy
- Vulnerable but confident
- Include specific details that make it credible
- Use strategic line breaks for visual impact and readability
- Make every line count - avoid filler content

DO NOT:
- Use hashtags (they will be added separately)
- Use excessive emojis
- Make generic statements without backing them up
- Write in paragraph format

Write the enhanced LinkedIn post following this structure:`;
        } else if (platform === 'twitter') {
          promptText = `Transform this ${category} post into a compelling, ${styleTone} Twitter/X post.

Original post: "${post}"

Guidelines:
1. Keep under 280 characters - be concise and punchy
2. Use ${styleTone} tone that's engaging and shareable
3. Start with a strong hook
4. Include 1-2 relevant emojis
5. Add 2-3 trending hashtags
6. Make it tweet-worthy
7. End with engaging element

Write the enhanced Twitter post:`;
        } else if (platform === 'instagram') {
          promptText = `Transform this ${category} post into an engaging, ${styleTone} Instagram caption.

Original post: "${post}"

Guidelines:
1. Create ${styleTone} tone that's Instagram-native
2. Start with attention-grabbing opening
3. Use storytelling approach
4. Include strategic line breaks
5. Add 3-4 relevant emojis
6. Include clear call-to-action
7. End with 5-8 discoverable hashtags
8. Make it authentic and relatable

Write the enhanced Instagram caption:`;
        } else if (platform === 'facebook') {
          promptText = `Transform this ${category} post into an engaging, ${styleTone} Facebook post.

Original post: "${post}"

Guidelines:
1. Use ${styleTone} tone that encourages conversation
2. Write in personal, community-focused style
3. Add context and background
4. Use 2-3 relevant emojis
5. Include conversation starters
6. Keep paragraphs short
7. Add clear call-to-action
8. Use 1-2 hashtags maximum

Write the enhanced Facebook post:`;
        }
        
        const requestBody = {
          contents: [{
            parts: [{
              text: promptText
            }]
          }]
        };
        
        console.log(`Making API request for ${platform}`);
        
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
          const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          
          if (!generatedText) {
            console.error(`No text generated for ${platform}`);
            return null;
          }
          
          console.log(`Successfully generated content for ${platform}`);
          return generatedText;
        } catch (fetchError) {
          console.error(`Network error for ${platform}:`, fetchError);
          return null;
        }
      };
      
      // Process platforms in parallel with error handling
      console.log('Starting content generation for all platforms');
      const [linkedinResult, twitterResult, instagramResult, facebookResult] = await Promise.allSettled([
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

      if (linkedinResult.status === 'fulfilled' && linkedinResult.value) {
        platforms.linkedin = linkedinResult.value.trim();
      }
      if (twitterResult.status === 'fulfilled' && twitterResult.value) {
        platforms.twitter = twitterResult.value.trim();
      }
      if (instagramResult.status === 'fulfilled' && instagramResult.value) {
        platforms.instagram = instagramResult.value.trim();
      }
      if (facebookResult.status === 'fulfilled' && facebookResult.value) {
        platforms.facebook = facebookResult.value.trim();
      }
      
      console.log('Generated platforms:', Object.keys(platforms));
      
      if (Object.keys(platforms).length === 0) {
        console.error('No enhanced content generated for any platform');
        return new Response(JSON.stringify({ error: 'Failed to generate enhanced content for any platform' }), {
          status: 422,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      console.log('Successfully enhanced post for platforms:', Object.keys(platforms));
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
