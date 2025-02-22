
// Follow Deno deploy requirements
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const categoryEmojis: Record<string, string[]> = {
  business: ['💼', '📈', '🚀', '🎯', '💡', '🤝'],
  technology: ['💻', '🔧', '🌐', '⚡', '🤖', '📱'],
  lifestyle: ['✨', '🌟', '💫', '🎉', '💪', '🌈'],
  marketing: ['📣', '📊', '🎨', '💎', '📱', '🔍'],
  creative: ['🎨', '✏️', '🎭', '🎬', '📸', '🎯']
};

const trendingHashtags: Record<string, string[]> = {
  business: ['#BusinessGrowth', '#Entrepreneurship', '#Innovation', '#Leadership', '#StartupLife'],
  technology: ['#TechInnovation', '#AI', '#DigitalTransformation', '#FutureOfWork', '#Tech'],
  lifestyle: ['#PersonalGrowth', '#WorkLifeBalance', '#Mindfulness', '#WellnessJourney', '#Growth'],
  marketing: ['#DigitalMarketing', '#ContentStrategy', '#MarketingTips', '#SocialMedia', '#Branding'],
  creative: ['#CreativeProcess', '#Design', '#ArtisticVision', '#CreativeMindset', '#Innovation']
};

serve(async (req) => {
  // Handle CORS preflight requests
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

    // Get random emoji for the category
    const categorySpecificEmojis = categoryEmojis[category as keyof typeof categoryEmojis] || categoryEmojis.business;
    const selectedEmoji = categorySpecificEmojis[Math.floor(Math.random() * categorySpecificEmojis.length)];
    
    // Get relevant hashtags for the category
    const relevantHashtags = trendingHashtags[category as keyof typeof trendingHashtags] || trendingHashtags.business;
    const selectedHashtags = relevantHashtags
      .sort(() => 0.5 - Math.random()) // Shuffle array
      .slice(0, 3) // Select top 3 hashtags
      .join(' ');

    // Enhanced prompt for more engaging content
    const prompt = `
    Create an engaging and professional social media post based on this content. Follow these guidelines:
    
    Original Post: ${post}
    
    Requirements:
    1. Start with this emoji: ${selectedEmoji}
    2. Make the content more conversational and engaging
    3. Keep the authentic message but make it more impactful
    4. Add these relevant hashtags at the end: ${selectedHashtags}
    5. Do not use asterisks or other special formatting symbols
    6. Keep it professional and authentic
    7. Focus on value and insights
    8. Structure it with clear paragraphs
    
    The output should be ready to post as-is.
    `;
    
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

    console.log('API Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error:', {
        status: response.status,
        response: errorData
      });
      throw new Error(`API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    console.log('AI Response:', data);

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid API response format');
    }

    const enhancedPost = data.candidates[0].content.parts[0].text.trim();
    console.log('Enhanced post:', enhancedPost);

    return new Response(
      JSON.stringify({ enhancedPost }),
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
