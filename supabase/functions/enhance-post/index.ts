
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@google/generative-ai';

const hashtagsPerCategory = {
  business: [
    "#entrepreneurship", "#business", "#leadership", "#startup", "#success",
    "#innovation", "#entrepreneur", "#businesstips", "#motivation", "#mindset"
  ],
  technology: [
    "#tech", "#technology", "#innovation", "#AI", "#future",
    "#digital", "#coding", "#programming", "#software", "#techie"
  ],
  lifestyle: [
    "#lifestyle", "#motivation", "#mindfulness", "#wellness", "#growth",
    "#personaldevelopment", "#productivity", "#selfcare", "#goals", "#success"
  ],
  marketing: [
    "#marketing", "#socialmedia", "#digital", "#branding", "#strategy",
    "#marketingtips", "#content", "#marketingstrategy", "#business", "#growth"
  ],
  creative: [
    "#design", "#creative", "#art", "#inspiration", "#creativity",
    "#graphicdesign", "#designer", "#create", "#digitalart", "#artist"
  ]
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { post, category } = await req.json();
    console.log('Received request with post:', post, 'and category:', category);

    if (!post?.trim()) {
      throw new Error('Post content cannot be empty');
    }

    const availableHashtags = hashtagsPerCategory[category] || [];
    const selectedHashtags = availableHashtags
      .sort(() => 0.5 - Math.random())
      .slice(0, 5)
      .join(' ');

    const apiKey = Deno.env.get('GOOGLE_AI_API_KEY');
    if (!apiKey) {
      throw new Error('Google AI API key not configured');
    }

    const genAI = new createClient(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Enhance this ${category} social media post while maintaining its core message. 
    Make it more engaging and improve readability. Keep the tone professional but friendly.
    Original post: "${post}"`;

    console.log('Sending prompt to Gemini:', prompt);

    const result = await model.generateContent(prompt);
    const enhancedText = result.response.text();

    // Combine enhanced text with hashtags
    const enhancedPost = `${enhancedText}\n\n${selectedHashtags}`;

    console.log('Enhanced post:', enhancedPost);

    return new Response(
      JSON.stringify({ enhancedPost }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error in enhance-post function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to enhance post'
      }),
      { 
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});
