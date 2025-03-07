
import { supabase } from "@/integrations/supabase/client";
import { EnhancePostResponse } from "../types";

export async function enhancePost(post: string, category: string): Promise<EnhancePostResponse> {
  if (!post?.trim()) {
    throw new Error('Post content is required');
  }

  if (!category?.trim()) {
    throw new Error('Category is required');
  }

  console.log('Calling enhance-post function with:', { post, category });
  
  try {
    const { data, error } = await supabase.functions.invoke('enhance-post', {
      body: { post, category }
    });

    console.log('Response from enhance-post:', { data, error });

    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(error.message || 'Failed to enhance post');
    }

    if (!data?.platforms?.linkedin) {
      throw new Error('No enhanced content received');
    }

    return data;
  } catch (error: any) {
    console.error('Error in enhancePost function:', error);
    
    // Check if the error is from Supabase Edge Function
    if (error.message?.includes('FunctionInvocationError') || 
        error.status >= 400 || 
        error.statusCode >= 400) {
      throw new Error('Server error: Unable to process your request. Please try again later.');
    }
    
    throw error;
  }
}
