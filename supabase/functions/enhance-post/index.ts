
import { createServer } from 'http';
import dotenv from 'dotenv';

dotenv.config();

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

async function incrementPostCount(userId) {
  // Mocked function: Replace with actual database update to increment post count
  console.log(`Incrementing post count for user: ${userId}`);
}

const apiKey = process.env.GOOGLE_AI_API_KEY;
if (!apiKey) {
  console.error('API key not found');
  process.exit(1);
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
