
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
    console.log('Received request to enhance post');
    const { post, category } = await req.json();
    
    if (!post || !category) {
      console.error('Missing required fields:', { post: !!post, category: !!category });
      throw new Error('Post content and category are required');
    }

    console.log('Enhancing post for category:', category);
    
    const systemPrompt = `You are a social media expert that enhances posts to maximize engagement. 
    Given a post and its category, improve it by:
    1. Adding relevant emojis strategically
    2. Improving readability with line breaks and formatting
    3. Adding 3-5 trending hashtags based on the category
    4. Maintaining the original message but making it more engaging
    5. Using bullet points or numbering if appropriate
    6. Keeping the tone professional yet friendly

    Category: ${category}`;

    console.log('Making request to OpenAI API');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
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
    return new Response(JSON.stringify({ 
      error: error.message || 'An unexpected error occurred while enhancing your post'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
