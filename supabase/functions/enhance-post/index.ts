
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
    const { post, category, styleTone = "professional" } = await req.json();
    console.log('Starting enhance-post function with:', { post, category, styleTone });

    // Use provided API key or fall back to environment variable
    const apiKey = 'AIzaSyCF8SJtCqwOAdyUIgq6YgJOyKP2th1vBsU' || Deno.env.get('GOOGLE_AI_API_KEY');
    
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

    if (!post?.trim() || !category?.trim()) {
      console.error('Missing required fields');
      return new Response(
        JSON.stringify({ error: 'Post content and category are required' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }

    try {
      // Updated API URL for Gemini
      const apiUrl = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';
      console.log(`Calling Gemini API at: ${apiUrl}`);
      
      // Create separate prompts for each platform
      const generatePlatformContent = async (platform) => {
        let promptText = '';
        
        if (platform === 'linkedin') {
          promptText = `
          Transform this ${category} post into a highly engaging, ${styleTone} LinkedIn post. 
          
          Original post: "${post}"
          
          Follow these guidelines:
          1. Make it conversational and authentic with a ${styleTone} tone
          2. Use short paragraphs with line breaks between them for readability
          3. Include 3-5 relevant emojis throughout the post strategically
          4. Add a call to action at the end
          5. End with 3-5 relevant and trending hashtags in 2023 format (#word)
          6. Maintain the core message but make it more impactful
          7. Total length should be comparable to the original
          
          Format it exactly like a professional LinkedIn post with proper spacing and structure.
          `;
        } else if (platform === 'twitter') {
          promptText = `
          Transform this ${category} post into an engaging, ${styleTone} Twitter post. 
          
          Original post: "${post}"
          
          Follow these guidelines:
          1. Keep it concise (max 280 characters)
          2. Use ${styleTone} tone
          3. Include 1-2 relevant emojis
          4. Add 2-3 trending hashtags
          5. Make it conversational and shareable
          
          Format it exactly like a Twitter post.
          `;
        } else if (platform === 'instagram') {
          promptText = `
          Transform this ${category} post into an engaging, ${styleTone} Instagram caption. 
          
          Original post: "${post}"
          
          Follow these guidelines:
          1. Create a ${styleTone} tone caption
          2. Include line breaks for readability
          3. Add 4-5 relevant emojis strategically placed
          4. End with 5-7 hashtags that are relevant and discoverable
          5. Add a simple call to action
          
          Format it exactly like an Instagram caption.
          `;
        } else if (platform === 'facebook') {
          promptText = `
          Transform this ${category} post into an engaging, ${styleTone} Facebook post. 
          
          Original post: "${post}"
          
          Follow these guidelines:
          1. Use a ${styleTone} tone that encourages conversation
          2. Add 2-3 relevant emojis
          3. Keep paragraphs short with good spacing
          4. Include a question or call to action to boost engagement
          5. Use 1-2 hashtags maximum if relevant
          
          Format it exactly like a Facebook post with proper spacing.
          `;
        }
        
        const requestBody = {
          contents: [{
            parts: [{
              text: promptText
            }]
          }]
        };
        
        console.log(`Request payload for ${platform}:`, JSON.stringify(requestBody));
        
        const response = await fetch(`${apiUrl}?key=${apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Gemini API error for ${platform} (${response.status}):`, errorText);
          return null;
        }
        
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text;
      };
      
      // Process platforms in parallel
      const [linkedinText, twitterText, instagramText, facebookText] = await Promise.all([
        generatePlatformContent('linkedin'),
        generatePlatformContent('twitter'),
        generatePlatformContent('instagram'),
        generatePlatformContent('facebook')
      ]);
      
      const platforms = {};
      if (linkedinText) platforms.linkedin = linkedinText.trim();
      if (twitterText) platforms.twitter = twitterText.trim();
      if (instagramText) platforms.instagram = instagramText.trim();
      if (facebookText) platforms.facebook = facebookText.trim();
      
      if (Object.keys(platforms).length === 0) {
        console.error('No enhanced content generated for any platform');
        return new Response(
          JSON.stringify({ error: 'No enhanced content generated' }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 422
          }
        );
      }

      return new Response(
        JSON.stringify({ platforms }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    } catch (apiError) {
      console.error('Error calling Gemini API:', apiError);
      return new Response(
        JSON.stringify({ 
          error: 'Error processing with AI service', 
          details: apiError.message,
          stack: apiError.stack
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 502
        }
      );
    }
  } catch (error) {
    console.error('Error in enhance-post function:', error);
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
