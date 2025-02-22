
// Follow Deno deploy requirements
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
    const apiKey = Deno.env.get('GOOGLE_AI_API_KEY');
    if (!apiKey) {
      console.error('Google AI API key not found');
      throw new Error('API key not configured');
    }

    const { post, category } = await req.json();
    console.log('Processing request:', { post, category });

    if (!post?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Post content cannot be empty' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const prompt = `Enhance this ${category} social media post to be more engaging and professional while maintaining its core message.
    Make it sound natural and authentic.
    Add 1-2 relevant emojis if appropriate.
    Include a clear call-to-action.
    Original post: ${post}`;

    console.log('Sending request to Google AI API with prompt:', prompt);

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
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
    console.log('Received response from Google AI:', data);

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error('Invalid response format from AI:', data);
      throw new Error('Invalid response format from AI service');
    }

    const enhancedPost = data.candidates[0].content.parts[0].text.trim();
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
        error: 'Failed to enhance post',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
