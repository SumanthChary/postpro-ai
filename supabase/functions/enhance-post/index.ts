
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

    // Simplified prompt for Gemini 1.5 Flash
    const prompt = `Make this ${category} post more professional and engaging while keeping it authentic: ${post}`;
    console.log('Using prompt:', prompt);

    // Updated to use Gemini 1.5 Flash model
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

  } catch (error) {
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
