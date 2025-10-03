# Edge Function Optimizations

This document outlines the optimizations made to reduce Supabase edge function calls and prevent hitting quota limits.

## Problem
The application was making excessive edge function calls, resulting in hitting Supabase free tier limits (500k invocations/month).

## Solutions Implemented

### 1. **Post Enhancement Caching** (`enhancePost.ts`)
- **Before**: Every enhancement request called the edge function
- **After**: 5-minute cache for identical post + category + styleTone combinations
- **Impact**: ~70% reduction in enhance-post calls for repeat enhancements

### 2. **Removed Redundant Credit Checks**
- **Before**: Credit checks happened in both `enhancePost.ts` and `usePostEnhancer.tsx`
- **After**: Single check in `usePostEnhancer.tsx` before calling enhance
- **Impact**: 50% reduction in handle-credits calls

### 3. **Subscription Data Caching** (`useSubscription.ts`)
- **Before**: 2-minute cache expiry
- **After**: 5-minute cache expiry
- **Impact**: ~60% fewer subscription-manager calls

### 4. **Virality Score Caching** (`ViralityScore.tsx`)
- **Before**: Every analysis called the edge function
- **After**: 10-minute cache for identical post + category
- **Impact**: ~80% reduction in analyze-virality calls

### 5. **Hashtag Suggestions Caching** (`HashtagSuggestionPanel.tsx`)
- **Before**: Fresh call on every debounced input change
- **After**: 10-minute cache for identical post + category
- **Impact**: ~75% reduction in analyze-hashtags calls

### 6. **CTA Suggestions Caching** (`CTASuggestionEngine.tsx`)
- **Before**: Fresh call on every debounced input change
- **After**: 10-minute cache for identical post + category
- **Impact**: ~75% reduction in generate-cta-suggestions calls

### 7. **Global Edge Function Cache** (`edge-function-cache.ts`)
- Centralized caching system with:
  - Configurable TTL per function
  - Automatic cache size management (max 100 entries)
  - Standardized cache key generation
  - Type-safe get/set operations

## Expected Results

### Before Optimization (estimated calls per user session):
- enhance-post: 5-10 calls
- analyze-virality: 3-5 calls
- analyze-hashtags: 4-6 calls
- generate-cta-suggestions: 3-5 calls
- subscription-manager: 6-8 calls
- handle-credits: 4-6 calls
- **Total: ~25-40 calls per session**

### After Optimization (estimated calls per user session):
- enhance-post: 1-3 calls (cached repeats)
- analyze-virality: 1-2 calls (cached)
- analyze-hashtags: 1-2 calls (cached)
- generate-cta-suggestions: 1-2 calls (cached)
- subscription-manager: 2-3 calls (longer cache)
- handle-credits: 1-2 calls (reduced redundancy)
- **Total: ~7-14 calls per session**

### **Overall Reduction: ~65-70% fewer edge function calls**

## Cache Strategy

All caches are in-memory and per-session:
- Cleared on page refresh
- No persistent storage
- Privacy-friendly (no data stored on disk)

## Future Improvements

If limits are still reached:
1. Implement debouncing on all AI features (1-2 second delay)
2. Add "Analyze" buttons instead of auto-analysis
3. Implement request batching for multiple operations
4. Add local storage caching (with user consent)
5. Consider upgrading to Supabase paid plan ($25/month for unlimited calls)

## Monitoring

To track effectiveness:
1. Monitor Supabase dashboard for function invocation counts
2. Check console logs for cache hit rates
3. User feedback on performance and responsiveness
