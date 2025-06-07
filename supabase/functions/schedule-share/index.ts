
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Supabase environment variables are not set.");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function scheduleShare(time: string, content: string, userId?: string) {
  console.log(`Scheduling share for ${time}: ${content}`);
  
  try {
    // Save the scheduled share to the database
    const { data, error } = await supabase
      .from("scheduled_shares")
      .insert([{ time, content, user_id: userId }]);

    if (error) {
      console.error('Error scheduling share:', error);
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error in scheduleShare:', error);
    throw error;
  }
}

async function processScheduledShares() {
  console.log("Checking for scheduled shares...");
  
  try {
    const now = new Date().toISOString();

    // Fetch scheduled shares that are due
    const { data: shares, error } = await supabase
      .from("scheduled_shares")
      .select("id, content, user_id")
      .lte("time", now);

    if (error) {
      console.error("Error fetching scheduled shares:", error.message);
      return { error: error.message };
    }

    if (shares && shares.length > 0) {
      console.log(`Processing ${shares.length} scheduled shares`);
      
      for (const share of shares) {
        console.log("Auto-sharing content:", share.content);

        // Here you would add logic to share content to the website or platform
        // Example: await shareToPlatform(share.content);
        
        // For now, we'll just log it and mark as processed
        console.log(`Processed share ${share.id} for user ${share.user_id}`);

        // Remove the processed share from the database
        const { error: deleteError } = await supabase
          .from("scheduled_shares")
          .delete()
          .eq("id", share.id);

        if (deleteError) {
          console.error("Error deleting processed share:", deleteError.message);
        }
      }
      
      return { success: true, processed: shares.length };
    } else {
      console.log("No scheduled shares to process.");
      return { success: true, processed: 0 };
    }
  } catch (error) {
    console.error('Error in processScheduledShares:', error);
    return { error: error.message };
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const pathname = url.pathname;

    if (req.method === 'POST' && pathname === '/schedule-share') {
      const body = await req.json();
      const { time, content, userId } = body;

      if (!time || !content) {
        return new Response(
          JSON.stringify({ error: "Time and content are required." }),
          { 
            status: 400, 
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          }
        );
      }

      const result = await scheduleShare(time, content, userId);
      
      return new Response(
        JSON.stringify({ message: "Scheduled successfully!", data: result }),
        { 
          status: 200, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        }
      );
    }
    
    if (req.method === 'POST' && pathname === '/process-scheduled') {
      // This endpoint can be called by a cron job to process scheduled shares
      const result = await processScheduledShares();
      
      return new Response(
        JSON.stringify(result),
        { 
          status: 200, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        }
      );
    }

    // Default response for unmatched routes
    return new Response(
      JSON.stringify({ error: 'Not found' }),
      { 
        status: 404, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );
  } catch (error) {
    console.error('Error in schedule-share function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'An unexpected error occurred' }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );
  }
});
