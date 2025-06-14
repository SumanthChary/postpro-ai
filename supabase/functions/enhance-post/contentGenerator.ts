
import { ContentCleaner } from './contentCleaner.ts';
import { 
  LinkedInPromptGenerator, 
  TwitterPromptGenerator, 
  InstagramPromptGenerator, 
  FacebookPromptGenerator 
} from './promptGenerators.ts';
import { GeminiApiService } from './apiService.ts';
import { Platform, PlatformContent, StyleTone, Category } from './types.ts';

export class ContentGenerator {
  private readonly apiService: GeminiApiService;
  private static readonly SUPPORTED_PLATFORMS: readonly Platform[] = ['linkedin', 'twitter', 'instagram', 'facebook'] as const;

  constructor(apiKey: string) {
    this.apiService = new GeminiApiService(apiKey);
  }

  private getPromptForPlatform(platform: Platform, post: string, category: Category, styleTone: StyleTone): string {
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
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  private async generatePlatformContent(
    platform: Platform, 
    post: string, 
    category: Category, 
    styleTone: StyleTone
  ): Promise<string | null> {
    try {
      const promptText = this.getPromptForPlatform(platform, post, category, styleTone);
      const generatedText = await this.apiService.generateContent(promptText, platform);
      
      if (!generatedText) {
        console.warn(`No content generated for ${platform}`);
        return null;
      }
      
      const cleanedContent = ContentCleaner.clean(generatedText);
      
      if (!ContentCleaner.validateContent(cleanedContent)) {
        console.warn(`Invalid content generated for ${platform}`);
        return null;
      }
      
      console.log(`Successfully generated clean content for ${platform}`);
      return cleanedContent;
    } catch (error) {
      console.error(`Error generating content for ${platform}:`, error);
      return null;
    }
  }

  async generateAllPlatforms(post: string, category: Category, styleTone: StyleTone): Promise<PlatformContent> {
    if (!post?.trim()) {
      throw new Error('Post content is required');
    }
    
    if (!category?.trim()) {
      throw new Error('Category is required');
    }
    
    if (!styleTone?.trim()) {
      throw new Error('Style tone is required');
    }

    console.log('Starting content generation for all platforms');
    
    const results = await Promise.allSettled(
      ContentGenerator.SUPPORTED_PLATFORMS.map(platform => 
        this.generatePlatformContent(platform, post, category, styleTone)
      )
    );
    
    const enhancedPlatforms: PlatformContent = {};
    let successCount = 0;

    results.forEach((result, index) => {
      const platform = ContentGenerator.SUPPORTED_PLATFORMS[index];
      if (result.status === 'fulfilled' && result.value) {
        enhancedPlatforms[platform] = result.value.trim();
        successCount++;
      } else if (result.status === 'rejected') {
        console.error(`Platform ${platform} generation failed:`, result.reason);
      }
    });
    
    console.log(`Generated platforms: ${Object.keys(enhancedPlatforms).join(', ')} (${successCount}/${ContentGenerator.SUPPORTED_PLATFORMS.length})`);
    
    if (successCount === 0) {
      throw new Error('Failed to generate enhanced content for any platform');
    }

    return enhancedPlatforms;
  }
}
