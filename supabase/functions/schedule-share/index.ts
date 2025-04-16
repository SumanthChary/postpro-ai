import { serve } from "https://deno.land/x/sift@0.5.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { schedule } from "https://deno.land/x/deno_cron/cron.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

serve(async (req) => {
  if (req.method === "POST") {
    const { time, content } = await req.json();

    if (!time || !content) {
      return new Response(JSON.stringify({ error: "Time and content are required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Save the scheduled share to the database
    const { data, error } = await supabase
      .from("scheduled_shares")
      .insert([{ time, content }]);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Scheduled successfully!", data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response("Method not allowed", { status: 405 });
});

// Function to auto-share scheduled content
schedule("* * * * *", async () => {
  console.log("Checking for scheduled shares...");

  const now = new Date().toISOString();

  // Fetch scheduled shares that are due
  const { data: shares, error } = await supabase
    .from("scheduled_shares")
    .select("id, content")
    .lte("time", now);

  if (error) {
    console.error("Error fetching scheduled shares:", error.message);
    return;
  }

  if (shares && shares.length > 0) {
    for (const share of shares) {
      console.log("Auto-sharing content:", share.content);

      // Add logic to share content to the website or platform
      // Example: await shareToPlatform(share.content);

      // Remove the processed share from the database
      const { error: deleteError } = await supabase
        .from("scheduled_shares")
        .delete()
        .eq("id", share.id);

      if (deleteError) {
        console.error("Error deleting processed share:", deleteError.message);
      }
    }
  } else {
    console.log("No scheduled shares to process.");
  }
});