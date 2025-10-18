// deno-lint-ignore-file no-explicit-any
// @ts-ignore: provided by Deno runtime
import "https://deno.land/x/xhr@0.1.0/mod.ts";
// @ts-ignore: provided by Deno runtime
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// @ts-ignore: esm import resolved at runtime
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";

// deno-lint-ignore-file no-explicit-any
// @ts-ignore: provided by Deno runtime
declare const Deno: any;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const createSlug = () => {
  const alphabet = "abcdefghjkmnpqrstuvwxyz23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
};

const sanitizeArray = (input: unknown): string[] => {
  if (!Array.isArray(input)) return [];
  return input.map((item) => String(item).trim()).filter(Boolean).slice(0, 8);
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const { analysis } = payload as {
      analysis?: {
        postUrl?: string | null;
        platform?: string | null;
        postText?: string;
        viralityScore?: number;
        whyItWorked?: unknown;
        replicateTips?: unknown;
        metrics?: Record<string, unknown>;
        author?: Record<string, unknown>;
        postedAt?: string | null;
        email?: string | null;
        source?: string | null;
      };
    };

    if (!analysis || typeof analysis.viralityScore !== "number" || !analysis.postText?.trim()) {
      return new Response(JSON.stringify({ success: false, error: "Invalid analysis payload." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase configuration for share-public-analysis");
      return new Response(JSON.stringify({ success: false, error: "Server configuration error." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const viralityScore = Math.round(analysis.viralityScore as number);

    const attemptInsert = async (): Promise<string> => {
      for (let attempt = 0; attempt < 5; attempt++) {
        const slug = createSlug();
        const { error } = await supabase.from("public_post_analyses").insert({
          slug,
          post_url: analysis.postUrl ?? null,
          platform: analysis.platform ?? null,
          post_text: analysis.postText,
          virality_score: viralityScore,
          why_it_worked: sanitizeArray(analysis.whyItWorked),
          replicate_tips: sanitizeArray(analysis.replicateTips),
          metrics: analysis.metrics ?? {},
          author_name: typeof analysis.author?.name === "string" ? analysis.author.name : null,
          author_handle: typeof analysis.author?.handle === "string" ? analysis.author.handle : null,
          author_avatar_url: typeof analysis.author?.avatarUrl === "string" ? analysis.author.avatarUrl : null,
          author_followers: typeof analysis.author?.followers === "number" ? analysis.author.followers : null,
          posted_at: analysis.postedAt ?? null,
          source: typeof analysis.source === "string" ? analysis.source : "ai",
          email: analysis.email ?? null,
        });

        if (!error) {
          return slug;
        }

        if (!error.message.includes("duplicate key value")) {
          throw error;
        }
      }

      throw new Error("Failed to generate unique slug");
    };

    const slug = await attemptInsert();
    const baseUrl = (Deno.env.get("PUBLIC_SITE_URL") || Deno.env.get("APP_BASE_URL") || "https://postpro.ai").replace(/\/$/, "");
    const shareUrl = `${baseUrl}/analysis/${slug}`;

    return new Response(JSON.stringify({ success: true, slug, shareUrl }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("share-public-analysis error", error);
    return new Response(JSON.stringify({ success: false, error: "Unable to create share link." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
