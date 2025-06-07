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
    accessTemplates: true,
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
  console.log(`Getting plan for user: ${userId}`);
  return { plan: 'free', postCount: 1 };
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

    const apiKey = Deno.env.get('GOOGLE_AI_API_KEY') || Deno.env.get('GOOGLE_AI_KEY');
    if (!apiKey) {
      console.error('Google AI API key not found in environment variables');
      return new Response(JSON.stringify({ error: 'API configuration error - missing API key' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    console.log('API key found, proceeding with enhancement');

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
      }
    }

    try {
      const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
      console.log(`Calling Gemini API at: ${apiUrl}`);
      
      const generatePlatformContent = async (platform: string) => {
        let promptText = '';
        
        if (platform === 'linkedin') {
          promptText = `Transform this ${category} post into a highly engaging, ${styleTone} LinkedIn post following this EXACT structure:

Original post: "${post}"

STRUCTURE REQUIREMENTS:
1. **Dynamic Hook** - Create a compelling opener that matches the post content:
   - For success stories: "Just achieved something incredible 🚀" or "Three years ago, I never imagined..."
   - For challenges/struggles: "Ever felt completely overwhelmed by..." or "That moment when reality hits..."
   - For tips/advice: "Here's what nobody tells you about..." or "After [X] years in [field]..."
   - For achievements: "Today marks a milestone..." or "Remember when [situation]..."
   - For business posts: "Building [something] taught me..." or "The hardest lesson in [field]..."
   - Use relevant emoji that fits the context

2. **Engaging Body** - Transform into story format with:
   - Single line breaks between key points
   - Strategic bullet points with ➡️ for challenges/pain points
   - Use ✅ for solutions/achievements/results
   - Use 👉 for key insights or important points
   - Include emotional relatability and personal touch
   - Make each line scannable and impactful

3. **Strong CTA** - End with engagement-driving questions:
   - "What's your experience with [topic]? 👇"
   - "Which point resonates most with you?"
   - "What would you add to this list?"
   - "Share your [relevant] story below!"

4. **Hashtags** - Separate with 3 line breaks, use 5-8 relevant hashtags

TONE & STYLE:
- ${styleTone} yet conversational and authentic
- Strategic emojis (3-5 total, not overwhelming)
- Story-driven with personal elements
- Include credibility and social proof
- Create urgency or curiosity

FORMATTING RULES:
- Each major thought = new line
- ➡️ for problems/challenges
- ✅ for wins/solutions
- 👉 for key insights
- Clear line spacing for readability

Write the enhanced LinkedIn post:`;
        } else if (platform === 'twitter') {
          promptText = `Create a compelling ${styleTone} Twitter/X post from: "${post}"

Requirements:
- Under 280 characters
- Strong hook opening
- Include 1-2 emojis
- Add 2-3 hashtags
- End with engagement element
- ${styleTone} tone

Enhanced Twitter post:`;
        } else if (platform === 'instagram') {
          promptText = `Transform into engaging ${styleTone} Instagram caption: "${post}"

Structure:
- Attention-grabbing opening
- Story format with line breaks
- 3-4 strategic emojis
- Clear call-to-action
- 5-8 hashtags at end
- ${styleTone} tone

Instagram caption:`;
        } else if (platform === 'facebook') {
          promptText = `Create ${styleTone} Facebook post from: "${post}"

Style:
- Personal, community-focused
- Conversational ${styleTone} tone
- 2-3 emojis
- Encourage discussion
- 1-2 hashtags maximum

Facebook post:`;
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
      
      console.log('Starting content generation for all platforms');
      const [linkedinResult, twitterResult, instagramResult, facebookResult] = await Promise.allSettled([
        generatePlatformContent('linkedin'),
        generatePlatformContent('twitter'),
        generatePlatformContent('instagram'),
        generatePlatformContent('facebook')
      ]);
      
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
