
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const categoryEmojis: Record<string, string[]> = {
  business: ['💼', '📈', '🚀', '🎯', '💡', '🤝', '💪', '🌟', '🔥', '✨'],
  technology: ['💻', '🔧', '🌐', '⚡', '🤖', '📱', '🎮', '🔍', '💡', '🌟'],
  lifestyle: ['✨', '🌟', '💫', '🎉', '💪', '🌈', '🌺', '🎨', '🌿', '💝'],
  marketing: ['📣', '📊', '🎨', '💎', '📱', '🔍', '🎯', '💡', '🚀', '✨'],
  creative: ['🎨', '✏️', '🎭', '🎬', '📸', '🎯', '💫', '✨', '🌟', '🎪']
};

const platformStyles: Record<string, { tone: string, style: string }> = {
  linkedin: {
    tone: 'professional and insightful',
    style: 'Use industry terms, data-driven insights, and thought leadership perspective. Focus on professional growth and business value.'
  },
  twitter: {
    tone: 'concise and engaging',
    style: 'Keep it punchy, use conversation starters, and incorporate trending topics. Make it retweetable.'
  },
  instagram: {
    tone: 'visual and authentic',
    style: 'Create visual imagery through words, tell stories, and use relatable language. Make it inspirational and personal.'
  }
};

const trendingHashtags: Record<string, string[]> = {
  business: ['#BusinessGrowth', '#Entrepreneurship', '#Innovation', '#Leadership', '#StartupLife', '#BusinessStrategy', '#Success'],
  technology: ['#TechInnovation', '#AI', '#DigitalTransformation', '#FutureOfWork', '#Tech', '#Innovation', '#Digital'],
  lifestyle: ['#PersonalGrowth', '#WorkLifeBalance', '#Mindfulness', '#WellnessJourney', '#Growth', '#LifeGoals', '#Motivation'],
  marketing: ['#DigitalMarketing', '#ContentStrategy', '#MarketingTips', '#SocialMedia', '#Branding', '#MarketingStrategy', '#Growth'],
  creative: ['#CreativeProcess', '#Design', '#ArtisticVision', '#CreativeMindset', '#Innovation', '#Creativity', '#Inspiration']
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('GOOGLE_AI_API_KEY');
    if (!apiKey) {
      throw new Error('API key not configured');
    }

    const { post, category } = await req.json();
    console.log('Request payload:', { post, category });

    if (!post?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Post content cannot be empty' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Get multiple random emojis for the category
    const categorySpecificEmojis = categoryEmojis[category as keyof typeof categoryEmojis] || categoryEmojis.business;
    const selectedEmojis = Array.from({ length: 2 }, () => 
      categorySpecificEmojis[Math.floor(Math.random() * categorySpecificEmojis.length)]
    );
    
    // Get relevant hashtags for the category
    const relevantHashtags = trendingHashtags[category as keyof typeof trendingHashtags] || trendingHashtags.business;
    const selectedHashtags = relevantHashtags
      .sort(() => 0.5 - Math.random())
      .slice(0, 4)
      .join(' ');

    // Create platform-specific prompts
    const platforms = ['linkedin', 'twitter', 'instagram'];
    const platformPrompts = platforms.map(platform => {
      const style = platformStyles[platform];
      return `
      For ${platform.toUpperCase()}:
      Create a ${style.tone} post following these guidelines:
      
      Original Content: ${post}
      
      Style Requirements:
      1. ${style.style}
      2. Start with these emojis: ${selectedEmojis.join(' ')}
      3. Make it authentic and engaging
      4. End with these hashtags: ${selectedHashtags}
      5. Keep the core message intact
      6. Optimize for ${platform}'s audience
      
      Make it ready to post as-is.
      `;
    });

    // Process each platform's content
    const platformResults = await Promise.all(platformPrompts.map(async (prompt) => {
      console.log('Using prompt:', prompt);

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('API Error:', {
          status: response.status,
          response: errorData
        });
        throw new Error(`API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    }));

    const [linkedin, twitter, instagram] = platformResults;

    return new Response(
      JSON.stringify({ 
        platforms: {
          linkedin,
          twitter,
          instagram
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Enhancement failed',
        details: error.message
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
