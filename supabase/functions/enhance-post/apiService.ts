
import { ApiResponse, GenerationResult } from './types.ts';

export class GeminiApiService {
  private readonly apiKey: string;
  private readonly apiUrl: string;
  private readonly defaultTimeout: number = 30000;
  private readonly maxRetries: number = 2;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('API key is required');
    }
    this.apiKey = apiKey;
    this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
  }

  async generateContent(promptText: string, platform: string): Promise<string | null> {
    const result = await this.generateContentWithRetry(promptText, platform);
    return result.success ? result.content || null : null;
  }

  private async generateContentWithRetry(promptText: string, platform: string): Promise<GenerationResult> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        console.log(`Making API request for ${platform} (attempt ${attempt}/${this.maxRetries})`);
        
        const result = await this.makeApiRequest(promptText, platform);
        if (result.success) {
          console.log(`Successfully generated content for ${platform}`);
          return result;
        }
        
        lastError = new Error(result.error || 'Unknown API error');
      } catch (error) {
        lastError = error as Error;
        console.error(`Attempt ${attempt} failed for ${platform}:`, error);
        
        if (attempt < this.maxRetries) {
          const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
          console.log(`Retrying after ${delay}ms...`);
          await this.sleep(delay);
        }
      }
    }

    console.error(`All ${this.maxRetries} attempts failed for ${platform}:`, lastError);
    return { success: false, error: lastError?.message || 'Failed after all retries' };
  }

  private async makeApiRequest(promptText: string, platform: string): Promise<GenerationResult> {
    const requestBody = {
      contents: [{
        parts: [{
          text: promptText
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.defaultTimeout);

    try {
      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Gemini API error for ${platform} (${response.status}):`, errorText);
        return { 
          success: false, 
          error: `API error ${response.status}: ${this.getErrorMessage(response.status)}` 
        };
      }

      const data: ApiResponse = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!generatedText) {
        console.error(`No text generated for ${platform}`);
        return { success: false, error: 'No content generated' };
      }

      return { success: true, content: generatedText };
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        return { success: false, error: 'Request timeout' };
      }
      
      console.error(`Network error for ${platform}:`, error);
      return { success: false, error: `Network error: ${(error as Error).message}` };
    }
  }

  private getErrorMessage(status: number): string {
    switch (status) {
      case 400: return 'Invalid request';
      case 401: return 'Invalid API key';
      case 403: return 'Access denied';
      case 429: return 'Rate limit exceeded';
      case 500: return 'Server error';
      default: return 'Unknown error';
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
