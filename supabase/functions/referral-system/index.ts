import { createServer } from 'http';
import dotenv from 'dotenv';

dotenv.config();

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function trackReferral(referrerId, referredUserId, referredUserPlan) {
  // Mocked function: Replace with actual database logic
  console.log(`Tracking referral: Referrer ${referrerId}, Referred User ${referredUserId}, Plan ${referredUserPlan}`);

  // Reward logic for free plan users
  if (referredUserPlan === 'free') {
    console.log(`Referrer ${referrerId} gets 2 free post enhancements.`);
    // Update referrer's post count in the database
  } else {
    console.log(`Referred user ${referredUserId} purchased a plan: ${referredUserPlan}`);
    // Check if referrer qualifies for plan upgrade
    // If 2 paying users referred, grant the same plan
    // If 10 paying users referred in a week, grant annual plan
  }
}

createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { referrerId, referredUserId, referredUserPlan } = await req.json();

      if (!referrerId || !referredUserId || !referredUserPlan) {
        res.writeHead(400, { 'Content-Type': 'application/json', ...corsHeaders });
        res.end(JSON.stringify({ error: 'Missing required fields' }));
        return;
      }

      await trackReferral(referrerId, referredUserId, referredUserPlan);

      res.writeHead(200, { 'Content-Type': 'application/json', ...corsHeaders });
      res.end(JSON.stringify({ message: 'Referral tracked successfully' }));
    } catch (error) {
      console.error('Error in referral tracking:', error);
      res.writeHead(500, { 'Content-Type': 'application/json', ...corsHeaders });
      res.end(JSON.stringify({ error: error.message || 'An unexpected error occurred' }));
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'application/json', ...corsHeaders });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
  }
}).listen(3001, () => {
  console.log('Referral server running on port 3001');
});