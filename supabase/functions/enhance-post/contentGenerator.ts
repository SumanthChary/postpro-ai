export class ContentGenerator {
  private apiKey: string;
  private apiUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
  }

  private cleanGeneratedContent(content: string): string {
    return content
      // Remove HTML tags and symbols
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      // Remove formatting artifacts
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/?(div|p|span)[^>]*>/gi, '\n')
      // Clean up extra whitespace but preserve intentional line breaks
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      .replace(/[ \t]+/g, ' ')
      .trim();
  }

  private getLinkedInPrompt(post: string, category: string, styleTone: string): string {
    return `Transform this ${category} post into a highly engaging, ${styleTone} LinkedIn post with PERFECT formatting and structure.

CRITICAL FORMATTING RULES:
- Output ONLY plain text with natural line breaks
- NO HTML tags, NO <br>, NO formatting symbols, NO markdown
- Use single line breaks between points for readability
- Use double line breaks to separate sections
- Each line should be scannable and impactful

Original post: "${post}"

Create a LinkedIn post with this EXACT structure:

**DYNAMIC HOOK** (Choose based on content):
For success stories: "Just achieved something incredible 🚀"
For challenges: "Ever felt completely overwhelmed by..."
For tips: "Here's what nobody tells you about..."
For achievements: "Today marks a milestone..."
For business insights: "Building something taught me..."
For personal stories: "Sometimes the best lessons come from..."
For failures: "Failure taught me something valuable..."
For industry updates: "The industry is shifting..."

**ENGAGING STORY BODY** with proper spacing:
- Write in story format with clear line breaks
- Use ➡️ for challenges/pain points
- Use ✅ for solutions/achievements/results
- Use 👉 for key insights/takeaways
- Make each line scannable and impactful
- Build narrative tension and resolution
- Add emotional elements and personal touches

**POWERFUL CTA** (Call-to-Action):
End with engaging questions like:
"What's your experience with this?"
"Which point resonates most with you?"
"What would you add to this list?"
"Share your story in the comments!"

**HASHTAGS**:
Add 2-3 line breaks, then 5-8 relevant hashtags

REQUIREMENTS:
- ${styleTone} yet conversational tone
- Strategic emojis (3-5 total, not overwhelming)
- Story-driven with personal elements
- Clear line spacing for readability
- Professional structure with proper breaks
- Compelling and actionable content
- Strong engagement elements

Write the perfectly formatted LinkedIn post:`;
  }

  private getTwitterPrompt(post: string, styleTone: string): string {
    return `Create a compelling ${styleTone} Twitter/X post from: "${post}"

CRITICAL: Output ONLY plain text. NO HTML tags, NO <br>, NO formatting symbols.

Requirements:
- Under 280 characters
- Strong attention-grabbing hook
- Include 1-2 strategic emojis
- Add 2-3 relevant hashtags
- End with engagement element (question/CTA)
- ${styleTone} but conversational tone
- Pure text output only

Enhanced Twitter post:`;
  }

  private getInstagramPrompt(post: string, styleTone: string): string {
    return `Transform into engaging ${styleTone} Instagram caption: "${post}"

CRITICAL: Output ONLY plain text with natural line breaks. NO HTML tags, NO <br>, NO formatting symbols.

Structure with proper spacing:
- Attention-grabbing opening line
- Story format with clear line breaks between points
- 3-4 strategic emojis throughout
- Personal and relatable tone
- Clear call-to-action question
- 5-8 hashtags at the end (separated by line breaks)
- ${styleTone} but authentic tone
- Pure text output only

Instagram caption:`;
  }

  private getFacebookPrompt(post: string, styleTone: string): string {
    return `Create ${styleTone} Facebook post from: "${post}"

CRITICAL: Output ONLY plain text with natural spacing. NO HTML tags, NO <br>, NO formatting symbols.

Style requirements:
- Personal, community-focused approach
- Conversational ${styleTone} tone with line breaks
- 2-3 strategic emojis
- Encourage discussion and sharing
- Include engaging question/CTA
- 1-2 hashtags maximum
- Proper line spacing for readability
- Pure text output only

Facebook post:`;
  }

  private async generatePlatformContent(platform: string, post: string, category: string, styleTone: string): Promise<string | null> {
    let promptText = '';
    
    switch (platform) {
      case 'linkedin':
        promptText = this.getLinkedInPrompt(post, category, styleTone);
        break;
      case 'twitter':
        promptText = this.getTwitterPrompt(post, styleTone);
        break;
      case 'instagram':
        promptText = this.getInstagramPrompt(post, styleTone);
        break;
      case 'facebook':
        promptText = this.getFacebookPrompt(post, styleTone);
        break;
      default:
        return null;
    }
    
    const requestBody = {
      contents: [{
        parts: [{
          text: promptText
        }]
      }]
    };
    
    console.log(`Making API request for ${platform}`);
    
    try {
      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Gemini API error for ${platform} (${response.status}):`, errorText);
        return null;
      }
      
      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!generatedText) {
        console.error(`No text generated for ${platform}`);
        return null;
      }
      
      // Clean the generated content before returning
      const cleanedContent = this.cleanGeneratedContent(generatedText);
      console.log(`Successfully generated clean content for ${platform}`);
      return cleanedContent;
    } catch (fetchError) {
      console.error(`Network error for ${platform}:`, fetchError);
      return null;
    }
  }

  async generateAllPlatforms(post: string, category: string, styleTone: string) {
    console.log('Starting content generation for all platforms');
    const [linkedinResult, twitterResult, instagramResult, facebookResult] = await Promise.allSettled([
      this.generatePlatformContent('linkedin', post, category, styleTone),
      this.generatePlatformContent('twitter', post, category, styleTone),
      this.generatePlatformContent('instagram', post, category, styleTone),
      this.generatePlatformContent('facebook', post, category, styleTone)
    ]);
    
    interface Platforms {
      linkedin?: string;
      twitter?: string;
      instagram?: string;
      facebook?: string;
    }

    const platforms: Platforms = {};

    if (linkedinResult.status === 'fulfilled' && linkedinResult.value) {
      platforms.linkedin = linkedinResult.value.trim();
    }
    if (twitterResult.status === 'fulfilled' && twitterResult.value) {
      platforms.twitter = twitterResult.value.trim();
    }
    if (instagramResult.status === 'fulfilled' && instagramResult.value) {
      platforms.instagram = instagramResult.value.trim();
    }
    if (facebookResult.status === 'fulfilled' && facebookResult.value) {
      platforms.facebook = facebookResult.value.trim();
    }
    
    console.log('Generated platforms:', Object.keys(platforms));
    
    if (Object.keys(platforms).length === 0) {
      throw new Error('Failed to generate enhanced content for any platform');
    }

    return platforms;
  }
}
