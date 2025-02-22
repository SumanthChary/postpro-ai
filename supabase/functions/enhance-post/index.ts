
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    console.log('Starting enhance-post function');

    const apiKey = Deno.env.get('GOOGLE_AI_API_KEY');
    if (!apiKey) {
      console.error('Google AI API key not found');
      throw new Error('API key not configured');
    }

    const { post, category } = await req.json();
    console.log('Received request:', { post, category });

    if (!post?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Post content cannot be empty' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Making request to Google AI API');
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Enhance this professional ${category} post for social media. 
            Requirements:
            1. Keep it professional and impactful
            2. Focus on value and insights
            3. Include relevant statistics or data points if appropriate
            4. Add a clear call-to-action
            5. Structure it with a hook, context, key learning, and call to action
            6. Minimize emoji use (max 1-2 if truly appropriate)
            7. Make it sound natural and authentic
            8. Keep the essence of the original post while improving its impact
            
            Original post:
            ${post}`
          }]
        }]
      })
    });

    console.log('Google AI API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google AI API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`Google AI API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('Successfully received AI response');

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error('Invalid response format from AI:', data);
      throw new Error('Invalid response format from AI service');
    }

    const enhancedPost = data.candidates[0].content.parts[0].text;

    return new Response(
      JSON.stringify({ enhancedPost }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in enhance-post function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString()
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
