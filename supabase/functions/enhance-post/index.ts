
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from './config.ts';
import { checkUserPlanLimits, logPostEnhancement } from './userService.ts';
import { ContentGenerator } from './contentGenerator.ts';
import { generatePostDiagnostics } from '../_shared/postDiagnostics.ts';

serve(async (req) => {
  console.log('Request received:', req.method, req.url);
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 204, 
      headers: corsHeaders 
    });
  }

  try {
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (error) {
      console.error('Invalid JSON in request:', error);
      return new Response(JSON.stringify({ error: 'Invalid JSON in request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const { userId, post, category, styleTone = "professional" } = requestBody;
    console.log('Starting enhance-post function with:', { userId, post, category, styleTone });

    if (!post?.trim()) {
      console.error('Missing post content');
      return new Response(JSON.stringify({ error: 'Post content is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    if (!category?.trim()) {
      console.error('Missing category');
      return new Response(JSON.stringify({ error: 'Category is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const apiKey = Deno.env.get('GOOGLE_AI_API_KEY') || Deno.env.get('GOOGLE_AI_KEY');
    if (!apiKey) {
      console.error('Google AI API key not found in environment variables');
      return new Response(JSON.stringify({ error: 'API configuration error - missing API key' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    console.log('API key found, proceeding with enhancement');

    if (userId) {
      try {
        await checkUserPlanLimits(userId);
      } catch (error) {
        console.error('Error checking user plan:', error);
        if (error instanceof Error && error.message.includes('Post limit reached')) {
          return new Response(JSON.stringify({
            error: error.message,
          }), {
            status: 403,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
      }
    }

    try {
      const contentGenerator = new ContentGenerator(apiKey);
      const platforms = await contentGenerator.generateAllPlatforms(post, category, styleTone);

      const diagnostics = generatePostDiagnostics({
        originalPost: post,
        category,
        styleTone,
        enhancedPlatforms: platforms,
      });

      await logPostEnhancement(userId, {
        originalPost: post,
        enhancedPlatforms: platforms,
        category,
        styleTone,
        diagnostics,
      });

      console.log('Successfully enhanced post for platforms:', Object.keys(platforms));
      return new Response(JSON.stringify({ platforms, diagnostics }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    } catch (apiError: any) {
      console.error('Error calling Gemini API:', apiError);
      return new Response(JSON.stringify({ 
        error: 'Error processing with AI service', 
        details: apiError.message
      }), {
        status: 502,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
  } catch (error: any) {
    console.error('Error in enhance-post function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An unexpected error occurred'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
});
