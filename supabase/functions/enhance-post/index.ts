
import { createServer } from 'http';
// Fix the dotenv import to use a URL
import 'https://deno.land/std@0.218.0/dotenv/load.ts';

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

async function handleReferralBonus(userId) {
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

async function getUserPlanAndPostCount(userId) {
  // Mocked function: Replace with actual database query to fetch user plan and post count
  return { plan: 'free', postCount: 3 }; // Example response
}

async function getUserPlanFeatures(userId, email) {
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
  return PLAN_FEATURES[userPlan] || PLAN_FEATURES['free'];
}

async function fetchUserPlanFromDatabase(userId) {
  // Mock function - replace with actual DB query
  return 'free';
}

async function incrementPostCount(userId) {
  // Mocked function: Replace with actual database update to increment post count
  console.log(`Incrementing post count for user: ${userId}`);
}

const apiKey = Deno.env.get("GOOGLE_AI_API_KEY");
if (!apiKey) {
  console.error('API key not found');
  throw new Error('API key not found');
}

createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  try {
    const { userId, post, category, styleTone = "professional" } = await req.json();
    console.log('Starting enhance-post function with:', { userId, post, category, styleTone });

    // Check user plan and post count
    const { plan, postCount } = await getUserPlanAndPostCount(userId);
    const maxPosts = PLAN_LIMITS[plan] || 0;

    if (postCount >= maxPosts) {
      res.writeHead(403, { 'Content-Type': 'application/json', ...corsHeaders });
      res.end(JSON.stringify({
        error: `Post limit reached for your ${plan} plan. Upgrade to a higher plan to create more posts.`,
      }));
      return;
    }

    // Check user plan and features
    const { maxPosts: planMaxPosts, accessTemplates } = await getUserPlanFeatures(userId);

    if (!accessTemplates) {
      res.writeHead(403, { 'Content-Type': 'application/json', ...corsHeaders });
      res.end(JSON.stringify({
        error: 'Upgrade to the Pro plan to access post templates.',
      }));
      return;
    }

    // Increment post count for the user
    await incrementPostCount(userId);

    if (!post?.trim() || !category?.trim()) {
      console.error('Missing required fields');
      res.writeHead(400, { 'Content-Type': 'application/json', ...corsHeaders });
      res.end(JSON.stringify({ error: 'Post content and category are required' }));
      return;
    }

    try {
      // Updated API URL for Gemini
      const apiUrl = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';
      console.log(`Calling Gemini API at: ${apiUrl}`);
      
      // Create separate prompts for each platform
      const generatePlatformContent = async (platform) => {
        let promptText = '';
        
        if (platform === 'linkedin') {
          promptText = `
          Transform this ${category} post into a highly engaging, ${styleTone} LinkedIn post. 
          
          Original post: "${post}"
          
          Follow these guidelines:
          1. Make it conversational and authentic with a ${styleTone} tone
          2. Use short paragraphs with line breaks between them for readability
          3. Include 3-5 relevant emojis throughout the post strategically
          4. Add a call to action at the end
          5. End with 3-5 relevant and trending hashtags in 2023 format (#word)
          6. Maintain the core message but make it more impactful
          7. Total length should be comparable to the original
          
          Format it exactly like a professional LinkedIn post with proper spacing and structure.
          `;
        } else if (platform === 'twitter') {
          promptText = `
          Transform this ${category} post into an engaging, ${styleTone} Twitter post. 
          
          Original post: "${post}"
          
          Follow these guidelines:
          1. Keep it concise (max 280 characters)
          2. Use ${styleTone} tone
          3. Include 1-2 relevant emojis
          4. Add 2-3 trending hashtags
          5. Make it conversational and shareable
          
          Format it exactly like a Twitter post.
          `;
        } else if (platform === 'instagram') {
          promptText = `
          Transform this ${category} post into an engaging, ${styleTone} Instagram caption. 
          
          Original post: "${post}"
          
          Follow these guidelines:
          1. Create a ${styleTone} tone caption
          2. Include line breaks for readability
          3. Add 4-5 relevant emojis strategically placed
          4. End with 5-7 hashtags that are relevant and discoverable
          5. Add a simple call to action
          
          Format it exactly like an Instagram caption.
          `;
        } else if (platform === 'facebook') {
          promptText = `
          Transform this ${category} post into an engaging, ${styleTone} Facebook post. 
          
          Original post: "${post}"
          
          Follow these guidelines:
          1. Use a ${styleTone} tone that encourages conversation
          2. Add 2-3 relevant emojis
          3. Keep paragraphs short with good spacing
          4. Include a question or call to action to boost engagement
          5. Use 1-2 hashtags maximum if relevant
          
          Format it exactly like a Facebook post with proper spacing.
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
      };
      
      // Process platforms in parallel
      const [linkedinText, twitterText, instagramText, facebookText] = await Promise.all([
        generatePlatformContent('linkedin'),
        generatePlatformContent('twitter'),
        generatePlatformContent('instagram'),
        generatePlatformContent('facebook')
      ]);
      
      // Fixing the platforms object type
      interface Platforms {
        linkedin?: string;
        twitter?: string;
        instagram?: string;
        facebook?: string;
      }

      // Initialize platforms with proper type
      const platforms: Platforms = {};

      if (linkedinText) platforms.linkedin = linkedinText.trim();
      if (twitterText) platforms.twitter = twitterText.trim();
      if (instagramText) platforms.instagram = instagramText.trim();
      if (facebookText) platforms.facebook = facebookText.trim();
      
      if (Object.keys(platforms).length === 0) {
        console.error('No enhanced content generated for any platform');
        res.writeHead(422, { 'Content-Type': 'application/json', ...corsHeaders });
        res.end(JSON.stringify({ error: 'No enhanced content generated' }));
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/json', ...corsHeaders });
      res.end(JSON.stringify({ platforms }));
    } catch (apiError) {
      console.error('Error calling Gemini API:', apiError);
      res.writeHead(502, { 'Content-Type': 'application/json', ...corsHeaders });
      res.end(JSON.stringify({ 
        error: 'Error processing with AI service', 
        details: apiError.message,
        stack: apiError.stack
      }));
    }
  } catch (error) {
    console.error('Error in enhance-post function:', error);
    res.writeHead(500, { 'Content-Type': 'application/json', ...corsHeaders });
    res.end(JSON.stringify({ 
      error: error.message || 'An unexpected error occurred',
      stack: error.stack 
    }));
  }
}).listen(3000, () => {
  console.log('Server running on port 3000');
});
