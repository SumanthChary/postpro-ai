
import { StyleTone, Category } from './types.ts';

abstract class BasePromptGenerator {
  protected static readonly COMMON_INSTRUCTIONS = `
CRITICAL FORMATTING REQUIREMENTS:
- Output ONLY plain text with natural line breaks
- NO HTML tags, NO <br>, NO formatting symbols, NO markdown
- Each important point on its own line for maximum readability
- Use single line breaks between related points
- Use double line breaks to separate major sections
- Structure must be scannable and professional`;

  protected static validateInputs(post: string, styleTone: string): void {
    if (!post?.trim()) {
      throw new Error('Post content is required');
    }
    if (!styleTone?.trim()) {
      throw new Error('Style tone is required');
    }
  }
}

export class LinkedInPromptGenerator extends BasePromptGenerator {
  private static readonly LINKEDIN_STRUCTURE = `
**HOOK LINE** (Choose based on content - make it attention-grabbing):
For success stories: "Just achieved something incredible 🚀"
For challenges: "Ever felt completely overwhelmed by..."
For tips: "Here's what nobody tells you about..."
For achievements: "Today marks a milestone..."
For business insights: "Building something taught me..."

**CORE MESSAGE** (2-3 lines maximum):
Main insight or story point
Supporting detail or impact
Key result or transformation

**ACTIONABLE TAKEAWAY** (1-2 lines):
👉 Practical tip or lesson
💡 Key insight to remember

**ENGAGEMENT CTA** (Single line):
"What's your experience with this?" OR
"Which approach works best for you?" OR
"Share your perspective in the comments!"

**HASHTAGS** (3-5 hashtags maximum):
#RelevantHashtag #SecondHashtag #ThirdHashtag #FourthHashtag #FifthHashtag`;

  static generate(post: string, category: Category, styleTone: StyleTone): string {
    this.validateInputs(post, styleTone);

    return `Transform this ${category} post into a highly engaging, ${styleTone} LinkedIn post that's CONCISE yet VIRAL-READY.

${this.COMMON_INSTRUCTIONS}

Original post: "${post}"

Create a LinkedIn post with this EXACT line-by-line structure:
${this.LINKEDIN_STRUCTURE}

FORMATTING RULES:
- KEEP IT CONCISE: Maximum 6-8 lines total (excluding hashtags)
- Each section separated by double line breaks
- Each point within sections on single line breaks
- Strategic emojis (2-3 total maximum for professionalism)
- ${styleTone} yet conversational tone
- Professional structure with clear spacing
- Make it scannable and engaging
- Focus on QUALITY over QUANTITY - every word must add value

VIRAL POTENTIAL REQUIREMENTS:
- Hook must create immediate curiosity or relatability
- Core message should be actionable and shareable
- Include specific, tangible insights
- End with engaging question that invites discussion

Write the perfectly formatted, concise LinkedIn post:`;
  }
}

export class TwitterPromptGenerator extends BasePromptGenerator {
  private static readonly CHARACTER_LIMIT = 280;

  static generate(post: string, styleTone: StyleTone): string {
    this.validateInputs(post, styleTone);

    return `Create a compelling ${styleTone} Twitter/X post from: "${post}"

${this.COMMON_INSTRUCTIONS}

Requirements:
- Under ${this.CHARACTER_LIMIT} characters
- Strong attention-grabbing hook
- Include 1-2 strategic emojis
- Add 2-3 relevant hashtags
- End with engagement element (question/CTA)
- ${styleTone} but conversational tone
- Pure text output only

Enhanced Twitter post:`;
  }
}

export class InstagramPromptGenerator extends BasePromptGenerator {
  static generate(post: string, styleTone: StyleTone): string {
    this.validateInputs(post, styleTone);

    return `Transform into engaging ${styleTone} Instagram caption: "${post}"

${this.COMMON_INSTRUCTIONS}

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
}

export class FacebookPromptGenerator extends BasePromptGenerator {
  static generate(post: string, styleTone: StyleTone): string {
    this.validateInputs(post, styleTone);

    return `Create ${styleTone} Facebook post from: "${post}"

${this.COMMON_INSTRUCTIONS}

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
}
