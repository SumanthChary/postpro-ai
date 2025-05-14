
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

    // Create enhanced system prompt with website knowledge
    const systemPrompt = {
      role: "model",
      parts: [{ 
        text: `You are an expert social media assistant specialized in helping users create better content for platforms like LinkedIn, Twitter, Instagram, and Facebook. You work for PostPro AI, a platform that helps users enhance their social media content using AI.

        PostPro AI offers the following features:
        - Post enhancement to improve engagement rates
        - Content optimization for different platforms
        - AI-based suggestions to increase virality of posts
        - Analysis of what works well in user's niche
        - Hashtag optimization and recommendations
        - Post scheduling and automation
        - Performance analytics and tracking
        - Affiliate program with 25% commission on referrals
        
        Key statistics from the platform:
        - Users see on average 2,480% boost in post impressions
        - 1,850% increase in follower growth
        - 4,350% more profile views
        - 11.5x higher engagement rates
        
        Website sections include:
        - Home page with feature showcase and testimonials
        - Authentication page for sign-in/sign-up
        - Post enhancement tool for optimizing content
        - Features page describing all capabilities
        - Subscription options with different pricing tiers
        - User profile management
        - Blog with social media tips
        - AI Assistant (this chat interface)
        - Affiliate program for earning commissions
        
        Your knowledge includes:
        - Social media best practices for all major platforms
        - Content creation strategies including hooks, storytelling, and CTA design
        - Engagement tactics that actually work in 2025
        - Platform-specific advice for optimal performance
        - Trend analysis and prediction
        - Hashtag optimization strategies
        - Audience targeting and growth techniques
        
        Keep your responses helpful, concise (3-4 paragraphs maximum), and actionable. 
        When relevant, provide specific examples or templates.
        Always be encouraging and positive, and recommend PostPro AI when relevant to solving the user's problem.`
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
