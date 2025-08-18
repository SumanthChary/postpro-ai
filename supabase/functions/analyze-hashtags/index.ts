import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface HashtagSuggestion {
  tag: string;
  relevance: number;
  trendStrength: 'hot' | 'rising' | 'steady';
  category: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { post, category } = await req.json();

    if (!post?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Post content is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const GOOGLE_AI_API_KEY = Deno.env.get('GOOGLE_AI_API_KEY');
    if (!GOOGLE_AI_API_KEY) {
      console.error('GOOGLE_AI_API_KEY not found');
      return new Response(
        JSON.stringify({ error: 'AI service configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Analyze hashtags using Google Gemini API
    const prompt = `
    Analyze this social media post and suggest 8-12 relevant hashtags for maximum engagement and visibility.
    
    Post: "${post}"
    Category: "${category}"
    
    For each hashtag suggestion, consider:
    1. Relevance to content (0.0-1.0 score)
    2. Current trend strength (hot/rising/steady)
    3. Category alignment
    
    Return ONLY a JSON object with this exact structure:
    {
      "suggestions": [
        {
          "tag": "hashtag_without_hash",
          "relevance": 0.95,
          "trendStrength": "hot",
          "category": "${category}"
        }
      ]
    }
    
    Focus on hashtags that:
    - Are currently trending and relevant
    - Match the content and category
    - Have strong engagement potential
    - Mix popular and niche tags for optimal reach
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GOOGLE_AI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      console.error('Google AI API error:', response.status, response.statusText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const aiData = await response.json();
    
    if (!aiData.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid AI response structure');
    }

    const aiText = aiData.candidates[0].content.parts[0].text;
    console.log('AI response:', aiText);

    // Clean and parse the JSON response
    let cleanedResponse = aiText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    // Handle potential markdown formatting
    if (cleanedResponse.includes('```')) {
      const jsonMatch = cleanedResponse.match(/```(?:json)?\n?([\s\S]*?)\n?```/);
      if (jsonMatch) {
        cleanedResponse = jsonMatch[1];
      }
    }

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('JSON parse error:', parseError, 'Raw response:', cleanedResponse);
      
      // Fallback hashtag suggestions
      const fallbackHashtags: HashtagSuggestion[] = [
        { tag: 'business', relevance: 0.8, trendStrength: 'hot', category },
        { tag: 'entrepreneur', relevance: 0.75, trendStrength: 'steady', category },
        { tag: 'success', relevance: 0.7, trendStrength: 'rising', category },
        { tag: 'motivation', relevance: 0.65, trendStrength: 'steady', category },
        { tag: 'leadership', relevance: 0.6, trendStrength: 'hot', category }
      ];
      
      return new Response(
        JSON.stringify({ suggestions: fallbackHashtags }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate the response structure
    if (!parsedResponse.suggestions || !Array.isArray(parsedResponse.suggestions)) {
      throw new Error('Invalid hashtag suggestions format');
    }

    // Ensure each suggestion has the required fields
    const validatedSuggestions = parsedResponse.suggestions.map((suggestion: any) => ({
      tag: suggestion.tag || 'defaultTag',
      relevance: Math.min(1.0, Math.max(0.0, suggestion.relevance || 0.5)),
      trendStrength: ['hot', 'rising', 'steady'].includes(suggestion.trendStrength) 
        ? suggestion.trendStrength : 'steady',
      category: suggestion.category || category
    }));

    return new Response(
      JSON.stringify({ suggestions: validatedSuggestions }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-hashtags function:', error);
    
    // Return fallback hashtags on error
    const fallbackHashtags: HashtagSuggestion[] = [
      { tag: 'content', relevance: 0.8, trendStrength: 'steady', category: category || 'general' },
      { tag: 'socialmedia', relevance: 0.75, trendStrength: 'hot', category: category || 'general' },
      { tag: 'engagement', relevance: 0.7, trendStrength: 'rising', category: category || 'general' },
      { tag: 'marketing', relevance: 0.65, trendStrength: 'steady', category: category || 'general' }
    ];

    return new Response(
      JSON.stringify({ 
        suggestions: fallbackHashtags,
        error: 'Using fallback hashtags due to service unavailability' 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});