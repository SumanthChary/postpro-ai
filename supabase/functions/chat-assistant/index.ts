
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, history = [] } = await req.json();
    
    if (!message?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Message content is required' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }

    // Use provided API key or fall back to environment variable
    const apiKey = Deno.env.get('GOOGLE_AI_API_KEY');
    
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

    // Convert chat history to Gemini format
    const formattedHistory = history.map((msg: {role: string; content: string}) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Create system prompt
    const systemPrompt = {
      role: "model",
      parts: [{ 
        text: `You are an expert social media assistant specialized in helping users create better content for platforms like LinkedIn, Twitter, Instagram, and Facebook. 
        
        Your knowledge includes:
        - Social media best practices
        - Content creation strategies
        - Engagement tactics
        - Platform-specific advice
        - Trend analysis
        - Hashtag optimization
        - Audience targeting
        
        Keep your responses helpful, concise (3-4 paragraphs maximum), and actionable. 
        When relevant, provide specific examples or templates.
        Always be encouraging and positive.`
      }]
    };

    // Add system prompt at the beginning
    const finalMessages = [systemPrompt, ...formattedHistory];
    
    // Add the new user message at the end
    finalMessages.push({
      role: "user",
      parts: [{ text: message }]
    });

    // Updated API URL for Gemini
    const apiUrl = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';
    
    const requestBody = {
      contents: finalMessages,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    };
    
    console.log('Sending request to Gemini:', JSON.stringify(requestBody));
    
    const response = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini API error (${response.status}):`, errorText);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to generate assistant response',
          details: errorText
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 502
        }
      );
    }
    
    const data = await response.json();
    const assistantResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!assistantResponse) {
      console.error('Empty response from Gemini:', data);
      return new Response(
        JSON.stringify({ error: 'Empty response from AI service' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 422
        }
      );
    }

    return new Response(
      JSON.stringify({ response: assistantResponse }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (error) {
    console.error('Error in chat-assistant function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred',
        stack: error.stack 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
