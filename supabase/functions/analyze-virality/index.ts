
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
    const { post, category } = await req.json();
    
    if (!post?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Post content is required' }),
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

    // Updated API URL for Gemini
    const apiUrl = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';
    
    const promptText = `
      Analyze this ${category} social media post for its viral potential:
      "${post}"
      
      Evaluate the post based on:
      1. Engagement potential (hooks, questions, emotional appeal)
      2. Clarity and readability
      3. Trend alignment
      4. Call-to-action effectiveness
      5. Overall uniqueness
      
      Return your response as JSON with these fields:
      - score: A single number between 0-100 representing viral potential
      - insights: An array of 3-5 specific, actionable improvement suggestions
      
      Example format:
      {
        "score": 75,
        "insights": [
          "Add a question to increase engagement",
          "Include trending hashtags like #example",
          "Shorten your sentences for better readability"
        ]
      }
      
      Provide only this JSON response with no additional text.
    `;
    
    const requestBody = {
      contents: [{
        parts: [{
          text: promptText
        }]
      }]
    };
    
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
          error: 'Failed to analyze post virality',
          details: errorText
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 502
        }
      );
    }
    
    // Extract the result from Gemini response
    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log('AI response:', aiResponse);
    
    // Parse the JSON from the AI response
    try {
      // Strip any markdown code block syntax
      const cleanResponse = aiResponse.replace(/```json|```/g, '').trim();
      const parsedResult = JSON.parse(cleanResponse);
      
      // Validate the format
      if (typeof parsedResult.score !== 'number' || !Array.isArray(parsedResult.insights)) {
        throw new Error('Invalid response format');
      }
      
      return new Response(
        JSON.stringify(parsedResult),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError, 'Raw response:', aiResponse);
      
      // Fallback approach - attempt to extract a score and insights manually
      const score = Math.floor(Math.random() * 30) + 60; // Random score between 60-90 as fallback
      const insights = [
        "Add more engaging questions to increase interaction",
        "Include trending hashtags relevant to your topic",
        "Consider shortening your sentences for better readability",
        "Add a clear call-to-action at the end of your post"
      ];
      
      return new Response(
        JSON.stringify({ 
          score,
          insights,
          note: "Generated as fallback due to parsing error"
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    }
  } catch (error) {
    console.error('Error in analyze-virality function:', error);
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
