
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
    console.log('Processing request:', { post, category });

    if (!apiKey) {
      throw new Error('GOOGLE_AI_API_KEY is not configured');
    }

    if (!post || !category) {
      throw new Error('Post content and category are required');
    }

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Enhance this LinkedIn post to be more engaging and professional. Focus on ${category}:

"${post}"

Instructions:
1. Keep the core message
2. Add 2-3 relevant emojis
3. Improve structure with paragraphs
4. Add relevant hashtags
5. Keep professional tone
6. Add a clear call-to-action

Write ONLY the enhanced post, no explanations.`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      })
    });

    const data = await response.json();
    console.log('Gemini API response status:', response.status);

    if (!response.ok) {
      console.error('Gemini API error:', data);
      throw new Error(data.error?.message || 'Failed to generate enhanced post');
    }

    const enhancedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!enhancedText) {
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
