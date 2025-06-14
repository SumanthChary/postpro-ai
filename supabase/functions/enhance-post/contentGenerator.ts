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
      // Clean up extra whitespace
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      .replace(/[ \t]+/g, ' ')
      .trim();
  }

  private getLinkedInPrompt(post: string, category: string, styleTone: string): string {
    return `Transform this ${category} post into a highly engaging, ${styleTone} LinkedIn post. 

CRITICAL: Output ONLY plain text. No HTML tags, no <br>, no formatting symbols, no markdown formatting.

Original post: "${post}"

Create a LinkedIn post with this EXACT structure:

1. **Dynamic Hook** - Choose the most appropriate opener based on the post content:
   - For success stories: "Just achieved something incredible 🚀" or "Three years ago, I never imagined..."
   - For challenges: "Ever felt completely overwhelmed by..." or "That moment when reality hits..."
   - For tips/advice: "Here's what nobody tells you about..." or "After years in this field..."
   - For achievements: "Today marks a milestone..." or "Remember when..."
   - For business: "Building something taught me..." or "The hardest lesson in business..."
   - For personal stories: "Sometimes the best lessons come from..." or "I'll never forget when..."
   - For insights: "Something completely changed my perspective..." or "What I wish I knew before..."
   - For failures: "Failure taught me something valuable..." or "The mistake that changed everything..."
   - For industry updates: "The industry is shifting..." or "Something big just happened..."

2. **Engaging Body** - Write in story format with:
   - Single line breaks between key points
   - Use ➡️ for challenges/pain points
   - Use ✅ for solutions/achievements/results  
   - Use 👉 for key insights
   - Make each line scannable and impactful
   - Build narrative tension and resolution

3. **Strong CTA** - End with engagement questions:
   - "What's your experience with this?"
   - "Which point resonates most with you?"
   - "What would you add to this list?"
   - "Share your story below!"

4. **Hashtags** - Add 3 line breaks, then 5-8 relevant hashtags

REQUIREMENTS:
- ${styleTone} yet conversational tone
- Strategic emojis (3-5 total, not overwhelming)
- Story-driven with personal elements
- Clear line spacing for readability
- NO HTML tags, NO <br>, NO formatting symbols
- Output pure text only

Write the enhanced LinkedIn post:`;
  }

  private getTwitterPrompt(post: string, styleTone: string): string {
    return `Create a compelling ${styleTone} Twitter/X post from: "${post}"

CRITICAL: Output ONLY plain text. No HTML tags, no <br>, no formatting symbols.

Requirements:
- Under 280 characters
- Strong hook opening
- Include 1-2 emojis
- Add 2-3 hashtags
- End with engagement element
- ${styleTone} tone
- Pure text output only

Enhanced Twitter post:`;
  }

  private getInstagramPrompt(post: string, styleTone: string): string {
    return `Transform into engaging ${styleTone} Instagram caption: "${post}"

CRITICAL: Output ONLY plain text. No HTML tags, no <br>, no formatting symbols.

Structure:
- Attention-grabbing opening
- Story format with line breaks
- 3-4 strategic emojis
- Clear call-to-action
- 5-8 hashtags at end
- ${styleTone} tone
- Pure text output only

Instagram caption:`;
  }

  private getFacebookPrompt(post: string, styleTone: string): string {
    return `Create ${styleTone} Facebook post from: "${post}"

CRITICAL: Output ONLY plain text. No HTML tags, no <br>, no formatting symbols.

Style:
- Personal, community-focused
- Conversational ${styleTone} tone
- 2-3 emojis
- Encourage discussion
- 1-2 hashtags maximum
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
