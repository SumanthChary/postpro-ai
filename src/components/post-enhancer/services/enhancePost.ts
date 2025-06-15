
import { supabase } from "@/integrations/supabase/client";
import { EnhancePostResponse } from "../types";

export async function enhancePost(
  post: string, 
  category: string, 
  useCredits: boolean = true, // Default to using credits
  styleTone: string = "professional"
): Promise<EnhancePostResponse> {
  // Input validation
  if (!post?.trim()) {
    throw new Error('Post content is required');
  }

  if (!category?.trim()) {
    throw new Error('Category is required');
  }

  if (!styleTone?.trim()) {
    throw new Error('Style tone is required');
  }

  console.log('Calling enhance-post function with:', { post, category, useCredits, styleTone });
  
  try {
    // Get current user for authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError) {
      console.error('Authentication error:', authError);
      throw new Error('Authentication failed. Please sign in again.');
    }

    // Check credits before making the enhancement request if useCredits is true
    if (useCredits && user?.id) {
      const { data: creditCheck, error: creditError } = await supabase.functions.invoke('handle-credits', {
        body: { 
          action: 'check',
          userId: user.id,
          amount: 1
        }
      });

      if (creditError) {
        console.error('Credit check error:', creditError);
        throw new Error('Unable to verify credits. Please try again.');
      }

      if (!creditCheck.hasEnoughCredits && !creditCheck.unlimited) {
        throw new Error('No credits available. Please upgrade your plan to continue enhancing posts.');
      }
    }

    const requestBody = { 
      post: post.trim(), 
      category: category.trim(),
      useCredits,
      styleTone: styleTone.trim(),
      userId: user?.id
    };

    console.log('Request body:', requestBody);

    // Add timeout to prevent hanging requests
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout - please try again')), 30000);
    });

    const enhancePromise = supabase.functions.invoke('enhance-post', {
      body: requestBody
    });

    const { data, error } = await Promise.race([enhancePromise, timeoutPromise]) as any;

    console.log('Response from enhance-post:', { data, error });

    if (error) {
      console.error('Supabase function error:', error);
      
      // Handle specific error types
      if (error.message?.includes('No credits available') || error.message?.includes('Insufficient credits')) {
        throw new Error('No credits available. Please upgrade your plan to continue enhancing posts.');
      }
      
      if (error.message?.includes('Post limit reached')) {
        throw new Error('You have reached your post enhancement limit. Please upgrade your plan to continue.');
      }
      
      if (error.message?.includes('Upgrade to the Pro plan')) {
        throw new Error('This feature requires a Pro plan. Please upgrade to access post templates.');
      }
      
      if (error.message?.includes('API configuration error')) {
        throw new Error('Service temporarily unavailable. Please try again later.');
      }
      
      if (error.message?.includes('Invalid JSON')) {
        throw new Error('Invalid request format. Please try again.');
      }

      if (error.message?.includes('Post content is required') || 
          error.message?.includes('Category is required')) {
        throw new Error('Please fill in all required fields.');
      }
      
      // Generic error handling
      throw new Error(error.message || 'Failed to enhance post. Please try again.');
    }

    // Validate response structure
    if (!data) {
      console.error('No data received from enhance-post function');
      throw new Error('No response received from enhancement service');
    }

    if (!data.platforms) {
      console.error('Invalid response structure - missing platforms:', data);
      throw new Error('Invalid response from enhancement service');
    }

    // Validate that at least one platform has content
    const hasValidContent = Object.values(data.platforms).some(content => 
      content && typeof content === 'string' && content.trim().length > 0
    );

    if (!hasValidContent) {
      console.error('No valid enhanced content received:', data.platforms);
      throw new Error('No enhanced content was generated. Please try again.');
    }

    return data;
  } catch (error: any) {
    console.error('Error in enhancePost function:', error);
    
    // Handle network errors
    if (error.message?.includes('Failed to fetch') || 
        error.message?.includes('NetworkError') ||
        error.name === 'TypeError') {
      throw new Error('Network error: Please check your internet connection and try again.');
    }
    
    // Handle timeout errors
    if (error.message?.includes('timeout') || error.message?.includes('Request timeout')) {
      throw new Error('Request timeout: The service is taking too long to respond. Please try again.');
    }
    
    // Handle function invocation errors
    if (error.message?.includes('FunctionInvocationError') || 
        error.message?.includes('Edge Function returned a non-2xx status code')) {
      console.error('Function invocation details:', error);
      throw new Error('Service error: The enhancement service is temporarily unavailable. Please try again later.');
    }
    
    // Re-throw known errors (including credit-related ones)
    if (error.message?.includes('Post content is required') ||
        error.message?.includes('Category is required') ||
        error.message?.includes('Style tone is required') ||
        error.message?.includes('Authentication failed') ||
        error.message?.includes('No credits available') ||
        error.message?.includes('Insufficient credits') ||
        error.message?.includes('post enhancement limit') ||
        error.message?.includes('Pro plan') ||
        error.message?.includes('Service temporarily unavailable') ||
        error.message?.includes('Unable to verify credits')) {
      throw error;
    }
    
    // Generic fallback
    throw new Error('An unexpected error occurred while enhancing your post. Please try again.');
  }
}
