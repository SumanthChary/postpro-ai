import express from "express";
import { createClient } from "@supabase/supabase-js";
import cron from "node-cron";

const app = express();
app.use(express.json());

const SUPABASE_URL = process.env.SUPABASE_URL || ""; // Provide a fallback to an empty string
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ""; // Provide a fallback to an empty string

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Supabase environment variables are not set.");
  process.exit(1); // Exit the process if variables are missing
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Endpoint to schedule shares
app.post("/schedule-share", async (req, res) => {
  const { time, content } = req.body;

  if (!time || !content) {
    return res.status(400).json({ error: "Time and content are required." });
  }

  // Save the scheduled share to the database
  const { data, error } = await supabase
    .from("scheduled_shares")
    .insert([{ time, content }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ message: "Scheduled successfully!", data });
});

// Cron job to process scheduled shares
cron.schedule("* * * * *", async () => {
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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});