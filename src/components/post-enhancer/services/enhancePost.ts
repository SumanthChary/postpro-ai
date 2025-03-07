
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
    // Add timeout option to avoid hanging requests
    const { data, error } = await supabase.functions.invoke('enhance-post', {
      body: { post, category }
    });

    console.log('Response from enhance-post:', { data, error });

    if (error) {
      console.error('Supabase function error:', error);
      
      // Check if the error response contains more details about the Gemini API error
      if (error.message?.includes('Failed to generate enhanced post') || 
          error.message?.includes('models/gemini-pro is not found')) {
        throw new Error('AI service error: The Gemini API configuration needs to be updated. Please check your API key and model.');
      }
      
      throw new Error(error.message || 'Failed to enhance post');
    }

    if (!data?.platforms?.linkedin) {
      console.error('Invalid response structure:', data);
      throw new Error('No enhanced content received');
    }

    return data;
  } catch (error: any) {
    console.error('Error in enhancePost function:', error);
    
    // More specific error handling
    if (error.message?.includes('FunctionInvocationError') || 
        error.message?.includes('Edge Function returned a non-2xx status code')) {
      console.error('Function invocation details:', error);
      throw new Error('Server error: The AI enhancement service is temporarily unavailable. Please try again later.');
    }
    
    // Network or timeout errors
    if (error.message?.includes('Failed to fetch') || 
        error.message?.includes('timeout') ||
        error.message?.includes('network')) {
      throw new Error('Network error: Please check your internet connection and try again.');
    }
    
    throw error;
  }
}
