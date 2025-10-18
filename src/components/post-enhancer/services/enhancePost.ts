
import { supabase } from "@/integrations/supabase/client";
import { EnhancePostResponse } from "../types";

// Cache for enhanced posts (in-memory cache)
const enhanceCache = new Map<string, { data: EnhancePostResponse; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

// Generate cache key from inputs
const getCacheKey = (post: string, category: string, styleTone: string): string => {
  return `${post.trim().toLowerCase()}_${category}_${styleTone}`;
};

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
  
  // Check cache first
  const cacheKey = getCacheKey(post, category, styleTone);
  const cached = enhanceCache.get(cacheKey);
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    console.log('Returning cached result');
    return cached.data;
  }
  
  try {
    // Get current user for authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError) {
      console.error('Authentication error:', authError);
      throw new Error('Authentication failed. Please sign in again.');
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

    const result = await Promise.race([enhancePromise, timeoutPromise]);
    if (!result || typeof result !== 'object') {
      throw new Error('Invalid response format');
    }

    type SupabaseResponse = {
      data?: {
        platforms: EnhancePostResponse['platforms'];
        diagnostics?: EnhancePostResponse['diagnostics'];
      };
  error?: Error;
};

const { data, error } = result as SupabaseResponse;
    console.log('Response from enhance-post:', { data, error });

    if (error) {
      console.error('Supabase function error:', error);
      
      // Track errors but don't block
      if (error.message?.includes('No credits available') || 
          error.message?.includes('Insufficient credits') ||
          error.message?.includes('Post limit reached') ||
          error.message?.includes('Upgrade to the Pro plan')) {
        console.log('Usage tracking:', error.message);
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

    const responsePayload: EnhancePostResponse = {
      platforms: data.platforms,
      diagnostics: data.diagnostics,
    };

    // Cache the successful result
    enhanceCache.set(cacheKey, {
      data: responsePayload,
      timestamp: Date.now()
    });

    // Clean up old cache entries (keep cache size reasonable)
    if (enhanceCache.size > 50) {
      const oldestKey = enhanceCache.keys().next().value;
      enhanceCache.delete(oldestKey);
    }

  return responsePayload;
  } catch (error) {
    const err = error as Error;
    console.error('Error in enhancePost function:', error);
    
    // Handle network errors
    if (err.message?.includes('Failed to fetch') || 
        err.message?.includes('NetworkError') ||
        err.name === 'TypeError') {
      throw new Error('Network error: Please check your internet connection and try again.');
    }
    
    // Handle timeout errors
    if (err.message?.includes('timeout') || err.message?.includes('Request timeout')) {
      throw new Error('Request timeout: The service is taking too long to respond. Please try again.');
    }
    
    // Handle function invocation errors
    if (err.message?.includes('FunctionInvocationError') || 
        err.message?.includes('Edge Function returned a non-2xx status code')) {
      console.error('Function invocation details:', err);
      throw new Error('Service error: The enhancement service is temporarily unavailable. Please try again later.');
    }
    
    // Re-throw known errors (including credit-related ones)
    if (err.message?.includes('Post content is required') ||
        err.message?.includes('Category is required') ||
        err.message?.includes('Style tone is required') ||
        err.message?.includes('Authentication failed') ||
        err.message?.includes('No credits available') ||
        err.message?.includes('Insufficient credits') ||
        err.message?.includes('post enhancement limit') ||
        err.message?.includes('Pro plan') ||
        err.message?.includes('Service temporarily unavailable') ||
        err.message?.includes('Unable to verify credits')) {
      throw err;
    }
    
    // Generic fallback
    throw new Error('An unexpected error occurred while enhancing your post. Please try again.');
  }
}
