
// Required for fetch to work in Deno
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.1.3";

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
    console.log('Received request with:', { post, category });

    if (!post?.trim()) {
      throw new Error('Post content cannot be empty');
    }

    // Get relevant hashtags for the category
    const availableHashtags = hashtagsPerCategory[category] || [];
    const selectedHashtags = availableHashtags
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .join(' ');

    // Initialize Google AI
    const apiKey = Deno.env.get('GOOGLE_AI_API_KEY');
    if (!apiKey) {
      throw new Error('Google AI API key not configured');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    console.log('Initializing enhancement process...');

    const prompt = `Enhance this ${category} social media post. Make it more engaging and professional while maintaining its core message. Add appropriate emojis where relevant. Keep it concise.

Input: "${post}"

Guidelines:
- Improve clarity and readability
- Add 1-2 relevant emojis
- Keep professional tone
- Maintain original message
- Make it more engaging
- Keep it concise`;

    console.log('Sending prompt to Gemini');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const enhancedText = response.text();
    console.log('Received response from Gemini');

    // Combine enhanced text with hashtags
    const enhancedPost = `${enhancedText}\n\n${selectedHashtags}`;

    console.log('Final enhanced post:', enhancedPost);

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

