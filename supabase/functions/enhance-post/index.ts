
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const apiKey = Deno.env.get('GOOGLE_AI_API_KEY');

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
    console.log('Starting enhance-post function with:', { postLength: post?.length, category });

    if (!apiKey) {
      console.error('Google AI API key not found');
      throw new Error('API configuration error');
    }

    if (!post?.trim() || !category?.trim()) {
      throw new Error('Post content and category are required');
    }

    const prompt = `Enhance this professional ${category} post to be more engaging:

"${post}"

Instructions:
1. Keep the core message but make it more impactful
2. Add 2-3 relevant emojis
3. Improve structure with paragraphs
4. Add 3-4 relevant hashtags
5. Keep it professional
6. Add a call-to-action

Write ONLY the enhanced post, no explanations.`;

    console.log('Sending request to Gemini API...');
    
    const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    console.log('Gemini API response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error(errorData.error?.message || 'Failed to generate enhanced post');
    }

    const data = await response.json();
    console.log('Successful response from Gemini API');

    const enhancedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!enhancedText) {
      console.error('No content in response:', data);
      throw new Error('No enhanced content generated');
    }

    return new Response(
      JSON.stringify({
        platforms: {
          linkedin: enhancedText.trim()
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error in enhance-post function:', error);
    return new Response(
      JSON.stringify({
        error: error.message || 'Failed to enhance post'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
