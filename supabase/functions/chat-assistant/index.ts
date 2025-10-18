
import "https://deno.land/x/xhr@0.1.0/mod.ts";
// @ts-ignore: provided by Deno runtime
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { generatePostDiagnostics } from "../_shared/postDiagnostics.ts";

// deno-lint-ignore-file no-explicit-any
// @ts-ignore: Deno runtime provides these globals
declare const Deno: any;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BREAKDOWN_KEYWORDS = [
  'break down',
  'breakdown',
  "why isn't",
  'why isnt',
  'analyze this post',
  'post breakdown',
  'give me a breakdown',
];

const extractPostContent = (message: string): string => {
  if (message.includes('POST:')) {
    return message.split('POST:').pop()?.trim() ?? '';
  }

  const tripleTickMatch = message.match(/```(?:[a-zA-Z]+)?\n?([\s\S]*?)```/);
  if (tripleTickMatch?.[1]) {
    return tripleTickMatch[1].trim();
  }

  const quoteMatch = message.match(/"([\s\S]+)"/);
  if (quoteMatch?.[1]) {
    return quoteMatch[1].trim();
  }

  const questionIndex = message.indexOf('?');
  if (questionIndex !== -1 && questionIndex < message.length - 1) {
    return message.slice(questionIndex + 1).trim();
  }

  const lines = message.split('\n').map((line) => line.trim()).filter(Boolean);
  if (lines.length > 1) {
    return lines.slice(1).join('\n').trim();
  }

  return message.trim();
};

const shouldGenerateBreakdown = (message: string) => {
  const normalized = message.toLowerCase();
  const keywordMatch = BREAKDOWN_KEYWORDS.some((keyword) => normalized.includes(keyword));
  if (!keywordMatch) {
    return false;
  }

  const content = extractPostContent(message);
  return content.length > 80;
};

const formatDiagnosticsResponse = (post: string, diagnostics: ReturnType<typeof generatePostDiagnostics>): string => {
  const lines: string[] = [];
  lines.push('Here\'s the snapshot of your post performance potential:');
  lines.push('');
  lines.push(`Viral Potential Score: ${diagnostics.viralityScore}/100`);
  lines.push('');
  lines.push('Why reach might be limited:');
  diagnostics.viewReasons.forEach((reason, index) => {
    lines.push(`${index + 1}. ${reason}`);
  });
  if (diagnostics.viewReasons.length === 0) {
    lines.push('1. No major red flags detected—focus on timing and consistency.');
  }
  lines.push('');
  lines.push('Quick wins to try next:');
  diagnostics.quickWins.slice(0, 3).forEach((win, index) => {
    lines.push(`${index + 1}. ${win}`);
  });
  if (diagnostics.quickWins.length === 0) {
    lines.push('1. Experiment with a stronger hook or add a clear CTA.');
  }
  lines.push('');
  lines.push('Expected engagement mix:');
  const metricEntries = Object.entries(diagnostics.engagementMetrics).slice(0, 5);
  metricEntries.forEach(([metric, value]) => {
    lines.push(`• ${metric.replace(/([A-Z])/g, ' $1')}: ${value}%`);
  });
  lines.push('');
  lines.push('Need me to rewrite it with these fixes baked in? Just say the word.');

  return lines.join('\n');
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
      const { message, history = [], category = 'general', styleTone = 'professional' } = await req.json();
    
    if (!message?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Message content is required' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }

    const shouldBreakdown = shouldGenerateBreakdown(message);

    if (shouldBreakdown) {
      const postContent = extractPostContent(message);
      const diagnostics = generatePostDiagnostics({
        originalPost: postContent,
        category,
        styleTone,
      });

      const formatted = formatDiagnosticsResponse(postContent, diagnostics);

      return new Response(
        JSON.stringify({ response: formatted }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
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
    const err = error as Error;
    console.error('Error in chat-assistant function:', err);
    return new Response(
      JSON.stringify({ 
        error: err.message || 'An unexpected error occurred',
        stack: err.stack 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
