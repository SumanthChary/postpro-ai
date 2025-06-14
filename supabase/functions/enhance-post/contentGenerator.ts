
import { ContentCleaner } from './contentCleaner.ts';
import { 
  LinkedInPromptGenerator, 
  TwitterPromptGenerator, 
  InstagramPromptGenerator, 
  FacebookPromptGenerator 
} from './promptGenerators.ts';
import { GeminiApiService } from './apiService.ts';

export class ContentGenerator {
  private apiService: GeminiApiService;

  constructor(apiKey: string) {
    this.apiService = new GeminiApiService(apiKey);
  }

  private getPromptForPlatform(platform: string, post: string, category: string, styleTone: string): string | null {
    switch (platform) {
      case 'linkedin':
        return LinkedInPromptGenerator.generate(post, category, styleTone);
      case 'twitter':
        return TwitterPromptGenerator.generate(post, styleTone);
      case 'instagram':
        return InstagramPromptGenerator.generate(post, styleTone);
      case 'facebook':
        return FacebookPromptGenerator.generate(post, styleTone);
      default:
        return null;
    }
  }

  private async generatePlatformContent(platform: string, post: string, category: string, styleTone: string): Promise<string | null> {
    const promptText = this.getPromptForPlatform(platform, post, category, styleTone);
    
    if (!promptText) {
      return null;
    }
    
    const generatedText = await this.apiService.generateContent(promptText, platform);
    
    if (!generatedText) {
      return null;
    }
    
    // Clean the generated content before returning
    const cleanedContent = ContentCleaner.clean(generatedText);
    console.log(`Successfully generated clean content for ${platform}`);
    return cleanedContent;
  }

  async generateAllPlatforms(post: string, category: string, styleTone: string) {
    console.log('Starting content generation for all platforms');
    
    const platforms = ['linkedin', 'twitter', 'instagram', 'facebook'];
    const results = await Promise.allSettled(
      platforms.map(platform => this.generatePlatformContent(platform, post, category, styleTone))
    );
    
    interface Platforms {
      linkedin?: string;
      twitter?: string;
      instagram?: string;
      facebook?: string;
    }

    const enhancedPlatforms: Platforms = {};

    results.forEach((result, index) => {
      const platform = platforms[index] as keyof Platforms;
      if (result.status === 'fulfilled' && result.value) {
        enhancedPlatforms[platform] = result.value.trim();
      }
    });
    
    console.log('Generated platforms:', Object.keys(enhancedPlatforms));
    
    if (Object.keys(enhancedPlatforms).length === 0) {
      throw new Error('Failed to generate enhanced content for any platform');
    }

    return enhancedPlatforms;
  }
}
