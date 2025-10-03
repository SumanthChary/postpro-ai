// Global cache for edge function responses to reduce API calls

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class EdgeFunctionCache {
  private cache = new Map<string, CacheEntry<any>>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes

  // Get cached data if still valid
  get<T>(key: string, ttl?: number): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const expiryTime = ttl || this.defaultTTL;
    if (Date.now() - entry.timestamp > expiryTime) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  // Set data in cache
  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });

    // Limit cache size to 100 entries
    if (this.cache.size > 100) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
  }

  // Clear specific cache entry
  delete(key: string): void {
    this.cache.delete(key);
  }

  // Clear all cache
  clear(): void {
    this.cache.clear();
  }

  // Generate standardized cache key
  generateKey(functionName: string, params: Record<string, any>): string {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}:${JSON.stringify(params[key])}`)
      .join('|');
    return `${functionName}::${sortedParams}`;
  }
}

export const edgeFunctionCache = new EdgeFunctionCache();
