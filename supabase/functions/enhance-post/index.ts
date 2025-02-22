
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
    console.log('Received request:', { post, category });

    if (!apiKey) {
      throw new Error('GOOGLE_AI_API_KEY is not configured');
    }

    if (!post) {
      throw new Error('Post content is required');
    }

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `As an expert in ${category} content creation, enhance this professional LinkedIn post to maximize engagement:

"${post}"

Instructions:
1. Maintain core message but make it more impactful
2. Add relevant emojis strategically
3. Improve structure with line breaks
4. Include 3-4 relevant hashtags
5. Keep professional tone
6. Focus on your expertise in ${category}
7. Add a clear call-to-action
8. Optimize for LinkedIn's algorithm

Format the response as a ready-to-post LinkedIn update.`
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
    console.log('AI Response:', data);

    if (!response.ok) {
      throw new Error(`AI API error: ${JSON.stringify(data.error || 'Unknown error')}`);
    }

    const enhancedPost = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!enhancedPost) {
      throw new Error('No enhanced content generated');
    }

    return new Response(
      JSON.stringify({
        platforms: {
          linkedin: enhancedPost.trim()
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
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
