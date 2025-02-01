import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Utility function for delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Retry function with exponential backoff
async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : Math.min(1000 * Math.pow(2, i), 10000);
        console.log(`Rate limited. Waiting ${waitTime}ms before retry ${i + 1}/${maxRetries}`);
        await sleep(waitTime);
        continue;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      const waitTime = Math.min(1000 * Math.pow(2, i), 10000);
      console.log(`Request failed. Waiting ${waitTime}ms before retry ${i + 1}/${maxRetries}`);
      await sleep(waitTime);
    }
  }
  throw new Error('Max retries reached');
}

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

    console.log('Processing text correction request:', { textLength: text.length });

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    const response = await fetchWithRetry(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that corrects spelling and grammar mistakes. Return only the corrected text without any explanations or quotes.'
            },
            {
              role: 'user',
              content: `Please correct any spelling or grammar mistakes in this text: ${text}`
            }
          ],
          temperature: 0.3,
        }),
      }
    );

    const data = await response.json();
    console.log('OpenAI API response structure:', {
      hasChoices: !!data.choices,
      choicesLength: data.choices?.length,
      hasMessage: !!data.choices?.[0]?.message,
    });

    if (!data.choices?.[0]?.message?.content) {
      console.error('Unexpected API response structure:', data);
      throw new Error('Invalid response structure from OpenAI API');
    }

    const correctedText = data.choices[0].message.content;
    console.log('Successfully processed correction:', {
      originalLength: text.length,
      correctedLength: correctedText.length,
    });

    return new Response(
      JSON.stringify({ correctedText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in correct-text function:', error);
    
    let errorMessage = 'An error occurred while processing your request';
    let status = 500;

    if (error.message.includes('429')) {
      errorMessage = 'Service is currently busy. Please try again in a few moments.';
      status = 429;
    }

    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: errorMessage
      }),
      { 
        status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});