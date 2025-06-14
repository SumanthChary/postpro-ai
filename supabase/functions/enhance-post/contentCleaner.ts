
export class ContentCleaner {
  private static readonly HTML_ENTITIES: Record<string, string> = {
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'"
  };

  private static readonly HTML_TAGS_REGEX = /<[^>]*>/g;
  private static readonly LINE_BREAK_TAGS_REGEX = /<br\s*\/?>/gi;
  private static readonly BLOCK_TAGS_REGEX = /<\/?(div|p|span|h[1-6]|section|article)[^>]*>/gi;
  private static readonly MARKDOWN_REGEX = /\*\*/g;
  private static readonly WHITESPACE_CLEANUP_REGEX = /[ \t]+/g;
  private static readonly LINE_START_SPACES_REGEX = /\n[ \t]+/g;
  private static readonly LINE_END_SPACES_REGEX = /[ \t]+\n/g;
  private static readonly EXCESSIVE_BREAKS_REGEX = /\n{4,}/g;

  static clean(content: string): string {
    if (!content || typeof content !== 'string') {
      return '';
    }

    return content
      // Convert HTML line breaks to actual line breaks first
      .replace(this.LINE_BREAK_TAGS_REGEX, '\n')
      .replace(this.BLOCK_TAGS_REGEX, '\n')
      // Remove all other HTML tags
      .replace(this.HTML_TAGS_REGEX, '')
      // Decode HTML entities
      .replace(/&[a-zA-Z0-9#]+;/g, (entity) => this.HTML_ENTITIES[entity] || entity)
      // Remove markdown formatting that might interfere
      .replace(this.MARKDOWN_REGEX, '')
      .replace(/\*/g, '')
      // Clean up whitespace while preserving line structure
      .replace(this.WHITESPACE_CLEANUP_REGEX, ' ')
      .replace(this.LINE_START_SPACES_REGEX, '\n')
      .replace(this.LINE_END_SPACES_REGEX, '\n')
      .replace(this.EXCESSIVE_BREAKS_REGEX, '\n\n\n')
      .trim();
  }

  static validateContent(content: string): boolean {
    return !!(content && content.trim().length > 0);
  }

  static truncateContent(content: string, maxLength: number): string {
    if (content.length <= maxLength) {
      return content;
    }
    return content.substring(0, maxLength - 3) + '...';
  }
}
