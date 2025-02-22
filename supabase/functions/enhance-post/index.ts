
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const professionalTemplates = {
  business: [
    "As a business leader, I've observed that {content}. Here's what this means for our industry...",
    "Recently, our team discovered {content}. The implications for business growth are significant...",
    "In today's rapidly evolving market, {content}. Let me share some key insights..."
  ],
  technology: [
    "Innovation in tech: {content}. Here's how this transforms the landscape...",
    "Breaking down the complexity: {content}. The technical implications are...",
    "Tech evolution insight: {content}. This advancement means..."
  ],
  lifestyle: [
    "Professional development perspective: {content}. Here's what I've learned...",
    "Growth mindset observation: {content}. The key takeaway for professionals...",
    "Leadership lesson: {content}. This experience taught me..."
  ],
  marketing: [
    "Marketing strategy insight: {content}. The data shows...",
    "Digital transformation update: {content}. Here's what marketers should know...",
    "Market analysis: {content}. This trend indicates..."
  ],
  creative: [
    "Creative industry perspective: {content}. The strategic implications...",
    "Design thinking approach: {content}. This methodology suggests...",
    "Innovation framework: {content}. The creative process reveals..."
  ]
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { post, category } = await req.json();
    console.log('Received request:', { post, category });

    if (!post?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Post content cannot be empty' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('GOOGLE_AI_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Google AI API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Select relevant template
    const templates = professionalTemplates[category] || professionalTemplates.business;
    const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];

    // Create enhancement prompt
    const enhancementPrompt = `
    Enhance this professional ${category} post for LinkedIn. Follow these guidelines:

    Original Post: ${post}

    Requirements:
    1. Keep it professional and impactful
    2. Focus on value and insights
    3. Include 1-2 relevant statistics or data points if applicable
    4. Add a clear call-to-action
    5. Structure:
       - Hook/Insight
       - Context/Story
       - Key Learning/Value
       - Call to Action
    6. Minimize emoji use (max 1-2 where truly appropriate)
    7. Make it sound natural and authentic while maintaining professional credibility

    Make it compelling and engaging while staying true to the original message.`;

    console.log('Sending request to Google AI API with prompt:', enhancementPrompt);

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: enhancementPrompt
          }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Google AI API error:', {
        status: response.status,
        statusText: response.statusText,
        errorData
      });
      throw new Error(`Google AI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Google AI API response:', data);

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format from AI service');
    }

    const enhancedContent = data.candidates[0].content.parts[0].text;

    // Get relevant hashtags
    const hashtagsPerCategory = {
      business: ["#leadership", "#business", "#innovation", "#entrepreneurship"],
      technology: ["#tech", "#innovation", "#digital", "#technology"],
      lifestyle: ["#professionaldevelopment", "#leadership", "#productivity"],
      marketing: ["#marketing", "#digitalmarketing", "#strategy", "#branding"],
      creative: ["#design", "#innovation", "#creativity", "#strategy"]
    };

    const availableHashtags = hashtagsPerCategory[category] || hashtagsPerCategory.business;
    const selectedHashtags = availableHashtags
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .join(' ');

    const finalPost = `${enhancedContent}\n\n${selectedHashtags}`;

    return new Response(
      JSON.stringify({ enhancedPost: finalPost }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in enhance-post function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to enhance post',
        details: error.toString()
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
