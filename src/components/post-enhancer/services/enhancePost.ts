
import { supabase } from "@/integrations/supabase/client";
import { EnhancePostResponse } from "../types";

export async function enhancePost(post: string, category: string): Promise<EnhancePostResponse> {
  console.log('Calling enhance-post function with:', { post, category });
  
  const { data, error } = await supabase.functions.invoke('enhance-post', {
    body: { post, category }
  });

  console.log('Response from enhance-post:', { data, error });

  if (error) {
    console.error('Supabase function error:', error);
    throw new Error(error.message || 'Failed to enhance post');
  }

  if (!data?.platforms?.linkedin) {
    throw new Error('No enhanced post content received');
  }

  return data;
}
