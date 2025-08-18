import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CTASuggestion {
  text: string;
  url?: string;
  type: 'link' | 'text' | 'contact';
  reasoning: string;
  confidence: number;
  expectedImpact: string;
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

    // Analyze post and generate CTA suggestions using Google Gemini API
    const prompt = `
    Analyze this social media post and suggest 3-5 highly effective call-to-action (CTA) options that would maximize engagement and conversions.
    
    Post: "${post}"
    Category: "${category}"
    
    For each CTA suggestion, provide:
    1. The exact CTA text (actionable and engaging)
    2. Type (text/link/contact)
    3. Reasoning why it works for this content
    4. Confidence score (0.0-1.0)
    5. Expected impact description
    
    Return ONLY a JSON object with this exact structure:
    {
      "suggestions": [
        {
          "text": "What's your biggest challenge with [topic]?",
          "type": "text",
          "reasoning": "Encourages engagement and builds community discussion around the topic",
          "confidence": 0.85,
          "expectedImpact": "+30% comments"
        }
      ]
    }
    
    Consider these CTA strategies:
    - Questions that spark discussion
    - Offers for valuable resources
    - Personal connection invitations
    - Knowledge sharing requests
    - Experience sharing prompts
    
    Tailor CTAs to the ${category} category and ensure they feel natural to the content.
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
      
      // Fallback CTA suggestions based on category
      const fallbackCTAs: CTASuggestion[] = [
        {
          text: "What's your experience with this?",
          type: 'text',
          reasoning: 'Encourages sharing personal experiences and builds community engagement',
          confidence: 0.8,
          expectedImpact: '+25% comments'
        },
        {
          text: 'Share this if you found it valuable',
          type: 'text',
          reasoning: 'Simple sharing request that increases post reach',
          confidence: 0.75,
          expectedImpact: '+15% shares'
        },
        {
          text: 'Follow for more insights like this',
          type: 'text',
          reasoning: 'Helps grow follower base with value promise',
          confidence: 0.7,
          expectedImpact: '+10% follows'
        }
      ];
      
      return new Response(
        JSON.stringify({ suggestions: fallbackCTAs }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate the response structure
    if (!parsedResponse.suggestions || !Array.isArray(parsedResponse.suggestions)) {
      throw new Error('Invalid CTA suggestions format');
    }

    // Ensure each suggestion has the required fields
    const validatedSuggestions = parsedResponse.suggestions.map((suggestion: any) => ({
      text: suggestion.text || 'Share your thoughts!',
      url: suggestion.url || undefined,
      type: ['link', 'text', 'contact'].includes(suggestion.type) ? suggestion.type : 'text',
      reasoning: suggestion.reasoning || 'Encourages engagement',
      confidence: Math.min(1.0, Math.max(0.0, suggestion.confidence || 0.5)),
      expectedImpact: suggestion.expectedImpact || '+20% engagement'
    }));

    return new Response(
      JSON.stringify({ suggestions: validatedSuggestions }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-cta-suggestions function:', error);
    
    // Return fallback CTAs on error
    const fallbackCTAs: CTASuggestion[] = [
      {
        text: "What's your take on this?",
        type: 'text' as const,
        reasoning: 'Simple question to encourage discussion',
        confidence: 0.8,
        expectedImpact: '+20% comments'
      },
      {
        text: 'DM me if you have questions',
        type: 'contact' as const,
        reasoning: 'Creates opportunity for direct connection',
        confidence: 0.75,
        expectedImpact: '+15% DMs'
      }
    ];

    return new Response(
      JSON.stringify({ 
        suggestions: fallbackCTAs,
        error: 'Using fallback CTAs due to service unavailability' 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});