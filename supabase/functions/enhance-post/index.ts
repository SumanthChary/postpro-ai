
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const apiKey = Deno.env.get('GOOGLE_AI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const categoryPrompts: Record<string, string> = {
  business: "You are a seasoned business thought leader with deep expertise in strategy and entrepreneurship.",
  technology: "You are a forward-thinking tech visionary who understands emerging technologies and digital transformation.",
  lifestyle: "You are an influential lifestyle and personal development expert who inspires positive change.",
  marketing: "You are a strategic marketing expert with deep knowledge of digital trends and audience engagement.",
  creative: "You are a creative director who understands design thinking and creative strategy.",
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { post, category } = await req.json();
    
    if (!post?.trim()) {
      throw new Error('Post content cannot be empty');
    }

    console.log('Enhancing post for category:', category);

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${categoryPrompts[category] || "You are a professional content strategist."}

Your task is to enhance this professional LinkedIn post to maximize engagement and analytics:

"${post}"

Please rewrite it following these guidelines:
1. Start with impactful emojis that grab attention
2. Use compelling storytelling techniques
3. Include data points or specific examples when relevant
4. Create a clear value proposition
5. End with a strong call-to-action
6. Add 3-4 relevant hashtags
7. Keep it concise but impactful
8. Use line breaks strategically for readability
9. Maintain a professional yet engaging tone
10. Focus on delivering tangible value to the reader

Format the post beautifully with proper spacing and emojis. Make it ready to post as-is.`
          }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('AI API Error:', {
        status: response.status,
        response: errorData
      });
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const enhancedPost = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!enhancedPost) {
      throw new Error('No enhanced content received from AI');
    }

    console.log('Successfully enhanced post');

    return new Response(
      JSON.stringify({
        platforms: {
          linkedin: enhancedPost
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
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
