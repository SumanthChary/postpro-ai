
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const apiKey = Deno.env.get('GOOGLE_AI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { post, category } = await req.json();
    console.log('Starting enhance-post function with:', { post, category });

    if (!apiKey) {
      console.error('API key not found');
      return new Response(
        JSON.stringify({ error: 'API configuration error' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      );
    }

    if (!post?.trim() || !category?.trim()) {
      console.error('Missing required fields');
      return new Response(
        JSON.stringify({ error: 'Post content and category are required' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Enhance this ${category} post to be more engaging and professional: "${post}". Add relevant emojis and hashtags.`
            }]
          }]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API error:', errorText);
        return new Response(
          JSON.stringify({ error: `Failed to generate enhanced post: ${response.status}` }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 502
          }
        );
      }

      const data = await response.json();
      console.log('Gemini API response:', data);

      const enhancedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!enhancedText) {
        return new Response(
          JSON.stringify({ error: 'No enhanced content generated' }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 422
          }
        );
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
    } catch (apiError) {
      console.error('Error calling Gemini API:', apiError);
      return new Response(
        JSON.stringify({ error: 'Error processing with AI service', details: apiError.message }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 502
        }
      );
    }
  } catch (error) {
    console.error('Error in enhance-post function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'An unexpected error occurred' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
