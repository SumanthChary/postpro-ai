
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
    const requestData = await req.json();
    const { post, category } = requestData;
    
    console.log("🔍 Received analyze-virality request:", { 
      postLength: post?.length, 
      category,
      timestamp: new Date().toISOString()
    });
    
    // Validation
    if (!post?.trim()) {
      console.error("❌ Post content is required");
      return new Response(
        JSON.stringify({ error: 'Post content is required' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }

    if (post.trim().length < 10) {
      console.error("❌ Post content too short");
      return new Response(
        JSON.stringify({ error: 'Post content must be at least 10 characters' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }

    // Get API key from environment
    const apiKey = Deno.env.get('GOOGLE_AI_API_KEY');
    
    if (!apiKey) {
      console.error('❌ Google AI API key not configured');
      return new Response(
        JSON.stringify({ error: 'AI service configuration error' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      );
    }

    // Gemini API configuration
    const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
    
    const promptText = `
Analyze this ${category || 'general'} social media post for viral potential. Be precise and actionable.

POST: "${post}"

Evaluate based on:
1. Hook strength and attention-grabbing opening
2. Emotional resonance and relatability  
3. Shareability and discussion potential
4. Clarity and readability
5. Call-to-action effectiveness
6. Trending topic alignment
7. Visual appeal (if applicable)
8. Timing and relevance

Respond with ONLY this JSON format:
{
  "score": [number 0-100],
  "insights": [
    "Specific actionable improvement 1",
    "Specific actionable improvement 2", 
    "Specific actionable improvement 3",
    "Specific actionable improvement 4"
  ]
}

Make insights specific, actionable, and focused on viral growth tactics. No generic advice.
    `.trim();
    
    const requestBody = {
      contents: [{
        parts: [{
          text: promptText
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    };
    
    console.log("🚀 Sending request to Gemini API");
    
    const response = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Gemini API error (${response.status}):`, errorText);
      
      // Return intelligent fallback based on basic analysis
      const fallbackScore = generateFallbackScore(post, category);
      const fallbackInsights = generateFallbackInsights(post, category);
      
      console.log("🔄 Using intelligent fallback analysis");
      
      return new Response(
        JSON.stringify({ 
          score: fallbackScore,
          insights: fallbackInsights,
          source: "fallback_analysis"
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    }
    
    const data = await response.json();
    console.log("✅ Received response from Gemini API");
    
    // Extract and parse the AI response
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!aiResponse) {
      throw new Error('No response content from AI service');
    }
    
    // Parse JSON from AI response
    try {
      const cleanResponse = aiResponse.replace(/```json|```/g, '').trim();
      const parsedResult = JSON.parse(cleanResponse);
      
      // Validate response structure
      if (typeof parsedResult.score !== 'number' || 
          !Array.isArray(parsedResult.insights) ||
          parsedResult.score < 0 || parsedResult.score > 100) {
        throw new Error('Invalid AI response format');
      }
      
      // Ensure we have 3-5 insights
      if (parsedResult.insights.length < 3) {
        parsedResult.insights.push(
          "Add more engaging questions to increase interaction",
          "Include trending hashtags relevant to your topic"
        );
      }
      
      console.log("✅ Successfully parsed AI response:", {
        score: parsedResult.score,
        insightCount: parsedResult.insights.length
      });
      
      return new Response(
        JSON.stringify({
          score: Math.round(parsedResult.score),
          insights: parsedResult.insights.slice(0, 5), // Max 5 insights
          source: "ai_analysis"
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
      
    } catch (parseError) {
      console.error('❌ Error parsing AI response:', parseError);
      
      // Fallback to intelligent analysis
      const fallbackScore = generateFallbackScore(post, category);
      const fallbackInsights = generateFallbackInsights(post, category);
      
      return new Response(
        JSON.stringify({ 
          score: fallbackScore,
          insights: fallbackInsights,
          source: "fallback_after_parse_error"
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    }
    
  } catch (error) {
    console.error('❌ Error in analyze-virality function:', error);
    
    // Final fallback
    return new Response(
      JSON.stringify({ 
        score: 65,
        insights: [
          "Add a compelling hook in the first sentence",
          "Include relevant hashtags to increase discoverability", 
          "Add a clear call-to-action to boost engagement",
          "Consider adding emojis to make your post more visually appealing"
        ],
        source: "error_fallback",
        error: "Analysis service temporarily unavailable"
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  }
});

// Intelligent fallback score generation
function generateFallbackScore(post: string, category: string): number {
  let score = 50; // Base score
  
  // Length analysis
  if (post.length > 50 && post.length < 300) score += 10;
  if (post.length > 300) score -= 5;
  
  // Hook analysis
  if (post.match(/^(Did you know|Here's|Imagine|What if|Stop)/i)) score += 15;
  
  // Question analysis
  if (post.includes('?')) score += 10;
  
  // Emoji analysis
  if (post.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/u)) score += 8;
  
  // Hashtag analysis
  if (post.includes('#')) score += 12;
  
  // Urgency words
  if (post.match(/\b(now|today|urgent|limited|exclusive|secret)\b/i)) score += 8;
  
  // Call to action
  if (post.match(/\b(comment|share|like|follow|click|join|subscribe)\b/i)) score += 10;
  
  // Category bonus
  if (category === 'business' || category === 'technology') score += 5;
  
  return Math.min(Math.max(score, 30), 90); // Keep between 30-90
}

// Generate contextual insights based on post analysis
function generateFallbackInsights(post: string, category: string): string[] {
  const insights: string[] = [];
  
  // Hook analysis
  if (!post.match(/^(Did you know|Here's|Imagine|What if|Stop|Breaking)/i)) {
    insights.push("Start with a powerful hook like 'Did you know...' or 'Here's why...' to grab attention immediately");
  }
  
  // Question analysis
  if (!post.includes('?')) {
    insights.push("Add thought-provoking questions to encourage comments and boost engagement");
  }
  
  // Hashtag analysis
  if (!post.includes('#')) {
    insights.push(`Add 3-5 relevant hashtags like #${category}tips or #${category}insights to increase discoverability`);
  }
  
  // Call to action
  if (!post.match(/\b(comment|share|like|follow|click|join|subscribe)\b/i)) {
    insights.push("Include a clear call-to-action like 'What's your experience?' or 'Share your thoughts below'");
  }
  
  // Length optimization
  if (post.length < 50) {
    insights.push("Expand your post with more valuable insights - aim for 100-250 characters for optimal engagement");
  } else if (post.length > 400) {
    insights.push("Consider breaking down long posts into shorter, more digestible chunks for better readability");
  }
  
  // Visual elements
  if (!post.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/u)) {
    insights.push("Add relevant emojis to make your post more visually appealing and increase engagement");
  }
  
  // Ensure we have at least 4 insights
  if (insights.length < 4) {
    insights.push("Use storytelling elements to make your content more relatable and shareable");
  }
  
  return insights.slice(0, 5); // Return max 5 insights
}
