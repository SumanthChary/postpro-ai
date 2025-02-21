
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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
    
    // Check for API key first
    if (!openAIApiKey) {
      console.error('OpenAI API key missing');
      throw new Error('OpenAI API key not configured');
    }

    // Parse request body and validate
    let requestData;
    try {
      requestData = await req.json();
    } catch (e) {
      console.error('Error parsing request body:', e);
      throw new Error('Invalid request body');
    }

    const { post, category } = requestData;
    
    if (!post || !category) {
      console.error('Missing required fields:', { post: !!post, category: !!category });
      throw new Error('Post content and category are required');
    }

    console.log('Enhancing post for category:', category);
    
    const systemPrompt = `You are a professional social media editor. Your task is to enhance the given post while following these steps in order:

    1. First, correct any spelling and grammar mistakes
    2. Improve readability with appropriate line breaks and formatting
    3. Add relevant emojis strategically to increase engagement
    4. Add 3-5 trending hashtags based on the category
    5. Keep the original message intent but make it more engaging
    
    Make the enhancements while considering this category: ${category}

    Your response should be just the enhanced post, no explanations needed.`;

    console.log('Making request to OpenAI API');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: post }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('Successfully received enhanced post from OpenAI');

    return new Response(JSON.stringify({ 
      enhancedPost: data.choices[0].message.content 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in enhance-post function:', error);
    
    // Return a proper error response
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred while enhancing your post'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
