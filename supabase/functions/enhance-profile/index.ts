
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@google/generative-ai';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('GOOGLE_AI_API_KEY');
    if (!apiKey) throw new Error('Google AI API key not configured');

    const genAI = new createClient(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const { action, currentUsername, bio } = await req.json();
    let result;

    switch (action) {
      case 'suggestUsername':
        const usernameChat = await model.startChat();
        const usernameResponse = await usernameChat.sendMessage(
          `Suggest 3 creative, professional username options that are between 3-15 characters long, 
           based on this bio: "${bio || 'A professional user'}". 
           Return ONLY the usernames separated by commas, no explanations or other text.`
        );
        result = usernameResponse.text.split(',').map(name => name.trim());
        break;

      case 'generateBio':
        const bioChat = await model.startChat();
        const bioResponse = await bioChat.sendMessage(
          `Write a professional, engaging bio in first person of maximum 150 characters 
           that would be good for a profile, based on the username: "${currentUsername}". 
           Focus on being concise but impactful.`
        );
        result = bioResponse.text;
        break;

      case 'getProfileScore':
        const scoreChat = await model.startChat();
        const scoreResponse = await scoreChat.sendMessage(
          `Given this profile info - Username: "${currentUsername}", Bio: "${bio || 'No bio provided'}"
           Return a JSON string with the following structure:
           {
             "score": (number between 0-100),
             "suggestions": [array of 2-3 specific improvement suggestions]
           }
           Focus on professionalism, completeness, and engagement.`
        );
        result = JSON.parse(scoreResponse.text);
        break;

      default:
        throw new Error('Invalid action specified');
    }

    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in enhance-profile function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
