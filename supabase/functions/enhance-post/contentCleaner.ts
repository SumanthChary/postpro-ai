
export class ContentCleaner {
  static clean(content: string): string {
    return content
      // Remove HTML tags and symbols
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      // Convert HTML line breaks to actual line breaks
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/?(div|p|span)[^>]*>/gi, '\n')
      // Remove markdown formatting that might interfere
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      // Clean up excessive whitespace but preserve intentional line breaks
      .replace(/[ \t]+/g, ' ') // Only collapse spaces and tabs, not newlines
      .replace(/\n[ \t]+/g, '\n') // Remove spaces at the beginning of lines
      .replace(/[ \t]+\n/g, '\n') // Remove spaces at the end of lines
      .replace(/\n{4,}/g, '\n\n\n') // Limit consecutive line breaks to maximum 3
      .trim();
  }
}
