import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

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
    const { text } = await req.json();

    if (!text) {
      throw new Error('Text is required');
    }

    console.log('Sending request to OpenAI with text:', text);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that corrects spelling and grammar mistakes. Return only the corrected text without any explanations.'
          },
          {
            role: 'user',
            content: `Please correct any spelling or grammar mistakes in this text: "${text}"`
          }
        ],
      }),
    });

    const data = await response.json();
    console.log('OpenAI API response:', data);

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Unexpected API response structure:', data);
      throw new Error('Invalid response from OpenAI API');
    }

    const correctedText = data.choices[0].message.content.replace(/^["']|["']$/g, '');
    console.log('Corrected text:', correctedText);

    return new Response(
      JSON.stringify({ correctedText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in correct-text function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'An error occurred while processing your request'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});